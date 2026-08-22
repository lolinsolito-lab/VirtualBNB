import { createClient } from '@supabase/supabase-js'

// Vercel Serverless Function for inviting a user
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, fullName, phone } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  // Use the hidden Service Role Key (NOT VITE_ prefixed) to bypass RLS and admin restrictions
  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Server configuration error: missing Supabase keys.' })
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    // Invite the user by email
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: {
        full_name: fullName || '',
        phone: phone || ''
      }
    })

    if (error) throw error

    return res.status(200).json({ success: true, user: data.user })
  } catch (err) {
    console.error('Error inviting user:', err)
    return res.status(400).json({ error: err.message })
  }
}
