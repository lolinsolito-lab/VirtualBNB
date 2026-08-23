import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

/**
 * Widget chat AI flottante.
 * @param {string} endpoint - '/api/adminChat' o '/api/ownerChat'
 * @param {string} welcomeMessage - Messaggio iniziale dell'agente
 * @param {string} agentName - Nome mostrato nella chat (es. "ARIA · Admin")
 */
export default function AiChat({ endpoint, welcomeMessage, agentName = 'ARIA' }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: welcomeMessage }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [messages, open])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMessage = input.trim()
    setInput('')
    
    const newMessages = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setLoading(true)

    try {
      // Get current session JWT
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sessione scaduta. Effettua di nuovo il login.' }])
        setLoading(false)
        return
      }

      // Build history for the API (exclude welcome message, only last 10 turns)
      const history = newMessages.slice(1, -1).slice(-10).map(m => ({
        role: m.role,
        content: m.content
      }))

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ message: userMessage, history })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Errore API')
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      console.error('Chat error:', err)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: err.message.includes('ANTHROPIC_API_KEY') 
          ? '⚠️ Servizio AI non ancora attivo. Aggiungi ANTHROPIC_API_KEY in Vercel per abilitare questa funzione.'
          : `Errore: ${err.message}` 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gold-500 text-black rounded-full flex items-center justify-center shadow-lg hover:bg-gold-400 transition-all duration-300 hover:scale-105"
        title={`Apri ${agentName}`}
        style={{ boxShadow: '0 4px 20px rgba(184,150,62,0.4)' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Sparkles size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-24px)] bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ height: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
          >
            {/* Header */}
            <div className="bg-dark-900 px-5 py-4 border-b border-dark-700 flex items-center gap-3">
              <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                <Sparkles size={16} className="text-black" />
              </div>
              <div>
                <p className="font-sans font-medium text-[14px] text-white">{agentName}</p>
                <p className="font-mono text-[10px] text-gold-500 uppercase tracking-widest">AI · Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl font-sans text-[13px] leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-gold-500 text-black rounded-br-sm'
                        : 'bg-dark-700 text-white rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-dark-700 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2">
                    <Loader2 size={14} className="text-gold-500 animate-spin" />
                    <span className="font-mono text-[11px] text-dark-200 uppercase tracking-widest">Analisi in corso...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-dark-700 flex items-center gap-2 bg-dark-900">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
                className="flex-1 bg-dark-800 border border-dark-700 focus:border-gold-500 text-white font-sans text-[13px] px-3 py-2 outline-none resize-none rounded-xl transition-colors placeholder-dark-400"
                placeholder="Chiedi qualcosa al tuo assistente..."
                style={{ minHeight: '40px', maxHeight: '100px' }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-10 h-10 bg-gold-500 text-black rounded-xl flex items-center justify-center hover:bg-gold-400 transition-colors disabled:opacity-40 flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
