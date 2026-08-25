import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabaseClient'

const fallbackExperiences = [
  {
    title: 'Private Chef',
    desc: 'Goditi una cena stellata direttamente nella tua villa.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Tour in Barca',
    desc: 'Esplora le coste più esclusive lontano dalla folla.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Cantine Storiche',
    desc: 'Degustazioni riservate nelle migliori cantine locali.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Arte & Musei',
    desc: 'Visite guidate private nei musei e siti storici più prestigiosi.',
    image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Sport & Natura',
    desc: 'E-bike, trekking e sport acquatici per vivere adrenalina pura.',
    image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Rituali Olistici',
    desc: 'Sessioni private di yoga, sound healing e trattamenti di alto livello nella tua villa.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800',
  }
]

export default function GuestExperiences() {
  const [dbExperiences, setDbExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadExperiences() {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
      
      if (!error && data) {
        setDbExperiences(data)
      }
      setLoading(false)
    }
    loadExperiences()
  }, [])

  // Se è in caricamento mostriamo nulla o un leggero loader
  if (loading) return <div className="py-24 bg-dark-900 border-t border-dark-800 text-center text-dark-300">Caricamento esperienze...</div>

  // Decide quali mostrare: Se il DB è vuoto, usa le fallback.
  const isDynamic = dbExperiences.length > 0
  const displayExperiences = isDynamic ? dbExperiences : fallbackExperiences

  return (
    <section id="esperienze" className="py-24 bg-dark-900 border-t border-dark-800">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          {!isDynamic && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold-400">Coming Soon</span>
            </motion.div>
          )}
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-[36px] md:text-[52px] text-white leading-tight mb-4"
          >
            <span className="font-serif font-light">Experiences</span> <em className="italic text-gold-400">VirtualBNB</em>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-[16px] text-dark-200 max-w-2xl"
          >
            Molto più di un semplice soggiorno. Stiamo selezionando le migliori esperienze locali per elevare la tua vacanza.
            {!isDynamic && " Presto potrai prenotare servizi premium direttamente dal tuo Concierge virtuale."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayExperiences.map((exp, i) => (
            <motion.div 
              key={exp.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] md:aspect-[4/5] bg-dark-800 border border-dark-700/50 hover:border-gold-500/30 transition-colors"
            >
              <img 
                src={exp.image_url || exp.image} 
                alt={exp.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
              
              {/* Badge Città/Location */}
              {isDynamic && exp.location_tag && (
                <div className="absolute top-4 left-4 bg-dark-900/80 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase font-mono tracking-widest text-gold-500 border border-gold-500/30">
                  {exp.location_tag}
                </div>
              )}

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-center md:text-left">
                <h3 className="font-serif text-[24px] text-white mb-2 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 drop-shadow-md">
                  {exp.title}
                </h3>
                <p className="font-sans text-[14px] text-white/90 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-100 drop-shadow-md mb-4 line-clamp-3">
                  {exp.description || exp.desc}
                </p>
                
                {/* Sezione Dinamica: Prezzo, Voucher, Bottone */}
                {isDynamic && (
                  <div className="md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-200 mt-2">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                      {exp.price_display && (
                        <span className="font-mono text-[13px] text-white font-medium px-3 py-1 bg-white/10 rounded backdrop-blur-md">
                          {exp.price_display}
                        </span>
                      )}
                      {exp.voucher_code && (
                        <span className="font-mono text-[11px] uppercase tracking-wider text-gold-400 border border-gold-500/40 px-2 py-1 rounded">
                          Codice: {exp.voucher_code} {exp.discount_percentage ? `(-${exp.discount_percentage}%)` : ''}
                        </span>
                      )}
                    </div>
                    <a 
                      href={exp.contact_link || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center bg-gold-500 text-black font-medium font-sans text-[13px] uppercase tracking-[0.1em] py-3 rounded-lg hover:bg-gold-400 transition-colors"
                    >
                      Richiedi Esperienza
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
