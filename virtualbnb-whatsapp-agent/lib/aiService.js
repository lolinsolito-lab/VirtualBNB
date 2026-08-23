// lib/aiService.js
// Layer AI-agnostico: business logic non chiama mai l'API AI direttamente.
// Default: Claude API, con prompt caching attivo. Per switchare provider, riscrivi solo questo file.

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.AI_MODEL || 'claude-sonnet-5';

function logUsage(label, usage) {
  if (!usage) return;
  console.log(`[AI usage] ${label}`, {
    input: usage.input_tokens,
    cache_read: usage.cache_read_input_tokens || 0,
    cache_write: usage.cache_creation_input_tokens || 0,
    output: usage.output_tokens,
  });
}

/**
 * Chiamata base senza tool — usata da guestAgent/leadAgent.
 *
 * Caching: usiamo il breakpoint automatico a livello di request (`cache_control`
 * in top-level). Anthropic applica il breakpoint all'ultimo blocco cacheable e lo
 * sposta in avanti man mano che la conversazione cresce — e' la modalita' consigliata
 * per conversazioni multi-turno come le nostre.
 *
 * NOTA: la cache scatta solo se il prefisso (system + eventuale storico stabile)
 * supera la soglia minima cacheable del modello (variabile, verificare la doc
 * corrente - indicativamente da ~1K a ~4K token a seconda del modello). Con KB
 * per-proprieta' molto corte potresti non vedere hit finche' non cresce il prompt.
 * Controlla `cache_read_input_tokens` nei log per validarlo in produzione.
 *
 * @param {string} systemPrompt
 * @param {Array<{role: 'user'|'assistant', content: string}>} history
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
async function generateReply(systemPrompt, history, userMessage) {
  const messages = [...history, { role: 'user', content: userMessage }];

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 500,
      cache_control: { type: 'ephemeral' }, // caching automatico
      system: systemPrompt,
      messages,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('AI API error:', res.status, errText);
    throw new Error(`AI API error ${res.status}`);
  }

  const data = await res.json();
  logUsage('generateReply', data.usage);
  const textBlock = data.content.find((b) => b.type === 'text');
  return textBlock ? textBlock.text : '';
}

/**
 * Chiamata con tool-use - usata da adminAgent/clientAgent per interrogare i dati.
 * Esegue il loop: Claude chiede un tool -> noi eseguiamo l'handler -> rimandiamo
 * il risultato -> ripete finche' Claude risponde con testo finale.
 *
 * IMPORTANTE (sicurezza): gli `toolHandlers` devono essere le uniche funzioni che
 * toccano il DB. L'AI sceglie QUALE tool chiamare e con quali argomenti, ma non ha
 * mai accesso diretto al DB. Per il clientAgent, l'handler deve ignorare/validare
 * qualsiasi account_id che il modello provi a passare e usare SEMPRE quello della
 * sessione autenticata - vedi lib/tools/clientTools.js.
 *
 * @param {string} systemPrompt
 * @param {Array<object>} tools - tool definitions in formato Anthropic
 * @param {Object<string, Function>} toolHandlers - map nome tool -> async handler(input, context)
 * @param {object} context - dati di sessione (es. account_id autenticato) passati agli handler, MAI all'AI
 * @param {Array<{role: 'user'|'assistant', content: any}>} history
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
async function generateWithTools(systemPrompt, tools, toolHandlers, context, history, userMessage) {
  let messages = [...history, { role: 'user', content: userMessage }];
  const MAX_TURNS = 6; // guardrail anti-loop

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        cache_control: { type: 'ephemeral' },
        system: systemPrompt,
        tools,
        messages,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('AI API error:', res.status, errText);
      throw new Error(`AI API error ${res.status}`);
    }

    const data = await res.json();
    logUsage(`generateWithTools turn ${turn}`, data.usage);

    const toolUseBlocks = data.content.filter((b) => b.type === 'tool_use');

    if (toolUseBlocks.length === 0) {
      const textBlock = data.content.find((b) => b.type === 'text');
      return textBlock ? textBlock.text : '';
    }

    messages.push({ role: 'assistant', content: data.content });

    const toolResults = await Promise.all(
      toolUseBlocks.map(async (block) => {
        const handler = toolHandlers[block.name];
        if (!handler) {
          return {
            type: 'tool_result',
            tool_use_id: block.id,
            content: `Errore: tool "${block.name}" non esiste.`,
            is_error: true,
          };
        }
        try {
          const result = await handler(block.input, context);
          return {
            type: 'tool_result',
            tool_use_id: block.id,
            content: JSON.stringify(result),
          };
        } catch (e) {
          console.error(`Tool ${block.name} error:`, e);
          return {
            type: 'tool_result',
            tool_use_id: block.id,
            content: `Errore durante l'esecuzione: ${e.message}`,
            is_error: true,
          };
        }
      }),
    );

    messages.push({ role: 'user', content: toolResults });
  }

  return 'Non sono riuscito a completare la richiesta in un numero ragionevole di passaggi. Riprova con una domanda piu\' specifica.';
}

module.exports = { generateReply, generateWithTools };
