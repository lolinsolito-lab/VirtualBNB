import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/ui/Footer'
import CookieBanner from '../components/ui/CookieBanner'
import GuestHero from '../components/guest/GuestHero'
import GuestTrust from '../components/guest/GuestTrust'
import GuestProperties from '../components/guest/GuestProperties'
import GuestExperiences from '../components/guest/GuestExperiences'

export default function GuestLanding() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative bg-dark-900 text-white min-h-screen">
      <Navbar isGuest={true} />
      
      <main>
        <GuestHero />
        <GuestTrust />
        <GuestProperties />
        <GuestExperiences />
      </main>

      <Footer isGuest={true} />
      <CookieBanner />
    </div>
  )
}
