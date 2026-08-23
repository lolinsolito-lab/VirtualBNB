// lib/whatsapp.js
// Wrapper minimale per WhatsApp Cloud API (Meta Graph API).
// Docs: https://developers.facebook.com/docs/whatsapp/cloud-api

const GRAPH_VERSION = 'v21.0';
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const TOKEN = process.env.WHATSAPP_TOKEN;

const BASE_URL = `https://graph.facebook.com/${GRAPH_VERSION}/${PHONE_NUMBER_ID}/messages`;

async function callGraphAPI(payload) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('WhatsApp API error:', res.status, errText);
    throw new Error(`WhatsApp API error ${res.status}: ${errText}`);
  }

  return res.json();
}

/** Invia un messaggio di testo semplice */
async function sendText(to, body) {
  return callGraphAPI({
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body },
  });
}

/**
 * Invia un messaggio con pulsanti interattivi (max 3 pulsanti, WhatsApp limit)
 * buttons: [{ id: 'flow_guest', title: '🔑 Sono ospite' }, ...]
 */
async function sendButtons(to, bodyText, buttons) {
  return callGraphAPI({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: bodyText },
      action: {
        buttons: buttons.map((b) => ({
          type: 'reply',
          reply: { id: b.id, title: b.title },
        })),
      },
    },
  });
}

/**
 * Estrae testo utile da un messaggio webhook in entrata.
 * Gestisce sia testo libero che risposte a pulsanti interattivi.
 */
function extractIncoming(message) {
  if (message.type === 'text') {
    return { kind: 'text', value: message.text.body };
  }
  if (message.type === 'interactive' && message.interactive?.type === 'button_reply') {
    return { kind: 'button', value: message.interactive.button_reply.id };
  }
  return { kind: 'unknown', value: null };
}

module.exports = { sendText, sendButtons, extractIncoming };
