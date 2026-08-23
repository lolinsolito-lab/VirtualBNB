// api/ownerChat.js
// Endpoint Vercel per l'AI Agent Owner.
// Protetto: accesso solo ai dati del proprietario autenticato (ownerId iniettato dal server).

const { createClient } = require('@supabase/supabase-js');
const { generateWithTools } = require('./lib/aiService');
const { ownerToolDefinitions, ownerToolHandlers } = require('./lib/ownerTools');

const OWNER_SYSTEM_PROMPT = `Sei ARIA — l'assistente personale della dashboard VirtualBNB per il tuo immobile.
Rispondi SOLO sui dati del proprietario con cui stai parlando. 
Non hai accesso ad altri conti, altri immobili o dati di altri clienti.
Se ti vengono chiesti dati di terzi, spiega gentilmente che non è nel tuo perimetro.
Lingua: italiano. Tono: professionale, caldo, orientato al rendimento dell'investimento.

Puoi aiutare con:
- Dati sull'immobile (indirizzo, tipologia)
- Rendiconti mensili (guadagni, spese, netto)
- Tasso di occupazione
- Storico dei pagamenti
- Riepilogo dei guadagni totali`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Auth check
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Non autorizzato: token mancante.' });
  }

  const jwt = authHeader.split(' ')[1];
  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);
  
  if (authError || !user) return res.status(401).json({ error: 'Token non valido.' });

  // Verifica che l'utente esista nei profiles (ruolo owner o admin)
  const adminDb = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: profile } = await adminDb.from('profiles').select('role').eq('id', user.id).single();
  
  if (!profile) return res.status(403).json({ error: 'Profilo non trovato.' });

  const { message, history = [] } = req.body;
  if (!message) return res.status(400).json({ error: 'Campo "message" obbligatorio.' });

  // Il context contiene l'ownerId REALE dalla sessione — mai dalla chat
  const context = { ownerId: user.id };

  try {
    const reply = await generateWithTools(OWNER_SYSTEM_PROMPT, ownerToolDefinitions, ownerToolHandlers, context, history, message);
    return res.status(200).json({ reply });
  } catch (e) {
    console.error('Owner chat error:', e);
    return res.status(500).json({ error: 'Errore interno del servizio AI.' });
  }
}
