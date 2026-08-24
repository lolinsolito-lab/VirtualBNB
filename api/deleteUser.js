import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // Solo chiamate POST ammesse
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { userId } = req.body

  if (!userId) {
    return res.status(400).json({ error: 'User ID mancante' })
  }

  // Verifica che le variabili d'ambiente esistano
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Configurazione server mancante' })
  }

  // Inizializza il client admin di Supabase (che bypassa le RLS e ha pieni permessi)
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    // Nota: Grazie alla FOREIGN KEY con ON DELETE CASCADE,
    // eliminare l'utente da auth.users eliminerà automaticamente
    // anche la riga in 'profiles', 'properties' e 'monthly_reports'.
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (error) {
      console.error("Errore durante l'eliminazione dell'utente:", error)
      return res.status(400).json({ error: error.message })
    }

    return res.status(200).json({ success: true, message: 'Utente e dati associati eliminati con successo' })
  } catch (err) {
    console.error('Eccezione durante deleteUser:', err)
    return res.status(500).json({ error: 'Errore interno del server' })
  }
}
