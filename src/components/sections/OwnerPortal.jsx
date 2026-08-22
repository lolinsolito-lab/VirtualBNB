import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const kpis = [
  { num: '€2.847', label: 'Revenue mese' },
  { num: '84%', label: 'Occupazione' },
  { num: '€112', label: 'RevPAR/notte' },
  { num: '4.9 ★', label: 'Rating medio' },
]

const bookings = [
  { guest: 'Sarah K. 🇬🇧 — 22-26 Apr', amount: '€448', active: true },
  { guest: 'Marco B. — 28 Apr - 3 Mag', amount: '€535', active: true },
  { guest: '10-15 Mag — Disponibile', amount: '—', active: false },
]

const features = [
  {
    num: '01',
    title: 'Dashboard real-time',
    desc: 'Revenue, occupazione, RevPAR, prossimi ospiti. Aggiornato in tempo reale — non aspetti più fine mese per sapere come va il tuo investimento.',
  },
  {
    num: '02',
    title: 'AI WhatsApp H24',
    desc: 'Nessun portale complesso. Chiedi al nostro sistema via WhatsApp in linguaggio naturale: "Quanto ho guadagnato?" e ricevi i dati istantaneamente.',
  },
  {
    num: '03',
    title: 'Report automatico',
    desc: 'Il primo del mese ricevi il riepilogo fiscale perfetto da inviare al tuo commercialista. Revenue, tasse, spese di manutenzione e fatture deducibili.',
  },
  {
    num: '04',
    title: 'Benchmark di Mercato',
    desc: 'Non ci basiamo su sensazioni. Confrontiamo il tuo appartamento con le medie esatte della tua città e quartiere, ottimizzando i prezzi.',
  },
]

