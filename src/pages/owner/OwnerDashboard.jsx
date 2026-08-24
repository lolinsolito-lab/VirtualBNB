import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Euro, Calendar, CheckCircle, AlertCircle, Eye, ArrowLeft } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { useSearchParams, Link } from 'react-router-dom'

export default function OwnerDashboard() {
  const [property, setProperty] = useState(null)
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const previewOwnerId = searchParams.get('preview')
  const [isPreview, setIsPreview] = useState(false)
  const [ownerName, setOwnerName] = useState('')

  useEffect(() => {
    async function loadData() {
      const { data: authData } = await supabase.auth.getUser()
      if (!authData?.user) {
        setLoading(false)
        return
      }

      // Identify target user ID (Impersonation check)
      let targetUserId = authData.user.id

      if (previewOwnerId) {
        // Verify current user is Admin before allowing impersonation
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single()

        if (profile?.role === 'admin') {
          targetUserId = previewOwnerId
          setIsPreview(true)
          
          // Get the impersonated owner's name
          const { data: targetProfile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', previewOwnerId)
            .single()
            
          if (targetProfile) setOwnerName(targetProfile.full_name)
        }
      }

      // Fetch the target owner's property
      const { data: propData } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', targetUserId)
        .limit(1)
        .single()

      if (propData) {
        setProperty(propData)
        
        // Fetch the latest monthly report
        const { data: repData } = await supabase
          .from('monthly_reports')
          .select('*')
          .eq('property_id', propData.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()
          
        if (repData) setReport(repData)
      }
      
      setLoading(false)
    }

    loadData()
  }, [previewOwnerId])

  if (loading) return <div className="p-10 text-white font-sans">Caricamento dati dal database...</div>

  if (!property) {
    return (
      <div className="max-w-5xl mx-auto p-10 bg-dark-800 border border-dark-700 rounded-lg text-center">
        {isPreview && (
          <div className="mb-6 inline-flex items-center gap-2 bg-gold-500/20 text-gold-500 px-4 py-2 rounded-full font-sans text-[12px] uppercase tracking-wider">
            <Eye size={14} /> Modalità Anteprima: {ownerName}
          </div>
        )}
        <AlertCircle size={48} className="text-gold-500 mx-auto mb-4" />
        <h2 className="font-serif text-[24px] text-white mb-2">Nessun immobile assegnato</h2>
        <p className="font-sans text-[15px] text-dark-200 mb-6">
          L'amministrazione non ha ancora collegato un immobile a questo profilo.
        </p>
        {isPreview && (
          <Link to="/admin" className="inline-flex items-center gap-2 font-sans text-[13px] text-white bg-dark-700 px-4 py-2 hover:bg-dark-600 transition-colors rounded">
            <ArrowLeft size={16} /> Torna al CRM
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      {isPreview && (
        <div className="bg-gold-500 text-black px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
          <div className="flex items-center gap-2 font-sans text-[13px] font-medium uppercase tracking-wider">
            <Eye size={16} /> Modalità Anteprima: stai visualizzando come {ownerName}
          </div>
          <Link to="/admin" className="font-sans text-[12px] bg-black text-white px-4 py-1.5 hover:bg-dark-800 transition-colors">
            Chiudi Anteprima
          </Link>
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-[32px] font-light text-white mb-2">{property.title}</h1>
        <p className="font-sans text-[15px] text-dark-200 mb-10">{property.address} — {property.type}</p>

        {/* Highlight Card */}
        <div className="bg-gold-500 text-black p-8 md:p-10 rounded-lg mb-10 relative overflow-hidden" style={{ boxShadow: '0 20px 50px rgba(184,150,62,0.15)' }}>
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[12px] tracking-[0.2em] uppercase mb-2 opacity-80">Guadagno Netto Stimato {report ? `(${report.month_year})` : ''}</p>
              <p className="font-serif text-[48px] md:text-[64px] leading-none mb-2">
                € {report ? Number(report.net_payout).toLocaleString('it-IT', { minimumFractionDigits: 2 }) : '0,00'}
              </p>
              <p className="font-sans text-[14px] flex items-center gap-2">
                <CheckCircle size={16} /> {report?.status === 'paid' ? 'Bonifico inviato' : 'In attesa di calcolo fine mese'}
              </p>
            </div>
            {/* Tasto PDF nascosto temporaneamente:
            <button className="font-sans text-[13px] font-medium tracking-[0.1em] uppercase bg-black text-white px-6 py-3 hover:bg-dark-800 transition-colors self-start md:self-auto disabled:opacity-50">
              Scarica Report PDF
            </button>
            */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Calendar Real Occupancy */}
          <div className="bg-dark-800 border border-dark-700 p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-gold-500" size={24} />
              <h3 className="font-serif text-[20px] text-white">Occupazione</h3>
            </div>
            <div className="flex items-end justify-between mb-2">
              <span className="font-serif text-[32px] text-white">{report ? report.occupancy_rate : '--'}%</span>
              <span className="font-sans text-[14px] text-dark-200 mb-2">{report ? `Rendiconto ${report.month_year}` : 'Nessun dato'}</span>
            </div>
            <div className="w-full bg-dark-900 h-2 rounded-full overflow-hidden">
              <div className="bg-gold-500 h-full transition-all duration-1000" style={{ width: `${report ? report.occupancy_rate : 0}%` }} />
            </div>
            <p className="font-sans text-[13px] text-dark-200 mt-6">
              Dato aggiornato calcolato sulle notti prenotate e bloccate per questo mese.
            </p>
          </div>

          {/* Real Economics */}
          <div className="bg-dark-800 border border-dark-700 p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <Euro className="text-gold-500" size={24} />
              <h3 className="font-serif text-[20px] text-white">Spaccato Finanziario</h3>
            </div>
            {report ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-dark-700">
                  <span className="font-sans text-[14px] text-dark-200">Ricavi Lordi Prenotazioni</span>
                  <span className="font-serif text-[18px] text-white">€ {Number(report.gross_revenue).toLocaleString('it-IT')}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-dark-700">
                  <span className="font-sans text-[14px] text-dark-200">Spese Pulizia</span>
                  <span className="font-serif text-[18px] text-dark-100">€ {Number(report.cleaning_fees).toLocaleString('it-IT')}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-dark-700">
                  <span className="font-sans text-[14px] text-dark-200">Commissioni VirtualBNB</span>
                  <span className="font-serif text-[18px] text-red-400">- € {Number(report.virtualbnb_fees).toLocaleString('it-IT')}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-sans text-[14px] text-gold-500 uppercase tracking-wider">Netto al proprietario</span>
                  <span className="font-serif text-[22px] text-gold-500">€ {Number(report.net_payout).toLocaleString('it-IT')}</span>
                </div>
              </div>
            ) : (
              <p className="font-sans text-[14px] text-dark-200">Nessun rendiconto disponibile per questo mese.</p>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  )
}
