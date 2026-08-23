import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Servizi', id: 'servizi' },
  { label: 'Prezzi', id: 'prezzi' },
  { label: 'Executive', id: 'corporate' },
  { label: 'Vision', id: 'vision' },
]

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const EMAIL_GDPR = 'lolinsolito@gmail.com'      // Richieste GDPR e privacy
const EMAIL_PEC  = 'insolitoproperty@pec.it'    // Corrispondenza formale e legale

const LEGAL = {
  privacy: {
    title: 'Privacy Policy',
    content: (
      <>
        <p className="text-sm text-dark-300 mb-6">Ultimo aggiornamento: 23 Agosto 2026</p>

        <h3 className="font-serif text-[20px] text-white mt-6 mb-2">1. Titolare del trattamento</h3>
        <p>Insolito Experiences di Jara Lloctun Michael Sergio, P.IVA 14379200968, con sede in Via Uboldo n. 8, 20063 Cernusco sul Naviglio (MI). Per qualsiasi richiesta relativa al trattamento dei tuoi dati personali: <a href={`mailto:${EMAIL_GDPR}`} className="text-gold-500 border-b border-gold-500/30">{EMAIL_GDPR}</a>.</p>

        <h3 className="font-serif text-[20px] text-white mt-8 mb-2">2. Dati raccolti</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Dati di contatto (nome, email, telefono) forniti tramite il form "Analisi Gratuita" o altri moduli del sito</li>
          <li>Dati sull'immobile forniti da proprietari interessati alla gestione (indirizzo, tipologia, stato attuale)</li>
          <li>Dati di account per proprietari registrati (credenziali gestite tramite il nostro fornitore di autenticazione)</li>
          <li>Conversazioni WhatsApp con ospiti e proprietari, gestite tramite il nostro assistente virtuale</li>
          <li>Dati tecnici (indirizzo IP, log di accesso) per finalità di sicurezza</li>
        </ul>

        <h3 className="font-serif text-[20px] text-white mt-8 mb-2">3. Finalità del trattamento</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Fornire il servizio di gestione della proprietà richiesto</li>
          <li>Rispondere a richieste di informazioni e qualificare richieste di gestione</li>
          <li>Gestire la comunicazione operativa con ospiti tramite assistente virtuale basato su intelligenza artificiale</li>
          <li>Adempiere a obblighi contrattuali e fiscali</li>
        </ul>

        <h3 className="font-serif text-[20px] text-white mt-8 mb-2">4. Uso di intelligenza artificiale</h3>
        <p>Per rispondere automaticamente a richieste su WhatsApp e nella dashboard, utilizziamo un assistente basato sull'API di Anthropic (Claude). I messaggi che scambi con l'assistente vengono elaborati da questo fornitore terzo secondo la sua <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-gold-500 border-b border-gold-500/30">informativa privacy</a> al solo fine di generare una risposta. Anthropic non utilizza i dati inviati tramite API commerciale per addestrare i propri modelli.</p>

        <h3 className="font-serif text-[20px] text-white mt-8 mb-2">5. Conservazione dei dati</h3>
        <p>I dati sono conservati per il tempo necessario a fornire il servizio e adempiere agli obblighi di legge (tipicamente 10 anni per la documentazione fiscale). I lead non convertiti in clienti vengono conservati per un massimo di 24 mesi, salvo richiesta di cancellazione anticipata.</p>

        <h3 className="font-serif text-[20px] text-white mt-8 mb-2">6. I tuoi diritti</h3>
        <p>Ai sensi degli artt. 15-22 del GDPR, hai diritto di accesso, rettifica, cancellazione, limitazione del trattamento, portabilità dei dati e opposizione. Per esercitarli scrivi a <a href={`mailto:${EMAIL_GDPR}`} className="text-gold-500 border-b border-gold-500/30">{EMAIL_GDPR}</a>. Hai inoltre diritto di proporre reclamo al Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-gold-500 border-b border-gold-500/30">garanteprivacy.it</a>).</p>

        <h3 className="font-serif text-[20px] text-white mt-8 mb-2">7. Fornitori terzi (sub-responsabili del trattamento)</h3>
        <table className="w-full text-sm mt-4 border-collapse">
          <thead><tr className="border-b border-dark-600"><th className="text-left py-2 text-dark-300 font-normal">Fornitore</th><th className="text-left py-2 text-dark-300 font-normal">Finalità</th></tr></thead>
          <tbody>
            <tr className="border-b border-dark-700"><td className="py-2 pr-4">Supabase Inc.</td><td className="py-2 text-dark-200">Hosting database e autenticazione</td></tr>
            <tr className="border-b border-dark-700"><td className="py-2 pr-4">Vercel Inc.</td><td className="py-2 text-dark-200">Hosting applicazione</td></tr>
            <tr className="border-b border-dark-700"><td className="py-2 pr-4">Anthropic PBC</td><td className="py-2 text-dark-200">Elaborazione AI delle conversazioni</td></tr>
            <tr><td className="py-2 pr-4">Meta Platforms Ireland Ltd.</td><td className="py-2 text-dark-200">Infrastruttura di messaggistica WhatsApp Business</td></tr>
          </tbody>
        </table>

        <p className="font-mono text-[12px] text-dark-400 mt-10 pt-6 border-t border-gold-500/15">Insolito Experiences di Jara Lloctun Michael Sergio · P.IVA IT14379200968 · CF JRLMHL86P14Z611F · Via Uboldo n. 8, 20063 Cernusco sul Naviglio (MI)</p>
      </>
    ),
  },
  terms: {
    title: 'Termini di Servizio',
    content: (
      <>
        <p className="text-sm text-dark-300 mb-6">Ultimo aggiornamento: 23 Agosto 2026</p>

        <h3 className="font-serif text-[20px] text-white mt-6 mb-2">1. Il servizio</h3>
        <p>VirtualBNB, un servizio di Insolito Experiences di Jara Lloctun Michael Sergio (P.IVA 14379200968), offre gestione professionale di affitti brevi per conto di proprietari immobiliari, inclusa comunicazione con gli ospiti tramite assistente virtuale.</p>

        <h3 className="font-serif text-[20px] text-white mt-8 mb-2">2. Accesso e account</h3>
        <p>L'accesso alla piattaforma per i proprietari avviene solo su invito. Sei responsabile della riservatezza delle tue credenziali di accesso e di ogni attività svolta tramite il tuo account.</p>

        <h3 className="font-serif text-[20px] text-white mt-8 mb-2">3. Rapporto contrattuale con i proprietari</h3>
        <p>I termini economici specifici (commissioni, modalità di rendicontazione, durata dell'incarico) sono regolati da un contratto di gestione separato, sottoscritto individualmente con ciascun proprietario. I presenti Termini regolano esclusivamente l'uso della piattaforma digitale.</p>

        <h3 className="font-serif text-[20px] text-white mt-8 mb-2">4. Limitazione di responsabilità sull'assistente AI</h3>
        <p>L'assistente virtuale fornisce informazioni operative di base (orari, regole della casa, informazioni sulla zona). Le risposte sono generate automaticamente e, per quanto curate, possono contenere imprecisioni. Per richieste urgenti o di natura contrattuale, contattaci direttamente. Non ci assumiamo responsabilità per decisioni prese esclusivamente sulla base di una risposta automatica dell'assistente.</p>

        <h3 className="font-serif text-[20px] text-white mt-8 mb-2">5. Recesso</h3>
        <p>Il proprietario può richiedere la cessazione dell'incarico secondo i termini previsti dal contratto di gestione individuale. La chiusura dell'account sulla piattaforma non costituisce di per sé recesso dal contratto di gestione.</p>

        <h3 className="font-serif text-[20px] text-white mt-8 mb-2">6. Legge applicabile</h3>
        <p>I presenti Termini sono regolati dalla legge italiana. Per ogni controversia è competente il foro di Milano, salvo diversa previsione inderogabile a tutela del consumatore.</p>

        <p className="font-mono text-[12px] text-dark-400 mt-10 pt-6 border-t border-gold-500/15">Insolito Experiences di Jara Lloctun Michael Sergio · P.IVA IT14379200968 · Via Uboldo n. 8, 20063 Cernusco sul Naviglio (MI) · PEC: <a href={`mailto:${EMAIL_PEC}`} className="text-gold-500">{EMAIL_PEC}</a></p>
      </>
    ),
  },
  cookies: {
    title: 'Cookie Policy',
    content: (
      <>
        <p className="text-sm text-dark-300 mb-6">Ultimo aggiornamento: 23 Agosto 2026</p>

        <p>Piccoli file salvati sul tuo dispositivo che permettono al sito di funzionare correttamente e, se acconsenti, di raccogliere statistiche d'uso.</p>

        <h3 className="font-serif text-[20px] text-white mt-8 mb-4">Cookie utilizzati</h3>
        <table className="w-full text-sm border-collapse">
          <thead><tr className="border-b border-dark-600"><th className="text-left py-2 text-dark-300 font-normal">Tipo</th><th className="text-left py-2 text-dark-300 font-normal">Finalità</th><th className="text-left py-2 text-dark-300 font-normal">Consenso</th></tr></thead>
          <tbody>
            <tr className="border-b border-dark-700"><td className="py-2 pr-4">Tecnici / di sessione</td><td className="py-2 pr-4 text-dark-200">Mantenere l'accesso effettuato (Supabase Auth)</td><td className="py-2 text-green-400 text-xs">Non richiesto</td></tr>
            <tr className="border-b border-dark-700"><td className="py-2 pr-4">Preferenze</td><td className="py-2 pr-4 text-dark-200">Ricordare le scelte sull'interfaccia</td><td className="py-2 text-green-400 text-xs">Non richiesto</td></tr>
            <tr><td className="py-2 pr-4">Analitici</td><td className="py-2 pr-4 text-dark-200">Statistiche d'uso aggregate e anonime</td><td className="py-2 text-gold-500 text-xs">Richiesto</td></tr>
          </tbody>
        </table>

        <h3 className="font-serif text-[20px] text-white mt-8 mb-2">Come gestire i cookie</h3>
        <p>Puoi modificare le tue preferenze in qualsiasi momento tramite il banner cookie presente sul sito, oppure dalle impostazioni del tuo browser.</p>

        <p className="font-mono text-[12px] text-dark-400 mt-10 pt-6 border-t border-gold-500/15">Insolito Experiences di Jara Lloctun Michael Sergio · P.IVA IT14379200968 · <a href={`mailto:${EMAIL_GDPR}`} className="text-gold-500">{EMAIL_GDPR}</a></p>
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
            P.IVA IT14379200968 <br />
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
