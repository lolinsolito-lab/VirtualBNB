import { motion } from 'framer-motion'
import { TrendingUp, Users, Home, Euro } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    { label: 'Fatturato Mese (Totale)', value: '€42,500', icon: <Euro size={24} />, trend: '+12%' },
    { label: 'Proprietà Attive', value: '18', icon: <Home size={24} />, trend: '+2' },
    { label: 'Proprietari (Clienti)', value: '14', icon: <Users size={24} />, trend: 'Stable' },
    { label: 'RevPAR Medio', value: '€112', icon: <TrendingUp size={24} />, trend: '+8%' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-[32px] font-light text-white mb-2">Dashboard Direzione</h1>
        <p className="font-sans text-[15px] text-dark-200 mb-8">Benvenuto Michael, ecco la situazione generale di oggi.</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-dark-800 border border-dark-700 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-dark-900 border border-dark-700 rounded-md text-gold-500">
                  {stat.icon}
                </div>
                <span className="font-sans text-[12px] text-green-400 bg-green-400/10 px-2 py-1 rounded">
                  {stat.trend}
                </span>
              </div>
              <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-dark-200 mb-1">{stat.label}</p>
              <p className="font-serif text-[28px] text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Mock Leads Table */}
        <h2 className="font-serif text-[24px] font-light text-white mb-6">Ultime Richieste (Leads)</h2>
        <div className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-[14px]">
              <thead className="bg-dark-900/50 text-dark-200 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4 border-b border-dark-700">Nome</th>
                  <th className="p-4 border-b border-dark-700">Immobile</th>
                  <th className="p-4 border-b border-dark-700">Tipologia</th>
                  <th className="p-4 border-b border-dark-700">Data</th>
                  <th className="p-4 border-b border-dark-700">Status</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {[
                  { nome: 'Mario Rossi', immobile: 'Via Roma 10, Milano', tipo: 'Bilocale (65mq)', data: 'Oggi', status: 'Nuovo' },
                  { nome: 'Giulia Bianchi', immobile: 'Corso Como 2, Milano', tipo: 'Trilocale (90mq)', data: 'Ieri', status: 'In Analisi' },
                  { nome: 'Luca Verdi', immobile: 'Via Tortona, Milano', tipo: 'Monolocale (40mq)', data: '2 gg fa', status: 'Rifiutato' },
                ].map((lead, i) => (
                  <tr key={i} className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors">
                    <td className="p-4">{lead.nome}</td>
                    <td className="p-4 text-dark-100">{lead.immobile}</td>
                    <td className="p-4 text-dark-200">{lead.tipo}</td>
                    <td className="p-4 text-dark-200">{lead.data}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[11px] uppercase tracking-wider font-medium ${
                        lead.status === 'Nuovo' ? 'bg-gold-500/20 text-gold-500' :
                        lead.status === 'In Analisi' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
