import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Edit2, CheckCircle, XCircle } from 'lucide-react'
import { supabase } from '../../../lib/supabaseClient'

export default function ExperiencesTab() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExp, setEditingExp] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    location_tag: '',
    price_display: '',
    discount_percentage: '',
    voucher_code: '',
    contact_link: '',
    status: 'inactive'
  })

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setExperiences(data)
    }
    setLoading(false)
  }

  const handleToggleStatus = async (exp) => {
    const newStatus = exp.status === 'active' ? 'inactive' : 'active'
    const { error } = await supabase
      .from('experiences')
      .update({ status: newStatus })
      .eq('id', exp.id)

    if (!error) {
      setExperiences(experiences.map(e => e.id === exp.id ? { ...e, status: newStatus } : e))
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Sicuro di voler eliminare questa esperienza?')) return
    const { error } = await supabase.from('experiences').delete().eq('id', id)
    if (!error) {
      setExperiences(experiences.filter(e => e.id !== id))
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const payload = {
      ...formData,
      discount_percentage: formData.discount_percentage ? parseInt(formData.discount_percentage) : null
    }

    if (editingExp) {
      const { data, error } = await supabase
        .from('experiences')
        .update(payload)
        .eq('id', editingExp.id)
        .select()
      
      if (!error && data) {
        setExperiences(experiences.map(exp => exp.id === editingExp.id ? data[0] : exp))
        setIsModalOpen(false)
      }
    } else {
      const { data, error } = await supabase
        .from('experiences')
        .insert([payload])
        .select()
      
      if (!error && data) {
        setExperiences([data[0], ...experiences])
        setIsModalOpen(false)
      }
    }
  }

  const openNewModal = () => {
    setEditingExp(null)
    setFormData({
      title: '', description: '', image_url: '', location_tag: '',
      price_display: '', discount_percentage: '', voucher_code: '',
      contact_link: '', status: 'inactive'
    })
    setIsModalOpen(true)
  }

  const openEditModal = (exp) => {
    setEditingExp(exp)
    setFormData({
      title: exp.title || '',
      description: exp.description || '',
      image_url: exp.image_url || '',
      location_tag: exp.location_tag || '',
      price_display: exp.price_display || '',
      discount_percentage: exp.discount_percentage || '',
      voucher_code: exp.voucher_code || '',
      contact_link: exp.contact_link || '',
      status: exp.status || 'inactive'
    })
    setIsModalOpen(true)
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-[32px] text-white mb-2">Esperienze (B2C)</h1>
          <p className="font-sans text-[14px] text-dark-200">
            Gestisci i pacchetti, i voucher e abilita le esperienze sulla Vetrina Ospiti.
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center gap-2 bg-gold-500 text-black px-4 py-2 rounded-lg font-sans font-medium hover:bg-gold-400 transition-colors"
        >
          <Plus size={18} />
          <span>Nuova Esperienza</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-dark-300 font-sans animate-pulse">Caricamento esperienze...</div>
      ) : experiences.length === 0 ? (
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-10 text-center">
          <p className="font-sans text-dark-200 mb-4">Nessuna esperienza configurata.</p>
          <button onClick={openNewModal} className="text-gold-500 hover:text-gold-400 font-medium">
            + Crea la tua prima esperienza
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {experiences.map(exp => (
            <div key={exp.id} className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden flex flex-col sm:flex-row">
              <div className="w-full sm:w-48 h-48 sm:h-auto bg-dark-700 relative">
                {exp.image_url ? (
                  <img src={exp.image_url} alt={exp.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-dark-300">No Img</div>
                )}
                <div className={`absolute top-2 left-2 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${exp.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                  {exp.status === 'active' ? 'Online' : 'Nascosta'}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-[20px] text-white">{exp.title}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(exp)} className="text-dark-300 hover:text-white transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(exp.id)} className="text-dark-300 hover:text-red-400 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <p className="font-sans text-[13px] text-dark-200 line-clamp-2 mb-4">
                  {exp.description}
                </p>
                
                <div className="mt-auto flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2 text-[12px] font-mono text-dark-300">
                    {exp.location_tag && <span className="bg-dark-700 px-2 py-1 rounded">📍 {exp.location_tag}</span>}
                    {exp.price_display && <span className="bg-dark-700 px-2 py-1 rounded">💶 {exp.price_display}</span>}
                    {exp.voucher_code && <span className="bg-gold-500/10 text-gold-500 border border-gold-500/20 px-2 py-1 rounded">🎟️ {exp.voucher_code} ({exp.discount_percentage}%)</span>}
                  </div>
                  
                  <button 
                    onClick={() => handleToggleStatus(exp)}
                    className={`mt-4 py-2 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 ${
                      exp.status === 'active' 
                        ? 'bg-dark-700 text-dark-200 hover:bg-dark-600' 
                        : 'bg-gold-500 text-black hover:bg-gold-400'
                    }`}
                  >
                    {exp.status === 'active' ? (
                      <><XCircle size={16} /> Disabilita dalla Vetrina</>
                    ) : (
                      <><CheckCircle size={16} /> Attiva sulla Vetrina</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 border border-dark-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8"
          >
            <h2 className="font-serif text-[24px] text-white mb-6">
              {editingExp ? 'Modifica Esperienza' : 'Nuova Esperienza'}
            </h2>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-dark-300 uppercase tracking-wider mb-2">Titolo *</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] text-dark-300 uppercase tracking-wider mb-2">Posizione / Immobile</label>
                  <input type="text" placeholder="es. Villa Gioia o Lago di Como" value={formData.location_tag} onChange={e => setFormData({...formData, location_tag: e.target.value})} className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-[12px] text-dark-300 uppercase tracking-wider mb-2">Descrizione *</label>
                <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
              </div>
              
              <div>
                <label className="block text-[12px] text-dark-300 uppercase tracking-wider mb-2">URL Immagine</label>
                <input type="url" placeholder="https://..." value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-dark-700 pt-4 mt-4">
                <div>
                  <label className="block text-[12px] text-dark-300 uppercase tracking-wider mb-2">Prezzo Display</label>
                  <input type="text" placeholder="es. Da 150€" value={formData.price_display} onChange={e => setFormData({...formData, price_display: e.target.value})} className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] text-dark-300 uppercase tracking-wider mb-2">Codice Voucher</label>
                  <input type="text" placeholder="es. VBNB10" value={formData.voucher_code} onChange={e => setFormData({...formData, voucher_code: e.target.value})} className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] text-dark-300 uppercase tracking-wider mb-2">% Sconto</label>
                  <input type="number" placeholder="es. 10" value={formData.discount_percentage} onChange={e => setFormData({...formData, discount_percentage: e.target.value})} className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-[12px] text-dark-300 uppercase tracking-wider mb-2">Link Contatto / Fornitore *</label>
                <input required type="text" placeholder="es. https://wa.me/39... o URL fornitore" value={formData.contact_link} onChange={e => setFormData({...formData, contact_link: e.target.value})} className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
                <p className="text-[11px] text-dark-400 mt-1">L'utente verrà rimandato qui al click su "Prenota"</p>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-dark-700">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-dark-200 hover:text-white transition-colors">Annulla</button>
                <button type="submit" className="bg-gold-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-gold-400 transition-colors">Salva Esperienza</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
