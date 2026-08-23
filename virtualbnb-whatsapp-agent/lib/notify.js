// lib/notify.js
// Notifica Mike quando serve intervento umano (nuovo lead, richiesta escalation).
// V1: gli manda un WhatsApp diretto sullo stesso numero business. Se preferisci
// email/Telegram, sostituisci l'implementazione qui — è l'unico punto da toccare.

const { sendText } = require('./whatsapp');

const MIKE_PHONE = process.env.MIKE_NOTIFY_PHONE; // formato E.164, es. 393xxxxxxxxx

async function notifyMike(message) {
  if (!MIKE_PHONE) {
    console.warn('MIKE_NOTIFY_PHONE non configurato — notifica solo su log.');
    console.log('[NOTIFY]', message);
    return;
  }

  try {
    await sendText(MIKE_PHONE, message);
  } catch (e) {
    console.error('Notifica a Mike fallita:', e);
  }
}

module.exports = { notifyMike };
