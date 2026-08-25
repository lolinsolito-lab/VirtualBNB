import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export default function GuestHero() {
  const lodgifyLink = "https://book.virtualbnb.it"

  return (
    <section className="relative w-full h-[95vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-dark-900">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-dark-900">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
          poster="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80"
        >
          <source src="https://player.vimeo.com/external/494252666.hd.mp4?s=2f223789a64e16dff5a230f81d1136b856eb12ed&profile_id=175" type="video/mp4" />
        </video>
        {/* Gradients to blend video with the background */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-transparent to-dark-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-6 md:px-10 w-full text-center flex flex-col items-center mt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-12 h-px bg-gold-500" />
          <span className="font-mono text-[12px] md:text-[14px] tracking-[0.3em] uppercase text-gold-500">
            La tua vacanza perfetta
          </span>
          <span className="w-12 h-px bg-gold-500" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-serif font-light text-white leading-[1.05] mb-8 drop-shadow-2xl"
          style={{ fontSize: 'clamp(52px, 8vw, 110px)' }}
        >
          Soggiorna in case<br />
          <em className="italic text-gold-400 font-serif">straordinarie.</em>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-sans font-light text-[18px] md:text-[24px] text-white/90 max-w-3xl leading-relaxed mb-12 drop-shadow-lg"
        >
          Prenotando dal sito ufficiale salti le commissioni dei portali (fino al 15% in meno). Comfort esclusivo e Assistente Digitale H24 a tua disposizione.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a
            href={lodgifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center bg-gold-500 text-black font-sans text-[14px] tracking-[0.1em] uppercase font-medium px-12 py-5 overflow-hidden w-full sm:w-auto"
          >
            <span className="relative z-10">Cerca disponibilità</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
          </a>
          
          <button 
            onClick={() => document.getElementById('vetrina')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-3 font-sans text-[13px] tracking-[0.1em] uppercase text-white hover:text-gold-400 transition-colors"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/30 backdrop-blur-sm">
              <Play size={14} className="ml-1" fill="currentColor" />
            </span>
            Scopri la vetrina
          </button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold-500 to-transparent" />
      </motion.div>
    </section>
  )
}
