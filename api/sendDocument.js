import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Usiamo il Service Role per bypassare RLS a livello server
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: missing token' })
  }

  const token = authHeader.replace('Bearer ', '')
  
  try {
    // 1. Verifica autenticazione e ruolo Admin
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' })
    }

    // 2. Estrazione payload
    const { documentName, recipientEmail, ownerProfileId } = req.body

    if (!documentName || !recipientEmail) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // 3. Download del documento privato da Supabase Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documenti-legali')
      .download(documentName)

    if (downloadError || !fileData) {
      console.error('Download error:', downloadError)
      return res.status(500).json({ error: 'Failed to download document from storage' })
    }

    // Convertiamo il Blob in un Buffer da inviare via Resend
    const buffer = Buffer.from(await fileData.arrayBuffer())

    // 4. Invio email tramite Resend
    const subjectTitle = documentName.includes('Contratto') ? 'Contratto di Gestione'
                       : documentName.includes('Liberatoria') ? 'Liberatoria Marketing'
                       : 'Modello Finanziario';

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: 'VirtualBNB Admin <noreply@virtualbnb.it>',
      to: [recipientEmail],
      subject: `VirtualBNB - Il tuo ${subjectTitle}`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #111;">
          <h2 style="color: #b8963e;">Documento VirtualBNB</h2>
          <p>Ciao,</p>
          <p>In allegato trovi il file: <strong>${documentName}</strong>.</p>
          <p>Restiamo a disposizione per qualsiasi chiarimento.</p>
          <br/>
          <p style="font-size: 12px; color: #666;">
            Inviato da ${profile.full_name} (VirtualBNB Team)
          </p>
        </div>
      `,
      attachments: [
        {
          filename: documentName,
          content: buffer
        }
      ]
    })

    if (resendError || !resendData) {
      console.error('Resend error:', resendError)
      return res.status(500).json({ error: 'Failed to send email via Resend' })
    }

    // 5. SCRITTURA LOG (Avviene SOLO SE Resend ha avuto successo)
    const logEntry = {
      destinatario_email: recipientEmail,
      documento_nome: documentName,
      inviato_da: user.id,
      resend_message_id: resendData.id,
      // Se non è stato selezionato un proprietario registrato, owner_profile_id resta null (es. per un lead esterno)
      ...(ownerProfileId && { owner_profile_id: ownerProfileId })
    }

    const { error: dbError } = await supabase
      .from('document_sends_log')
      .insert([logEntry])

    if (dbError) {
      // Caso critico: l'email è partita ma il DB ha fallito. Non dovrebbe succedere grazie alla validazione rigorosa a monte.
      console.error('CRITICAL: Failed to write to document_sends_log:', dbError)
      return res.status(500).json({ 
        error: 'Email sent successfully, but failed to log in database. Warning: log mismatch.',
        resend_id: resendData.id 
      })
    }

    // 6. Ritorno successo
    return res.status(200).json({ success: true, resendId: resendData.id })

  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
