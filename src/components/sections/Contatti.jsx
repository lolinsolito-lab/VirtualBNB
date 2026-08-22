import { motion } from 'framer-motion'

const WA_LINK = 'https://wa.me/393393522164'

export default function Contatti() {
  return (
    <section id="contatti" className="bg-cream-100 relative text-center">
      <div
        className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.06) 0%, transparent 100%)' }}
      />

      <div className="py-24 md:py-32">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-600 mb-6"
          >
            <span className="w-8 h-px bg-gold-600" />
            Contattaci
            <span className="w-8 h-px bg-gold-600" />
          </motion.p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light text-dark-900 leading-[1.1] mb-16"
            style={{ fontSize: 'clamp(38px, 5vw, 56px)' }}
          >
            Siamo a tua disposizione — <br />
            <em className="italic text-gold-600">senza intermediari.</em>
          </motion.h2>

          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          >
            {/* Email */}
            <div>
              <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-dark-200 mb-3 block">Direzione Generale</p>
              <a
                href="mailto:contatti@virtualbnb.it"
                className="font-serif text-[24px] text-dark-900 hover:text-gold-600 transition-colors break-all border-b border-transparent hover:border-gold-600"
              >
                contatti@virtualbnb.it
              </a>
              <p className="font-sans font-light text-[15px] text-dark-200 mt-3 max-w-[200px] mx-auto">
                Partnership, Corporate e Investitori.
              </p>
            </div>

            {/* WhatsApp */}
            <div className="mt-0 relative before:content-[''] md:before:absolute before:left-0 before:top-4 before:-bottom-4 before:w-px md:after:w-px before:bg-cream-300 after:content-[''] md:after:absolute after:right-0 after:top-4 after:-bottom-4 after:bg-cream-300">
              <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-dark-200 mb-3 block">Linea Diretta 24/7</p>
              <a
                href={WA_LINK}
                target="_blank" rel="noopener noreferrer"
                className="font-serif text-[24px] text-gold-600 hover:text-dark-900 transition-colors"
              >
                WhatsApp →
              </a>
              <p className="font-sans font-light text-[15px] text-dark-200 mt-3 max-w-[200px] mx-auto">
                Per urgenze o supporto rapido per i tuoi immobili.
              </p>
            </div>

            {/* Location */}
            <div>
              <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-dark-200 mb-3 block">Quartier Generale</p>
              <p className="font-serif text-[24px] text-dark-900">Milano, Italia</p>
              <p className="font-sans font-light text-[15px] text-dark-200 mt-3 max-w-[200px] mx-auto">
                Operiamo su tutta la rete immobiliare Italiana.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
