import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Home, Euro } from 'lucide-react'
import { supabase } from '../../../lib/supabaseClient'

export default function OverviewTab() {
  const [stats, setStats] = useState({ revenue: 0, properties: 0, owners: 0, avgOccupancy: 0 })
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      // Count owners
      const { count: ownersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'owner')
        
      // Count properties
      const { count: propsCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })

      // Sum revenue and calculate avg occupancy
      const { data: reports } = await supabase
        .from('monthly_reports')
        .select('gross_revenue, occupancy_rate')
      
      const totalRev = reports?.reduce((acc, curr) => acc + Number(curr.gross_revenue), 0) || 0
      
      let avgOcc = 0
      if (reports && reports.length > 0) {
        const totalOcc = reports.reduce((acc, curr) => acc + (curr.occupancy_rate || 0), 0)
        avgOcc = Math.round(totalOcc / reports.length)
      }

      setStats({
        revenue: totalRev,
        properties: propsCount || 0,
        owners: ownersCount || 0,
        avgOccupancy: avgOcc
      })

      // Fetch leads
      const { data: leadsData } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      setLeads(leadsData || [])
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) return <div className="p-10 text-white font-sans">Caricamento dati dal database...</div>

  const statCards = [
    { label: 'Fatturato Registrato (Totale)', value: `€${stats.revenue.toLocaleString('it-IT')}`, icon: <Euro size={24} /> },
    { label: 'Proprietà Attive', value: stats.properties.toString(), icon: <Home size={24} /> },
    { label: 'Proprietari (Clienti)', value: stats.owners.toString(), icon: <Users size={24} /> },
    { label: 'Occupazione Media', value: `${stats.avgOccupancy}%`, icon: <TrendingUp size={24} /> },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-dark-800 border border-dark-700 p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-dark-900 border border-dark-700 rounded-md text-gold-500">
                {stat.icon}
              </div>
            </div>
            <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-dark-200 mb-1">{stat.label}</p>
            <p className="font-serif text-[28px] text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Real Leads Table */}
      <h2 className="font-serif text-[24px] font-light text-white mb-6">Ultime Richieste (Leads)</h2>
      <div className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-[14px]">
            <thead className="bg-dark-900/50 text-dark-200 font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b border-dark-700">Nome</th>
                <th className="p-4 border-b border-dark-700">Email/Telefono</th>
                <th className="p-4 border-b border-dark-700">Immobile</th>
                <th className="p-4 border-b border-dark-700">Data</th>
                <th className="p-4 border-b border-dark-700">Status</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-dark-200">Nessuna richiesta ricevuta finora.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors">
                    <td className="p-4">{lead.full_name}</td>
                    <td className="p-4 text-dark-200">{lead.email}<br/>{lead.phone}</td>
                    <td className="p-4 text-dark-100">{lead.address}<br/><span className="text-[12px] text-dark-300">{lead.property_type}</span></td>
                    <td className="p-4 text-dark-200">{new Date(lead.created_at).toLocaleDateString('it-IT')}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded text-[11px] uppercase tracking-wider font-medium bg-gold-500/20 text-gold-500">
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}
