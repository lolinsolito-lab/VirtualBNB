// lib/router.js
// Punto di ingresso della logica: gestisce la sessione per numero di telefono
// e instrada al flusso giusto. Il webhook chiama solo handleIncoming().

const { supabase } = require('./supabase');
const { sendText, sendButtons } = require('./whatsapp');
const { handleGuestFlow } = require('./agents/guestAgent');
const { handleLeadFlow } = require('./agents/leadAgent');

const WELCOME_TEXT =
  'Ciao! 👋 Sono l\'assistente virtuale di VirtualBNB. Per aiutarti subito, dimmi chi sei:';

const WELCOME_BUTTONS = [
  { id: 'flow_owner', title: '🏠 Sono un host' },
  { id: 'flow_guest', title: '🔑 Sono ospite' },
];

async function logMessage(phoneNumber, direction, content) {
  const { error } = await supabase.from('messages_log').insert({ phone_number: phoneNumber, direction, content });
  if (error) console.error('logMessage error:', error);
}

async function getOrCreateSession(phoneNumber) {
  const { data: existing } = await supabase
    .from('conversation_sessions')
    .select('*')
    .eq('phone_number', phoneNumber)
    .maybeSingle();

  if (existing) return existing;

  const { data: created, error } = await supabase
    .from('conversation_sessions')
    .insert({ phone_number: phoneNumber })
    .select()
    .single();

  if (error) throw error;
  return created;
}

async function setFlow(phoneNumber, flowType) {
  const { data, error } = await supabase
    .from('conversation_sessions')
    .update({ flow_type: flowType, updated_at: new Date().toISOString() })
    .eq('phone_number', phoneNumber)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * @param {string} phoneNumber - numero mittente, formato E.164 senza '+'
 * @param {{kind: 'text'|'button'|'unknown', value: string|null}} incoming
 */
async function handleIncoming(phoneNumber, incoming) {
  if (incoming.value) await logMessage(phoneNumber, 'in', incoming.value);

  let session = await getOrCreateSession(phoneNumber);

  // Handoff attivo: nessuna risposta AI finché Mike non lo resetta manualmente in Supabase.
  if (session.human_handoff) {
    const holding = 'Un operatore ti risponderà a breve, grazie per la pazienza 🙏';
    await sendText(phoneNumber, holding);
    await logMessage(phoneNumber, 'out', holding);
    return;
  }

  // Flusso non ancora scelto
  if (!session.flow_type) {
    if (incoming.kind === 'button' && (incoming.value === 'flow_owner' || incoming.value === 'flow_guest')) {
      const flowType = incoming.value === 'flow_owner' ? 'lead' : 'guest';
      session = await setFlow(phoneNumber, flowType);

      const opening =
        flowType === 'guest'
          ? 'Perfetto! Scrivimi il codice della tua prenotazione (lo trovi nella conferma ricevuta) o il nome dell\'appartamento.'
          : 'Ottimo! Raccontami del tuo immobile — in che zona si trova?';

      await sendText(phoneNumber, opening);
      await logMessage(phoneNumber, 'out', opening);
      return;
    }

    // Primo contatto o risposta non riconosciuta: manda menu
    await sendButtons(phoneNumber, WELCOME_TEXT, WELCOME_BUTTONS);
    await logMessage(phoneNumber, 'out', WELCOME_TEXT);
    return;
  }

  // Flusso già stabilito → delega all'agente competente
  const userMessage = incoming.value || '';
  const reply =
    session.flow_type === 'guest'
      ? await handleGuestFlow(session, userMessage)
      : await handleLeadFlow(session, userMessage);

  await sendText(phoneNumber, reply);
  await logMessage(phoneNumber, 'out', reply);
}

module.exports = { handleIncoming };
