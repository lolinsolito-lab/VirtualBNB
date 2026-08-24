import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Vercel Serverless Function for inviting a user
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, fullName, phone } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey || !process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: missing API keys.' })
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  try {
    // 1. Genera il link di invito di Supabase SENZA inviare l'email (bypass limitazioni)
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'invite',
      email: email,
      options: {
        redirectTo: 'https://virtualbnb.it/update-password',
        data: {
          full_name: fullName || '',
          phone: phone || ''
        }
      }
    })

    if (linkError) throw linkError

    const actionLink = linkData.properties.action_link

    // 2. Invia l'email meravigliosa tramite Resend
    const { error: resendError } = await resend.emails.send({
      from: 'VirtualBNB Admin <noreply@virtualbnb.it>',
      to: [email],
      subject: 'Benvenuto in VirtualBNB - Imposta il tuo account',
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; background-color: #111111; border: 1px solid #333333; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1a1a1a; padding: 30px; text-align: center; border-bottom: 1px solid #333333;">
            <h1 style="color: #ffffff; font-family: Georgia, serif; font-size: 24px; letter-spacing: 2px; margin: 0;">VIRTUAL<span style="color: #b8963e;">BNB</span></h1>
          </div>
          <div style="padding: 40px 30px; color: #e5e5e5; line-height: 1.6;">
            <p style="font-size: 16px; margin-top: 0;">Benvenuto in VirtualBNB, ${fullName || 'Proprietario'}!</p>
            <p style="font-size: 15px; color: #a3a3a3;">
              La Direzione ha appena attivato il tuo Portale Proprietario esclusivo. Da qui potrai monitorare in tempo reale i rendiconti, consultare i documenti legali e controllare le performance dei tuoi immobili.
            </p>
            <div style="text-align: center; margin: 40px 0;">
              <a href="${actionLink}" style="display: inline-block; background-color: #b8963e; color: #000000; text-decoration: none; padding: 14px 30px; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px;">
                Imposta Password e Accedi
              </a>
            </div>
            <p style="font-size: 13px; color: #777777; margin-bottom: 0;">
              Se il bottone non dovesse funzionare, copia e incolla questo link nel browser:<br>
              <a href="${actionLink}" style="color: #b8963e; word-break: break-all;">${actionLink}</a>
            </p>
          </div>
          <div style="background-color: #1a1a1a; padding: 20px; text-align: center; border-top: 1px solid #333333;">
            <p style="font-size: 12px; color: #666666; margin: 0;">
              &copy; VirtualBNB. Tutti i diritti riservati.<br>
              Questa è un'email di servizio, per favore non rispondere.
            </p>
          </div>
        </div>
      `
    })

    if (resendError) {
      console.error('Error sending email via Resend:', resendError)
      return res.status(500).json({ error: 'Utente creato ma fallito invio email.' })
    }

    return res.status(200).json({ success: true, message: 'Invito inviato con successo via Resend' })
  } catch (err) {
    console.error('Error in invite flow:', err)
    return res.status(400).json({ error: err.message })
  }
}
