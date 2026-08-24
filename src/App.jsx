import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import UpdatePassword from './pages/auth/UpdatePassword'
import DashboardLayout from './layouts/DashboardLayout'
import OwnerDashboard from './pages/owner/OwnerDashboard'

// Admin Tabs
import OverviewTab from './pages/admin/tabs/OverviewTab'
import UsersTab from './pages/admin/tabs/UsersTab'
import PropertiesTab from './pages/admin/tabs/PropertiesTab'
import FinancesTab from './pages/admin/tabs/FinancesTab'
import DocumentsTab from './pages/admin/tabs/DocumentsTab'
import SettingsTab from './pages/admin/tabs/SettingsTab'
import OwnerSettingsTab from './pages/owner/tabs/OwnerSettingsTab'

function AuthListener() {
  const navigate = useNavigate()
  
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // Supabase tratta sia il recupero password che i Magic Link di invito come PASSWORD_RECOVERY
      if (event === 'PASSWORD_RECOVERY') {
        navigate('/update-password', { replace: true })
      }
    })
    
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [navigate])
  
  return null
}

export default function App() {
  return (
    <Router>
      <AuthListener />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        
        {/* Dashboard Routes with Layout */}
        <Route element={<DashboardLayout />}>
          {/* Admin Routes */}
          <Route path="/admin" element={<OverviewTab />} />
          <Route path="/admin/owners" element={<UsersTab />} />
          <Route path="/admin/properties" element={<PropertiesTab />} />
          <Route path="/admin/finances" element={<FinancesTab />} />
          <Route path="/admin/documenti" element={<DocumentsTab />} />
          <Route path="/admin/settings" element={<SettingsTab />} />
          
          {/* Owner Portal Routes */}
          <Route path="/portal" element={<OwnerDashboard />} />
          <Route path="/portal/reports" element={<Navigate to="/portal" replace />} />
          <Route path="/portal/settings" element={<OwnerSettingsTab />} />
        </Route>
      </Routes>
    </Router>
  )
}
