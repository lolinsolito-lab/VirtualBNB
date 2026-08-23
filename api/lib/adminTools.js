// api/lib/adminTools.js
// Tool per l'Admin Agent — accesso totale al DB tramite service_role key.
// Questi tool interrogano le nostre tabelle reali: profiles, properties, monthly_reports, leads.

const { createClient } = require('@supabase/supabase-js');

function getAdminClient() {
  return createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

// ─── Definizioni Tool per Claude ────────────────────────────────────────────

const adminToolDefinitions = [
  {
    name: 'get_dashboard_stats',
    description: 'Restituisce le statistiche generali del portafoglio: numero proprietari, immobili attivi, fatturato totale, occupazione media e numero lead ricevuti.',
    input_schema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_all_leads',
    description: 'Restituisce la lista dei lead (richieste di contatto) ricevuti dalla landing page. Filtrabile per stato.',
    input_schema: {
      type: 'object',
      properties: {
        status: { type: 'string', description: 'Filtra per stato: new, in_analysis, contacted, rejected, closed. Lascia vuoto per tutti.' },
        limit: { type: 'number', description: 'Numero massimo di risultati (default 10).' },
      },
      required: [],
    },
  },
  {
    name: 'get_all_owners',
    description: 'Restituisce la lista completa dei proprietari (clienti) registrati nella piattaforma.',
    input_schema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_all_properties',
    description: 'Restituisce il portafoglio immobili completo con il nome del proprietario associato.',
    input_schema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_finances_summary',
    description: 'Restituisce il riepilogo finanziario: totale ricavi lordi, commissioni VirtualBNB incassate, netto pagato ai proprietari. Filtrabile per mese.',
    input_schema: {
      type: 'object',
      properties: {
        month_year: { type: 'string', description: 'Mese nel formato YYYY-MM (es. 2026-07). Lascia vuoto per tutti i mesi.' },
      },
      required: [],
    },
  },
  {
    name: 'get_property_report',
    description: 'Restituisce i dettagli di un immobile specifico e i suoi ultimi rendiconti mensili.',
    input_schema: {
      type: 'object',
      properties: {
        property_title: { type: 'string', description: 'Nome o parte del nome dell\'immobile da cercare.' },
      },
      required: ['property_title'],
    },
  },
  {
    name: 'update_lead_status',
    description: 'Aggiorna lo stato di un lead. Utile per marcare un contatto come "contacted" o "closed".',
    input_schema: {
      type: 'object',
      properties: {
        lead_id: { type: 'string', description: 'UUID del lead da aggiornare.' },
        status: { type: 'string', description: 'Nuovo stato: new, in_analysis, contacted, rejected, closed.' },
      },
      required: ['lead_id', 'status'],
    },
  },
];

// ─── Handler Tool ─────────────────────────────────────────────────────────────

const adminToolHandlers = {
  async get_dashboard_stats(_input, _context) {
    const db = getAdminClient();
    const [{ count: ownersCount }, { count: propsCount }, { data: reports }, { count: leadsCount }] = await Promise.all([
      db.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'owner'),
      db.from('properties').select('*', { count: 'exact', head: true }),
      db.from('monthly_reports').select('gross_revenue, virtualbnb_fees, net_payout, occupancy_rate'),
      db.from('leads').select('*', { count: 'exact', head: true }),
    ]);
    const totalRevenue = reports?.reduce((a, r) => a + Number(r.gross_revenue), 0) || 0;
    const totalFees = reports?.reduce((a, r) => a + Number(r.virtualbnb_fees), 0) || 0;
    const avgOccupancy = reports?.length ? Math.round(reports.reduce((a, r) => a + (r.occupancy_rate || 0), 0) / reports.length) : 0;
    return { owners: ownersCount, properties: propsCount, leads: leadsCount, total_gross_revenue: totalRevenue, total_virtualbnb_fees: totalFees, avg_occupancy_percent: avgOccupancy };
  },

  async get_all_leads({ status, limit = 10 }, _context) {
    const db = getAdminClient();
    let query = db.from('leads').select('*').order('created_at', { ascending: false }).limit(limit);
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async get_all_owners(_input, _context) {
    const db = getAdminClient();
    const { data, error } = await db.from('profiles').select('id, full_name, phone, created_at').eq('role', 'owner').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async get_all_properties(_input, _context) {
    const db = getAdminClient();
    const { data, error } = await db.from('properties').select('id, title, address, type, created_at, profiles(full_name)').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async get_finances_summary({ month_year }, _context) {
    const db = getAdminClient();
    let query = db.from('monthly_reports').select('month_year, gross_revenue, cleaning_fees, virtualbnb_fees, net_payout, occupancy_rate, status, properties(title)');
    if (month_year) query = query.eq('month_year', month_year);
    const { data, error } = await query.order('month_year', { ascending: false });
    if (error) throw error;
    const totals = {
      records: data?.length || 0,
      total_gross: data?.reduce((a, r) => a + Number(r.gross_revenue), 0),
      total_fees: data?.reduce((a, r) => a + Number(r.virtualbnb_fees), 0),
      total_net: data?.reduce((a, r) => a + Number(r.net_payout), 0),
      breakdown: data,
    };
    return totals;
  },

  async get_property_report({ property_title }, _context) {
    const db = getAdminClient();
    const { data: props } = await db.from('properties').select('*, profiles(full_name)').ilike('title', `%${property_title}%`).limit(3);
    if (!props || props.length === 0) return { error: `Nessun immobile trovato con il nome "${property_title}"` };
    const property = props[0];
    const { data: reports } = await db.from('monthly_reports').select('*').eq('property_id', property.id).order('month_year', { ascending: false }).limit(6);
    return { property, recent_reports: reports };
  },

  async update_lead_status({ lead_id, status }, _context) {
    const db = getAdminClient();
    const { data, error } = await db.from('leads').update({ status }).eq('id', lead_id).select().single();
    if (error) throw error;
    return { success: true, updated_lead: data };
  },
};

module.exports = { adminToolDefinitions, adminToolHandlers };
