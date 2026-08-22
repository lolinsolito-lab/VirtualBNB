import { motion, AnimatePresence } from 'framer-motion'

const WORD = 'VIRTUALBNB'
const GOLD_START = 7 // "BNB" in gold

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.4 }
  },
  exit: {
    y: '-100%',
    transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
  }
}

const letterVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function SplashScreen({ onEnter }) {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-dark-900 flex flex-col items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(184,150,62,0.09) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated word */}
        <div className="flex overflow-hidden mb-8">
          {WORD.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className={`font-serif tracking-[0.12em] font-light ${i >= GOLD_START ? 'text-gold-500' : 'text-white'}`}
              style={{ fontSize: 'clamp(40px, 10vw, 80px)' }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Gold line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 80, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-gold-500 mb-12"
        />

        {/* Enter button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.7 }}
          onClick={onEnter}
          className="group relative px-10 py-4 overflow-hidden font-sans text-[11px] tracking-[0.35em] uppercase"
        >
          <span className="relative z-10 text-white group-hover:text-black transition-colors duration-500">
            Enter Experience
          </span>
          <span className="absolute inset-0 bg-gold-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
          <span className="absolute inset-0 border border-gold-500/40 group-hover:border-transparent transition-colors duration-500" />
        </motion.button>
      </div>

      {/* Bottom label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-12 font-mono text-[10px] tracking-[0.25em] text-gold-500/35 uppercase"
      >
        Insolito Experiences
      </motion.p>
    </motion.div>
  )
}
