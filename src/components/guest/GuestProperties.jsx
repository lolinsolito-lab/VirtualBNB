import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function GuestProperties() {
  // Simula il caricamento del widget di Lodgify
  useEffect(() => {
    // In produzione qui verrebbe iniettato lo script fornito da Lodgify
    // es: <script src="https://app.lodgify.com/themes/shared/v3/embed.js"></script>
  }, [])

  return (
    <section id="vetrina" className="py-24 bg-dark-900 border-t border-dark-800">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 font-sans text-[11px] tracking-[0.25em] uppercase text-gold-500 mb-4"
            >
              <span className="w-8 h-px bg-gold-500" />
              Esplora le case
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-[36px] md:text-[48px] text-white leading-tight"
            >
              La nostra <em className="italic text-gold-400">collezione.</em>
            </motion.h2>
          </div>
        </div>

        {/* CONTENITORE WIDGET BOOKING LODGIFY */}
        <div className="w-full min-h-[600px] bg-dark-800 border border-dark-700 rounded-lg p-4 md:p-8 flex flex-col items-center">
          <div className="w-full max-w-5xl" id="lodgify-booking-widget-container">
            {/* 
              NOTA PER LO SVILUPPATORE / PROPRIETARIO:
              Incolla qui dentro il div fornito da Lodgify, ad esempio:
              <div id="lodgify-search-bar" data-website-id="XXXXX"></div>
            */}
            
            {/* Fallback temporaneo finché il widget non è collegato */}
            <div className="flex flex-col items-center justify-center text-center py-20">
              <div className="w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center mb-6">
                <span className="text-[24px]">🏠</span>
              </div>
              <h3 className="font-serif text-[24px] text-white mb-3">Motore di Prenotazione</h3>
              <p className="font-sans text-[15px] text-dark-200 max-w-md mx-auto">
                Il modulo di prenotazione in tempo reale sarà attivo a breve. Qui potrai inserire le tue date e completare la prenotazione al miglior prezzo garantito.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
