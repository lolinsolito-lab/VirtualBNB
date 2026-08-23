// lib/agents/guestAgent.js
// Flusso ospite: identifica la proprietà, poi risponde vincolato alla sua KB.

const { supabase } = require('../supabase');
const { generateReply } = require('../aiService');
const { notifyMike } = require('../notify');

const HANDOFF_TRIGGERS = ['persona', 'operatore', 'umano', 'parlare con qualcuno', 'aiuto urgente'];

function buildSystemPrompt(property) {
  return `Sei l'assistente virtuale di VirtualBNB per la proprietà "${property.name}".
Rispondi SOLO usando le informazioni fornite qui sotto. Se non sai una risposta, dillo chiaramente
e suggerisci di scrivere "persona" per parlare con un operatore. Non inventare mai dettagli.

[INDIRIZZO] ${property.address || 'non specificato'}
[WIFI] Nome rete: ${property.wifi_name || 'n/d'} — Password: ${property.wifi_password || 'n/d'}
[CHECK-IN] Orario: ${property.checkin_time}. Istruzioni: ${property.checkin_instructions || 'n/d'}
[CHECK-OUT] Orario: ${property.checkout_time}
[REGOLE CASA] ${property.house_rules || 'n/d'}
[CONSIGLI ZONA] ${property.local_tips || 'n/d'}
[CONTATTO EMERGENZE] ${property.emergency_contact || 'n/d'}

Tono: cordiale, sintetico, professionale. Rispondi in italiano salvo che l'ospite scriva in un'altra lingua.`;
}

async function findPropertyByCode(code) {
  const normalized = code.trim().toLowerCase();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('active', true);

  if (error) throw error;

  return data.find((p) =>
    (p.reservation_codes || []).some((c) => c.toLowerCase() === normalized),
  );
}

/**
 * @param {object} session - riga da conversation_sessions
 * @param {string} userMessage
 * @returns {Promise<string>} testo da inviare all'ospite
 */
async function handleGuestFlow(session, userMessage) {
  const lower = userMessage.toLowerCase();

  if (HANDOFF_TRIGGERS.some((t) => lower.includes(t))) {
    await supabase
      .from('conversation_sessions')
      .update({ human_handoff: true, updated_at: new Date().toISOString() })
      .eq('phone_number', session.phone_number);

    await notifyMike(
      `🔔 Ospite ${session.phone_number} ha chiesto assistenza umana. Ultimo messaggio: "${userMessage}"`,
    );

    return 'Ti metto in contatto con un operatore, ti risponderemo il prima possibile. Nel frattempo posso aiutarti con altro?';
  }

  // Step 1: proprietà non ancora identificata
  if (!session.property_id) {
    const property = await findPropertyByCode(userMessage);

    if (!property) {
      return (
        'Per aiutarti ho bisogno del codice della tua prenotazione (lo trovi nella conferma che hai ricevuto), ' +
        'oppure il nome dell\'appartamento. Puoi incollarlo qui?'
      );
    }

    await supabase
      .from('conversation_sessions')
      .update({ property_id: property.id, updated_at: new Date().toISOString() })
      .eq('phone_number', session.phone_number);

    return `Perfetto, ti ho collegato a "${property.name}" 🏠 Come posso aiutarti? (wifi, check-in, regole della casa, consigli in zona...)`;
  }

  // Step 2: proprietà nota → risposta vincolata alla KB
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', session.property_id)
    .single();

  if (error || !property) {
    return 'Non trovo i dettagli del tuo appartamento, scrivi "persona" e ti mettiamo in contatto con noi.';
  }

  const systemPrompt = buildSystemPrompt(property);
  return generateReply(systemPrompt, [], userMessage);
}

module.exports = { handleGuestFlow };
