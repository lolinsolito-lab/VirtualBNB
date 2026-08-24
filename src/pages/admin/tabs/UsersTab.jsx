import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../../lib/supabaseClient'

export default function UsersTab() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteName, setInviteName] = useState('')
  const [inviting, setInviting] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [userToDelete, setUserToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    setLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'owner')
      .order('created_at', { ascending: false })
    
    setUsers(data || [])
    setLoading(false)
  }

  const handleDeleteUser = async () => {
    if (!userToDelete) return
    setDeleting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/deleteUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userToDelete.id })
      })
      
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Errore durante l'eliminazione")
      
      setMessage(`Utente ${userToDelete.full_name} eliminato con successo.`)
      setUserToDelete(null)
      loadUsers()
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleInvite = async (e) => {
    e.preventDefault()
    setInviting(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/inviteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: inviteEmail,
          fullName: inviteName
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Errore durante l\'invito')
      }

      setMessage(`Invito inviato con successo a ${inviteEmail}!`)
      setInviteEmail('')
      setInviteName('')
      
      // Reload users to see the new one (the trigger should have created the profile)
      // We add a small delay to allow the trigger to finish
      setTimeout(loadUsers, 1000)
    } catch (err) {
      setError(err.message)
    } finally {
      setInviting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      
      {/* Invite Form */}
      <div className="bg-dark-800 border border-dark-700 p-8 rounded-lg mb-10">
        <h2 className="font-serif text-[24px] text-white mb-6">Invita un nuovo Proprietario</h2>
        
        <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="w-full md:flex-1">
            <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Nome Completo</label>
            <input 
              type="text" 
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[14px] p-3 outline-none"
              placeholder="Es. Mario Rossi"
              required
            />
          </div>
          <div className="w-full md:flex-1">
            <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Email del proprietario</label>
            <input 
              type="email" 
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[14px] p-3 outline-none"
              placeholder="cliente@email.com"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={inviting}
            className="w-full md:w-auto bg-gold-500 text-black font-sans text-[13px] tracking-[0.1em] uppercase font-medium px-8 py-3.5 hover:bg-gold-400 transition-colors disabled:opacity-50"
          >
            {inviting ? 'Invio...' : 'Invia Invito'}
          </button>
        </form>

        {message && <div className="mt-4 p-4 bg-green-500/10 text-green-400 text-[13px] border border-green-500/20">{message}</div>}
        {error && <div className="mt-4 p-4 bg-red-500/10 text-red-400 text-[13px] border border-red-500/20">{error}</div>}
      </div>

      {/* Users Table and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="font-serif text-[24px] font-light text-white">Proprietari Esistenti</h2>
        <div className="w-full md:w-64">
          <input 
            type="text" 
            placeholder="Cerca per nome o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[13px] p-2.5 outline-none"
          />
        </div>
      </div>
      <div className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-dark-200">Caricamento...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-[14px]">
              <thead className="bg-dark-900/50 text-dark-200 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4 border-b border-dark-700">ID</th>
                  <th className="p-4 border-b border-dark-700">Nome</th>
                  <th className="p-4 border-b border-dark-700">Email</th>
                  <th className="p-4 border-b border-dark-700">Data Registrazione</th>
                  <th className="p-4 border-b border-dark-700 text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-dark-200">Nessun proprietario trovato.</td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors">
                      <td className="p-4 font-mono text-[11px] text-dark-300">{u.id.substring(0,8)}...</td>
                      <td className="p-4">{u.full_name}</td>
                      <td className="p-4 text-dark-200 font-mono text-[12px]">{u.email || '-'}</td>
                      <td className="p-4 text-dark-200">{new Date(u.created_at).toLocaleDateString('it-IT')}</td>
                      <td className="p-4 text-right">
                        <a 
                          href={`/portal?preview=${u.id}`} 
                          className="text-[12px] text-gold-500 hover:text-gold-400 uppercase tracking-widest font-mono mr-4"
                        >
                          Vedi Dashboard
                        </a>
                        <button 
                          onClick={() => setUserToDelete(u)}
                          className="text-[12px] text-red-400 hover:text-red-300 uppercase tracking-widest font-mono"
                        >
                          Elimina
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 border border-dark-700 p-8 max-w-md w-full"
          >
            <h3 className="font-serif text-[24px] text-white mb-2">Eliminare questo utente?</h3>
            <p className="text-dark-200 text-[14px] mb-6">
              Stai per eliminare definitivamente <strong>{userToDelete.full_name}</strong> ({userToDelete.email || 'Nessuna email'}). Questa operazione cancellerà anche tutti gli immobili e i report associati. L'operazione è irreversibile.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setUserToDelete(null)}
                className="flex-1 border border-dark-600 text-dark-200 py-3 hover:bg-dark-700 transition-colors uppercase tracking-widest text-[11px] font-mono"
                disabled={deleting}
              >
                Annulla
              </button>
              <button 
                onClick={handleDeleteUser}
                className="flex-1 bg-red-900/50 text-red-400 border border-red-900 hover:bg-red-900 transition-colors py-3 uppercase tracking-widest text-[11px] font-mono"
                disabled={deleting}
              >
                {deleting ? 'Eliminazione...' : 'Conferma Eliminazione'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
