import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CONSENT_KEY = 'vbnb_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      const t = setTimeout(() => setVisible(true), 1800)
      return () => clearTimeout(t)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem(CONSENT_KEY, 'all')
    setVisible(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem(CONSENT_KEY, 'necessary')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 right-6 z-[150] max-w-2xl bg-dark-700 border border-gold-500/15 p-6 flex items-center gap-6 flex-wrap shadow-2xl"
        >
          <p className="font-sans font-light text-[13px] text-dark-100 leading-6 flex-1 min-w-[200px]">
            Utilizziamo cookie tecnici necessari al funzionamento del sito e cookie analitici anonimi per migliorare l'esperienza.{' '}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: 'privacy' }))}
              className="text-gold-500 hover:text-gold-400 transition-colors underline"
            >
              Privacy Policy & AI
            </button>
          </p>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={acceptNecessary}
              className="font-sans text-[11px] tracking-[0.08em] uppercase text-gold-500 border border-gold-500/40 px-5 py-2.5 hover:bg-gold-500/10 transition-all duration-300"
            >
              Solo necessari
            </button>
            <button
              onClick={acceptAll}
              className="font-sans text-[11px] font-medium tracking-[0.08em] uppercase bg-gold-500 text-black px-5 py-2.5 hover:bg-gold-400 transition-all duration-300"
            >
              Accetta tutti
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
