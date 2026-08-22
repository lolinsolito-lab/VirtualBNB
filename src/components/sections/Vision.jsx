import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const APARTMENT_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'
const MICHAEL_IMAGE = 'https://www.dropbox.com/scl/fi/qwqs12w3qcvbeycdpyk7p/me.jpg?rlkey=4jmmxxvnrihx4vzutj9jc6ncl&st=sjkmvmel&raw=1'

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const principles = [
  {
    key: 'Dati > opinioni',
    text: 'Ogni decisione — pricing, valutazione, report — si basa su dati misurabili. Mai generalizzazioni. Solo numeri reali analizzati ogni 6 ore.',
  },
  {
    key: 'AI-first',
    text: 'Il 90% dell\'operativo è automatizzato dal primo giorno per azzerare gli errori. Il nostro intervento umano si concentra sul 10% che richiede empatia e giudizio strategico.',
  },
  {
    key: 'Trasparenza radicale',
    text: 'Il proprietario sa sempre tutto. Non aspetta il PDF a fine mese. Ha una finestra sempre aperta e in tempo reale sul suo asset tramite un portal digitale dedicato.',
  },
  {
    key: 'Direct-first',
    text: 'Ogni prenotazione diretta è una commissione (15-20%) OTA risparmiata. Costruiamo canali B2B propri che generano reddito netto per i proprietari senza intermediari costi.',
  },
  {
    key: 'Zero franchising',
    text: 'Gestiamo direttamente, senza affiliati o sub-appalti scadenti. L\'eccellenza non è scalabile compromettendo la qualità: chi gestisce il tuo appartamento è il nostro team.',
  },
]

