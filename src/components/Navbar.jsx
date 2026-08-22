import { useState, useEffect } from 'react'

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

export default function Navbar() {
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
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero') }} className="nav-logo">
          VIRTUAL<span>BNB</span>
        </a>

        {/* Desktop links */}
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

        {/* Desktop CTA */}
        <button
          className="nav-cta"
          onClick={() => scrollTo('analisi')}
        >
          Analisi Gratuita
        </button>

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
          {navLinks.map((link) => (
            <button
              key={link.id}
              className="font-serif text-[28px] text-white hover:text-gold-400 transition-colors"
              onClick={() => { scrollTo(link.id); setMobileOpen(false) }}
            >
              {link.label}
            </button>
          ))}
          <button
            className="mt-4 font-sans text-[12px] tracking-[0.15em] uppercase px-10 py-4 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-all duration-300"
            onClick={() => { scrollTo('analisi'); setMobileOpen(false) }}
          >
            Analisi Gratuita
          </button>
        </div>
      )}
    </>
  )
}
