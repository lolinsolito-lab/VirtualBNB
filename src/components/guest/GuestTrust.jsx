import { motion } from 'framer-motion'
import { ShieldCheck, Sparkles, Clock, CalendarCheck } from 'lucide-react'

const benefits = [
  {
    icon: <ShieldCheck size={36} className="text-gold-500 mb-6" />,
    title: 'Nessuna commissione',
    desc: 'Risparmia fino al 15% rispetto alle OTA prenotando direttamente dal nostro sito ufficiale. Il prezzo più basso è sempre garantito qui.'
  },
  {
    icon: <Sparkles size={36} className="text-gold-500 mb-6" />,
    title: 'Standard 5 Stelle',
    desc: 'Lenzuola di alta gamma, kit cortesia premium e protocolli di pulizia alberghiera certificati per ogni soggiorno.'
  },
  {
    icon: <Clock size={36} className="text-gold-500 mb-6" />,
    title: 'Concierge H24',
    desc: 'Il nostro team locale e il nostro Assistente IA sono a tua disposizione 24 ore su 24 per qualsiasi necessità.'
  },
  {
    icon: <CalendarCheck size={36} className="text-gold-500 mb-6" />,
    title: 'Flessibilità Totale',
    desc: 'Cancellazione flessibile e check-in autonomo a qualsiasi ora tramite serrature smart. La tua vacanza, i tuoi ritmi.'
  }
]

export default function GuestTrust() {
  return (
    <section className="py-24 bg-dark-900">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-[32px] md:text-[40px] text-white mb-4">
            Perché prenotare in <em className="italic text-gold-400">diretta.</em>
          </h2>
          <p className="font-sans text-[16px] text-dark-200 max-w-2xl mx-auto">
            I portali di viaggio aggiungono costi nascosti e commissioni. Con noi ottieni il massimo valore e vantaggi esclusivi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-8 bg-dark-800/50 rounded-xl hover:bg-dark-800 transition-colors border border-transparent hover:border-gold-500/20"
            >
              {b.icon}
              <h3 className="font-serif text-[20px] text-white mb-4">{b.title}</h3>
              <p className="font-sans text-[14px] text-dark-200 leading-relaxed">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
