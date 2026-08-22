import { motion } from 'framer-motion'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80'

const metrics = [
  { num: 'Top', label: 'Portfolio Selezionato', sub: 'Per garantire cura estrema' },
  { num: '100%', label: 'Dedizione Assoluta', sub: 'Come se fosse casa nostra' },
  { num: 'Zero', label: 'Pensieri per te', sub: 'Gestiamo ogni singolo dettaglio' },
  { num: '90s', label: 'Attenzione all\'Ospite', sub: 'Risposte immediate 24/7' },
]

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden text-left"
      style={{ background: '#0A0A0A' }}
    >
      {/* Background image + overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="VirtualBNB Luxury Stay"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.85) 45%, rgba(10,10,10,0.4) 100%)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-72"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 100%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between min-h-screen">
        {/* Main hero content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 w-full pt-32 pb-12">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="w-10 h-px bg-gold-500 inline-block" />
              <span className="font-sans text-[13px] tracking-[0.25em] uppercase text-gold-400 font-medium">
                Il futuro dell'ospitalità
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-light text-white leading-[1.05] max-w-2xl mb-8"
              style={{ fontSize: 'clamp(56px, 7vw, 96px)', letterSpacing: '-0.02em' }}
            >
              Property<br />
              Management<br />
              <em className="italic text-gold-400" style={{ fontStyle: 'italic' }}>d'Eccellenza</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans font-light text-[19px] text-cream-100/90 max-w-lg leading-relaxed mt-4 mb-14"
            >
              7 anni di esperienza nella gestione immobiliare, potenziata dall'Intelligenza Artificiale.
              Trasformiamo proprietà in investimenti redditizi con professionalità, eleganza e risultati misurabili.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex items-center gap-6 flex-wrap"
            >
              <button
                onClick={() => scrollTo('analisi')}
                className="font-sans text-[13px] font-medium tracking-[0.15em] uppercase px-10 py-5 transition-all duration-300"
                style={{ background: '#B8963E', color: '#000', boxShadow: '0 4px 20px rgba(184,150,62,0.35)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#D4AF6A'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#B8963E'}
              >
                Analisi gratuita del tuo immobile
              </button>
              <button
                onClick={() => scrollTo('come-funziona')}
                className="font-sans text-[13px] tracking-[0.15em] uppercase text-white/80 hover:text-white flex items-center gap-3 transition-colors ml-4"
              >
                Scopri come funziona
                <span className="inline-block transition-transform duration-300">↓</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Metrics bar */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 w-full pb-14 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4 border-t border-white/10 pt-10 max-w-3xl flex-wrap"
          >
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 + i * 0.07 }}
                className={`flex-[1_1_40%] md:flex-1 mb-8 md:mb-0 ${i !== 0 ? 'md:border-l md:border-white/10 md:pl-8' : 'md:pl-0'}`}
              >
                <span className="font-serif text-[42px] font-light text-gold-400 block leading-none mb-4">
                  {m.num}
                </span>
                <span className="font-sans text-[12px] md:text-[13px] font-medium tracking-[0.1em] uppercase text-white block">
                  {m.label}
                </span>
                <span className="font-sans text-[13px] text-white/50 italic block mt-1.5">
                  {m.sub}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