export default function Vision() {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeP, setActiveP] = useState(null)

  return (
    <>
      <section id="vision" className="bg-dark-900 relative overflow-hidden">
        {/* Glow */}
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(184,150,62,0.06) 0%, transparent 60%)' }}
        />

        <div className="py-28 md:py-36 relative z-10">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-500 mb-6"
            >
              <span className="w-8 h-px bg-gold-500" />
              La nostra missione
            </motion.p>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-light text-white leading-[1.1] mb-16"
              style={{ fontSize: 'clamp(38px, 5vw, 60px)' }}
            >
              La visione di<br />
              <button
                onClick={() => setModalOpen(true)}
                className="group relative cursor-pointer outline-none overflow-hidden inline-block"
              >
                <em className="italic text-gold-400 group-hover:text-gold-300 transition-colors duration-500 inline-block transform group-hover:scale-[1.02]">
                  Michael Jara
                </em>
                <span className="absolute bottom-1 left-0 w-full h-[1px] bg-gold-400/50 transform origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500" />
                <span className="absolute bottom-1 right-0 w-full h-[1px] bg-gold-300 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
              </button>
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              {/* Left column */}
              <motion.div
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                {/* Photo with hover effect */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="group relative mb-12 overflow-hidden w-full text-left cursor-pointer outline-none block"
                  style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
                >
                  <div className="h-[400px] w-full overflow-hidden">
                    <img
                      src={APARTMENT_IMAGE}
                      alt="Appartamento VirtualBNB"
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-[0.22,1,0.36,1]"
                    />
                  </div>
                  <div
                    className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                    <div>
                      <p className="font-mono text-[12px] tracking-[0.15em] uppercase text-gold-500 mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        Italia · Portfolio VirtualBNB
                      </p>
                      <p className="font-serif text-[28px] text-white leading-none">Michael Jara</p>
                      <p className="font-sans text-[12px] tracking-[0.2em] uppercase text-dark-200 mt-2 flex items-center gap-2 group-hover:text-gold-400 transition-colors">
                        Founder & CEO{' '}
                        <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </p>
                    </div>
                  </div>
                </button>

                {/* Quote */}
                <div className="relative pl-8 mb-8">
                  <span className="absolute left-0 top-0 text-gold-500/20 font-serif text-8xl leading-none -mt-4 -ml-2">"</span>
                  <blockquote className="font-serif text-[26px] md:text-[30px] font-light italic leading-relaxed text-white relative z-10">
                    Il vero lusso per un proprietario non è avere un appartamento stupendo. È poter generare ricchezza senza mai dover pensare a quel che accade dentro.
                  </blockquote>
                </div>

                <p className="font-sans font-light text-[18px] md:text-[20px] text-dark-100 leading-relaxed pl-8">
                  La visione di VirtualBNB unisce la tradizionale cura italiana per l'immobile con l'efficienza chirurgica dei più moderni sistemi AI di Pricing e gestione patrimoniale. Non gestiamo prenotazioni: custodiamo e moltiplichiamo il valore del tuo asset nel tempo.
                </p>
              </motion.div>

              {/* Right column: principles */}
              <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                className="pt-8"
              >
                <p className="font-sans text-[13px] tracking-[0.25em] uppercase text-dark-300 mb-8 border-b border-dark-700 pb-4">
                  I Principi Fondatori
                </p>

                <div className="flex flex-col gap-2">
                  {principles.map((p, i) => {
                    const isOpen = activeP === i
                    return (
                      <motion.div
                        key={p.key}
                        initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className={`group px-6 py-6 border transition-all duration-500 cursor-pointer ${
                          isOpen
                            ? 'bg-dark-800 border-gold-500 shadow-[0_10px_30px_rgba(184,150,62,0.1)]'
                            : 'bg-transparent border-white/5 hover:border-gold-500/30 hover:bg-dark-800/50'
                        }`}
                        onClick={() => setActiveP(isOpen ? null : i)}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className={`font-mono text-[14px] md:text-[15px] tracking-[0.15em] uppercase transition-colors duration-300 ${isOpen ? 'text-gold-400 font-semibold' : 'text-dark-200 group-hover:text-gold-500'}`}>
                            <span className="opacity-40 mr-4">0{i + 1}</span>
                            {p.key}
                          </h4>
                          <span className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen ? 'border-gold-500 bg-gold-500/10 rotate-180' : 'border-dark-600 group-hover:border-gold-500/50'}`}>
                            <svg className={`w-4 h-4 transition-colors ${isOpen ? 'text-gold-500' : 'text-dark-300 group-hover:text-gold-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isOpen ? 2 : 1.5} d={isOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                            </svg>
                          </span>
                        </div>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: '20px' }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="font-sans font-light text-[17px] md:text-[19px] text-white leading-relaxed pb-2">
                                {p.text}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </div>

                {/* CTA box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.6 }}
                  className="mt-14 p-10 border border-gold-500/20 relative overflow-hidden group"
                  style={{ background: 'rgba(184,150,62,0.03)' }}
                >
                  <div className="absolute inset-0 bg-gold-500/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22,1,0.36,1]" />
                  <div className="relative z-10">
                    <p className="font-sans font-light text-[19px] text-white leading-relaxed mb-8">
                      Vuoi capire se il tuo immobile è un asset <strong className="font-normal text-gold-400">ideale</strong> per gli affitti brevi?
                      La prima analisi strategica sul tuo immobile è gratuita.
                    </p>
                    <button
                      onClick={() => scrollTo('analisi')}
                      className="font-sans text-[13px] font-medium tracking-[0.15em] uppercase text-black bg-gold-500 px-8 py-4 hover:bg-white hover:scale-105 transition-all duration-300"
                    >
                      Ricevi la tua analisi →
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Michael Jara Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(15px)' }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-dark-900 border border-gold-500/20 shadow-[-20px_20px_80px_rgba(0,0,0,0.8)] flex flex-col md:flex-row relative cursor-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-12 h-12 flex items-center justify-center bg-dark-800 border border-white/10 hover:bg-gold-500 hover:text-black hover:border-gold-500 text-white rounded-full transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Photo panel */}
              <div className="w-full md:w-[45%] relative min-h-[300px] md:min-h-[600px] bg-dark-900 overflow-hidden">
                <img
                  src={MICHAEL_IMAGE}
                  alt="Michael Jara"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80 hover:mix-blend-normal hover:opacity-100 transition-all duration-1000 transform hover:scale-105"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)' }}
                />
                <div className="absolute bottom-8 left-8 text-left z-10">
                  <h3 className="font-serif text-[40px] font-light text-white mb-1">Michael Jara</h3>
                  <p className="font-mono text-[12px] tracking-[0.25em] uppercase text-gold-500">Founder & CEO</p>
                </div>
              </div>

              {/* Text panel */}
              <div className="w-full md:w-[55%] p-8 md:p-14 overflow-y-auto max-h-[85vh] text-left bg-dark-900 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[80px] pointer-events-none" />
                <p className="font-mono text-[12px] tracking-[0.2em] uppercase text-gold-600 mb-6">Executive Profile</p>
                <h2
                  className="font-serif font-light text-white leading-[1.05] mb-10"
                  style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
                >
                  L'Arte dell'Ospitalità,<br />
                  <em className="italic text-gold-500">Ridefinita.</em>
                </h2>

                <div className="font-sans font-light text-[17px] md:text-[18px] text-dark-100 leading-relaxed space-y-6">
                  <p>
                    Michael Jara è un imprenditore visionario che ha dedicato gli ultimi 7 anni a perfezionare l'arte del Property Management.
                    Costruendo un background internazionale e una profonda conoscenza analitica, ha fondato VirtualBNB per elevare drasticamente gli standard asfissianti del settore.
                  </p>
                  <p className="text-white text-[19px] italic border-l-2 border-gold-500 pl-6 my-8">
                    "Ogni proprietà ha un'anima, e la tecnologia serve a farla risplendere massimizzandone il guadagno, non a sostituirla con freddi codici seriali."
                  </p>
                  <p>
                    Pioniere nell'adozione di algoritmi di Intelligenza Artificiale per il Dynamic Pricing in Italia, Michael ha creato un ecosistema dove l'efficienza digitale si fonde armoniosamente con la cura umana.
                    VirtualBNB non gestisce semplicemente immobili: ingegnerizza la tua rendita passiva tutelando il tuo immobile.
                  </p>
                </div>

                <div className="mt-14 pt-8 border-t border-gold-500/20">
                  <p className="font-sans text-[14px] text-dark-200">
                    <strong className="font-serif text-2xl font-light text-white block mb-3">Parla con la direzione.</strong>
                    Per grandi portafogli, opportunità di business B2B o investimenti immobiliari:
                  </p>
                  <a
                    href="mailto:contatti@virtualbnb.it"
                    className="inline-block mt-4 font-mono text-[13px] tracking-[0.1em] text-black bg-gold-500 px-8 py-3 hover:bg-white transition-colors uppercase"
                  >
                    Contatta il CEO
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
