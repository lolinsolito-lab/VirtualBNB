import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WEBHOOK_URL = 'https://hook.eu2.make.com/ktuw8uc8ommcsopo9db6gltpqd36xrsj'

// ------------------------------------------------------------------
// MOTORE STIMA LIVE
// Dati aggregati indicativi per zona di Milano (ADR = tariffa media
// notturna, occ = occupazione media stimata). Numeri di partenza
// ragionevoli, NON dati di mercato in tempo reale — vanno presentati
// come stima, mai come cifra garantita (vedi disclaimer nel render).
// TODO Antigravity: quando l'integrazione Firecrawl sui comparabili
// reali (Airbnb/Booking) sarà pronta, questa tabella statica può
// essere sostituita o affinata con dati live per zona.
// ------------------------------------------------------------------
const ZONE_DATA = {
  'Centro Storico / Duomo': { adr: 130, occ: 0.68 },
  'Brera / Quadrilatero': { adr: 125, occ: 0.67 },
  'Navigli': { adr: 98, occ: 0.72 },
  'Porta Romana': { adr: 92, occ: 0.71 },
  'Isola / Porta Nuova': { adr: 100, occ: 0.70 },
  'Porta Venezia': { adr: 90, occ: 0.70 },
  'City Life / Sempione': { adr: 95, occ: 0.69 },
  'Città Studi / Bocconi': { adr: 78, occ: 0.68 },
  'Lambrate': { adr: 70, occ: 0.66 },
  'Bicocca': { adr: 62, occ: 0.63 },
  'San Siro / Fiera': { adr: 65, occ: 0.64 },
  'Altra zona Milano': { adr: 58, occ: 0.62 },
  'Hinterland / Fuori Milano': { adr: 45, occ: 0.58 },
}

const TYPE_MULTIPLIER = {
  'Monolocale': 0.72,
  'Bilocale': 1.0,
  'Trilocale': 1.32,
  'Villa / Casale': 1.85,
  'Altro': 1.0,
}

// Soglie basate sui tier reali pubblicati in Prezzi (non etichette inventate):
// Essenziale 25% revenue · Smart 28% revenue (tier più scelto) · Premium €650/mese fisso, zero commissioni.
// Il break-even Smart→Premium è dove il 28% supera il flat fee: 650 / 0.28 ≈ €2.320/mese.
// Sopra quella soglia il fisso conviene di più, coerente col posizionamento "luxury / multi-property" di Premium.
function suggestTier(monthlyRevenue) {
  if (monthlyRevenue >= 2300) return 'Premium'
  if (monthlyRevenue >= 1200) return 'Smart'
  return 'Essenziale'
}

function computeEstimate(zona, tipologia) {
  const z = ZONE_DATA[zona]
  const mult = TYPE_MULTIPLIER[tipologia]
  if (!z || !mult) return null

  const adr = Math.round(z.adr * mult)
  const revpar = Math.round(adr * z.occ) // RevPAR = ADR × occupazione — stesso indicatore mostrato nell'Owner Portal
  const monthlyMid = adr * z.occ * 30

  const base = Math.round(monthlyMid * 0.83 / 10) * 10
  const buono = Math.round(monthlyMid / 10) * 10
  const ottimo = Math.round(monthlyMid * 1.22 / 10) * 10

  const tier = suggestTier(buono)

  return { adr, revpar, base, buono, ottimo, tier }
}

const fmt = (n) => n.toLocaleString('it-IT')

const checklistItems = [
  { num: '01', text: 'RevPAR stimato per il tuo indirizzo specifico' },
  { num: '02', text: 'Confronto con proprietà simili nella tua zona' },
  { num: '03', text: 'Proiezione revenue: base, buono, ottimo' },
  { num: '04', text: 'Indicazione del tier di gestione più adatto' },
]

const inputClass = 'w-full bg-transparent border-0 border-b border-white/20 focus:border-gold-500 text-white font-sans font-light text-[16px] py-4 outline-none transition-colors duration-300 placeholder:text-dark-200/50'
const labelClass = 'font-sans text-[12px] tracking-[0.2em] uppercase text-gold-500/80 block mb-2'

