import { useState } from 'react'
import { motion } from 'framer-motion'

const WEBHOOK_URL = 'https://hook.eu2.make.com/ktuw8uc8ommcsopo9db6gltpqd36xrsj'

const checklistItems = [
  { num: '01', text: 'RevPAR stimato per il tuo indirizzo specifico' },
  { num: '02', text: 'Confronto con 5 proprietà simili nella tua zona' },
  { num: '03', text: 'Proiezione revenue: base, buono, ottimo' },
  { num: '04', text: 'Indicazione del tier di gestione più adatto' },
]

const inputClass = 'w-full bg-transparent border-0 border-b border-white/20 focus:border-gold-500 text-white font-sans font-light text-[16px] py-4 outline-none transition-colors duration-300 placeholder:text-dark-200/50'
const labelClass = 'font-sans text-[12px] tracking-[0.2em] uppercase text-gold-500/80 block mb-2'

export default function AnalisiForm() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const payload = {
      tipo: 'analisi_gratuita',
      nome: form.elements.namedItem('nome').value,
      email: form.elements.namedItem('email').value,
      indirizzo: form.elements.namedItem('indirizzo').value,
      tipologia: form.elements.namedItem('tipologia').value,
      stato: form.elements.namedItem('stato').value,
      telefono: form.elements.namedItem('telefono').value,
      messaggio: form.elements.namedItem('messaggio').value,
      timestamp: new Date().toISOString(),
    }
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="analisi" className="bg-dark-900 relative overflow-hidden text-left">
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(184,150,62,0.08) 0%, transparent 70%)' }}
      />

      <div className="py-28 md:py-36 relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: description */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="flex items-center gap-3 font-sans text-[13px] tracking-[0.25em] uppercase text-gold-500 mb-6">
                <span className="w-8 h-px bg-gold-500" />
                Inizia adesso
              </p>
              <h2
                className="font-serif font-light text-white leading-[1.1] mb-8"
                style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
              >
                Scopri quanto rende<br />
                <em className="italic text-gold-400">davvero</em> il tuo immobile.
              </h2>
              <p className="font-sans font-light text-[19px] text-dark-100 leading-relaxed mb-12 max-w-lg">
                Analisi gratuita e personalizzata basata su dati reali di mercato. Nessun impegno. Risposta in 24 ore con 3 scenari di revenue.
              </p>

              <div className="flex flex-col gap-0">
                {checklistItems.map((item, i) => (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="flex gap-6 items-start py-5 border-b border-white/7"
                  >
                    <span className="font-mono text-[12px] text-gold-500 flex-shrink-0 mt-1">{item.num}</span>
                    <p className="font-sans font-light text-[18px] text-dark-100 leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, y: 48, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-dark-800 p-10 md:p-14 border border-dark-700"
              style={{ boxShadow: '0 20px 70px rgba(0,0,0,0.4)' }}
            >
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="py-12 text-center"
                >
                  <p className="font-mono text-[14px] text-green-400 mb-4">✓ Richiesta inviata</p>
                  <p className="font-sans font-light text-[18px] text-dark-100 leading-relaxed">
                    Ti contatteremo entro 24 ore.{' '}
                    <a
                      href="https://wa.me/393393522164"
                      target="_blank" rel="noopener noreferrer"
                      className="text-gold-400 border-b border-gold-400/30"
                    >
                      WhatsApp →
                    </a>
                  </p>
                </motion.div>
              ) : (
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div>
                      <label className={labelClass}>Nome e cognome</label>
                      <input name="nome" type="text" className={inputClass} placeholder="Marco Rossi" required />
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
                      <input name="email" type="email" className={inputClass} placeholder="marco@email.com" required />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Indirizzo immobile (via e zona)</label>
                    <input name="indirizzo" type="text" className={inputClass} placeholder="Via Tortona 12, Navigli" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div>
                      <label className={labelClass}>Tipologia</label>
                      <select name="tipologia" className={inputClass} style={{ appearance: 'none', cursor: 'pointer' }} required defaultValue="">
                        <option value="" disabled>Seleziona</option>
                        {['Monolocale', 'Bilocale', 'Trilocale', 'Quadrilocale o più'].map((o) => (
                          <option key={o} style={{ background: '#111111' }}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Stato attuale</label>
                      <select name="stato" className={inputClass} style={{ appearance: 'none', cursor: 'pointer' }} required defaultValue="">
                        <option value="" disabled>Seleziona</option>
                        {['Sfitto', 'Già su Airbnb (autonomo)', 'Con altro property manager', 'Affitto tradizionale'].map((o) => (
                          <option key={o} style={{ background: '#111111' }}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Telefono (opzionale)</label>
                    <input name="telefono" type="tel" className={inputClass} placeholder="+39 02..." />
                  </div>

                  <div>
                    <label className={labelClass}>Note aggiuntive (opzionale)</label>
                    <textarea
                      name="messaggio" rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="Descrivi brevemente eventuali necessità o dettagli dell'immobile..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mt-6 font-sans text-[13px] font-medium tracking-[0.15em] uppercase bg-gold-500 text-black py-5 hover:bg-gold-400 transition-all duration-300 disabled:opacity-60"
                    style={{ boxShadow: '0 4px 24px rgba(184,150,62,0.3)' }}
                  >
                    {status === 'loading' ? 'Invio in corso...' : 'Ricevi l\'analisi gratuita →'}
                  </button>

                  {status === 'error' && (
                    <p className="font-sans text-[14px] text-red-400 mt-2">
                      Errore. Scrivi a{' '}
                      <a href="mailto:contatti@virtualbnb.it" className="text-gold-400">contatti@virtualbnb.it</a>
                    </p>
                  )}

                  <p className="font-sans text-[13px] text-dark-200 mt-2 flex items-start gap-3">
                    <span className="w-5 h-px bg-gold-500/30 inline-block flex-shrink-0 mt-2.5" />
                    Nessun impegno. L'analisi è 100% gratuita e senza vincoli.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
