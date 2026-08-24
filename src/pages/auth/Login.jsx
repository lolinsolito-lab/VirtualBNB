import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Credenziali non valide. Riprova.')
      setLoading(false)
      return
    }

    // Check user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profile?.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/portal')
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
          <p className="font-sans text-[13px] text-dark-200 tracking-[0.2em] uppercase">Portal Access</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 text-[13px] font-sans">
              {error}
            </div>
          )}
          
          <div>
            <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[15px] p-4 outline-none transition-colors"
              placeholder="la-tua-email@virtualbnb.it"
              required
            />
          </div>
          <div>
            <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[15px] p-4 outline-none transition-colors"
              placeholder="••••••••"
              required
            />
            <div className="flex justify-end mt-2">
              <Link to="/forgot-password" className="font-sans text-[12px] text-gold-500 hover:text-gold-400 transition-colors">
                Password dimenticata?
              </Link>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="mt-4 flex justify-center items-center font-sans text-[13px] font-medium tracking-[0.15em] uppercase bg-gold-500 text-black py-4 hover:bg-gold-400 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-dark-700 text-center">
          <Link to="/" className="font-sans text-[13px] text-dark-300 hover:text-white transition-colors">
            ← Torna al sito web
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
