import { motion } from 'framer-motion'
import { Euro, Calendar, CheckCircle } from 'lucide-react'

export default function OwnerDashboard() {
  const propertyName = 'Attico Navigli - Via Tortona 12'
  
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-[32px] font-light text-white mb-2">{propertyName}</h1>
        <p className="font-sans text-[15px] text-dark-200 mb-10">Ecco l'andamento del tuo immobile nel mese in corso.</p>

        {/* Highlight Card */}
        <div className="bg-gold-500 text-black p-8 md:p-10 rounded-lg mb-10 relative overflow-hidden" style={{ boxShadow: '0 20px 50px rgba(184,150,62,0.15)' }}>
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[12px] tracking-[0.2em] uppercase mb-2 opacity-80">Guadagno Netto Stimato (Luglio)</p>
              <p className="font-serif text-[48px] md:text-[64px] leading-none mb-2">€ 3.240,00</p>
              <p className="font-sans text-[14px] flex items-center gap-2">
                <CheckCircle size={16} /> Bonifico in arrivo il 5 Agosto
              </p>
            </div>
            <button className="font-sans text-[13px] font-medium tracking-[0.1em] uppercase bg-black text-white px-6 py-3 hover:bg-dark-800 transition-colors self-start md:self-auto">
              Scarica Report PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Calendar Mock */}
          <div className="bg-dark-800 border border-dark-700 p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-gold-500" size={24} />
              <h3 className="font-serif text-[20px] text-white">Occupazione</h3>
            </div>
            <div className="flex items-end justify-between mb-2">
              <span className="font-serif text-[32px] text-white">85%</span>
              <span className="font-sans text-[14px] text-dark-200 mb-2">26 giorni su 31</span>
            </div>
            <div className="w-full bg-dark-900 h-2 rounded-full overflow-hidden">
              <div className="bg-gold-500 h-full w-[85%]" />
            </div>
            <p className="font-sans text-[13px] text-dark-200 mt-6">
              Il tuo immobile sta performando il 12% meglio rispetto alla media di zona.
            </p>
          </div>

          {/* Economics Mock */}
          <div className="bg-dark-800 border border-dark-700 p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <Euro className="text-gold-500" size={24} />
              <h3 className="font-serif text-[20px] text-white">Dati Finanziari</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-dark-700">
                <span className="font-sans text-[14px] text-dark-200">Ricavi Lordi Prenotazioni</span>
                <span className="font-serif text-[18px] text-white">€ 4.600</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-dark-700">
                <span className="font-sans text-[14px] text-dark-200">Spese Pulizia (Pagate dagli ospiti)</span>
                <span className="font-serif text-[18px] text-dark-100">€ 450</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-dark-700">
                <span className="font-sans text-[14px] text-dark-200">Commissioni VirtualBNB (25%)</span>
                <span className="font-serif text-[18px] text-red-400">- € 1.150</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-sans text-[14px] text-gold-500 uppercase tracking-wider">Netto al proprietario</span>
                <span className="font-serif text-[22px] text-gold-500">€ 3.450</span>
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  )
}
