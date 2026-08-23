// api/adminChat.js
// Endpoint Vercel per l'AI Agent Admin.
// Protetto: richiede un utente autenticato con ruolo 'admin' in Supabase.

const { createClient } = require('@supabase/supabase-js');
const { generateWithTools } = require('./lib/aiService');
const { adminToolDefinitions, adminToolHandlers } = require('./lib/adminTools');

const ADMIN_SYSTEM_PROMPT = `Sei ARIA — Artificial Revenue Intelligence Assistant — l'assistente AI interno di VirtualBNB.
Parli con l'Amministratore della piattaforma (accesso completo). 
Sei diretto, concreto e orientato ai numeri. Fornisci sempre dati reali usando i tuoi tool.
Non inventare mai cifre. Quando aggiorni dati (es. stato lead), conferma sempre l'azione eseguita.
Lingua: italiano. Tono: professionale ma diretto, da business partner.

Puoi aiutare con:
- Panoramica portfolio (proprietari, immobili, fatturato, occupazione)
- Analisi lead (quanti, da dove, stato)
- Rendiconti finanziari per immobile o mese
- Aggiornare lo stato dei lead
- Qualsiasi domanda sui dati del business`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Auth check: verifica sessione Supabase
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Non autorizzato: token mancante.' });
  }

  const jwt = authHeader.split(' ')[1];
  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);
  
  if (authError || !user) return res.status(401).json({ error: 'Token non valido.' });

  // Verifica ruolo admin
  const adminDb = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: profile } = await adminDb.from('profiles').select('role').eq('id', user.id).single();
  
  if (profile?.role !== 'admin') {
    return res.status(403).json({ error: 'Accesso negato: richiede ruolo admin.' });
  }

  const { message, history = [] } = req.body;
  if (!message) return res.status(400).json({ error: 'Campo "message" obbligatorio.' });

  try {
    const reply = await generateWithTools(ADMIN_SYSTEM_PROMPT, adminToolDefinitions, adminToolHandlers, {}, history, message);
    return res.status(200).json({ reply });
  } catch (e) {
    console.error('Admin chat error:', e);
    return res.status(500).json({ error: 'Errore interno del servizio AI.' });
  }
}
