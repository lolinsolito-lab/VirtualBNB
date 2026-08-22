import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
})

const targets = [
  {
    label: 'Executive Travel',
    num: '01',
    title: 'Consulenti e manager in trasferta',
    desc: 'Soggiorni 2-8 settimane. Appartamenti premium, fattura aziendale, check-in autonomo H24. Risparmio del 35-40% vs hotel.',
    revenue: '€90-120/notte · Contratti annuali',
    pitchQuote: '"Riduciamo il vostro budget accommodation del 35%, eliminiamo la gestione operativa, e vi diamo un\'unica fattura mensile."',
    savings: [
      { num: '-35%', label: 'Risparmio vs hotel per soggiorni lunghi' },
      { num: 'H24', label: 'Check-in digitale senza attese' },
      { num: '1', label: 'Singola fattura mensile consolidata' },
      { num: '0', label: 'Gestione operativa richiesta all\'HR' },
    ],
  },
  {
    label: 'Relocation',
    num: '02',
    title: 'Dipendenti in relocation',
    desc: 'Soggiorni 1-6 mesi. Appartamento arredato, bollette incluse, logistica. Pacchetto "Soft Landing" per nuovi assunti e manager.',
    revenue: '€2k-4k/mese · Contratti stabili',
    pitchQuote: '"Offrite ai vostri talenti un\'esperienza di atterraggio di classe, ovunque si trovino, con utenze pre-attivate e un concierge dedicato."',
    savings: [
      { num: '100%', label: 'Bollette e oneri già inclusi' },
      { num: 'VIP', label: 'Executive Soft Landing package' },
      { num: 'FAST', label: 'Burocrazia e contratti istantanei' },
      { num: '24h', label: 'Supporto per manutenzioni' },
    ],
  },
  {
    label: 'Shooting & Events',
    num: '03',
    title: 'Produzioni e brand internazionali',
    desc: 'Fashion week, shooting, team creativi. Appartamenti premium con fattura, altissima professionalità e massima privacy.',
    revenue: 'Tariffa 2-3x · Alta marginalità',
    pitchQuote: '"Spazi iconici pronti per la produzione. Alta redditività per il proprietario, set perfetto e flessibile per le agenzie creative."',
    savings: [
      { num: 'TOP', label: 'Location esclusive e luminose' },
      { num: 'FLEX', label: 'Check-in/out elastici per crew' },
      { num: '1', label: 'Fatturazione business immediata' },
      { num: 'PRO', label: 'Pulizie profonde post-produzione' },
    ],
  },
  {
    label: 'Aviation & Crew',
    num: '04',
    title: 'Academy e Hostess/Steward',
    desc: 'Alloggi per corsisti di compagnie aeree (es. Ryanair) in addestramento vicino ai grandi Hub. Flussi costanti garantiti da turnover continuo.',
    revenue: 'Guadagno costante senza stagionalità',
    pitchQuote: '"Il massimo del comfort casalingo per i vostri corsisti: logistica e fatturazione azzerate per la vostra accademia di volo."',
    savings: [
      { num: '365d', label: 'Domanda del tutto destagionalizzata' },
      { num: 'HUB', label: 'Perfetto per immobili vicini agli aeroporti' },
      { num: 'B2B', label: 'Fatturazione diretta alla compagnia' },
      { num: '100%', label: 'Turnover mensile costante e prevedibile' },
    ],
  },
]

export default function Corporate() {
  const [active, setActive] = useState(0)

  return (
    <section id="corporate" className="bg-dark-800 relative overflow-hidden text-left">
      {/* Glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(184,150,62,0.07) 0%, transparent 70%)' }}
      />

      <div className="py-28 md:py-36 relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          {/* Label */}
          <motion.p
            {...anim(0)}
            className="flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-500 mb-6"
          >
            <span className="w-8 h-px bg-gold-500" />
            Network Executive
          </motion.p>

          {/* Title */}
          <motion.h2
            {...anim(0.08)}
            className="font-serif font-light text-white leading-[1.1] mb-20"
            style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
          >
            Per le aziende che<br />
            <em className="italic text-gold-400">viaggiano e si espandono.</em>
            <span className="block mt-8">
              <span className="font-sans text-[11px] font-medium tracking-[0.25em] uppercase bg-gold-500 text-black px-5 py-2.5 inline-block">
                In Arrivo
              </span>
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start relative">
            {/* Left: target cards */}
            <div className="flex flex-col gap-6">
              {targets.map((t, i) => {
                const isActive = active === i
                return (
                  <motion.div
                    key={t.title}
                    initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setActive(i)}
                    className={`group relative p-10 md:p-12 transition-all duration-500 cursor-pointer ${
                      isActive
                        ? 'bg-dark-900 border border-gold-500'
                        : 'bg-dark-900/50 border border-dark-700 hover:border-gold-500/40 hover:-translate-y-1.5'
                    }`}
                    style={{ boxShadow: isActive ? '0 12px 40px rgba(184,150,62,0.15)' : '0 4px 24px rgba(0,0,0,0.3)' }}
                  >
                    <span
                      className="absolute top-6 right-8 font-serif font-light select-none pointer-events-none"
                      style={{ fontSize: '110px', lineHeight: 1, color: isActive ? 'rgba(184,150,62,0.1)' : 'rgba(184,150,62,0.05)' }}
                    >
                      {t.num}
                    </span>
                    <p className={`font-mono text-[12px] tracking-[0.2em] uppercase mb-4 relative z-10 transition-colors ${isActive ? 'text-white' : 'text-gold-500'}`}>
                      {t.label}
                    </p>
                    <h3 className={`font-serif text-[24px] font-normal mb-4 relative z-10 transition-colors duration-300 ${isActive ? 'text-gold-400' : 'text-white group-hover:text-gold-300'}`}>
                      {t.title}
                    </h3>
                    <p className="font-sans font-light text-[18px] text-dark-100 leading-relaxed mb-6 relative z-10">{t.desc}</p>
                    <p className="font-mono text-[13px] text-gold-600 relative z-10">{t.revenue}</p>
                  </motion.div>
                )
              })}
            </div>

            {/* Right: pitch panel */}
            <div className="lg:sticky lg:top-32">
              <motion.div
                {...anim(0.2)}
                className="bg-cream-100 p-12 md:p-16 relative overflow-hidden"
                style={{ boxShadow: '0 20px 70px rgba(0,0,0,0.4)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold-500" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-serif text-[22px] font-light italic leading-relaxed text-dark-900 mb-10 pb-10 border-b border-cream-300 min-h-[140px]">
                      {targets[active].pitchQuote}
                    </p>
                    <div className="grid grid-cols-2 gap-10 mb-12">
                      {targets[active].savings.map((s, i) => (
                        <div key={i}>
                          <span className="font-mono text-[42px] font-light text-gold-600 block leading-none">{s.num}</span>
                          <p className="font-sans font-light text-[17px] text-dark-200 mt-3 leading-relaxed">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={() => scrollTo('contatti')}
                  className="w-full font-sans text-[13px] font-medium tracking-[0.15em] uppercase bg-dark-900 text-white py-5 hover:bg-gold-500 hover:text-black transition-all duration-400 relative z-20"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
                >
                  Parla con noi per il Business
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
