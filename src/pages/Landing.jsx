import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import SplashScreen from '../components/SplashScreen'
import Hero from '../components/sections/Hero'
import ComeFunziona from '../components/sections/ComeFunziona'
import Servizi from '../components/sections/Servizi'
import Risultati from '../components/sections/Risultati'
import Prezzi from '../components/sections/Prezzi'
import Confronto from '../components/sections/Confronto'
import Corporate from '../components/sections/Corporate'
import OwnerPortal from '../components/sections/OwnerPortal'
import AnalisiForm from '../components/sections/AnalisiForm'
import Vision from '../components/sections/Vision'
import Contatti from '../components/sections/Contatti'
import Footer from '../components/ui/Footer'
import CookieBanner from '../components/ui/CookieBanner'

const SPLASH_KEY = 'vbnb_splash_seen'

export default function Landing() {
  const alreadySeen = typeof window !== 'undefined' && sessionStorage.getItem(SPLASH_KEY) === 'true'
  const [entered, setEntered] = useState(alreadySeen)

  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden'
    if (!entered) window.scrollTo(0, 0)
  }, [entered])

  const handleEnter = () => {
    sessionStorage.setItem(SPLASH_KEY, 'true')
    setEntered(true)
  }

  return (
    <div className="relative bg-dark-900 text-white min-h-screen">
      <AnimatePresence mode="wait">
        {!entered && <SplashScreen onEnter={handleEnter} />}
      </AnimatePresence>

      <Navbar />

      <main>
        <Hero />
        <ComeFunziona />
        <Servizi />
        <Risultati />
        <Prezzi />
        <Confronto />
        <Corporate />
        <OwnerPortal />
        <AnalisiForm />
        <Vision />
        <Contatti />
      </main>

      <Footer />
      <CookieBanner />
    </div>
  )
}
