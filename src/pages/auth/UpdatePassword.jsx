import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabaseClient'

export default function UpdatePassword() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is actually in a recovery session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login')
      }
    })
  }, [navigate])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: updateError } = await supabase.auth.updateUser({
      password: password
    })

    if (updateError) {
      setError("Impossibile aggiornare la password. Il link potrebbe essere scaduto.")
      setLoading(false)
    } else {
      // Password updated successfully, navigate to portal/admin based on role
      const { data: authData } = await supabase.auth.getUser()
      if (authData?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single()

        if (profile?.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/portal')
        }
      } else {
        navigate('/login')
      }
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(184,150,62,0.05) 0%, transparent 60%)' }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-dark-800 border border-dark-700 p-10 relative z-10"
        style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
      >
        <div className="text-center mb-10">
          <div className="font-serif text-[24px] tracking-widest mb-2">
            VIRTUAL<span className="text-gold-500">BNB</span>
          </div>
          <p className="font-sans text-[13px] text-dark-200 tracking-[0.2em] uppercase">Crea nuova password</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleUpdate}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 text-[13px] font-sans">
              {error}
            </div>
          )}
          
          <div>
            <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Nuova Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[15px] p-4 outline-none transition-colors"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="mt-4 flex justify-center items-center font-sans text-[13px] font-medium tracking-[0.15em] uppercase bg-gold-500 text-black py-4 hover:bg-gold-400 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Salvataggio...' : 'Salva e Accedi'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
