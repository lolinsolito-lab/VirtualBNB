import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Euro, Calendar, CheckCircle, AlertCircle, Eye, ArrowLeft, Wifi, FileText, MapPin, Trash2, Key } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { useSearchParams, Link } from 'react-router-dom'

const labelClass = 'font-mono text-[11px] tracking-[0.15em] uppercase text-dark-200'
const cardClass = 'bg-dark-800 border border-dark-700 p-8 rounded-lg'

function PendingBadge({ text = 'In attesa di collegamento' }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase text-dark-200/70 border border-dark-700 px-2.5 py-1">
      <span className="w-1.5 h-1.5 rounded-full bg-dark-200/40" />
      {text}
    </span>
  )
}

function ConnectedBadge({ text = 'Live' }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase text-gold-500 border border-gold-500/30 px-2.5 py-1">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold-500" />
      </span>
      {text}
    </span>
  )
}

const fmt = (n) => Number(n).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function SimpleCalendar({ bookings }) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const startOffset = firstDay === 0 ? 6 : firstDay - 1 // Lunedì come primo giorno
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: startOffset }, (_, i) => i)

  const isBooked = (day) => {
    const date = new Date(year, month, day, 12, 0, 0)
    return bookings.some(b => {
      const checkin = new Date(b.checkin)
      const checkout = new Date(b.checkout)
      checkin.setHours(0,0,0,0)
      checkout.setHours(23,59,59,999)
      return date >= checkin && date <= checkout
    })
  }

  const monthName = today.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })

  return (
    <div className="w-full bg-dark-900/50 p-6 rounded border border-dark-700">
      <div className="text-center font-serif text-[18px] text-white capitalize mb-6">{monthName}</div>
      <div className="grid grid-cols-7 gap-2 text-center mb-4">
        {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(d => (
          <div key={d} className="font-mono text-[10px] tracking-widest uppercase text-dark-200">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {blanks.map(b => <div key={`blank-${b}`} className="aspect-square" />)}
        {days.map(d => {
          const booked = isBooked(d)
          return (
            <div key={d} className={`aspect-square flex flex-col items-center justify-center rounded text-[14px] font-sans border transition-colors ${booked ? 'bg-gold-500/10 text-gold-400 border-gold-500/30' : 'bg-dark-800 text-white/60 border-dark-700 hover:border-gold-500/50'}`}>
              <span>{d}</span>
              {booked && <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1" />}
            </div>
          )
        })}
      </div>
      <div className="mt-6 flex items-center justify-center gap-4 font-sans text-[12px] text-dark-200">
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gold-500" /> Occupato</div>
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-dark-700" /> Libero</div>
      </div>
    </div>
  )
}

export default function OwnerDashboard() {
  const [allProperties, setAllProperties] = useState([])
  const [property, setProperty] = useState(null)
  const [bookings, setBookings] = useState([])
  const [monthlyReport, setMonthlyReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('list') // 'list' o 'calendar'
  
  // Guest Guide State
  const [guestGuide, setGuestGuide] = useState({
    wifi_network: '',
    wifi_password: '',
    checkin_instructions: '',
    house_rules: '',
    garbage_rules: '',
    parking_rules: ''
  })
  const [savingGuide, setSavingGuide] = useState(false)
  const [guideMessage, setGuideMessage] = useState(null)

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

      let targetUserId = authData.user.id

      if (previewOwnerId) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', authData.user.id).single()
        if (profile?.role === 'admin') {
          targetUserId = previewOwnerId
          setIsPreview(true)
          const { data: targetProfile } = await supabase.from('profiles').select('full_name').eq('id', previewOwnerId).single()
          if (targetProfile) setOwnerName(targetProfile.full_name)
        }
      }

      const { data: propData } = await supabase.from('properties').select('*').eq('owner_id', targetUserId).order('title')

      if (propData && propData.length > 0) {
        setAllProperties(propData)
        await loadPropertyDetails(propData[0])
      }
      setLoading(false)
    }

    loadData()
  }, [previewOwnerId])

  const loadPropertyDetails = async (prop) => {
    setProperty(prop)
    setGuestGuide({
      wifi_network: '',
      wifi_password: '',
      checkin_instructions: '',
      house_rules: '',
      garbage_rules: '',
      parking_rules: '',
      ...(prop.guest_guide || {})
    })
    
    const { data: bData } = await supabase.from('bookings').select('*').eq('property_id', prop.id).order('checkin', { ascending: true })
    setBookings(bData || [])
      
    const { data: repData } = await supabase.from('monthly_reports').select('*').eq('property_id', prop.id).order('created_at', { ascending: false }).limit(1).maybeSingle()
    setMonthlyReport(repData || null)
  }

  const saveGuestGuide = async () => {
    setSavingGuide(true)
    setGuideMessage(null)
    const { error } = await supabase.from('properties').update({ guest_guide: guestGuide }).eq('id', property.id)
    if (error) {
      setGuideMessage({ type: 'error', text: 'Errore durante il salvataggio.' })
    } else {
      setGuideMessage({ type: 'success', text: 'Manuale aggiornato! Ora è a disposizione dei tuoi ospiti.' })
      setTimeout(() => setGuideMessage(null), 4000)
    }
    setSavingGuide(false)
  }

  const handleGuideChange = (e) => {
    setGuestGuide({ ...guestGuide, [e.target.name]: e.target.value })
  }

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
        <p className="font-sans text-[15px] text-dark-200 mb-6">L'amministrazione non ha ancora collegato un immobile a questo profilo.</p>
        {isPreview && (
          <Link to="/admin" className="inline-flex items-center gap-2 font-sans text-[13px] text-white bg-dark-700 px-4 py-2 hover:bg-dark-600 transition-colors rounded">
            <ArrowLeft size={16} /> Torna al CRM
          </Link>
        )}
      </div>
    )
  }

  const lodgifyConnected = Boolean(property?.lodgify_property_id)
  const pricelabsConnected = Boolean(property?.pricelabs_connected)
  const upcomingBookings = bookings.filter((b) => new Date(b.checkin) >= new Date())
  const sourceBreakdown = bookings.reduce((acc, b) => {
    acc[b.source] = (acc[b.source] || 0) + 1
    return acc
  }, {})
  const totalBookingsForSource = Object.values(sourceBreakdown).reduce((a, b) => a + b, 0)

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-10">
      {isPreview && (
        <div className="bg-gold-500 text-black px-6 py-4 mb-8 flex items-center justify-between flex-wrap gap-3 rounded-lg">
          <span className="font-mono text-[12px] tracking-[0.12em] uppercase flex items-center gap-2">
            <Eye size={16} /> Modalità Anteprima: stai visualizzando come {ownerName}
          </span>
          <Link to="/admin" className="bg-black text-white font-mono text-[11px] tracking-[0.1em] uppercase px-4 py-2 rounded">
            Chiudi Anteprima
          </Link>
        </div>
      )}

      {/* Header proprietà */}
      <div className="mb-10">
        {allProperties.length > 1 ? (
          <select 
            className="font-serif text-[36px] text-white mb-1 bg-transparent border-b border-dark-700 outline-none cursor-pointer focus:border-gold-500 pb-1 appearance-none pr-8"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23B8963E%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem top 60%', backgroundSize: '0.65rem auto' }}
            value={property.id}
            onChange={(e) => loadPropertyDetails(allProperties.find(p => p.id === e.target.value))}
          >
            {allProperties.map(p => (
              <option key={p.id} value={p.id} className="bg-dark-900 text-[20px] text-white">{p.title}</option>
            ))}
          </select>
        ) : (
          <h1 className="font-serif text-[36px] text-white mb-1">{property.title}</h1>
        )}
        <p className="font-sans text-dark-200 mt-2">{property.address} — {property.type}</p>
      </div>

      {/* Hero: Guadagno Netto */}
      <div className="bg-gold-500 p-10 mb-8 rounded-lg relative overflow-hidden" style={{ boxShadow: '0 20px 50px rgba(184,150,62,0.15)' }}>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
        <div className="relative z-10">
          <p className={`${labelClass} text-black/60 mb-2`}>Guadagno Netto Stimato</p>
          <p className="font-serif text-[52px] md:text-[64px] text-black leading-none mb-3">
            € {monthlyReport ? fmt(monthlyReport.net_payout) : '0,00'}
          </p>
          {monthlyReport ? (
            <p className="font-sans text-[14px] text-black/80 font-medium">Rendiconto {monthlyReport.month_year}</p>
          ) : (
            <p className="font-sans text-[14px] text-black/70 flex items-center gap-2">
              <CheckCircle size={16} /> In attesa di calcolo fine mese
            </p>
          )}
        </div>
      </div>

      {/* Prossime Prenotazioni */}
      <div className={`${cardClass} mb-8`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h3 className="font-serif text-[20px] text-white flex items-center gap-3">📅 Prossime Prenotazioni</h3>
            {lodgifyConnected ? <ConnectedBadge /> : <PendingBadge text="In attivazione" />}
          </div>
          <div className="flex bg-dark-900 border border-dark-700 rounded overflow-hidden p-1">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-1.5 font-sans text-[12px] uppercase tracking-wider transition-colors rounded ${viewMode === 'list' ? 'bg-dark-700 text-white' : 'text-dark-200 hover:text-white'}`}
            >
              Lista
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-1.5 font-sans text-[12px] uppercase tracking-wider transition-colors rounded ${viewMode === 'calendar' ? 'bg-dark-700 text-white' : 'text-dark-200 hover:text-white'}`}
            >
              Calendario
            </button>
          </div>
        </div>
        {viewMode === 'calendar' ? (
          <SimpleCalendar bookings={bookings} />
        ) : (
          upcomingBookings.length > 0 ? (
            <div className="space-y-3">
            {upcomingBookings.slice(0, 5).map((b, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-dark-700 last:border-0">
                <div>
                  <p className="font-sans text-white text-[15px]">{b.guest_name}</p>
                  <p className="font-sans text-dark-200 text-[13px]">{new Date(b.checkin).toLocaleDateString('it-IT')} – {new Date(b.checkout).toLocaleDateString('it-IT')} · {b.source}</p>
                </div>
                <p className="font-mono text-gold-400">€ {fmt(b.amount)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-sans text-dark-200 text-[14px]">
            {lodgifyConnected
              ? 'Nessuna prenotazione nei prossimi giorni.'
              : 'Le prenotazioni compariranno qui automaticamente non appena colleghiamo il channel manager — nessuna azione richiesta da parte tua.'}
          </p>
        )}
      </div>

      {/* Occupazione + Spaccato Finanziario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className={cardClass}>
          <h3 className="font-serif text-[20px] text-white mb-6 flex items-center gap-3">📆 Occupazione</h3>
          <p className="font-serif text-[40px] text-white mb-1">
            {monthlyReport ? `${monthlyReport.occupancy_rate}%` : '--%'}
          </p>
          <p className="font-sans text-dark-200 text-[13px]">
            {monthlyReport ? `Dato aggiornato sul mese di ${monthlyReport.month_year}.` : 'Nessun dato'}
          </p>
        </div>

        <div className={cardClass}>
          <h3 className="font-serif text-[20px] text-white mb-6 flex items-center gap-3">€ Spaccato Finanziario</h3>
          {monthlyReport ? (
            <div className="space-y-3">
              <div className="flex justify-between font-sans text-[14px]">
                <span className="text-dark-200">Revenue lordo</span>
                <span className="text-white">€ {fmt(monthlyReport.gross_revenue)}</span>
              </div>
              <div className="flex justify-between font-sans text-[14px]">
                <span className="text-dark-200">Commissione VirtualBNB</span>
                <span className="text-white">€ {fmt(monthlyReport.virtualbnb_fees)}</span>
              </div>
              <div className="flex justify-between font-sans text-[14px]">
                <span className="text-dark-200">Spese Pulizia</span>
                <span className="text-white">€ {fmt(monthlyReport.cleaning_fees)}</span>
              </div>
              <div className="flex justify-between font-sans text-[14px] pt-2 border-t border-dark-700 font-medium">
                <span className="text-gold-400 uppercase tracking-wider">Netto a te</span>
                <span className="text-gold-400">€ {fmt(monthlyReport.net_payout)}</span>
              </div>
            </div>
          ) : (
            <p className="font-sans text-dark-200 text-[14px]">Nessun rendiconto disponibile per questo mese.</p>
          )}
        </div>
      </div>

      {/* Provenienza Prenotazioni + Pricing Ottimizzato */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-[20px] text-white">📊 Provenienza Prenotazioni</h3>
            {lodgifyConnected ? <ConnectedBadge /> : <PendingBadge text="In attivazione" />}
          </div>
          {totalBookingsForSource > 0 ? (
            <div className="space-y-3">
              {Object.entries(sourceBreakdown).map(([source, count]) => (
                <div key={source}>
                  <div className="flex justify-between font-sans text-[13px] text-dark-200 mb-1">
                    <span className="capitalize">{source === 'direct' ? 'Diretta (0% OTA)' : source}</span>
                    <span>{Math.round((count / totalBookingsForSource) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gold-500" style={{ width: `${(count / totalBookingsForSource) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-sans text-dark-200 text-[14px]">
              Vedrai qui da dove arrivano i tuoi ospiti — incluso quanto risparmi con le prenotazioni dirette.
            </p>
          )}
        </div>

        <div className={cardClass}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-[20px] text-white">◎ Pricing Ottimizzato</h3>
            {pricelabsConnected ? <ConnectedBadge /> : <PendingBadge text="In elaborazione" />}
          </div>
          {pricelabsConnected && monthlyReport?.avg_optimized_price ? (
            <>
              <p className="font-serif text-[40px] text-white mb-1">€ {fmt(monthlyReport.avg_optimized_price)}</p>
              <p className="font-sans text-dark-200 text-[13px]">Prezzo medio a notte, aggiornato dinamicamente dall'AI.</p>
            </>
          ) : (
            <p className="font-sans text-dark-200 text-[14px]">
              Il pricing dinamico è gestito dal nostro algoritmo — qui vedrai un riepilogo di sintesi.
            </p>
          )}
        </div>
      </div>

      {/* Manuale Immobile per gli Ospiti */}
      <div className={cardClass}>
        <div className="mb-6">
          <h3 className="font-serif text-[24px] text-white mb-2 flex items-center gap-3">
            <FileText className="text-gold-500" size={24} /> Manuale dell'Immobile (Info Ospiti)
          </h3>
          <p className="font-sans text-[14px] text-dark-200">
            Compila questi campi per fornire all'Assistente Virtuale tutte le informazioni necessarie per rispondere H24 alle domande dei tuoi ospiti durante il soggiorno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rete WiFi */}
          <div className="bg-dark-900/50 p-5 rounded border border-dark-700">
            <h4 className="flex items-center gap-2 font-sans text-white text-[15px] mb-3"><Wifi size={16} className="text-gold-500"/> Rete WiFi</h4>
            <input type="text" name="wifi_network" value={guestGuide.wifi_network} onChange={handleGuideChange} placeholder="Nome Rete (SSID)" className="w-full bg-dark-800 border border-dark-700 focus:border-gold-500 text-white p-2 mb-2 outline-none text-[13px] rounded" />
            <input type="text" name="wifi_password" value={guestGuide.wifi_password} onChange={handleGuideChange} placeholder="Password" className="w-full bg-dark-800 border border-dark-700 focus:border-gold-500 text-white p-2 outline-none text-[13px] rounded" />
          </div>

          {/* Regole della Casa */}
          <div className="bg-dark-900/50 p-5 rounded border border-dark-700">
            <h4 className="flex items-center gap-2 font-sans text-white text-[15px] mb-3"><AlertCircle size={16} className="text-gold-500"/> Regole della Casa</h4>
            <textarea name="house_rules" value={guestGuide.house_rules} onChange={handleGuideChange} placeholder="Es. Non fumare, silenzio dopo le 22:00..." rows={3} className="w-full bg-dark-800 border border-dark-700 focus:border-gold-500 text-white p-3 outline-none text-[13px] rounded resize-none" />
          </div>

          {/* Istruzioni Check-in */}
          <div className="bg-dark-900/50 p-5 rounded border border-dark-700">
            <h4 className="flex items-center gap-2 font-sans text-white text-[15px] mb-3"><Key size={16} className="text-gold-500"/> Istruzioni Check-in</h4>
            <textarea name="checkin_instructions" value={guestGuide.checkin_instructions} onChange={handleGuideChange} placeholder="Es. Il codice del tastierino è 1234. La cassetta delle chiavi si trova..." rows={3} className="w-full bg-dark-800 border border-dark-700 focus:border-gold-500 text-white p-3 outline-none text-[13px] rounded resize-none" />
          </div>

          {/* Rifiuti e Parcheggi */}
          <div className="bg-dark-900/50 p-5 rounded border border-dark-700 space-y-4">
            <div>
              <h4 className="flex items-center gap-2 font-sans text-white text-[15px] mb-2"><Trash2 size={16} className="text-gold-500"/> Smaltimento Rifiuti</h4>
              <input type="text" name="garbage_rules" value={guestGuide.garbage_rules} onChange={handleGuideChange} placeholder="Es. Umido lunedì, Plastica martedì..." className="w-full bg-dark-800 border border-dark-700 focus:border-gold-500 text-white p-2 outline-none text-[13px] rounded" />
            </div>
            <div>
              <h4 className="flex items-center gap-2 font-sans text-white text-[15px] mb-2"><MapPin size={16} className="text-gold-500"/> Parcheggio</h4>
              <input type="text" name="parking_rules" value={guestGuide.parking_rules} onChange={handleGuideChange} placeholder="Es. Strisce blu a pagamento nella via..." className="w-full bg-dark-800 border border-dark-700 focus:border-gold-500 text-white p-2 outline-none text-[13px] rounded" />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between border-t border-dark-700 pt-6">
          <button onClick={saveGuestGuide} disabled={savingGuide || isPreview} className="bg-gold-500 text-black font-sans text-[13px] uppercase tracking-wider font-medium px-6 py-2.5 hover:bg-gold-400 transition-colors disabled:opacity-50 rounded">
            {savingGuide ? 'Salvataggio...' : 'Salva Manuale'}
          </button>
          {guideMessage && (
            <span className={`font-sans text-[13px] ${guideMessage.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
              {guideMessage.text}
            </span>
          )}
          {isPreview && <span className="font-sans text-[12px] text-dark-200">Salvataggio disabilitato in modalità anteprima</span>}
        </div>
      </div>
    </div>
  )
}
