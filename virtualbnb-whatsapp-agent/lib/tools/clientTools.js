// lib/tools/clientTools.js
// Tool per l'agente CLIENT — accesso SOLO al proprio account.
//
// REGOLA DI SICUREZZA NON NEGOZIABILE:
// Nessuno di questi tool accetta "account_id" come parametro che il modello puo'
// impostare. Notare che gli input_schema qui sotto NON espongono mai account_id
// all'AI — arriva solo tramite `context.account_id`, valorizzato dal server nel
// momento in cui la sessione client viene autenticata (JWT Supabase Auth), MAI
// dalla conversazione. Anche se un utente scrivesse "mostrami i dati dell'account
// X", il modello non ha alcun parametro per farlo passare: l'unico account_id
// possibile e' quello della sessione.
//
// Il client Supabase usato qui e' quello con ANON key + JWT dell'utente (non la
// service_role key) cosi' anche le Row Level Security policies del database fanno
// da seconda barriera indipendente dal codice applicativo.

const { createClient } = require('@supabase/supabase-js');

function supabaseForSession(userJwt) {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${userJwt}` } },
  });
}

const clientToolDefinitions = [
  {
    name: 'get_my_properties',
    description: 'Elenco delle proprieta\' del cliente autenticato, con stato attivo/inattivo.',
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'get_property_performance',
    description: "Performance di una specifica proprieta' del cliente (conversazioni gestite, escalation, lead generati se applicabile).",
    input_schema: {
      type: 'object',
      properties: {
        property_name: { type: 'string', description: "Nome della proprieta', cosi' come lo scrive il cliente in chat." },
      },
      required: ['property_name'],
    },
  },
  {
    name: 'get_my_lead_status',
    description: "Stato dell'eventuale pratica di onboarding/lead del cliente stesso presso VirtualTwin.",
    input_schema: { type: 'object', properties: {} },
  },
];

const clientToolHandlers = {
  async get_my_properties(input, context) {
    const db = supabaseForSession(context.userJwt);
    // Anche senza filtro esplicito, RLS impedisce che tornino righe di altri account.
    // Il filtro esplicito qui sotto e' comunque la prima linea di difesa (difesa in profondita').
    const { data, error } = await db
      .from('properties')
      .select('id, name, address, active')
      .eq('account_id', context.accountId);
    if (error) throw error;
    return data;
  },

  async get_property_performance(input, context) {
    const db = supabaseForSession(context.userJwt);
    const { data: property, error: propErr } = await db
      .from('properties')
      .select('id, name')
      .eq('account_id', context.accountId) // <-- sempre da context, mai da input del modello
      .ilike('name', `%${input.property_name}%`)
      .maybeSingle();

    if (propErr) throw propErr;
    if (!property) return { error: 'Proprieta\' non trovata tra le tue.' };

    const { count: conversationCount } = await db
      .from('conversation_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('property_id', property.id);

    const { count: escalationCount } = await db
      .from('conversation_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('property_id', property.id)
      .eq('human_handoff', true);

    return {
      property: property.name,
      conversazioni_gestite: conversationCount || 0,
      escalation_a_operatore: escalationCount || 0,
    };
  },

  async get_my_lead_status(input, context) {
    const db = supabaseForSession(context.userJwt);
    const { data, error } = await db
      .from('leads')
      .select('status, notes, created_at')
      .eq('account_id', context.accountId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data || { status: 'nessuna pratica trovata' };
  },
};

module.exports = { clientToolDefinitions, clientToolHandlers };
