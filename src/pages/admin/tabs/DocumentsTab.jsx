import { useState, useEffect } from 'react'
import { FileText, FileSpreadsheet, Send, File, Clock, ShieldCheck, X } from 'lucide-react'
import { supabase } from '../../../lib/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'

const MOCK_DOCUMENTS = [
  {
    id: 'doc-1',
    name: 'VirtualBNB-Contratto-Gestione-BOZZA.docx',
    type: 'docx',
    size: '12 KB',
    description: 'Contratto quadro di gestione immobiliare per property management.',
    icon: FileText
  },
  {
    id: 'doc-2',
    name: 'VirtualBNB-Liberatoria-Marketing-BOZZA.docx',
    type: 'docx',
    size: '10 KB',
    description: 'Liberatoria per scatti fotografici e utilizzo per marketing.',
    icon: FileText
  },
  {
    id: 'doc-3',
    name: 'VirtualBNB-Modello-Finanziario.xlsx',
    type: 'xlsx',
    size: '15 KB',
    description: 'Foglio di calcolo con proiezioni RevPAR, base, buono e ottimo.',
    icon: FileSpreadsheet
  }
]

export default function DocumentsTab() {
  const [selectedDoc, setSelectedDoc] = useState(null)
  
  const [owners, setOwners] = useState([])
  const [logs, setLogs] = useState([])
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recipientType, setRecipientType] = useState('registered') // 'registered' | 'custom'
  const [selectedOwnerId, setSelectedOwnerId] = useState('')
  const [customEmail, setCustomEmail] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sendError, setSendError] = useState(null)

  // Caricamento Owners e Logs
  useEffect(() => {
    fetchOwners()
    fetchLogs()
  }, [])

  async function fetchOwners() {
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .eq('role', 'owner')
      // email is in auth.users, but we might not have it in profiles unless we added it or fetch it via auth admin. 
      // Wait, in VirtualBNB, the profiles table might not have email. Let's check. 
      // Actually, profiles only has id, role, full_name, phone. So we just show full_name and use customEmail for now if email is missing.
      // Wait, if profiles doesn't have email, how do we email registered owners? We have to ask for their email or we added it?
      // Let's assume we can fetch email from a join if available, but for now we just list their names and ask to type the email, OR we use an auth RPC.
      // Let's just fetch full_name to help the admin remember, but they have to type the email for now if we can't get it.
      // Actually, let's just make it simple: Admin always types the email, but can link an owner ID.
    
    if (data) {
      setOwners(data)
    }
  }

  async function fetchLogs() {
    const { data } = await supabase
      .from('document_sends_log')
      .select(`
        *,
        profiles!inviato_da(full_name),
        owner:profiles!owner_profile_id(full_name)
      `)
      .order('data_invio', { ascending: false })
      .limit(10)
    
    if (data) setLogs(data)
  }

  const openSendModal = (doc) => {
    setSelectedDoc(doc)
    setIsModalOpen(true)
    setSendError(null)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    setIsSending(true)
    setSendError(null)

    // Determina l'email
    let emailToSend = customEmail
    if (!emailToSend) {
      setSendError("Inserisci un'email valida.")
      setIsSending(false)
      return
    }

    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      const res = await fetch('/api/sendDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          documentName: selectedDoc.name,
          recipientEmail: emailToSend,
          ownerProfileId: selectedOwnerId || null
        })
      })

      const result = await res.json()
      
      if (!res.ok) {
        throw new Error(result.error || 'Errore durante l\'invio')
      }

      // Successo
      setIsModalOpen(false)
      setCustomEmail('')
      setSelectedOwnerId('')
      // Ricarica i log
      fetchLogs()
      
      alert('Documento inviato con successo e log registrato!')
      
    } catch (err) {
      setSendError(err.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto animate-fade-in relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-dark-700 pb-8">
        <div>
          <h1 className="font-serif text-[32px] text-white mb-2">Documenti Legali</h1>
          <p className="font-sans text-[15px] text-dark-200 max-w-xl">
            Gestisci e invia i contratti e le bozze ai proprietari (lead e owner). 
            Tutti i file sono archiviati in un bucket privato.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-dark-800 px-4 py-2 border border-dark-700">
          <ShieldCheck size={16} className="text-gold-500" />
          <span className="font-sans text-[12px] tracking-widest uppercase text-gold-500">Storage Privato</span>
        </div>
      </div>

      {/* Grid Documenti */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_DOCUMENTS.map((doc) => {
          const Icon = doc.icon
          return (
            <div 
              key={doc.id}
              className="bg-dark-800 border border-dark-700 hover:border-gold-500/50 transition-colors p-6 flex flex-col group relative"
            >
              <div className="w-12 h-12 bg-dark-900 border border-dark-700 flex items-center justify-center mb-6 text-gold-500 group-hover:bg-gold-500/10 transition-colors">
                <Icon size={24} />
              </div>
              
              <h3 className="font-sans text-[16px] text-white font-medium leading-tight mb-2 truncate" title={doc.name}>
                {doc.name}
              </h3>
              
              <p className="font-sans text-[13px] text-dark-200 mb-6 flex-1">
                {doc.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-dark-700">
                <span className="font-mono text-[11px] text-dark-200">{doc.type.toUpperCase()} • {doc.size}</span>
                <button 
                  onClick={() => openSendModal(doc)}
                  className="flex items-center gap-2 text-gold-500 font-sans text-[12px] uppercase tracking-widest hover:text-white transition-colors"
                >
                  <Send size={14} />
                  Invia
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Log Invii */}
      <div className="mt-16">
        <h2 className="font-serif text-[22px] text-white mb-6 flex items-center gap-3">
          <Clock size={20} className="text-dark-200" />
          Log Invii Recenti
        </h2>
        <div className="bg-dark-800 border border-dark-700 overflow-hidden">
          {logs.length > 0 ? (
            <table className="w-full text-left font-sans text-[13px]">
              <thead className="border-b border-dark-700 text-dark-200 bg-dark-900/50">
                <tr>
                  <th className="font-medium p-4 font-mono text-[11px] uppercase tracking-wider">Data</th>
                  <th className="font-medium p-4 font-mono text-[11px] uppercase tracking-wider">Documento</th>
                  <th className="font-medium p-4 font-mono text-[11px] uppercase tracking-wider">Destinatario (Email)</th>
                  <th className="font-medium p-4 font-mono text-[11px] uppercase tracking-wider">Owner Collegato</th>
                  <th className="font-medium p-4 font-mono text-[11px] uppercase tracking-wider">Inviato da</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-dark-700/50 transition-colors">
                    <td className="p-4 text-dark-100 whitespace-nowrap">
                      {new Date(log.data_invio).toLocaleDateString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-4 text-white font-medium max-w-[200px] truncate" title={log.documento_nome}>
                      {log.documento_nome}
                    </td>
                    <td className="p-4 text-gold-400">
                      {log.destinatario_email}
                    </td>
                    <td className="p-4 text-dark-100">
                      {log.owner?.full_name || <span className="text-dark-200 italic">Nessuno (Lead)</span>}
                    </td>
                    <td className="p-4 text-dark-100">
                      {log.profiles?.full_name || 'Admin'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-dark-200 font-sans text-[14px]">
              Nessun documento inviato finora.
            </div>
          )}
        </div>
      </div>

      {/* Modal d'Invio */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => !isSending && setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark-900 border border-dark-700 p-8 max-w-lg w-full relative z-10 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                disabled={isSending}
                className="absolute top-6 right-6 text-dark-200 hover:text-white transition-colors disabled:opacity-50"
              >
                <X size={20} />
              </button>

              <h2 className="font-serif text-[24px] text-white mb-2">Invia Documento</h2>
              <p className="font-sans text-[13px] text-dark-200 mb-6 truncate" title={selectedDoc?.name}>
                Stai per inviare: <strong className="text-gold-500">{selectedDoc?.name}</strong>
              </p>

              <form onSubmit={handleSend} className="space-y-6">
                <div>
                  <label className="block font-sans text-[11px] tracking-widest uppercase text-dark-200 mb-2">
                    Email Destinatario (Obbligatorio)
                  </label>
                  <input 
                    type="email"
                    required
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="lead@email.com"
                    className="w-full bg-dark-800 border border-dark-700 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors placeholder:text-dark-200/50 font-sans text-[14px]"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[11px] tracking-widest uppercase text-dark-200 mb-2">
                    Collega a un Proprietario (Opzionale)
                  </label>
                  <select 
                    value={selectedOwnerId}
                    onChange={(e) => setSelectedOwnerId(e.target.value)}
                    className="w-full bg-dark-800 border border-dark-700 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-sans text-[14px]"
                  >
                    <option value="">Nessun proprietario (Invio a Lead esterno)</option>
                    {owners.map(o => (
                      <option key={o.id} value={o.id}>{o.full_name}</option>
                    ))}
                  </select>
                </div>

                {sendError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 font-sans text-[13px]">
                    {sendError}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gold-500 text-black font-sans text-[13px] tracking-widest uppercase py-4 font-medium hover:bg-gold-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    'Invio in corso (Resend)...'
                  ) : (
                    <>
                      <Send size={16} /> Conferma Invio
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
