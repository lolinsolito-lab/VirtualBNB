import { motion } from 'framer-motion'
import { ShieldCheck, Sparkles, Clock } from 'lucide-react'

const features = [
  {
    icon: <ShieldCheck size={32} className="text-gold-500 mb-4" />,
    title: 'Miglior Prezzo Garantito',
    desc: 'Prenotando qui salti l\'intermediario. Nessuna commissione del 15% di Airbnb, solo il prezzo reale della casa.'
  },
  {
    icon: <Sparkles size={32} className="text-gold-500 mb-4" />,
    title: 'Standard Hotel 5 Stelle',
    desc: 'Troverai sempre lenzuola di alta gamma, kit cortesia premium e una pulizia impeccabile certificata con protocolli alberghieri.'
  },
  {
    icon: <Clock size={32} className="text-gold-500 mb-4" />,
    title: 'Assistenza H24',
    desc: 'Un problema alle 2 di notte? Il nostro team e il nostro Concierge AI sono sempre a tua disposizione, ogni singolo giorno.'
  }
]

export default function GuestTrust() {
  return (
    <section className="py-24 bg-dark-900 border-t border-dark-800">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-8 bg-dark-800 border border-dark-700 rounded-lg hover:border-gold-500/30 transition-colors"
            >
              {f.icon}
              <h3 className="font-serif text-[22px] text-white mb-3">{f.title}</h3>
              <p className="font-sans text-[15px] text-dark-200 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
