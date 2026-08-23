// api/lib/ownerTools.js
// Tool per l'Owner Agent — accesso SOLO agli immobili e report del proprietario autenticato.
// Il context.ownerId viene iniettato dal server, MAI dalla chat (sicurezza strutturale).

const { createClient } = require('@supabase/supabase-js');

function getAnonClient() {
  return createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
}

// ─── Definizioni Tool per Claude ────────────────────────────────────────────

const ownerToolDefinitions = [
  {
    name: 'get_my_properties',
    description: 'Restituisce la lista degli immobili del proprietario autenticato.',
    input_schema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_my_latest_report',
    description: 'Restituisce il rendiconto mensile più recente del proprietario: ricavi lordi, spese, commissioni, netto e tasso di occupazione.',
    input_schema: {
      type: 'object',
      properties: {
        month_year: { type: 'string', description: 'Mese specifico nel formato YYYY-MM. Lascia vuoto per il più recente.' },
      },
      required: [],
    },
  },
  {
    name: 'get_my_report_history',
    description: 'Restituisce la storia dei rendiconti degli ultimi 12 mesi del proprietario.',
    input_schema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_my_earnings_summary',
    description: 'Calcola il guadagno totale del proprietario: somma netta di tutti i rendiconti disponibili.',
    input_schema: { type: 'object', properties: {}, required: [] },
  },
];

// ─── Handler Tool ─────────────────────────────────────────────────────────────

const ownerToolHandlers = {
  async get_my_properties(_input, context) {
    const db = getAnonClient();
    const { data, error } = await db.from('properties').select('id, title, address, type, created_at').eq('owner_id', context.ownerId);
    if (error) throw error;
    return data;
  },

  async get_my_latest_report({ month_year }, context) {
    const db = getAnonClient();
    // Get owner's property first
    const { data: props } = await db.from('properties').select('id, title').eq('owner_id', context.ownerId).limit(1).single();
    if (!props) return { error: 'Nessun immobile assegnato al tuo account.' };

    let query = db.from('monthly_reports').select('*').eq('property_id', props.id).order('month_year', { ascending: false }).limit(1);
    if (month_year) query = db.from('monthly_reports').select('*').eq('property_id', props.id).eq('month_year', month_year);
    
    const { data: report, error } = await query.single();
    if (error || !report) return { property: props.title, error: 'Nessun rendiconto disponibile per il periodo richiesto.' };
    return { property: props.title, ...report };
  },

  async get_my_report_history(_input, context) {
    const db = getAnonClient();
    const { data: props } = await db.from('properties').select('id, title').eq('owner_id', context.ownerId).limit(1).single();
    if (!props) return { error: 'Nessun immobile assegnato.' };
    const { data: reports, error } = await db.from('monthly_reports').select('month_year, gross_revenue, virtualbnb_fees, net_payout, occupancy_rate, status').eq('property_id', props.id).order('month_year', { ascending: false }).limit(12);
    if (error) throw error;
    return { property: props.title, history: reports };
  },

  async get_my_earnings_summary(_input, context) {
    const db = getAnonClient();
    const { data: props } = await db.from('properties').select('id, title').eq('owner_id', context.ownerId).limit(1).single();
    if (!props) return { error: 'Nessun immobile assegnato.' };
    const { data: reports } = await db.from('monthly_reports').select('gross_revenue, net_payout, virtualbnb_fees').eq('property_id', props.id);
    const total_net = reports?.reduce((a, r) => a + Number(r.net_payout), 0) || 0;
    const total_gross = reports?.reduce((a, r) => a + Number(r.gross_revenue), 0) || 0;
    const total_fees = reports?.reduce((a, r) => a + Number(r.virtualbnb_fees), 0) || 0;
    return { property: props.title, months_tracked: reports?.length || 0, total_gross_revenue: total_gross, total_virtualbnb_fees: total_fees, total_net_earnings: total_net };
  },
};

module.exports = { ownerToolDefinitions, ownerToolHandlers };
