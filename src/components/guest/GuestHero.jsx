import { motion } from 'framer-motion'

export default function GuestHero() {
  const lodgifyLink = "https://book.virtualbnb.it" // Placeholder

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-dark-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80")',
        }}
      />
      
      {/* Overlay to darken image */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Content */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-6 md:px-10 w-full text-center flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-mono text-[11px] md:text-[13px] tracking-[0.25em] uppercase text-gold-500 mb-6"
        >
          Miglior Prezzo Garantito sul Sito Ufficiale
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-serif font-light text-white leading-[1.1] mb-8"
          style={{ fontSize: 'clamp(46px, 6vw, 84px)' }}
        >
          Il tuo rifugio perfetto,<br />
          <em className="italic text-gold-400">ti aspetta.</em>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-sans font-light text-[18px] md:text-[22px] text-white/90 max-w-2xl leading-relaxed mb-12"
        >
          Prenota direttamente con VirtualBNB: eviti le commissioni di Airbnb e Booking, e ti garantisci un servizio a 5 stelle.
        </motion.p>

        <motion.a
          href={lodgifyLink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="inline-flex items-center justify-center bg-gold-500 text-black font-sans text-[13px] tracking-[0.1em] uppercase font-medium px-12 py-5 hover:bg-gold-400 transition-colors"
        >
          Cerca una Casa
        </motion.a>
      </div>
    </section>
  )
}
