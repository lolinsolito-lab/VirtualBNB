import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Home, Settings, LogOut, Menu, X, FileText } from 'lucide-react'
import { useState } from 'react'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  
  // Semplice controllo per determinare se siamo in admin o owner (mock)
  const isAdmin = location.pathname.includes('/admin')
  
  const navItems = isAdmin ? [
    { icon: <LayoutDashboard size={20} />, label: 'Panoramica', path: '/admin' },
    { icon: <Home size={20} />, label: 'Immobili', path: '/admin/properties' },
    { icon: <Users size={20} />, label: 'Proprietari', path: '/admin/owners' },
    { icon: <Settings size={20} />, label: 'Impostazioni', path: '/admin/settings' },
  ] : [
    { icon: <LayoutDashboard size={20} />, label: 'Le mie proprietà', path: '/portal' },
    { icon: <FileText size={20} />, label: 'Fatturato & Report', path: '/portal/reports' },
    { icon: <Settings size={20} />, label: 'Impostazioni Account', path: '/portal/settings' },
  ]

  return (
    <div className="min-h-screen bg-dark-900 text-white flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-dark-800 border-r border-dark-700 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 h-20 flex items-center justify-between border-b border-dark-700">
          <div className="font-serif text-[18px] tracking-widest">
            VIRTUAL<span className="text-gold-500">BNB</span>
            <span className="block font-sans text-[10px] text-dark-200 mt-1 uppercase tracking-widest">
              {isAdmin ? 'Admin Panel' : 'Owner Portal'}
            </span>
          </div>
          <button className="md:hidden text-dark-200 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-[14px] transition-colors ${
                location.pathname === item.path 
                  ? 'bg-gold-500/10 text-gold-500 font-medium' 
                  : 'text-dark-200 hover:bg-dark-700 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-dark-700">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-[14px] text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={20} />
            Esci
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-dark-900 border-b border-dark-700 flex items-center justify-between px-6 sticky top-0 z-30">
          <button 
            className="md:hidden text-dark-200 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-sans text-[13px] text-white">Bentornato,</p>
              <p className="font-mono text-[11px] text-gold-500 uppercase tracking-widest">
                {isAdmin ? 'Michael Jara' : 'Mario Rossi'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-dark-700 border border-gold-500/30 flex items-center justify-center font-serif text-white">
              {isAdmin ? 'MJ' : 'MR'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-dark-900">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
