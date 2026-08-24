import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to } = req.body;

    if (!to) {
      return res.status(400).json({ error: 'Missing "to" address' });
    }

    const data = await resend.emails.send({
      from: 'VirtualBNB Admin <noreply@virtualbnb.it>',
      to: [to],
      subject: 'Test Email dal Server Vercel di VirtualBNB 🚀',
      html: '<strong>Successo!</strong> Il tuo dominio Resend è configurato e funzionante.',
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