export default function OwnerPortal() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="portale" className="bg-cream-100 relative text-left">
      <div
        className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.07) 0%, transparent 100%)' }}
      />

      <div className="py-28 md:py-36">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-600 mb-6"
          >
            <span className="w-8 h-px bg-gold-600" />
            Owner Portal
          </motion.p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light text-dark-900 leading-[1.1] mb-20"
            style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
          >
            Il tuo asset, sempre<br />
            <em className="italic text-gold-600">davanti ai tuoi occhi.</em>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Portal mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="bg-dark-900 p-8 md:p-10 font-mono relative overflow-hidden min-h-[500px]"
              style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.28), 0 4px 20px rgba(0,0,0,0.14)' }}
            >
              {/* Header */}
              <div className="flex justify-between items-center text-[13px] text-dark-200 mb-8 pb-5 border-b border-gold-500/20 z-10 relative">
                <span className="text-white flex items-center">
                  VirtualBNB · Insights
                  <span className="text-[9px] text-gold-500 ml-3 border border-gold-500/30 px-2 py-0.5 rounded-sm bg-gold-500/10">
                    SIMULAZIONE VISTA
                  </span>
                </span>
                <span className="text-gold-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  <motion.div key="tab0"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {kpis.map((k) => (
                        <div key={k.label} className="bg-dark-800 border border-gold-500/15 p-4 hover:border-gold-500/40 transition-colors">
                          <span className="text-gold-400 text-[22px] font-light block leading-none">{k.num}</span>
                          <span className="text-[10px] text-dark-200 uppercase tracking-[0.07em] mt-3 block leading-tight">{k.label}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[12px] text-gold-500 uppercase tracking-[0.12em] mb-4">Prossime Prenotazioni</p>
                    {bookings.map((b) => (
                      <div key={b.guest} className={`flex justify-between items-center text-[13px] py-3.5 border-b border-white/5 ${b.active ? '' : 'opacity-40'}`}>
                        <span className="text-white flex items-center gap-3">
                          {b.active && <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />}
                          {b.guest}
                        </span>
                        <span className="text-dark-100 font-medium">{b.amount}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div key="tab1"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                    className="flex flex-col h-full"
                  >
                    <div className="bg-dark-800 border border-white/5 p-4 rounded-t-lg mb-1">
                      <p className="text-[11px] text-dark-200 uppercase tracking-[0.15em] mb-2 text-center">Oggi</p>
                      <div className="flex justify-end mb-4">
                        <div className="bg-white text-dark-900 p-3 rounded-l-xl rounded-tr-xl max-w-[80%]">
                          <p className="font-sans text-[14px]">Quanto ha generato l'appartamento in Via Roma questo mese?</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-gold-500/10 border border-gold-500/30 text-white p-4 rounded-r-xl rounded-tl-xl max-w-[90%]">
                          <p className="font-sans text-[14px] leading-relaxed">
                            Questo mese hai generato <strong className="text-gold-400">€2.847 netti</strong> (occupazione 84%).<br /><br />
                            Hai un prossimo check-in domani alle 15:00 (Sarah K., Londra). La pulizia è già stata completata e supervisionata.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div key="tab2"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                  >
                    <div className="border-2 border-dashed border-dark-700 p-10 flex flex-col items-center justify-center text-center bg-dark-800/50">
                      <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h4 className="font-serif text-[24px] text-white mb-2">Report Mensile Generato</h4>
                      <p className="font-sans font-light text-[15px] text-dark-200 mb-8 max-w-xs">
                        Il report fiscale per il tuo commercialista è pronto per l'export.
                      </p>
                      <button className="font-sans text-[12px] uppercase tracking-widest bg-gold-500 text-black px-8 py-3 hover:bg-white transition-colors">
                        Scarica PDF
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 3 && (
                  <motion.div key="tab3"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-end mb-2">
                          <p className="font-sans text-[14px] text-white">Tuo RevPAR Medio</p>
                          <p className="font-mono text-[18px] text-gold-400">€112</p>
                        </div>
                        <div className="w-full bg-dark-700 h-2 rounded-full overflow-hidden">
                          <div className="bg-gold-500 h-full w-[85%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-end mb-2">
                          <p className="font-sans text-[14px] text-dark-200">Media Competitors (Stessa Zona)</p>
                          <p className="font-mono text-[18px] text-dark-200">€84</p>
                        </div>
                        <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-dark-400 h-full w-[55%]" />
                        </div>
                      </div>
                      <div className="mt-10 p-5 border border-gold-500/20 bg-dark-800">
                        <p className="font-sans font-light text-[15px] text-dark-100">
                          Il tuo asset sta performando nel <strong className="text-white">Top 15%</strong> del mercato locale
                          grazie alle strategie proattive di dynamic pricing.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right: features list */}
            <motion.div
              initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {features.map((f, i) => {
                const isActive = activeTab === i
                return (
                  <div
                    key={f.num}
                    onClick={() => setActiveTab(i)}
                    className={`group flex gap-6 md:gap-8 items-start py-6 md:py-8 border-b border-dark-900/10 cursor-pointer transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-100 hover:bg-black/5 px-4 -mx-4 rounded-xl'
                    }`}
                  >
                    <span className={`font-mono text-[14px] flex-shrink-0 mt-1 transition-colors ${isActive ? 'text-gold-600 font-bold' : 'text-dark-700 font-medium group-hover:text-gold-600'}`}>
                      {f.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className={`font-serif text-[22px] md:text-[24px] font-normal transition-colors duration-300 ${isActive ? 'text-dark-900' : 'text-dark-700 group-hover:text-dark-900'}`}>
                          {f.title}
                        </h3>
                        {!isActive && (
                          <div className="flex items-center gap-2 text-dark-500 group-hover:text-gold-600 transition-colors">
                            <span className="font-mono text-[10px] tracking-widest uppercase border border-dark-900/20 px-2 py-1 rounded-sm group-hover:border-gold-500/50 group-hover:bg-gold-500/10">
                              Anteprima
                            </span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: '12px' }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="font-sans font-light text-[17px] md:text-[18px] text-dark-800 leading-relaxed overflow-hidden"
                          >
                            {f.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
