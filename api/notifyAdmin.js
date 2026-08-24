import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { ownerName, ownerEmail, oldIban, newIban } = req.body

  if (!ownerName || !newIban) {
    return res.status(400).json({ error: 'Dati mancanti' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: missing API keys.' })
  }

  try {
    const { error: resendError } = await resend.emails.send({
      from: 'VirtualBNB System <noreply@virtualbnb.it>',
      to: ['admin@virtualbnb.it'], // Notifica all'amministratore (in futuro può essere un array dinamico)
      subject: `🚨 Modifica IBAN da parte di ${ownerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; background-color: #111111; border: 1px solid #333333; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1a1a1a; padding: 30px; text-align: center; border-bottom: 1px solid #333333;">
            <h1 style="color: #ffffff; font-family: Georgia, serif; font-size: 24px; letter-spacing: 2px; margin: 0;">VIRTUAL<span style="color: #b8963e;">BNB</span></h1>
          </div>
          <div style="padding: 40px 30px; color: #e5e5e5; line-height: 1.6;">
            <h2 style="color: #ff4444; margin-top: 0;">Avviso Modifica IBAN</h2>
            <p style="font-size: 16px;">Il proprietario <strong>${ownerName}</strong> (${ownerEmail}) ha appena modificato le proprie coordinate bancarie nel Portale.</p>
            
            <div style="background-color: #2a2a2a; padding: 20px; border-radius: 4px; margin: 20px 0;">
              <p style="margin: 0; color: #a3a3a3; font-size: 14px;">Vecchio IBAN:</p>
              <p style="margin: 5px 0 15px 0; font-family: monospace; font-size: 16px; color: #777777;">${oldIban || 'Nessuno'}</p>
              
              <p style="margin: 0; color: #a3a3a3; font-size: 14px;"><strong>Nuovo IBAN:</strong></p>
              <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 16px; color: #b8963e; font-weight: bold;">${newIban}</p>
            </div>

            <p style="font-size: 15px; color: #a3a3a3;">
              È consigliabile verificare questa modifica per evitare errori nei bonifici dei futuri rendiconti.
            </p>
          </div>
        </div>
      `
    })

    if (resendError) {
      console.error('Error sending email via Resend:', resendError)
      return res.status(500).json({ error: 'Fallito invio notifica email.' })
    }

    return res.status(200).json({ success: true, message: 'Notifica inviata con successo' })
  } catch (err) {
    console.error('Error in notifyAdmin:', err)
    return res.status(400).json({ error: err.message })
  }
}
