import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Home, Settings, LogOut, Menu, X, FileText, Repeat, FolderOpen } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import AiChat from '../components/AiChat'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  
  const isAdmin = location.pathname.includes('/admin')
  
  // Real nav items pointing to the new routes
  const navItems = isAdmin ? [
    { icon: <LayoutDashboard size={20} />, label: 'Panoramica', path: '/admin' },
    { icon: <Home size={20} />, label: 'Immobili', path: '/admin/properties' },
    { icon: <Users size={20} />, label: 'Proprietari', path: '/admin/owners' },
    { icon: <FileText size={20} />, label: 'Rendiconti', path: '/admin/finances' },
    { icon: <FolderOpen size={20} />, label: 'Documenti', path: '/admin/documenti' },
    { icon: <Settings size={20} />, label: 'Impostazioni', path: '/admin/settings' },
  ] : [
    { icon: <LayoutDashboard size={20} />, label: 'Le mie proprietà', path: '/portal' },
    { icon: <Settings size={20} />, label: 'Impostazioni', path: '/portal/settings' },
  ]

  useEffect(() => {
    async function loadUser() {
      const { data: authData } = await supabase.auth.getUser()
      if (authData?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single()
        
        if (profileData) {
          setProfile(profileData)
        }
      } else {
        navigate('/login')
      }
    }
    loadUser()
  }, [navigate])

  const handleLogout = async (e) => {
    e.preventDefault()
    await supabase.auth.signOut()
    navigate('/')
  }

  // Get Initials from Full Name
  const getInitials = (name) => {
    if (!name) return '?'
    const parts = name.split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name.substring(0, 2).toUpperCase()
  }

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
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-[14px] text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={20} />
            Esci
          </button>
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
          
          <div className="ml-auto flex items-center gap-6">
            {/* Admin Switch Toggle */}
            {profile?.role === 'admin' && (
              <Link 
                to={isAdmin ? '/portal' : '/admin'} 
                className="hidden md:flex items-center gap-2 bg-dark-800 border border-dark-700 px-4 py-2 hover:bg-dark-700 transition-colors rounded-full font-sans text-[12px] uppercase tracking-widest text-gold-500"
              >
                <Repeat size={14} /> 
                {isAdmin ? 'Vista Proprietario' : 'Torna Admin'}
              </Link>
            )}

            <div className="flex items-center gap-4 border-l border-dark-700 pl-6">
              <div className="text-right hidden sm:block">
                <p className="font-sans text-[13px] text-white">Bentornato,</p>
                <p className="font-mono text-[11px] text-gold-500 uppercase tracking-widest">
                  {profile ? profile.full_name : 'Caricamento...'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-dark-700 border border-gold-500/30 flex items-center justify-center font-serif text-white">
                {getInitials(profile?.full_name)}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-dark-900">
          <Outlet />
        </main>
      </div>

      {/* AI Chat Widget — ARIA */}
      {profile?.role === 'admin' && (
        <AiChat
          endpoint="/api/adminChat"
          agentName="ARIA · Admin"
          welcomeMessage="Ciao! Sono ARIA, il tuo assistente AI per VirtualBNB. Chiedimi qualsiasi cosa: lead, fatturato, immobili, occupazione — ho accesso a tutti i dati in tempo reale."
        />
      )}
      {profile?.role === 'owner' && (
        <AiChat
          endpoint="/api/ownerChat"
          agentName="ARIA · Il tuo Assistente"
          welcomeMessage="Ciao! Sono ARIA, il tuo assistente personale. Chiedimi come sta andando il tuo immobile, i tuoi guadagni o qualsiasi informazione sui tuoi rendiconti."
        />
      )}
    </div>
  )
}
