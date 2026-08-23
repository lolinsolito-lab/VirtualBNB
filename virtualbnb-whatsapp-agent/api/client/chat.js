// api/client/chat.js
// Endpoint per il chat widget della dashboard CLIENTE.
// TODO in Antigravity: sostituisci getSessionFromRequest con la verifica reale
// del JWT Supabase Auth della richiesta, e il lookup di account_id dalla tabella
// app_users. account_id NON deve mai arrivare dal body della richiesta.

const { handleClientMessage } = require('../../lib/agents/clientAgent');
const { createClient } = require('@supabase/supabase-js');

async function getSessionFromRequest(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error('Non autenticato');
  const userJwt = authHeader.replace('Bearer ', '');

  // Verifica il JWT con Supabase Auth e recupera l'account_id collegato.
  const supabaseAuth = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const { data: userData, error } = await supabaseAuth.auth.getUser(userJwt);
  if (error || !userData?.user) throw new Error('Sessione non valida');

  // app_users collega auth_user_id -> account_id (vedi schema-v2-multitenant.sql)
  const { data: appUser, error: appUserErr } = await supabaseAuth
    .from('app_users')
    .select('account_id, role')
    .eq('auth_user_id', userData.user.id)
    .single();

  if (appUserErr || !appUser || appUser.role !== 'client') {
    throw new Error('Utente non autorizzato per questa dashboard');
  }

  return { accountId: appUser.account_id, userJwt };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const context = await getSessionFromRequest(req);
    const { history = [], message } = req.body;
    const reply = await handleClientMessage(context, history, message);
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Client chat error:', err);
    return res.status(401).json({ error: 'Non autorizzato o errore interno.' });
  }
};
