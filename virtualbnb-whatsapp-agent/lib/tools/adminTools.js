// lib/tools/adminTools.js
// Tool per l'agente ADMIN — accesso cross-tenant completo.
// Usa il client Supabase con service_role key (bypassa RLS by design).
// Questo file va esposto SOLO dietro autenticazione interna (tu / il tuo team),
// mai raggiungibile dal frontend dei clienti.

const { supabase } = require('../supabase'); // service_role client

const adminToolDefinitions = [
  {
    name: 'get_account_overview',
    description: "Statistiche di un account cliente: piano, proprieta' attive, lead recenti, uso messaggi.",
    input_schema: {
      type: 'object',
      properties: {
        account_id: { type: 'string', description: "UUID dell'account. Se omesso, restituisce la lista di tutti gli account." },
      },
    },
  },
  {
    name: 'get_all_leads',
    description: 'Pipeline lead cross-account, con filtro opzionale per stato.',
    input_schema: {
      type: 'object',
      properties: {
        status: { type: 'string', description: "new | contacted | qualified | closed_won | closed_lost" },
        limit: { type: 'number', description: 'Default 50' },
      },
    },
  },
  {
    name: 'get_pending_escalations',
    description: 'Tutte le conversazioni in attesa di intervento umano (human_handoff = true), su tutti gli account.',
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'get_usage_stats',
    description: 'Volume messaggi e stima costo AI per account, periodo opzionale.',
    input_schema: {
      type: 'object',
      properties: {
        account_id: { type: 'string' },
        since: { type: 'string', description: 'ISO date, default ultimi 30 giorni' },
      },
    },
  },
];

const adminToolHandlers = {
  async get_account_overview(input) {
    if (input.account_id) {
      const { data: account } = await supabase.from('accounts').select('*').eq('id', input.account_id).single();
      const { data: properties } = await supabase.from('properties').select('id, name, active').eq('account_id', input.account_id);
      const { count: leadCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('account_id', input.account_id);
      return { account, properties, lead_count: leadCount };
    }
    const { data } = await supabase.from('accounts').select('*');
    return { accounts: data };
  },

  async get_all_leads(input) {
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(input.limit || 50);
    if (input.status) query = query.eq('status', input.status);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async get_pending_escalations() {
    const { data, error } = await supabase
      .from('conversation_sessions')
      .select('phone_number, account_id, flow_type, updated_at')
      .eq('human_handoff', true)
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async get_usage_stats(input) {
    const since = input.since || new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString();
    let query = supabase.from('messages_log').select('phone_number', { count: 'exact' }).gte('created_at', since);
    const { count, error } = await query;
    if (error) throw error;
    // Nota: per una stima costo reale, incrocia con i log di [AI usage] emessi da aiService.js
    // (es. instradandoli a una tabella ai_usage_log invece che solo a console.log — vedi report).
    return { total_messages: count, period_since: since };
  },
};

module.exports = { adminToolDefinitions, adminToolHandlers };
