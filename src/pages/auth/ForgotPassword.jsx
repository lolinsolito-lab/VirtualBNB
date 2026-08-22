import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabaseClient'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })

    if (resetError) {
      setError("Si è verificato un errore. Riprova più tardi.")
    } else {
      setMessage("Se l'email è registrata, riceverai a breve le istruzioni per il reset.")
    }
    
    setLoading(false)
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
          <p className="font-sans text-[13px] text-dark-200 tracking-[0.2em] uppercase">Recupero Password</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleReset}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 text-[13px] font-sans">
              {error}
            </div>
          )}
          
          {message && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 text-[13px] font-sans">
              {message}
            </div>
          )}
          
          {!message && (
            <>
              <div>
                <label className="font-sans text-[11px] tracking-[0.15em] uppercase text-gold-500/80 block mb-2">La tua Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 text-white font-sans text-[15px] p-4 outline-none transition-colors"
                  placeholder="admin@virtualbnb.it"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="mt-4 flex justify-center items-center font-sans text-[13px] font-medium tracking-[0.15em] uppercase bg-gold-500 text-black py-4 hover:bg-gold-400 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Invio in corso...' : 'Invia link di reset'}
              </button>
            </>
          )}
        </form>

        <div className="mt-10 pt-6 border-t border-dark-700 text-center">
          <Link to="/login" className="font-sans text-[13px] text-dark-300 hover:text-white transition-colors">
            ← Torna al Login
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
