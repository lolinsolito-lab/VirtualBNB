// lib/agents/adminAgent.js
// Agente ammnistrativo: risponde a te (o al tuo team interno) con accesso
// cross-tenant completo. Va esposto SOLO dietro autenticazione admin.

const { generateWithTools } = require('../aiService');
const { adminToolDefinitions, adminToolHandlers } = require('../tools/adminTools');

const SYSTEM_PROMPT = `Sei l'assistente interno di VirtualTwin/VirtualBNB. Parli con l'amministratore
della piattaforma (accesso completo a tutti gli account). Rispondi in modo diretto e sintetico,
con numeri concreti quando disponibili. Usa i tool per recuperare dati reali — non inventare mai cifre.
Se una domanda e' ambigua su quale account riguarda, chiedi di specificare o mostra la lista account.`;

/**
 * @param {Array} history - storico conversazione admin (non persistito in questo scaffold minimale)
 * @param {string} message
 * @returns {Promise<string>}
 */
async function handleAdminMessage(history, message) {
  return generateWithTools(
    SYSTEM_PROMPT,
    adminToolDefinitions,
    adminToolHandlers,
    {}, // nessun context speciale: gli handler admin usano gia' la service_role key
    history,
    message,
  );
}

module.exports = { handleAdminMessage };
