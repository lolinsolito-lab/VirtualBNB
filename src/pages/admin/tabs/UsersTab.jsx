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

      {/* Users Table */}
      <h2 className="font-serif text-[24px] font-light text-white mb-6">Proprietari Esistenti</h2>
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
                  <th className="p-4 border-b border-dark-700">Data Registrazione</th>
                  <th className="p-4 border-b border-dark-700 text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-dark-200">Nessun proprietario trovato.</td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors">
                      <td className="p-4 font-mono text-[11px] text-dark-300">{u.id.substring(0,8)}...</td>
                      <td className="p-4">{u.full_name}</td>
                      <td className="p-4 text-dark-200">{new Date(u.created_at).toLocaleDateString('it-IT')}</td>
                      <td className="p-4 text-right">
                        <button className="text-[12px] text-red-400 hover:text-red-300 uppercase tracking-widest font-mono">
                          Sospendi
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
    </motion.div>
  )
}
