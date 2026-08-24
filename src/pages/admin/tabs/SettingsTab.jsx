import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { Save, User, Building2, Phone, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SettingsTab() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    ragione_sociale: '',
    p_iva: '',
    sdi_pec: '',
    indirizzo_fatturazione: '',
    iban: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) {
        setProfile(data)
        setFormData({
          full_name: data.full_name || '',
          phone: data.phone || '',
          ragione_sociale: data.ragione_sociale || '',
          p_iva: data.p_iva || '',
          sdi_pec: data.sdi_pec || '',
          indirizzo_fatturazione: data.indirizzo_fatturazione || '',
          iban: data.iban || ''
        })
      }
    }
    setLoading(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ text: '', type: '' })

    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          ragione_sociale: formData.ragione_sociale,
          p_iva: formData.p_iva,
          sdi_pec: formData.sdi_pec,
          indirizzo_fatturazione: formData.indirizzo_fatturazione,
          iban: formData.iban
        })
        .eq('id', user.id)

      if (error) throw error
      setMessage({ text: 'Impostazioni salvate con successo!', type: 'success' })
    } catch (err) {
      setMessage({ text: 'Errore durante il salvataggio: ' + err.message, type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-dark-200">Caricamento impostazioni...</div>

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-[28px] text-white">Impostazioni Agenzia</h1>
        <p className="font-sans text-[14px] text-dark-200 mt-2">
          Gestisci i dati della tua attività. Questi dati potrebbero essere utilizzati nei rendiconti e nelle fatture.
        </p>
      </div>

      {message.text && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className={`p-4 mb-6 border rounded-lg text-[14px] ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}
        >
          {message.text}
        </motion.div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
          <h2 className="font-serif text-[18px] text-gold-500 mb-6 flex items-center gap-2">
            <User size={18} /> Profilo Personale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-dark-200 mb-2">Nome Completo (Admin)</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                className="w-full bg-dark-900 border border-dark-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-dark-200 mb-2">Telefono</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-dark-900 border border-dark-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
          <h2 className="font-serif text-[18px] text-gold-500 mb-6 flex items-center gap-2">
            <Building2 size={18} /> Dati Aziendali e Fatturazione
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[11px] uppercase tracking-widest text-dark-200 mb-2">Ragione Sociale / Nome</label>
              <input
                type="text"
                value={formData.ragione_sociale}
                onChange={(e) => setFormData({...formData, ragione_sociale: e.target.value})}
                className="w-full bg-dark-900 border border-dark-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-dark-200 mb-2">Partita IVA / Codice Fiscale</label>
              <input
                type="text"
                value={formData.p_iva}
                onChange={(e) => setFormData({...formData, p_iva: e.target.value})}
                className="w-full bg-dark-900 border border-dark-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-dark-200 mb-2">Codice Destinatario (SDI) / PEC</label>
              <input
                type="text"
                value={formData.sdi_pec}
                onChange={(e) => setFormData({...formData, sdi_pec: e.target.value})}
                className="w-full bg-dark-900 border border-dark-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] uppercase tracking-widest text-dark-200 mb-2">Indirizzo di Fatturazione</label>
              <input
                type="text"
                value={formData.indirizzo_fatturazione}
                onChange={(e) => setFormData({...formData, indirizzo_fatturazione: e.target.value})}
                className="w-full bg-dark-900 border border-dark-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] uppercase tracking-widest text-dark-200 mb-2">IBAN Aziendale</label>
              <input
                type="text"
                value={formData.iban}
                onChange={(e) => setFormData({...formData, iban: e.target.value})}
                className="w-full bg-dark-900 border border-dark-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-500 font-mono tracking-widest transition-colors"
                placeholder="IT00..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-black px-6 py-3 rounded-lg font-sans font-medium text-[14px] tracking-wide transition-all disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? 'Salvataggio...' : 'Salva Impostazioni'}
          </button>
        </div>
      </form>
    </div>
  )
}
