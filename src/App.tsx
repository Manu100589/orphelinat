import React, { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { StorytellingSection } from './components/sections/StorytellingSection'
import { AboutSection } from './components/sections/AboutSection'
import { ActionsSection } from './components/sections/ActionsSection'
import { DailyLifeSection } from './components/sections/DailyLifeSection'
import { GallerySection } from './components/sections/GallerySection'
import { ImpactSection } from './components/sections/ImpactSection'
import { SupportSection } from './components/sections/SupportSection'
import { PartnerSection } from './components/sections/PartnerSection'
import { NewsSection } from './components/sections/NewsSection'
import { ContactSection } from './components/sections/ContactSection'
import { SupportModal } from './components/ui/SupportModal'
import { prefersReducedMotion } from './components/ui/MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

export const App: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null)
  const [supportModalOpen, setSupportModalOpen] = useState(false)
  const [contactSubject, setContactSubject] = useState<string>('Faire un don')

  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId)
    if (!target) return

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -72, duration: 1.15 })
    } else {
      target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
  }, [])

  const handleOpenPartnerContact = useCallback(() => {
    setContactSubject('Devenir partenaire')
    scrollToSection('contact')
  }, [scrollToSection])

  const handleSupportContact = useCallback(() => {
    setContactSubject('Faire un don')
    scrollToSection('contact')
  }, [scrollToSection])

  const handleGoToDonatePage = useCallback(() => {
    window.location.href = `${import.meta.env.BASE_URL}don/index.html`
  }, [])

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#1E2A3D]">
      {/* Accessible skip-to-content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:rounded-full focus:bg-[#1554C7] focus:text-[#FFFDF8] focus:font-ui focus:font-bold"
      >
        Aller au contenu principal
      </a>

      <Navbar
        onOpenDonate={handleGoToDonatePage}
        onNavigate={scrollToSection}
      />

      <main id="main-content">
        <HeroSection
          onOpenDonate={handleGoToDonatePage}
          onNavigate={scrollToSection}
        />
        <StorytellingSection />
        <AboutSection />
        <ActionsSection onOpenDonate={() => setSupportModalOpen(true)} />
        <DailyLifeSection />
        <GallerySection />
        <ImpactSection />
        <SupportSection
          onOpenDonate={() => setSupportModalOpen(true)}
          onNavigate={scrollToSection}
        />
        <PartnerSection onSelectPartnerContact={handleOpenPartnerContact} />
        <NewsSection />
        <ContactSection presetSubject={contactSubject} />
      </main>

      <Footer
        onOpenDonate={() => setSupportModalOpen(true)}
        onNavigate={scrollToSection}
      />

      <SupportModal
        open={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
        onGoToContact={handleSupportContact}
      />
    </div>
  )
}

export default App
