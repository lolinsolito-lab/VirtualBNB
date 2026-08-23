// api/lib/aiService.js
// Motore AI condiviso tra adminChat e ownerChat.
// Usa Claude con prompt caching automatico (ephemeral).

const MODEL = process.env.AI_MODEL || 'claude-sonnet-4-5';

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
 * Loop Claude con tool-use.
 * Il modello sceglie quale tool chiamare — gli handler decidono come filtrare il DB.
 * Il `context` (owner_id, jwt) NON viene mai passato all'AI, solo agli handler.
 */
async function generateWithTools(systemPrompt, tools, toolHandlers, context, history, userMessage) {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return 'Servizio AI non configurato. Aggiungi ANTHROPIC_API_KEY nelle variabili d\'ambiente di Vercel.';
  }

  let messages = [...history, { role: 'user', content: userMessage }];
  const MAX_TURNS = 6;

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
      return 'Si è verificato un errore nel servizio AI. Riprova tra un momento.';
    }

    const data = await res.json();
    logUsage(`turn ${turn}`, data.usage);

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
          return { type: 'tool_result', tool_use_id: block.id, content: `Tool "${block.name}" non trovato.`, is_error: true };
        }
        try {
          const result = await handler(block.input, context);
          return { type: 'tool_result', tool_use_id: block.id, content: JSON.stringify(result) };
        } catch (e) {
          console.error(`Tool ${block.name} error:`, e);
          return { type: 'tool_result', tool_use_id: block.id, content: `Errore: ${e.message}`, is_error: true };
        }
      }),
    );

    messages.push({ role: 'user', content: toolResults });
  }

  return 'Non sono riuscito a completare la richiesta. Prova a riformulare la domanda.';
}

module.exports = { generateWithTools };
