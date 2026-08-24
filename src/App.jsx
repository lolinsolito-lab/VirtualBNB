import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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

export default function App() {
  return (
    <Router>
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
          <Route path="/admin/settings" element={<div className="p-10 text-white font-serif text-[24px]">Impostazioni (Coming Soon)</div>} />
          
          {/* Owner Portal Routes */}
          <Route path="/portal" element={<OwnerDashboard />} />
          <Route path="/portal/reports" element={<Navigate to="/portal" replace />} />
          <Route path="/portal/settings" element={<Navigate to="/portal" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}
