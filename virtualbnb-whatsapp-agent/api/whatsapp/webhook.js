// api/whatsapp/webhook.js
// Endpoint pubblico: Meta chiama GET per la verifica iniziale, POST per ogni messaggio.
// URL da registrare in Meta App Dashboard: https://<tuo-dominio>/api/whatsapp/webhook

const { extractIncoming } = require('../../lib/whatsapp');
const { handleIncoming } = require('../../lib/router');

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden');
  }

  if (req.method === 'POST') {
    try {
      const entry = req.body?.entry?.[0];
      const change = entry?.changes?.[0]?.value;
      const message = change?.messages?.[0];

      // Meta invia anche eventi di stato (delivered/read) senza 'messages' — li ignoriamo
      if (!message) {
        return res.status(200).send('EVENT_RECEIVED');
      }

      const phoneNumber = message.from; // già in formato E.164 senza '+'
      const incoming = extractIncoming(message);

      await handleIncoming(phoneNumber, incoming);

      return res.status(200).send('EVENT_RECEIVED');
    } catch (err) {
      console.error('Webhook error:', err);
      // Rispondere comunque 200 evita che Meta disabiliti il webhook per troppi errori
      return res.status(200).send('EVENT_RECEIVED');
    }
  }

  return res.status(405).send('Method Not Allowed');
};
