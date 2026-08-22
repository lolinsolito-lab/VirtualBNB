import { useState } from 'react'
import { motion } from 'framer-motion'
import OverviewTab from './tabs/OverviewTab'
import UsersTab from './tabs/UsersTab'
import PropertiesTab from './tabs/PropertiesTab'
import FinancesTab from './tabs/FinancesTab'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Panoramica' },
    { id: 'users', label: 'Gestione Utenti' },
    { id: 'properties', label: 'Portafoglio Immobili' },
    { id: 'finances', label: 'Rendiconti Finanziari' }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-serif text-[32px] font-light text-white mb-2">Centro di Controllo (CRM)</h1>
        <p className="font-sans text-[15px] text-dark-200 mb-8">Gestisci clienti, immobili e flussi di cassa da un'unica piattaforma.</p>
        
        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-dark-700 mb-10 pb-px hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-sans text-[13px] tracking-[0.1em] uppercase px-6 py-4 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id 
                  ? 'border-gold-500 text-gold-500 font-medium' 
                  : 'border-transparent text-dark-200 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'properties' && <PropertiesTab />}
          {activeTab === 'finances' && <FinancesTab />}
        </div>

      </motion.div>
    </div>
  )
}
