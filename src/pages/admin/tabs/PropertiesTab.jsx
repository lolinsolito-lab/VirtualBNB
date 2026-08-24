import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../../lib/supabaseClient'

export default function PropertiesTab() {
  const [properties, setProperties] = useState([])
  const [owners, setOwners] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Form state
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [type, setType] = useState('Bilocale')
  const [ownerId, setOwnerId] = useState('')
  const [connections, setConnections] = useState({ lodgify_property_id: null, pricelabs_connected: false })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    
    // Load properties with owner details
    const { data: props } = await supabase
      .from('properties')
      .select(`
        *,
        profiles ( full_name )
      `)
      .order('created_at', { ascending: false })
      
    // Load owners for the dropdown
    const { data: ownerData } = await supabase
      .from('profiles')
      .select('id, full_name')
      .eq('role', 'owner')
      .order('full_name')

    setProperties(props || [])
    setOwners(ownerData || [])
    if (ownerData && ownerData.length > 0) {
      setOwnerId(ownerData[0].id)
    }
    setLoading(false)
  }

  const handleAddProperty = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const { error } = await supabase
      .from('properties')
      .insert([
        {
          owner_id: ownerId,
          title,
          address,
          type,
          lodgify_property_id: connections.lodgify_property_id,
          pricelabs_connected: connections.pricelabs_connected
        }
      ])

    if (error) {
      setMessage({ type: 'error', text: 'Errore durante il salvataggio: ' + error.message })
    } else {
      setMessage({ type: 'success', text: 'Immobile salvato con successo!' })
      setTitle('')
      setAddress('')
      setConnections({ lodgify_property_id: null, pricelabs_connected: false })
      loadData()
    }
    setSaving(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      
      {/* Add Property Form */}
      <div className="bg-dark-800 border border-dark-700 p-8 rounded-lg mb-10">
        <h2 className="font-serif text-[24px] text-white mb-6">Aggiungi nuovo Immobile</h2>
        
        <form onSubmit={handleAddProperty} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Nome Immobile</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[14px] p-3 outline-none"
                placeholder="Es. Attico Navigli"
                required
              />
            </div>
            <div>
              <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Proprietario Assegnato</label>
              <select 
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[14px] p-3 outline-none appearance-none"
                required
              >
                {owners.map(o => (
                  <option key={o.id} value={o.id}>{o.full_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Indirizzo Fisico</label>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[14px] p-3 outline-none"
                placeholder="Via Roma 10, Milano"
                required
              />
            </div>
            <div>
              <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Tipologia</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[14px] p-3 outline-none appearance-none"
              >
                <option value="Monolocale">Monolocale</option>
                <option value="Bilocale">Bilocale</option>
                <option value="Trilocale">Trilocale</option>
                <option value="Attico">Attico</option>
                <option value="Villa">Villa</option>
              </select>
            </div>
          </div>
          
          <CollegamentiSection formData={connections} setFormData={setConnections} />
          
          <div className="pt-4">
            <button 
              type="submit"
              disabled={saving || owners.length === 0}
              className="bg-gold-500 text-black font-sans text-[13px] tracking-[0.1em] uppercase font-medium px-8 py-3.5 hover:bg-gold-400 transition-colors disabled:opacity-50"
            >
              {saving ? 'Salvataggio...' : 'Crea Immobile'}
            </button>
            {owners.length === 0 && <p className="text-red-400 text-[12px] mt-2 mt-2">Devi prima invitare un proprietario.</p>}
          </div>
        </form>

        {message && (
          <div className={`mt-4 p-4 text-[13px] border ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
            {message.text}
          </div>
        )}
      </div>

      {/* Properties Table */}
      <h2 className="font-serif text-[24px] font-light text-white mb-6">Portafoglio Immobili</h2>
      <div className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-dark-200">Caricamento...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-[14px]">
              <thead className="bg-dark-900/50 text-dark-200 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4 border-b border-dark-700">Immobile</th>
                  <th className="p-4 border-b border-dark-700">Proprietario</th>
                  <th className="p-4 border-b border-dark-700">Indirizzo</th>
                  <th className="p-4 border-b border-dark-700 text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {properties.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-dark-200">Nessun immobile gestito al momento.</td>
                  </tr>
                ) : (
                  properties.map((p) => (
                    <tr key={p.id} className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors">
                      <td className="p-4">
                        <span className="block font-medium">{p.title}</span>
                        <span className="text-[12px] text-dark-300">{p.type}</span>
                      </td>
                      <td className="p-4 text-gold-500">{p.profiles?.full_name}</td>
                      <td className="p-4 text-dark-200">{p.address}</td>
                      <td className="p-4 text-right">
                        <button className="text-[12px] text-dark-300 hover:text-white uppercase tracking-widest font-mono">
                          Modifica
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function CollegamentiSection({ formData, setFormData }) {
  return (
    <div className="border-t border-dark-700 pt-6 mt-6">
      <h4 className="font-serif text-[18px] text-white mb-1">Collegamenti Esterni</h4>
      <p className="font-sans text-dark-200 text-[13px] mb-5">
        Compila solo dopo aver creato l'immobile anche su Lodgify — l'ID lo trovi nella sua scheda proprietà lì.
      </p>

      <div className="mb-5">
        <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">
          ID Proprietà Lodgify (opzionale)
        </label>
        <input
          type="text"
          value={formData.lodgify_property_id || ''}
          onChange={(e) => setFormData({ ...formData, lodgify_property_id: e.target.value || null })}
          placeholder="Es. 123456"
          className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[14px] p-3 outline-none"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.pricelabs_connected || false}
          onChange={(e) => setFormData({ ...formData, pricelabs_connected: e.target.checked })}
          className="w-4 h-4 accent-gold-500"
        />
        <span className="font-sans text-dark-100 text-[14px]">Pricing dinamico attivo su PriceLabs per questo immobile</span>
      </label>
    </div>
  )
}
