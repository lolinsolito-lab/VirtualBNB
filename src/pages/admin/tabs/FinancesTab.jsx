import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../../lib/supabaseClient'

export default function FinancesTab() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Form
  const [propertyId, setPropertyId] = useState('')
  const [monthYear, setMonthYear] = useState('')
  const [grossRev, setGrossRev] = useState('')
  const [cleaning, setCleaning] = useState('')
  const [fees, setFees] = useState('')
  const [occupancy, setOccupancy] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    // Imposta mese corrente di default (es: 2026-07)
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    setMonthYear(`${yyyy}-${mm}`)
    
    loadProperties()
  }, [])

  async function loadProperties() {
    setLoading(true)
    const { data: props } = await supabase
      .from('properties')
      .select('id, title, profiles(full_name)')
      .order('title')

    setProperties(props || [])
    if (props && props.length > 0) {
      setPropertyId(props[0].id)
    }
    setLoading(false)
  }

  const handleSaveReport = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const { error } = await supabase
      .from('monthly_reports')
      .upsert([
        {
          property_id: propertyId,
          month_year: monthYear,
          gross_revenue: parseFloat(grossRev),
          cleaning_fees: parseFloat(cleaning),
          virtualbnb_fees: parseFloat(fees),
          occupancy_rate: parseInt(occupancy),
          status: 'pending'
        }
      ], { onConflict: 'property_id,month_year' })

    if (error) {
      setMessage({ type: 'error', text: 'Errore: ' + error.message })
    } else {
      setMessage({ type: 'success', text: 'Rendiconto salvato e visibile all\'owner!' })
      setGrossRev('')
      setCleaning('')
      setFees('')
      setOccupancy('')
    }
    setSaving(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      
      <div className="bg-dark-800 border border-dark-700 p-8 rounded-lg mb-10 max-w-4xl">
        <h2 className="font-serif text-[24px] text-white mb-2">Genera Rendiconto Mensile</h2>
        <p className="font-sans text-[13px] text-dark-200 mb-8">
          I dati inseriti qui appariranno in tempo reale sulla Dashboard del proprietario dell'immobile.
        </p>

        {properties.length === 0 && !loading ? (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]">
            Devi prima creare almeno un immobile nella tab "Immobili".
          </div>
        ) : (
          <form onSubmit={handleSaveReport} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Immobile</label>
                <select 
                  value={propertyId}
                  onChange={(e) => setPropertyId(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[14px] p-3 outline-none appearance-none"
                  required
                >
                  {properties.map(p => (
                    <option key={p.id} value={p.id}>{p.title} ({p.profiles?.full_name})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Mese di Riferimento (YYYY-MM)</label>
                <input 
                  type="text" 
                  value={monthYear}
                  onChange={(e) => setMonthYear(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[14px] p-3 outline-none"
                  placeholder="2026-07"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-dark-700">
              <div>
                <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Ricavi Lordi (€)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={grossRev}
                  onChange={(e) => setGrossRev(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[14px] p-3 outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Spese Pulizia (€)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={cleaning}
                  onChange={(e) => setCleaning(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[14px] p-3 outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Commissioni VBNB (€)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[14px] p-3 outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Occupazione (%)</label>
                <input 
                  type="number" 
                  step="1"
                  min="0"
                  max="100"
                  value={occupancy}
                  onChange={(e) => setOccupancy(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[14px] p-3 outline-none"
                  placeholder="Es. 85"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={saving}
                className="bg-gold-500 text-black font-sans text-[13px] tracking-[0.1em] uppercase font-medium px-8 py-3.5 hover:bg-gold-400 transition-colors disabled:opacity-50"
              >
                {saving ? 'Pubblicazione...' : 'Pubblica Rendiconto'}
              </button>
            </div>
          </form>
        )}

        {message && (
          <div className={`mt-6 p-4 text-[13px] border ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
            {message.text}
          </div>
        )}
      </div>

    </motion.div>
  )
}
