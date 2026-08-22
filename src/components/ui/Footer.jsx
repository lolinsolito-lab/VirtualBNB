import { useState } from 'react'
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
    title: 'Privacy Policy',
    content: (
      <>
        <p>In conformità con il GDPR (UE) 2016/679 e il D.Lgs. 196/2003, i dati personali raccolti sono trattati da VirtualBNB (Insolito Experiences di Michael Jara), con sede in Milano, Italia.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">Dati raccolti</h3>
        <p>Nome, email, telefono, informazioni sull'immobile fornite volontariamente attraverso i form di contatto.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">Finalità</h3>
        <p>Rispondere alle richieste di contatto, fornire analisi gratuite, inviare comunicazioni commerciali previo consenso esplicito.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">I tuoi diritti</h3>
        <p>Hai diritto di accesso, rettifica, e cancellazione dei tuoi dati. Scrivi a <a href="mailto:contatti@virtualbnb.it" className="text-gold-500 border-b border-gold-500/30">contatti@virtualbnb.it</a> per far valere i tuoi diritti.</p>
        <p className="font-mono text-[12px] text-dark-200 mt-10 pt-6 border-t border-gold-500/15">Insolito Experiences · P.IVA IT14379200968 · Aggiornato Aprile 2026</p>
      </>
    ),
  },
  terms: {
    title: 'Termini di Servizio',
    content: (
      <>
        <p>Le presenti Condizioni Generali regolano l'accesso e l'utilizzo del sito web VirtualBNB.it, gestito da Insolito Experiences.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">1. Natura dei Servizi</h3>
        <p>VirtualBNB fornisce servizi di Property Management avanzato e consulenza per affitti brevi. Le simulazioni e le proiezioni di revenue mostrate sul sito ("Analisi Gratuita") sono stime basate sull'analisi algoritmica del mercato locale e non costituiscono garanzia assoluta di rendimento futuro.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">2. Contrattualistica</h3>
        <p>L'effettiva presa in gestione di un immobile è soggetta alla firma di un formale contratto di Property Management, nel quale verranno definiti nel dettaglio le fee (25% o 28%), gli obblighi normativi e i servizi erogati.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">3. Proprietà Intellettuale</h3>
        <p>I contenuti del sito, il marchio, il logo e l'algoritmo visivo sono di proprietà intellettuale di Michael Jara / Insolito Experiences. È severamente vietata la riproduzione, anche parziale, senza autorizzazione esplicita.</p>
        <p className="font-mono text-[12px] text-dark-200 mt-10 pt-6 border-t border-gold-500/15">Insolito Experiences · P.IVA IT14379200968 · Aggiornato Aprile 2026</p>
      </>
    ),
  },
  cookies: {
    title: 'Cookie Policy',
    content: (
      <>
        <p>Questo sito fa uso di cookie tecnici necessari e di tracciamento di terze parti per offrire un'esperienza di navigazione fluida e analizzare in modo anonimo le visite, al fine di migliorare il nostro servizio.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">Cookie Tecnici</h3>
        <p>Necessari per il funzionamento basilare del sito (ad esempio, per ricordare se hai già chiuso o visualizzato la schermata di introduzione iniziale "Splash Screen"). Non richiedono consenso profilato.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">Cookie Analitici</h3>
        <p>Utilizziamo strumenti di profilazione leggera (ad esempio Google Analytics o Meta Pixel) solo per capire come i nostri visitatori interagiscono con la piattaforma, al fine di migliorare l'interfaccia utente. Le informazioni raccolte sono in forma aggregata.</p>
        <h3 className="font-serif text-[22px] text-white mt-8 mb-2">Disattivazione</h3>
        <p>Puoi gestire le tue preferenze sui cookie o disattivarli interamente dalle impostazioni del tuo browser web. Tieni presente che disattivare i cookie tecnici potrebbe compromettere la navigazione del sito.</p>
        <p className="font-mono text-[12px] text-dark-200 mt-10 pt-6 border-t border-gold-500/15">Insolito Experiences · P.IVA IT14379200968 · Aggiornato Aprile 2026</p>
      </>
    ),
  },
}

export default function Footer() {
  const [modal, setModal] = useState(null)

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
            © 2026 VirtualBNB · P.IVA IT14379200968<br />
            Sede Legale: Milano, Italia
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-dark-700 border border-gold-500/15 max-w-3xl w-full max-h-[85vh] overflow-y-auto p-10 md:p-14 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModal(null)}
                className="absolute top-6 right-6 text-dark-100 hover:text-white transition-colors text-2xl font-light"
              >
                ✕
              </button>
              <h2 className="font-serif text-[32px] md:text-[40px] font-light mb-8 text-white">
                {LEGAL[modal]?.title}
              </h2>
              <div className="font-sans font-light text-[17px] md:text-[18px] text-dark-100 leading-relaxed space-y-6">
                {LEGAL[modal]?.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
