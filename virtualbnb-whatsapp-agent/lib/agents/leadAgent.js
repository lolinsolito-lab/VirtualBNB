// lib/agents/leadAgent.js
// Flusso host/proprietario: qualifica conversazionale, cattura lead, notifica Mike.
//
// L'AI conduce la conversazione naturalmente. Quando ritiene di avere abbastanza
// informazioni, chiude la risposta con un marker strutturato che il codice estrae
// e salva — l'utente non vede mai il marker.

const { supabase } = require('../supabase');
const { generateReply } = require('../aiService');
const { notifyMike } = require('../notify');

const HANDOFF_TRIGGERS = ['persona', 'operatore', 'umano', 'parlare con qualcuno'];
const MARKER = '[LEAD_READY]';
const MAX_HISTORY_TURNS = 12; // limite per non far crescere il jsonb indefinitamente

const SYSTEM_PROMPT = `Sei l'assistente WhatsApp di VirtualBNB, property management AI-driven per il mercato di Milano
("Il tuo immobile lavora. Tu no."). Parli con proprietari che stanno valutando di affidarci la gestione del loro immobile.

Obiettivo: qualificare il lead in modo naturale e conversazionale, SENZA sembrare un questionario.
Raccogli, quando emerge naturalmente:
- zona/indirizzo dell'immobile
- tipologia (monolocale, bilocale, ecc.) e metratura indicativa
- stato attuale (vuoto, affittato a lungo termine, già su Airbnb/Booking gestito da altri)
- tempistiche (quando vorrebbe iniziare)

Tono: diretto, professionale, zero salesy-hype. Massimo 3-4 frasi per risposta.
Se l'utente chiede prezzi/dettagli tecnici che non conosci con certezza, non inventare cifre:
di' che un operatore lo richiamerà con una proposta su misura.

Quando hai raccolto ALMENO zona + tipologia + stato attuale, chiudi la tua risposta (dopo un messaggio
naturale per l'utente) aggiungendo su una nuova riga:
${MARKER}{"property_location": "...", "property_type": "...", "current_status": "...", "timeline": "...", "notes": "..."}
Usa null per i campi che non hai. Fallo una sola volta, alla prima volta che hai i dati minimi.`;

function extractMarker(rawReply) {
  const idx = rawReply.indexOf(MARKER);
  if (idx === -1) return { userText: rawReply, leadData: null };

  const userText = rawReply.slice(0, idx).trim();
  const jsonPart = rawReply.slice(idx + MARKER.length).trim();

  try {
    const leadData = JSON.parse(jsonPart);
    return { userText, leadData };
  } catch (e) {
    console.error('Failed to parse lead marker JSON:', e, jsonPart);
    return { userText, leadData: null };
  }
}

async function saveLead(phoneNumber, leadData) {
  const { error } = await supabase.from('leads').insert({
    phone_number: phoneNumber,
    property_location: leadData.property_location,
    property_type: leadData.property_type,
    current_status: leadData.current_status,
    timeline: leadData.timeline,
    notes: leadData.notes,
    notified: true,
  });

  if (error) console.error('Failed to save lead:', error);

  await notifyMike(
    `🏠 Nuovo lead VirtualBNB da ${phoneNumber}\n` +
      `Zona: ${leadData.property_location || 'n/d'}\n` +
      `Tipo: ${leadData.property_type || 'n/d'}\n` +
      `Stato attuale: ${leadData.current_status || 'n/d'}\n` +
      `Tempistiche: ${leadData.timeline || 'n/d'}`,
  );
}

/**
 * @param {object} session - riga da conversation_sessions (state.history contiene lo storico)
 * @param {string} userMessage
 * @returns {Promise<string>} testo da inviare al proprietario
 */
async function handleLeadFlow(session, userMessage) {
  const lower = userMessage.toLowerCase();

  if (HANDOFF_TRIGGERS.some((t) => lower.includes(t))) {
    await supabase
      .from('conversation_sessions')
      .update({ human_handoff: true, updated_at: new Date().toISOString() })
      .eq('phone_number', session.phone_number);

    await notifyMike(`🔔 Prospect ${session.phone_number} vuole parlare con te direttamente.`);
    return 'Ti richiamiamo noi il prima possibile. Nel frattempo posso già darti qualche informazione se vuoi.';
  }

  const history = session.state?.history || [];
  const rawReply = await generateReply(SYSTEM_PROMPT, history, userMessage);
  const { userText, leadData } = extractMarker(rawReply);

  const updatedHistory = [
    ...history,
    { role: 'user', content: userMessage },
    { role: 'assistant', content: userText },
  ].slice(-MAX_HISTORY_TURNS * 2);

  await supabase
    .from('conversation_sessions')
    .update({ state: { history: updatedHistory }, updated_at: new Date().toISOString() })
    .eq('phone_number', session.phone_number);

  if (leadData) {
    await saveLead(session.phone_number, leadData);
  }

  return userText;
}

module.exports = { handleLeadFlow };
