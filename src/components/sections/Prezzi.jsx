import { motion } from 'framer-motion'

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
})

const plans = [
  {
    tier: '01',
    name: 'Essenziale',
    desc: 'Per chi inizia o vuole testare il mercato con una gestione base.',
    price: '25%',
    priceNote: 'sul revenue netto',
    setup: 'Setup: €350 una tantum',
    features: [
      'Check-in/out digitale via Smart Lock',
      'Gestione multi-calendario (Airbnb, Booking)',
      'Pricing Dinamico base',
      'Report mensile semplice',
    ],
    featured: false,
    cta: 'Inizia con Essenziale',
  },
  {
    tier: '02',
    name: 'Smart',
    desc: 'Il sistema completo per massimizzare la rendita col minimo impegno.',
    price: '28%',
    priceNote: 'sul revenue netto',
    setup: 'Setup: €450 una tantum',
    features: [
      'Assistenza ospiti attiva H24',
      'AI WhatsApp per il proprietario',
      'Manutenzione proattiva inclusa (max €100)',
      'Distribuzione Premium Multi-Canale',
    ],
    featured: true,
    cta: 'Scegli Smart — Il più Popolare',
  },
  {
    tier: '03',
    name: 'Premium',
    desc: 'Per appartamenti luxury o investitori multi-property. Servizio white-glove.',
    price: '€650',
    priceNote: '/mese per immobile',
    setup: 'Zero commissioni sul revenue',
    features: [
      'Revenue management proattivo umano',
      'Concierge VIP per ospiti',
      'Shooting fotografico annuale',
      'Account manager dedicato',
      'SLA: Risposta garantita entro 2 ore',
    ],
    featured: false,
    cta: 'Richiedi Premium',
  },
]

export default function Prezzi() {
  return (
    <section id="prezzi" className="bg-dark-900 relative overflow-hidden text-left">
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(245,240,232,0.05) 0%, transparent 100%)' }}
      />

      <div className="py-28 md:py-36">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          {/* Label */}
          <motion.p
            {...anim(0)}
            className="flex items-center gap-3 font-sans text-[14px] tracking-[0.25em] uppercase text-gold-500 mb-6"
          >
            <span className="w-8 h-px bg-gold-500" />
            Commissioni
          </motion.p>

          {/* Title */}
          <motion.h2
            {...anim(0.08)}
            className="font-serif font-light text-white leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
          >
            Trasparenza totale,<br />
            anche sul nostro <em className="italic text-gold-400">guadagno.</em>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            {...anim(0.16)}
            className="font-sans font-light text-[19px] text-dark-100 max-w-2xl leading-relaxed mb-24"
          >
            Nessuna commissione nascosta. Nessuna sorpresa. Solo performance — e i tuoi numeri che aumentano.
          </motion.p>

          {/* Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col pt-12 p-8 md:p-12 transition-all duration-500 hover:-translate-y-2 ${
                  plan.featured
                    ? 'border border-gold-500 bg-dark-800'
                    : 'border border-dark-700 bg-dark-800/80 hover:border-gold-500/40'
                }`}
                style={{
                  boxShadow: plan.featured
                    ? '0 12px 60px rgba(184,150,62,0.15), 0 4px 20px rgba(0,0,0,0.4)'
                    : '0 8px 30px rgba(0,0,0,0.2)',
                }}
              >
                {/* Featured badge */}
                {plan.featured && (
                  <div className="absolute top-0 left-0 right-0 bg-gold-500 text-black font-sans text-[12px] font-semibold tracking-[0.15em] uppercase text-center py-3">
                    ★ Tier Più Scelto
                  </div>
                )}

                <div className="flex flex-col flex-1">
                  <h3 className="font-serif text-[32px] font-normal text-white mb-2 flex items-center justify-between">
                    {plan.name}
                    <span className="font-mono text-[16px] tracking-widest text-gold-500/60 uppercase">{plan.tier}</span>
                  </h3>
                  <p className="font-sans font-light text-[17px] text-dark-100 leading-relaxed mb-8 h-16">{plan.desc}</p>

                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div>
                      <span className="font-mono text-[64px] font-light leading-none text-white tracking-tighter">{plan.price}</span>
                      <span className="font-sans text-[15px] font-light text-gold-500 ml-2 block mt-2">{plan.priceNote}</span>
                    </div>
                    <p className="font-mono text-[13px] text-dark-200 mt-4 px-4 py-2 bg-dark-700 inline-block">{plan.setup}</p>
                  </div>

                  <ul className="flex-1 mb-12 space-y-5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-4 font-sans font-light text-[17px] text-dark-100 leading-snug">
                        <span className="text-gold-500 flex-shrink-0 text-[18px]">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => scrollTo('analisi')}
                    className={`w-full font-sans text-[14px] font-semibold tracking-[0.15em] uppercase py-6 transition-all duration-300 mt-auto ${
                      plan.featured
                        ? 'bg-gold-500 text-black hover:bg-gold-400'
                        : 'bg-dark-700 text-white hover:bg-gold-500 hover:text-black'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
