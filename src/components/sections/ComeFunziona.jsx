import { motion } from 'framer-motion'

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
})

const steps = [
  {
    num: '01',
    tag: 'Analisi · Studio di fattibilità',
    title: 'Valutazione e proiezioni di mercato',
    desc: 'Non accettiamo ogni immobile. Partiamo da un audit rigoroso del tuo asset. Incrociamo i dati reali del tuo indirizzo con i nostri benchmark per offrirti tre proiezioni di guadagno realistiche (base, buono, ottimo). Solo numeri, niente promesse fittizie.',
  },
  {
    num: '02',
    tag: 'Setup · Ottimizzazione Asset',
    title: 'Preparazione e scatti editoriali',
    desc: 'Trasformiamo l\'immobile in un prodotto premium progettato per convertire. Installazione sistemi smart, styling d\'interni minimale, servizio fotografico professionale e copywriting neuromarketing. Tutto orchestrato per massimizzare la visibilità.',
  },
  {
    num: '03',
    tag: 'Go Live · Intelligenza Artificiale',
    title: 'Distribuzione e Dynamic Pricing',
    desc: 'Sincronizzazione simultanea su Airbnb, Booking.com, VRBO e i nostri canali B2B Executive. I nostri algoritmi proprietari aggiornano le tue tariffe ogni 6 ore analizzando centinaia di variabili, garantendo il prezzo perfetto per ogni singola notte.',
  },
  {
    num: '04',
    tag: 'Gestione · Trasparenza 100%',
    title: 'Tu hai il controllo. Noi facciamo il lavoro.',
    desc: 'Il nostro team multilingua gestisce il 100% dell\'ospite H24 e delle manutenzioni. Tu non pensi a nulla, ma vedi tutto: tramite il tuo Owner Portal monitori in diretta le prenotazioni, il tasso di occupazione e le rendite nette. Bonifico e report automatici ogni mese.',
  },
]

export default function ComeFunziona() {
  return (
    <section id="come-funziona" className="bg-dark-900 relative overflow-hidden text-left">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(184,150,62,0.06) 0%, transparent 70%)' }}
      />

      <div className="py-28 md:py-36 relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          {/* Label */}
          <motion.p
            {...anim(0)}
            className="flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-500 mb-6"
          >
            <span className="w-8 h-px bg-gold-500" />
            Il Metodo VirtualBNB
          </motion.p>

          {/* Title */}
          <motion.h2
            {...anim(0.08)}
            className="font-serif font-light text-white leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
          >
            Dall'analisi alla messa a reddito:<br />
            <em className="italic text-gold-400">un processo ingegnerizzato.</em>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            {...anim(0.16)}
            className="font-sans font-light text-[19px] text-dark-100 max-w-2xl leading-relaxed mb-20"
          >
            Non crediamo nelle formule magiche. Applichiamo un metodo rigoroso ed esclusivo per trasformare il tuo immobile in un vero asset ad alto rendimento, tutelando te e la tua proprietà.
          </motion.p>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-10 md:p-14 bg-dark-800 border border-dark-700 hover:border-gold-500/40 transition-all duration-500 hover:-translate-y-2 cursor-default"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
              >
                {/* Ghost number */}
                <span
                  className="absolute top-6 right-8 font-serif font-light select-none pointer-events-none transition-all duration-500"
                  style={{ fontSize: '140px', lineHeight: 1, color: 'rgba(184,150,62,0.06)', letterSpacing: '-0.02em' }}
                >
                  {step.num}
                </span>

                <p className="font-mono text-[12px] tracking-[0.2em] uppercase text-gold-500 mb-6 relative z-10">
                  {step.tag}
                </p>
                <h3 className="font-serif text-[26px] font-normal text-white leading-snug mb-5 group-hover:text-gold-300 transition-colors duration-400 relative z-10">
                  {step.title}
                </h3>
                <p className="font-sans font-light text-[18px] text-dark-100 leading-relaxed relative z-10">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
