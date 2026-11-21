import React, { useEffect, useState } from 'react'
import { Heart, Menu, X } from 'lucide-react'
import { MagneticButton } from '../ui/MotionPrimitives'

interface NavbarProps {
  onOpenDonate: () => void
  onNavigate: (sectionId: string) => void
}

const NAV_LINKS = [
  { label: 'Accueil', target: 'accueil' },
  { label: 'Qui sommes-nous', target: 'qui-sommes-nous' },
  { label: 'Nos actions', target: 'actions' },
  { label: 'Nos activités', target: 'activites' },
  { label: 'Galerie', target: 'galerie' },
  { label: 'Contact', target: 'contact' },
]

export const Navbar: React.FC<NavbarProps> = ({ onOpenDonate, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleLinkClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault()
    setMobileOpen(false)
    onNavigate(target)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#12366F]/12 shadow-[0_8px_28px_-18px_rgba(18,54,111,0.2)]'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Editorial Masthead Logo */}
          <a
            href="#accueil"
            onClick={(e) => handleLinkClick(e, 'accueil')}
            className="flex items-center gap-3 group shrink-0"
            aria-label="Accueil — Orphelinat l'Espoir du Demain"
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#F5C928]/90 bg-white transition-transform duration-500 group-hover:scale-105">
              <img
                src="/images/logo-oed.png"
                alt="Logo Orphelinat l'Espoir du Demain"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <span
                className={`block font-serif-display font-semibold text-[16.5px] sm:text-[18px] tracking-[-0.015em] transition-colors duration-300 ${
                  scrolled ? 'text-[#12366F]' : 'text-[#FFFDF8]'
                }`}
              >
                L&apos;Espoir du Demain
              </span>
              <span
                className={`block font-ui text-[10.5px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  scrolled ? 'text-[#D62828]' : 'text-[#F5C928]'
                }`}
              >
                O.E.D. · Kinshasa
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => handleLinkClick(e, link.target)}
                className={`relative px-3.5 py-2 text-[14px] font-medium transition-colors ${
                  scrolled
                    ? 'text-[#1E2A3D]/85 hover:text-[#1554C7]'
                    : 'text-[#FFFDF8]/92 hover:text-[#F5C928]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <MagneticButton
              onClick={onOpenDonate}
              className={`group gap-2.5 px-5 py-2.5 rounded-full font-ui font-bold text-[12.5px] tracking-[0.06em] uppercase transition-all ${
                scrolled
                  ? 'bg-[#1554C7] hover:bg-[#12366F] text-[#FFFDF8] shadow-cta'
                  : 'bg-[#F5C928] hover:bg-[#FFFDF8] text-[#12366F] shadow-lg'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${
                  scrolled
                    ? 'text-[#F5C928] fill-[#F5C928]'
                    : 'text-[#D62828] fill-[#D62828]'
                }`}
              />
              <span>Soutenir les enfants</span>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            className={`lg:hidden relative z-50 w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
              scrolled || mobileOpen
                ? 'bg-[#F1F5FB] border border-[#12366F]/15 text-[#12366F]'
                : 'bg-[#FFFDF8]/15 backdrop-blur-md border border-[#FFFDF8]/30 text-[#FFFDF8]'
            }`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0C254D]/55 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#FFFDF8] px-7 pt-28 pb-10 flex flex-col justify-between shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D62828] mb-6">
              L&apos;espoir, au quotidien
            </p>
            <nav aria-label="Menu mobile" className="flex flex-col divide-y divide-[#12366F]/10">
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={link.target}
                  href={`#${link.target}`}
                  onClick={(e) => handleLinkClick(e, link.target)}
                  style={{
                    transitionDelay: mobileOpen ? `${idx * 40}ms` : '0ms',
                  }}
                  className={`py-4 font-serif-display font-medium text-2xl text-[#12366F] hover:text-[#1554C7] transition-all duration-300 ${
                    mobileOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#12366F]/12">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false)
                onOpenDonate()
              }}
              className="w-full py-4 px-6 rounded-full bg-[#1554C7] hover:bg-[#12366F] text-[#FFFDF8] font-ui font-bold text-sm uppercase tracking-[0.08em] flex items-center justify-center gap-2.5 shadow-cta cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#F5C928] fill-[#F5C928]" />
              <span>Soutenir les enfants</span>
            </button>
            <p className="text-xs text-[#516075] text-center">
              Kimbanseke · Route Mokali, Av. Poto poto 98 · Kinshasa
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}
