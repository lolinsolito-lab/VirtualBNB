// lib/agents/clientAgent.js
// Agente per i clienti (property manager iscritti a VirtualTwin): risponde
// SOLO sui dati del proprio account. Va invocato con il context della sessione
// autenticata — vedi api/client/chat.js per come si costruisce `context`.

const { generateWithTools } = require('../aiService');
const { clientToolDefinitions, clientToolHandlers } = require('../tools/clientTools');

const SYSTEM_PROMPT = `Sei l'assistente della dashboard VirtualTwin per property manager.
Rispondi solo su dati del cliente con cui stai parlando — non hai accesso ad altri account e
non devi mai far finta di averlo. Tono professionale, sintetico, numeri concreti quando disponibili.
Se il cliente chiede qualcosa che esula dal tuo ambito (es. dati di altri clienti, funzioni di
amministrazione della piattaforma), spiega chiaramente che non e' nel tuo perimetro.`;

/**
 * @param {{accountId: string, userJwt: string}} context - SEMPRE dalla sessione autenticata, mai dalla chat
 * @param {Array} history
 * @param {string} message
 * @returns {Promise<string>}
 */
async function handleClientMessage(context, history, message) {
  if (!context.accountId || !context.userJwt) {
    throw new Error('handleClientMessage richiede una sessione autenticata valida (accountId + userJwt).');
  }

  return generateWithTools(
    SYSTEM_PROMPT,
    clientToolDefinitions,
    clientToolHandlers,
    context,
    history,
    message,
  );
}

module.exports = { handleClientMessage };
