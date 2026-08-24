const { createClient } = require('@supabase/supabase-js');

/**
 * Verifica il token JWT e assicura che l'utente abbia il ruolo 'admin'.
 * Lancia un'eccezione in caso di fallimento.
 * Restituisce l'oggetto utente se autorizzato.
 */
async function requireAdminAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Non autorizzato: token mancante.');
  }

  const jwt = authHeader.split(' ')[1];
  if (jwt.length > 2048) throw new Error('Token non valido.');

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);
  
  if (authError || !user) throw new Error('Token non valido.');

  // Verifica ruolo admin
  const adminDb = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: profile } = await adminDb.from('profiles').select('role').eq('id', user.id).single();
  
  if (profile?.role !== 'admin') {
    throw new Error('Accesso negato. Richiesto ruolo admin.');
  }
  
  return user;
}

module.exports = { requireAdminAuth };
