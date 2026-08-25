import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Come Funziona', id: 'come-funziona' },
  { label: 'Servizi', id: 'servizi' },
  { label: 'Prezzi', id: 'prezzi' },
  { label: 'Executive', id: 'corporate' },
  { label: 'Vision', id: 'vision' },
]

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar({ isGuest = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`vbnb-nav${scrolled ? ' scrolled' : ''}`}>
        {/* Logo */}
        <Link to={isGuest ? "/ospiti" : "/"} className="nav-logo">
          VIRTUAL<span>BNB</span>
        </Link>

        {/* Desktop links */}
        {!isGuest && (
          <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        )}

        {/* Desktop CTAs */}
        <div className="flex items-center gap-3">
          {!isGuest && (
            <Link
              to="/login"
              className="hidden md:block font-sans text-[12px] tracking-[0.12em] uppercase text-dark-200 hover:text-white transition-colors px-3 py-2"
            >
              Accedi
            </Link>
          )}
          {isGuest ? (
            <>
              <a
                href="https://book.virtualbnb.it"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta"
              >
                Cerca Casa
              </a>
              <Link
                to="/"
                className="font-sans text-[11px] tracking-[0.12em] uppercase text-gold-500 hover:text-gold-400 transition-colors ml-4 hidden lg:block"
              >
                Proprietari?
              </Link>
            </>
          ) : (
            <>
              <button
                className="nav-cta"
                onClick={() => scrollTo('analisi')}
              >
                Analisi Gratuita
              </button>
              <Link
                to="/ospiti"
                className="font-sans text-[11px] tracking-[0.12em] uppercase text-gold-500 hover:text-gold-400 transition-colors ml-4 hidden lg:block"
              >
                Ospiti? Prenota
              </Link>
            </>
          )}
        </div>

        {/* Mobile burger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
          style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(12px)' }}
        >
          <button
            className="absolute top-6 right-6 text-white text-2xl font-light"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
          {!isGuest && navLinks.map((link) => (
            <button
              key={link.id}
              className="font-serif text-[28px] text-white hover:text-gold-400 transition-colors"
              onClick={() => { scrollTo(link.id); setMobileOpen(false) }}
            >
              {link.label}
            </button>
          ))}
          {isGuest ? (
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="font-serif text-[28px] text-white hover:text-gold-400 transition-colors"
            >
              Area Proprietari
            </Link>
          ) : (
            <Link
              to="/ospiti"
              onClick={() => setMobileOpen(false)}
              className="font-serif text-[28px] text-white hover:text-gold-400 transition-colors"
            >
              Ospiti / Prenota
            </Link>
          )}
          {!isGuest && (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="font-sans text-[13px] tracking-[0.15em] uppercase text-dark-200 hover:text-white transition-colors mt-8"
            >
              Accedi
            </Link>
          )}
          {!isGuest && (
            <button
              className="mt-2 font-sans text-[12px] tracking-[0.15em] uppercase px-10 py-4 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-all duration-300"
              onClick={() => { scrollTo('analisi'); setMobileOpen(false) }}
            >
              Analisi Gratuita
            </button>
          )}
        </div>
      )}
    </>
  )
}
