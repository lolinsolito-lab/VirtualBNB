import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
})

const comparisons = [
  {
    title: 'Pricing & Revenue',
    competitor: 'Prezzi fissi per alta e bassa stagione, o aggiustamenti manuali una volta al mese. Poca flessibilità.',
    us: 'Prezzi dinamici aggiornati ogni 6 ore dall\'AI. Analizziamo micro-dati locali, eventi e trend per massimizzare ogni singola notte.',
  },
  {
    title: 'Contratti & Rischio',
    competitor: 'Gestione standard o affitto lungo 4+4. In caso di morosità, l\'iter legale dura mesi ed è a tue spese.',
    us: 'Opzione Guaranteed Income: garanzia flessibile attivabile sui periodi di occupazione per azzerare i rischi senza i pesanti costi fissi di un vuoto-pieno standard.',
  },
  {
    title: 'Reportistica & Dati',
    competitor: 'Un PDF mensile confuso inviato per email, difficile da leggere e spesso in ritardo.',
    us: 'Owner Portal digitale live con metriche real-time accessibile H24, più report automatici completi il primo del mese.',
  },
  {
    title: 'Canali di Vendita',
    competitor: 'Il tuo appartamento è visibile quasi esclusivamente su Airbnb, subendo le bizze del loro algoritmo.',
    us: 'Multi-OTA Premium (Booking, VRBO, etc.) con integrazione in arrivo del nostro network B2B diretto per aziende a zero commissioni esterne.',
  },
  {
    title: 'Cura & Manutenzione',
    competitor: 'Pulizie di base, interventi reattivi solo quando l\'ospite si lamenta. L\'immobile si deperisce velocemente.',
    us: 'Manutenzione proattiva, check fotografici a ogni checkout e consulenza di Home Staging iniziale. L\'asset migliora nel tempo.',
  },
]

export default function Confronto() {
  const [active, setActive] = useState(0)

  return (
    <section id="confronto" className="bg-dark-900 relative overflow-hidden text-left py-28 md:py-36 border-t border-gold-500/10">
      {/* Glow */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(184,150,62,0.06) 0%, transparent 60%)' }}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative z-10">
        {/* Label */}
        <motion.p
          {...anim(0)}
          className="flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-500 mb-6"
        >
          <span className="w-8 h-px bg-gold-500" />
          Il Divario
        </motion.p>

        {/* Title */}
        <motion.h2
          {...anim(0.08)}
          className="font-serif font-light text-white leading-[1.1] mb-20"
          style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
        >
          Cosa ci distingue<br />
          dal <em className="italic text-gold-400">mercato tradizionale.</em>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: tab buttons */}
          <motion.div {...anim(0.15)} className="lg:col-span-4 flex flex-col gap-2">
            {comparisons.map((c, i) => {
              const isActive = active === i
              return (
                <button
                  key={c.title}
                  onClick={() => setActive(i)}
                  className={`text-left px-6 py-5 transition-all duration-300 font-sans tracking-wide ${
                    isActive
                      ? 'bg-dark-800 text-gold-400 border-l-2 border-gold-500 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
                      : 'bg-transparent text-dark-200 border-l-2 border-dark-700 hover:text-white hover:border-dark-400 hover:bg-dark-800/50'
                  }`}
                >
                  <span className="font-mono text-[12px] opacity-50 mr-4">0{i + 1}</span>
                  <span className={`text-[17px] md:text-[19px] ${isActive ? 'font-medium' : 'font-light'}`}>{c.title}</span>
                </button>
              )
            })}
          </motion.div>

          {/* Right: comparison panel */}
          <motion.div {...anim(0.25)} className="lg:col-span-8">
            <div
              className="bg-dark-800 border border-dark-700 p-8 md:p-14 relative"
              style={{ minHeight: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 blur-[50px] pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col h-full justify-between"
                >
                  {/* Competitor */}
                  <div className="mb-14">
                    <p className="font-mono text-[13px] tracking-widest text-dark-300 uppercase mb-4">Metodo Tradizionale</p>
                    <div className="flex gap-4 items-start">
                      <span className="text-red-500/80 font-serif text-[24px] leading-none mt-1">✕</span>
                      <p className="font-sans font-light text-[18px] md:text-[20px] text-dark-200 leading-relaxed italic">
                        "{comparisons[active].competitor}"
                      </p>
                    </div>
                  </div>

                  {/* VirtualBNB */}
                  <div
                    className="relative p-8 md:p-10 border border-gold-500/30 bg-dark-900"
                    style={{ boxShadow: '0 0 40px rgba(184,150,62,0.08)' }}
                  >
                    <div className="absolute -top-3 left-8 bg-dark-900 px-3 font-mono text-[11px] font-semibold tracking-widest text-gold-500 uppercase">
                      L'Approccio VirtualBNB
                    </div>
                    <div className="flex gap-4 items-start">
                      <span className="text-gold-500 font-serif text-[28px] leading-none mt-1">✓</span>
                      <p className="font-sans font-normal text-[19px] md:text-[22px] text-white leading-relaxed">
                        {comparisons[active].us}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
