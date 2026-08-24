import { motion } from 'framer-motion'

const properties = [
  {
    title: 'Villa sul Lago con Piscina Privata',
    location: 'Como, CO',
    guests: '6 Ospiti',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Attico Panoramico in Centro',
    location: 'Milano, MI',
    guests: '4 Ospiti',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1cd2f9d20f?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Chalet Moderno in Montagna',
    location: 'Cortina d\'Ampezzo, BL',
    guests: '8 Ospiti',
    image: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?auto=format&fit=crop&q=80&w=800',
  }
]

export default function GuestProperties() {
  const lodgifyLink = "https://book.virtualbnb.it"

  return (
    <section className="py-24 bg-dark-900 border-t border-dark-800">
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
              La Nostra Collezione
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-[36px] md:text-[48px] text-white leading-tight"
            >
              Soggiorni Esclusivi,<br />
              Selezionati con <em className="italic text-gold-400">cura.</em>
            </motion.h2>
          </div>
          
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            href={lodgifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-colors font-sans text-[11px] tracking-[0.1em] uppercase px-8 py-3 whitespace-nowrap"
          >
            Vedi tutte le case
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((p, i) => (
            <motion.a 
              key={i}
              href={lodgifyLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group block"
            >
              <div className="w-full aspect-[4/3] bg-dark-800 rounded-lg overflow-hidden mb-6 relative">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded text-white font-mono text-[11px] uppercase tracking-widest border border-white/10">
                  {p.guests}
                </div>
              </div>
              
              <div className="px-2">
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold-500 mb-2">
                  {p.location}
                </p>
                <h3 className="font-serif text-[20px] text-white mb-3 group-hover:text-gold-400 transition-colors">
                  {p.title}
                </h3>
                <span className="font-sans text-[13px] text-dark-200 border-b border-dark-700 pb-1 group-hover:border-gold-500/50 transition-colors">
                  Scopri disponibilità e prezzi →
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