export default function AnalisiForm() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [zona, setZona] = useState('')
  const [tipologia, setTipologia] = useState('')
  const [lastPayload, setLastPayload] = useState(null)

  const estimate = useMemo(() => computeEstimate(zona, tipologia), [zona, tipologia])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const payload = {
      tipo: 'analisi_gratuita',
      nome: form.elements.namedItem('nome').value,
      email: form.elements.namedItem('email').value,
      indirizzo: form.elements.namedItem('indirizzo').value,
      zona,
      tipologia,
      mq: form.elements.namedItem('mq').value,
      ospiti: form.elements.namedItem('ospiti').value,
      stato: form.elements.namedItem('stato').value,
      telefono: form.elements.namedItem('telefono').value,
      messaggio: form.elements.namedItem('messaggio').value,
      // Stima calcolata lato client, inviata come contesto per la qualifica lead
      stima_revpar: estimate?.adr ?? null,
      stima_revenue_base: estimate?.base ?? null,
      stima_revenue_buono: estimate?.buono ?? null,
      stima_revenue_ottimo: estimate?.ottimo ?? null,
      stima_tier: estimate?.tier ?? null,
      timestamp: new Date().toISOString(),
    }
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setLastPayload(payload)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const waMessage = estimate
    ? `Ciao! Ho appena fatto l'analisi gratuita per il mio immobile in zona ${zona} (${tipologia}). Stima ricevuta: ${fmt(estimate.buono)}€/mese, ${estimate.tier}. Vorrei parlarne.`
    : `Ciao! Vorrei un'analisi gratuita per il mio immobile.`

  return (
    <section id="analisi" className="bg-dark-900 relative overflow-hidden text-left">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(184,150,62,0.08) 0%, transparent 70%)' }}
      />

      <div className="py-28 md:py-36 relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: description + checklist con badge live */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-500 mb-6">
                <span className="w-8 h-px bg-gold-500" />
                Inizia adesso
              </p>
              <h2
                className="font-serif font-light text-white leading-[1.1] mb-8"
                style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
              >
                Scopri quanto rende<br />
                <em className="italic text-gold-400">davvero</em> il tuo immobile.
              </h2>
              <p className="font-sans font-light text-[19px] text-dark-100 leading-relaxed mb-12 max-w-lg">
                Seleziona zona e tipologia: la stima si aggiorna subito, qui sotto. Nessun impegno, nessuna attesa.
              </p>

              <div className="flex flex-col gap-0">
                {checklistItems.map((item, i) => {
                  const badge =
                    item.num === '01' && estimate ? `€${estimate.revpar} RevPAR/notte` :
                    item.num === '03' && estimate ? `€${fmt(estimate.base)} – €${fmt(estimate.ottimo)}/mese` :
                    item.num === '04' && estimate ? `Tier ${estimate.tier}` :
                    null

                  return (
                    <motion.div
                      key={item.num}
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="flex gap-6 items-start py-5 border-b border-white/10"
                    >
                      <span className="font-mono text-[12px] text-gold-500 flex-shrink-0 mt-1">{item.num}</span>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <p className="font-sans font-light text-[18px] text-dark-100 leading-relaxed">{item.text}</p>
                        <AnimatePresence mode="wait">
                          {badge && (
                            <motion.span
                              key={badge}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.35 }}
                              className="font-serif italic text-gold-400 text-[17px] whitespace-nowrap"
                            >
                              {badge}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Pannello stima live, compare solo quando zona + tipologia sono selezionate */}
              <AnimatePresence>
                {estimate && status === 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 overflow-hidden"
                  >
                    <div className="border border-gold-500/30 bg-gold-500/[0.04] p-7">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500" />
                          </span>
                          <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-gold-500">Live · Stima immobile</span>
                        </div>
                        <span className="font-mono text-[11px] text-dark-200/70 tabular-nums">RevPAR €{estimate.revpar}/notte</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { label: 'Base', value: estimate.base },
                          { label: 'Buono', value: estimate.buono },
                          { label: 'Ottimo', value: estimate.ottimo },
                        ].map((s) => (
                          <div key={s.label}>
                            <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-dark-200 mb-1">{s.label}</p>
                            <p className="font-mono text-white text-[22px] leading-tight tabular-nums">€{fmt(s.value)}</p>
                            <p className="font-sans text-[11px] text-dark-200">/mese</p>
                          </div>
                        ))}
                      </div>
                      <p className="font-sans text-[12.5px] text-gold-400/90 leading-relaxed mt-5 pt-5 border-t border-white/10">
                        Questa è un'anteprima di quello che vedrai nel tuo Owner Portal. Con il metodo VirtualBNB (pricing dinamico ogni 6h, distribuzione multi-canale, direct booking) i risultati reali spesso superano lo scenario "ottimo" — vedi gli esempi qui sopra.
                      </p>
                      <p className="font-sans text-[11.5px] text-dark-200/70 leading-relaxed mt-3">
                        Stima indicativa su dati aggregati per zona e tipologia. Il confronto su comparabili reali arriva con l'analisi personalizzata, gratuita, entro 24 ore.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, y: 48, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-dark-800 p-10 md:p-14 border border-dark-700"
              style={{ boxShadow: '0 20px 70px rgba(0,0,0,0.4)' }}
            >
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="py-4 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  {estimate ? (
                    <>
                      <h3 className="font-serif text-[28px] text-white mb-2">Ecco la tua stima, {lastPayload?.nome?.split(' ')[0]}.</h3>
                      <p className="font-sans font-light text-[15px] text-dark-100 mb-8">
                        {zona} · {tipologia}
                      </p>
                      <div className="grid grid-cols-3 gap-4 w-full mb-8">
                        {[
                          { label: 'Base', value: estimate.base },
                          { label: 'Buono', value: estimate.buono },
                          { label: 'Ottimo', value: estimate.ottimo },
                        ].map((s) => (
                          <div key={s.label} className="border border-white/10 py-4">
                            <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-dark-200 mb-1">{s.label}</p>
                            <p className="font-mono text-gold-400 text-[19px] tabular-nums">€{fmt(s.value)}</p>
                          </div>
                        ))}
                      </div>
                      <p className="font-sans font-light text-[15px] text-dark-100 leading-relaxed mb-8 max-w-sm">
                        Tier consigliato: <span className="text-gold-400">{estimate.tier}</span>. Questa è la stima rapida — se vuoi l'analisi completa a 360° (comparabili reali, proiezione dettagliata, revisione del contratto), prenota una call gratuita di 20 minuti.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="font-serif text-[28px] text-white mb-4">Dati acquisiti</h3>
                      <p className="font-sans font-light text-[16px] text-dark-100 leading-relaxed mb-8 max-w-sm">
                        Abbiamo ricevuto i dettagli del tuo immobile. Puoi già prenotare la tua call di analisi 360° gratuita qui sotto, oppure farci una domanda rapida su WhatsApp.
                      </p>
                    </>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <a
                      href="https://calendly.com/lolinsolito/30min"
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center font-sans text-[13px] font-medium tracking-[0.15em] uppercase text-black bg-gold-500 px-6 py-5 hover:bg-white hover:scale-105 transition-all duration-300"
                      style={{ boxShadow: '0 4px 20px rgba(184,150,62,0.3)' }}
                    >
                      Prenota analisi 360°
                    </a>
                    <a
                      href={`https://wa.me/393393522164?text=${encodeURIComponent(waMessage)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center font-sans text-[13px] font-medium tracking-[0.15em] uppercase text-white border border-white/20 px-6 py-5 hover:border-gold-500 hover:text-gold-400 transition-all duration-300"
                    >
                      Due domande su WhatsApp
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div>
                      <label className={labelClass}>Nome e cognome</label>
                      <input name="nome" type="text" className={inputClass} placeholder="Marco Rossi" required />
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
                      <input name="email" type="email" className={inputClass} placeholder="marco@email.com" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div>
                      <label className={labelClass}>Via</label>
                      <input name="indirizzo" type="text" className={inputClass} placeholder="Via Tortona 12" required />
                    </div>
                    <div>
                      <label className={labelClass}>Zona</label>
                      <select
                        name="zona" className={inputClass} style={{ appearance: 'none', cursor: 'pointer' }}
                        required value={zona} onChange={(e) => setZona(e.target.value)}
                      >
                        <option value="" disabled>Seleziona</option>
                        {Object.keys(ZONE_DATA).map((z) => (
                          <option key={z} value={z} style={{ background: '#111111' }}>{z}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div>
                      <label className={labelClass}>Tipologia</label>
                      <select
                        name="tipologia" className={inputClass} style={{ appearance: 'none', cursor: 'pointer' }}
                        required value={tipologia} onChange={(e) => setTipologia(e.target.value)}
                      >
                        <option value="" disabled>Seleziona</option>
                        {Object.keys(TYPE_MULTIPLIER).map((o) => (
                          <option key={o} style={{ background: '#111111' }}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Stato attuale</label>
                      <select name="stato" className={inputClass} style={{ appearance: 'none', cursor: 'pointer' }} required defaultValue="">
                        <option value="" disabled>Seleziona</option>
                        {['Sfitto / Da arredare', 'Già su Airbnb (autonomo)', 'Con altro property manager', 'Affitto tradizionale'].map((o) => (
                          <option key={o} style={{ background: '#111111' }}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                    <div>
                      <label className={labelClass}>Metratura (mq)</label>
                      <input name="mq" type="number" min="10" className={inputClass} placeholder="es. 65" required />
                    </div>
                    <div>
                      <label className={labelClass}>Ospiti (max)</label>
                      <input name="ospiti" type="number" min="1" max="20" className={inputClass} placeholder="es. 4" required />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Telefono (opzionale)</label>
                    <input name="telefono" type="tel" className={inputClass} placeholder="+39 02..." />
                  </div>

                  <div>
                    <label className={labelClass}>Note aggiuntive (opzionale)</label>
                    <textarea
                      name="messaggio" rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="Descrivi brevemente eventuali necessità o dettagli dell'immobile..."
                    />
                  </div>

                  <div className="flex items-start gap-3 mt-4">
                    <input
                      type="checkbox"
                      id="privacy-check"
                      name="privacy"
                      required
                      className="mt-1 cursor-pointer w-4 h-4 accent-gold-500"
                    />
                    <label htmlFor="privacy-check" className="font-sans text-[13px] text-dark-200 leading-relaxed cursor-pointer select-none">
                      Ho letto e accetto la{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: 'privacy' }));
                        }}
                        className="text-gold-500 hover:text-gold-400 transition-colors underline"
                      >
                        Privacy Policy
                      </button>
                      . Acconsento al trattamento dei dati per ricevere l'analisi gratuita.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mt-4 flex justify-center items-center font-sans text-[13px] font-medium tracking-[0.15em] uppercase bg-gold-500 text-black py-5 hover:bg-gold-400 transition-all duration-300 disabled:opacity-80 disabled:cursor-not-allowed"
                    style={{ boxShadow: '0 4px 24px rgba(184,150,62,0.3)' }}
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Elaborazione in corso...
                      </>
                    ) : (
                      'Ricevi l\'analisi gratuita →'
                    )}
                  </button>

                  {status === 'error' && (
                    <p className="font-sans text-[14px] text-red-400 mt-2 bg-red-400/10 border border-red-400/20 p-4">
                      Si è verificato un errore di connessione. Per favore, scrivici direttamente a{' '}
                      <a href="mailto:contatti@virtualbnb.it" className="text-gold-400 border-b border-gold-400/30">contatti@virtualbnb.it</a>
                    </p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
