import { motion } from 'framer-motion'

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const features = [
  {
    num: '01', icon: '⟳',
    title: 'AI Concierge nel tuo Owner Portal',
    desc: 'Fai qualsiasi domanda sui tuoi immobili in linguaggio naturale, direttamente nella dashboard — "Quanto ho guadagnato questa settimana?" Risposta immediata, senza aspettare fine mese. Nessun PM in Italia lo offre così.',
    badge: 'Esclusivo VirtualBNB',
  },
  {
    num: '02', icon: '↗',
    title: 'Direct booking engine',
    desc: 'Ogni prenotazione diretta su VirtualBNB risparmia il 15-17% di commissione Airbnb. Quel risparmio si divide tra proprietario e noi. Tutti vincono — tranne le OTA.',
    badge: 'Revenue aggiuntivo',
  },
  {
    num: '03', icon: '◎',
    title: 'Pricing AI — ogni 6 ore',
    desc: '200+ variabili in tempo reale: occupazione zona, eventi, meteo, trend. Il prezzo si ottimizza mentre dormi. +20% revenue medio vs prezzo fisso.',
    badge: 'Pricelabs + Wheelhouse',
  },
  {
    num: '04', icon: '▣',
    title: 'Owner portal real-time',
    desc: 'Dashboard personalizzata: revenue, occupazione, prenotazioni future, log manutenzioni aggiornati al secondo. Non aspetti il mese: vedi tutto adesso.',
    badge: 'Accesso H24',
  },
  {
    num: '05', icon: '✦',
    title: 'Standard boutique hotel',
    desc: 'Protocolli di pulizia da hotel. Checklist fotografica ad ogni checkout, manutenzione proattiva ogni 90 giorni, intervento entro 24h su ogni segnalazione.',
    badge: 'Rating medio 4.9 ★',
  },
  {
    num: '06', icon: 'briefcase',
    title: 'Canale corporate B2B (In Arrivo)',
    desc: 'Stiamo sviluppando un circuito privato di aziende per affitti di manager in trasferta a zero commissioni OTA.',
    badge: 'Coming Soon',
  },
]

export default function Servizi() {
  return (
    <section id="servizi" className="bg-cream-100 relative text-left">
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.08) 0%, transparent 100%)' }}
      />

      <div className="py-28 md:py-36">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-600 mb-6"
          >
            <span className="w-8 h-px bg-gold-600" />
            Perché VirtualBNB
          </motion.p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light text-dark-900 leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
          >
            Quello che nessun altro<br />
            property manager in Italia<em className="italic text-gold-600"> offre.</em>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.16 }}
            className="font-sans font-light text-[19px] text-dark-200 max-w-xl leading-relaxed mb-20"
          >
            Sei differenziatori reali — non promesse generiche.
          </motion.p>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-white p-10 md:p-12 border border-cream-200 hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-2 cursor-default"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                {/* Ghost number */}
                <span
                  className="absolute top-6 right-8 font-serif font-light select-none pointer-events-none"
                  style={{ fontSize: '130px', lineHeight: 1, color: 'rgba(184,150,62,0.07)', letterSpacing: '-0.02em' }}
                >
                  {f.num}
                </span>
                <span className="font-mono text-[32px] text-gold-500 mb-6 block leading-none relative z-10">{f.icon}</span>
                <h3 className="font-serif text-[22px] font-normal text-dark-900 mb-4 leading-snug group-hover:text-gold-600 transition-colors duration-300 relative z-10">
                  {f.title}
                </h3>
                <p className="font-sans font-light text-[17px] text-dark-200 leading-relaxed mb-6 relative z-10">{f.desc}</p>
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-gold-600 border-b border-gold-500/30 pb-0.5 relative z-10">
                  {f.badge}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Nota trasparenza — sostituisce il vecchio banner "Rendita
              Stabilizzata / Guaranteed Income". Non è più trattata come un
              prodotto premium a sé: è la stessa logica di compenso a
              percentuale già descritta sopra, resa esplicita per chiarezza.
              Zero soglie, zero meccanismi di "integrazione" — solo commissione
              sul revenue realmente generato. */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-dark-900 p-12 md:p-16"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.25)' }}
          >
            <p className="font-mono text-[12px] tracking-[0.2em] uppercase text-gold-500 mb-4">Come funziona il pagamento</p>
            <h3 className="font-serif text-[32px] font-normal text-white mb-4">
              Guadagni solo su quello che generiamo davvero.
            </h3>
            <p className="font-sans font-light text-[18px] text-dark-100 leading-relaxed max-w-2xl">
              Finché il tuo immobile è online e attivo sui canali di prenotazione, ricevi la tua quota secondo il tier scelto — nessuna trattenuta se non c'è revenue reale da dividere. Se l'immobile è offline (manutenzione, pausa, fuori mercato per tua scelta), non è dovuta alcuna commissione: né a te, né a noi.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
