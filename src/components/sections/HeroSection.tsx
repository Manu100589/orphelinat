import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowRight, Heart, MapPin } from 'lucide-react'
import { MagneticButton, SplitMaskReveal, prefersReducedMotion } from '../ui/MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

interface HeroSectionProps {
  onOpenDonate: () => void
  onNavigate: (sectionId: string) => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDonate, onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const heroImgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-stagger',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          delay: 0.35,
          ease: 'power3.out',
        },
      )

      // Slow cinematic settle zoom 1.08 -> 1.0 on background photograph
      if (heroImgRef.current) {
        gsap.fromTo(
          heroImgRef.current,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 2.2,
            ease: 'power2.out',
          },
        )

        // Subtle background parallax on desktop scroll
        if (window.innerWidth >= 1024) {
          gsap.to(heroImgRef.current, {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.1,
            },
          })
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="accueil"
      ref={sectionRef}
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-10 sm:pt-32 lg:pt-36 lg:pb-12 bg-[#0C254D] text-[#FFFDF8] overflow-hidden"
    >
      {/* FULL-BLEED IMMERSIVE BACKGROUND PHOTOGRAPH */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={heroImgRef}
          src="/images/hero-ecole.png"
          alt="Les enfants de l'Orphelinat l'Espoir du Demain en uniforme scolaire avec leur encadreur devant le centre à Kinshasa"
          loading="eager"
          style={{ objectPosition: '58% 24%' }}
          className="w-full h-full object-cover will-change-transform"
        />

        {/* Directional editorial scrim: deep logo blue left-to-right so text is ultra-legible while faces on the right stay bright and natural */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0C254D]/92 via-[#12366F]/65 to-[#0C254D]/25"
        />
        {/* Gentle top & bottom vignette for navbar and bottom caption clarity */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0C254D]/60 via-transparent to-[#0C254D]/82"
        />
      </div>

      {/* FOREGROUND EDITORIAL CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full flex-1 flex flex-col justify-between gap-12">
        {/* Top Journal Dateline Strip */}
        <div className="hero-stagger flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#FFFDF8]/22 text-xs font-medium text-[#FFFDF8]/85">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D62828] ring-2 ring-[#FFFDF8]/50" />
            <span className="uppercase tracking-[0.2em] font-semibold text-[#FFFDF8]">
              L&apos;espoir, au quotidien
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#FFFDF8]/85">
            <MapPin className="w-3.5 h-3.5 text-[#F5C928]" />
            <span>Kimbanseke, Kinshasa · Un refuge, une famille, un avenir</span>
          </div>
        </div>

        {/* Center-Left Editorial Statement & CTAs */}
        <div className="my-auto py-6 sm:py-10 max-w-2xl space-y-7">
          <SplitMaskReveal
            as="h1"
            immediate
            delay={0.1}
            className="font-serif-display font-semibold text-[2.5rem] sm:text-[3.5rem] lg:text-[4.35rem] leading-[1.03] tracking-[-0.025em] text-[#FFFDF8] drop-shadow-[0_4px_24px_rgba(12,37,77,0.35)]"
            lines={[
              <>Ici, chaque enfant</>,
              <>
                peut{' '}
                <span className="relative inline-block">
                  grandir
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 bottom-1 h-2 bg-[#F5C928]/75 rounded-sm -z-10"
                  />
                </span>{' '}
                et
              </>,
              <>
                <em className="italic font-normal text-[#F5C928]">rêver en grand.</em>
              </>,
            ]}
          />

          <p className="hero-stagger text-[16.5px] sm:text-[18px] leading-[1.74] text-[#FFFDF8]/92 max-w-xl drop-shadow-[0_2px_12px_rgba(12,37,77,0.45)]">
            À Kinshasa, l&apos;Orphelinat l&apos;Espoir du Demain (O.E.D.) accueille les enfants
            orphelins et vulnérables dans un foyer aimant, où l&apos;école, les repas partagés et
            la présence d&apos;adultes attentifs préparent un avenir digne.
          </p>

          <div className="hero-stagger flex flex-wrap items-center gap-x-6 gap-y-4 pt-1">
            <MagneticButton
              onClick={onOpenDonate}
              className="group gap-2.5 px-7 py-4 rounded-full bg-[#F5C928] hover:bg-[#FFFDF8] text-[#12366F] font-ui font-extrabold text-sm sm:text-[15px] shadow-2xl"
            >
              <Heart className="w-4 h-4 text-[#D62828] fill-[#D62828] transition-transform duration-300 group-hover:scale-110" />
              <span>Soutenir les enfants</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>

            <button
              type="button"
              onClick={() => onNavigate('qui-sommes-nous')}
              className="group inline-flex items-center gap-2 py-2 font-ui font-bold text-sm sm:text-[15px] text-[#FFFDF8] hover:text-[#F5C928] border-b-2 border-[#FFFDF8]/50 hover:border-[#F5C928] transition-colors cursor-pointer"
            >
              <span>Découvrir le centre</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Bottom Caption & Scroll Cue Strip */}
        <div className="hero-stagger flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 border-t border-[#FFFDF8]/22 text-[13.5px] text-[#FFFDF8]/85">
          <p className="italic font-serif-display text-[15px] text-[#FFFDF8]/95">
            « Un toit, une famille, une chance de grandir. » — Les enfants de l&apos;O.E.D. et
            leur encadreur prêts pour l&apos;école.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('histoire')}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-ui font-bold uppercase tracking-[0.16em] text-[#F5C928] hover:text-[#FFFDF8] transition-colors cursor-pointer shrink-0"
          >
            <span>Lire la suite</span>
            <ArrowDown className="w-3.5 h-3.5 animate-scroll-cue" />
          </button>
        </div>
      </div>
    </section>
  )
}
