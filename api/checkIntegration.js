const { requireAdminAuth } = require('./lib/auth');

const CHECKERS = {
  anthropic: async () => {
    if (!process.env.ANTHROPIC_API_KEY) {
      return { connected: false, reason: 'ANTHROPIC_API_KEY non impostata' };
    }
    return { connected: true, note: 'Verifica solo presenza chiave, non validità (per non consumare token a ogni check)' };
  },

  lodgify: async () => {
    if (!process.env.LODGIFY_API_KEY) {
      return { connected: false, reason: 'LODGIFY_API_KEY non impostata' };
    }
    try {
      const res = await fetch('https://api.lodgify.com/v2/properties?page=1&size=1', {
        headers: { 'X-ApiKey': process.env.LODGIFY_API_KEY },
      });
      if (res.status === 401 || res.status === 403) {
        return { connected: false, reason: 'Chiave presente ma rifiutata da Lodgify (401/403)' };
      }
      return { connected: res.ok, reason: res.ok ? null : `Risposta inattesa: ${res.status}` };
    } catch (e) {
      return { connected: false, reason: `Errore di rete: ${e.message}` };
    }
  },

  pricelabs: async () => {
    if (!process.env.PRICELABS_API_KEY) {
      return { connected: false, reason: 'PRICELABS_API_KEY non impostata' };
    }
    try {
      const res = await fetch('https://api.pricelabs.co/v1/listings', {
        headers: { 'X-API-Key': process.env.PRICELABS_API_KEY },
      });
      if (res.status === 401 || res.status === 403) {
        return { connected: false, reason: 'Chiave presente ma rifiutata da PriceLabs (401/403)' };
      }
      return { connected: res.ok, reason: res.ok ? null : `Risposta inattesa: ${res.status} — verificare endpoint contro doc corrente` };
    } catch (e) {
      return { connected: false, reason: `Errore di rete: ${e.message}` };
    }
  },

  resend: async () => {
    if (!process.env.RESEND_API_KEY) {
      return { connected: false, reason: 'RESEND_API_KEY non impostata' };
    }
    try {
      const res = await fetch('https://api.resend.com/domains', {
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      });
      return { connected: res.ok, reason: res.ok ? null : `Risposta inattesa: ${res.status}` };
    } catch (e) {
      return { connected: false, reason: `Errore di rete: ${e.message}` };
    }
  },

  upstash: async () => {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return { connected: false, reason: 'UPSTASH_REDIS_REST_URL o TOKEN non impostate' };
    }
    try {
      const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/ping`, {
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
      });
      const body = await res.json().catch(() => null);
      return { connected: res.ok && body?.result === 'PONG', reason: res.ok ? null : `Risposta inattesa: ${res.status}` };
    } catch (e) {
      return { connected: false, reason: `Errore di rete: ${e.message}` };
    }
  },
};

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

  try {
    await requireAdminAuth(req);
  } catch (error) {
    return res.status(401).json({ error: error.message || 'Non autorizzato' });
  }

  const { service } = req.query;
  const checker = CHECKERS[service];

  if (!checker) {
    return res.status(400).json({ error: `Servizio sconosciuto: ${service}` });
  }

  const result = await checker();
  return res.status(200).json(result);
};
