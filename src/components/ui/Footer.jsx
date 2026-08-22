import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Servizi', id: 'servizi' },
  { label: 'Prezzi', id: 'prezzi' },
  { label: 'Executive', id: 'corporate' },
  { label: 'Vision', id: 'vision' },
]

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const LEGAL = {
  privacy: {
    title: 'Privacy Policy & AI',
    content: (
      <>
        <p>In conformità con il GDPR (UE) 2016/679, il D.Lgs. 196/2003 e le linee guida dell'AI Act europeo, i dati personali raccolti sono trattati da VirtualBNB (Insolito Experiences di Michael Jara), con sede legale in Via [Tua Via], Milano, Italia.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">Dati raccolti e Finalità</h3>
        <p>Raccogliamo nome, email, telefono e informazioni sull'immobile al fine di rispondere alle richieste di contatto, fornire stime di revenue (Analisi Gratuita) e, previo consenso esplicito, per comunicazioni commerciali.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">Uso dell'Intelligenza Artificiale</h3>
        <p>Per offrire un servizio all'avanguardia, utilizziamo sistemi di Intelligenza Artificiale (inclusi algoritmi di terze parti come OpenAI) per la gestione automatizzata delle tariffe (Dynamic Pricing) e per l'assistenza via chat (AI WhatsApp). I dati inseriti nella chat WhatsApp potrebbero essere elaborati da server esterni unicamente al fine di generare risposte coerenti. Non usiamo i tuoi dati sensibili per addestrare modelli pubblici.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">I tuoi diritti</h3>
        <p>Hai diritto di accesso, rettifica e cancellazione dei dati (Diritto all'Oblio). Scrivi alla nostra PEC o all'indirizzo <a href="mailto:contatti@virtualbnb.it" className="text-gold-500 border-b border-gold-500/30">contatti@virtualbnb.it</a> per far valere i tuoi diritti.</p>
        <p className="font-mono text-[12px] text-dark-200 mt-10 pt-6 border-t border-gold-500/15">Insolito Experiences · P.IVA IT14379200968 · REA: [Il tuo REA]</p>
      </>
    ),
  },
  terms: {
    title: 'Termini di Servizio',
    content: (
      <>
        <p>Le presenti Condizioni Generali regolano l'accesso e l'utilizzo del sito web VirtualBNB.it, gestito da Insolito Experiences.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">1. Natura dei Servizi e Simulazioni AI</h3>
        <p>VirtualBNB fornisce servizi di Property Management avanzato. Le proiezioni di revenue mostrate sul sito ("Analisi Gratuita") sono stime basate sull'analisi algoritmica del mercato. Sebbene altamente precise, non costituiscono in alcun modo una garanzia contrattuale di rendimento futuro, salvo dove esplicitamente indicato dal contratto "Guaranteed Yield".</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">2. Contrattualistica e "Guaranteed Yield"</h3>
        <p>L'effettiva presa in gestione di un immobile e l'eventuale erogazione della "Rendita Garantita" (Guaranteed Yield) sono subordinate a un'insindacabile analisi di fattibilità da parte della direzione e alla successiva firma di un formale contratto di Property Management.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">3. Proprietà Intellettuale</h3>
        <p>I contenuti del sito, il marchio, il logo e le interfacce visive sono di esclusiva proprietà intellettuale di Michael Jara / Insolito Experiences. È severamente vietata la riproduzione, anche parziale.</p>
        <p className="font-mono text-[12px] text-dark-200 mt-10 pt-6 border-t border-gold-500/15">Insolito Experiences · P.IVA IT14379200968 · REA: [Il tuo REA]</p>
      </>
    ),
  },
  cookies: {
    title: 'Cookie Policy',
    content: (
      <>
        <p>Questo sito fa uso di cookie tecnici strettamente necessari e di tracciamento di terze parti per analizzare in modo anonimo le visite e migliorare il servizio.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">Cookie Tecnici</h3>
        <p>Necessari per il funzionamento basilare del sito (es. per ricordare le tue preferenze sulla privacy stessa). Non richiedono consenso preventivo.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">Cookie Analitici e di Profilazione</h3>
        <p>Previo tuo esplicito consenso, utilizziamo strumenti (es. Meta Pixel o Google Analytics) per comprendere le interazioni con la piattaforma. I dati raccolti aiutano a ottimizzare l'interfaccia e mostrare comunicazioni pertinenti.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">Disattivazione</h3>
        <p>Puoi ritirare il consenso in qualsiasi momento o gestire le tue preferenze direttamente dalle impostazioni del tuo browser web.</p>
        <p className="font-mono text-[12px] text-dark-200 mt-10 pt-6 border-t border-gold-500/15">Insolito Experiences · P.IVA IT14379200968 · REA: [Il tuo REA]</p>
      </>
    ),
  },
}

export default function Footer() {
  const [modal, setModal] = useState(null)

  // Ascolta eventi esterni per aprire il modal (es. dal CookieBanner)
  useEffect(() => {
    const handleOpenModal = (e) => setModal(e.detail)
    window.addEventListener('open-legal-modal', handleOpenModal)
    return () => window.removeEventListener('open-legal-modal', handleOpenModal)
  }, [])

  // Blocca lo scroll del body quando un modal è aperto
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modal])

  const closeModal = () => setModal(null)

  return (
    <>
      <footer className="bg-dark-900 border-t border-gold-500/12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 flex items-center justify-between flex-wrap gap-8">
          {/* Logo */}
          <div className="font-serif text-[20px] tracking-widest">
            VIRTUAL<span className="text-gold-500">BNB</span>
          </div>

          {/* Nav + Legal links */}
          <div className="flex gap-6 md:gap-8 flex-wrap items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-sans text-[13px] tracking-[0.08em] text-dark-200 hover:text-white transition-colors uppercase"
              >
                {item.label}
              </button>
            ))}
            <span className="w-px h-4 bg-dark-700 hidden md:block" />
            <div className="flex gap-6 w-full md:w-auto mt-4 md:mt-0">
              {[
                { label: 'Privacy', key: 'privacy' },
                { label: 'Termini', key: 'terms' },
                { label: 'Cookie', key: 'cookies' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setModal(item.key)}
                  className="font-sans text-[13px] tracking-[0.08em] text-dark-200 hover:text-white transition-colors uppercase"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Legal info */}
          <div className="font-sans text-[13px] text-dark-200 leading-relaxed text-left md:text-right w-full md:w-auto">
            © 2026 VirtualBNB by Insolito Experiences<br />
            P.IVA IT14379200968 · REA: MI-[TuoNumeroREA] <br />
            PEC: virtualbnb@pec.it · Milano, Italia
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-dark-700 border border-gold-500/15 max-w-3xl w-full max-h-[88vh] overflow-y-auto p-8 md:p-14 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button — grande e touch-friendly */}
              <button
                onClick={closeModal}
                aria-label="Chiudi"
                className="absolute top-3 right-3 md:top-6 md:right-6 z-30 w-12 h-12 flex items-center justify-center bg-dark-900/90 border border-white/20 text-white rounded-full hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="font-serif text-[28px] md:text-[40px] font-light mb-8 text-white pr-10">
                {LEGAL[modal]?.title}
              </h2>
              <div className="font-sans font-light text-[16px] md:text-[18px] text-dark-100 leading-relaxed space-y-6">
                {LEGAL[modal]?.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
