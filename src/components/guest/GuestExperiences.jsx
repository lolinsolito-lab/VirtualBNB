import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Private Chef a Domicilio',
    desc: 'Goditi una cena stellata direttamente nella tua villa.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Tour in Barca Privata',
    desc: 'Esplora le coste più esclusive lontano dalla folla.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Degustazione in Cantina',
    desc: 'Visite riservate nelle migliori cantine locali.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800',
  }
]

export default function GuestExperiences() {
  return (
    <section id="esperienze" className="py-24 bg-dark-900 border-t border-dark-800">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold-400">Coming Soon</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-[36px] md:text-[48px] text-white leading-tight mb-4"
          >
            Molto più di un <em className="italic text-gold-400">soggiorno.</em>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-[16px] text-dark-200 max-w-2xl"
          >
            Stiamo selezionando per te esperienze esclusive per rendere la tua vacanza indimenticabile. Presto potrai prenotare servizi premium direttamente dal tuo Concierge virtuale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-lg aspect-[4/5] bg-dark-800"
            >
              <img 
                src={exp.image} 
                alt={exp.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="font-serif text-[24px] text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {exp.title}
                </h3>
                <p className="font-sans text-[14px] text-white/70 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
