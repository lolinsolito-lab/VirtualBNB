// api/admin/chat.js
// Endpoint per il chat widget della dashboard ADMIN.
// TODO in Antigravity: sostituisci requireAdminAuth con il tuo vero controllo
// (es. verifica JWT Supabase + app_users.role === 'admin'). Senza questo controllo
// chiunque trovi l'URL avrebbe accesso cross-tenant completo — non andare in
// produzione senza averlo implementato e testato.

const { handleAdminMessage } = require('../../lib/agents/adminAgent');

function requireAdminAuth(req) {
  // Placeholder — implementare verifica reale prima del deploy.
  const token = req.headers.authorization;
  if (!token) throw new Error('Non autenticato');
  // ... verifica JWT, controlla app_users.role === 'admin' ...
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    requireAdminAuth(req);
    const { history = [], message } = req.body;
    const reply = await handleAdminMessage(history, message);
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Admin chat error:', err);
    return res.status(401).json({ error: 'Non autorizzato o errore interno.' });
  }
};
