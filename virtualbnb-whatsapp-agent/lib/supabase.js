// lib/supabase.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY, // service key: il webhook gira server-side, ok bypassare RLS qui
);

module.exports = { supabase };
