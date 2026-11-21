import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  BookOpen,
  Building2,
  HeartHandshake,
  Shapes,
  Shirt,
  Sparkles,
  Users,
  Utensils,
} from 'lucide-react'
import { PARTNER_WAYS } from '../../data/siteData'
import {
  KineticTrackingHeading,
  MagneticButton,
  prefersReducedMotion,
} from '../ui/MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

const ICON_MAP = {
  HeartHandshake,
  BookOpen,
  Utensils,
  Shirt,
  Shapes,
  Building2,
  Users,
  Sparkles,
}

interface PartnerSectionProps {
  onSelectPartnerContact: () => void
}

export const PartnerSection: React.FC<PartnerSectionProps> = ({
  onSelectPartnerContact,
}) => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.partner-row',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.partner-list',
            start: 'top 84%',
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="partenaires"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#FFFDF8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT STICKY MANIFESTO + PHOTO VIGNETTE */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <span className="w-9 h-[2px] bg-[#D62828]" />
              <span className="font-ui font-bold text-xs uppercase tracking-[0.22em] text-[#1554C7]">
                Comment aider · Devenir partenaire
              </span>
            </div>

            <KineticTrackingHeading
              as="h2"
              className="font-serif-display font-semibold text-[2.2rem] sm:text-[3rem] lg:text-[3.3rem] leading-[1.07] text-[#12366F]"
            >
              L&apos;espoir se construit{' '}
              <em className="italic font-normal text-[#D62828]">ensemble.</em>
            </KineticTrackingHeading>

            <p className="text-[16.5px] leading-[1.74] text-[#1E2A3D]/84">
              Particuliers, entreprises, organisations et personnes de bonne volonté : chacun peut
              contribuer à améliorer le quotidien des enfants selon ses moyens et ses envies.
            </p>

            <figure className="pt-2 space-y-2">
              <div className="overflow-hidden rounded-2xl aspect-[16/10] bg-[#12366F] shadow-journal ring-1 ring-[#12366F]/10">
                <img
                  src="/images/repas-partage.jpg"
                  alt="Partage d'un repas chaud au sein de l'Orphelinat l'Espoir du Demain"
                  loading="lazy"
                  style={{ objectPosition: '50% 35%' }}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs text-[#516075]">
                Un geste solidaire se traduit aussitôt en repas, en cahiers ou en temps partagé.
              </figcaption>
            </figure>

            <div className="pt-2">
              <MagneticButton
                onClick={onSelectPartnerContact}
                className="group gap-2.5 px-7 py-4 rounded-full bg-[#12366F] hover:bg-[#1554C7] text-[#FFFDF8] font-ui font-bold text-sm shadow-journal"
              >
                <span>Rejoindre nos partenaires</span>
                <ArrowRight className="w-4 h-4 text-[#F5C928] transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
            </div>
          </div>

          {/* RIGHT 8-ROW EDITORIAL INDEX */}
          <div className="partner-list lg:col-span-7 border-t border-[#12366F]/16 divide-y divide-[#12366F]/14">
            {PARTNER_WAYS.map((way) => {
              const Icon = ICON_MAP[way.icon]
              return (
                <div
                  key={way.id}
                  className="partner-row group py-6 flex items-start gap-5 transition-colors hover:bg-[#F1F5FB]/85 px-3 -mx-3 rounded-xl"
                >
                  <span className="font-serif-display italic text-lg text-[#D62828] pt-0.5 shrink-0 w-7">
                    {way.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#1554C7] shrink-0" />
                      <h3 className="font-serif-display font-semibold text-xl text-[#12366F] group-hover:text-[#1554C7] transition-colors">
                        {way.title}
                      </h3>
                    </div>
                    <p className="text-[15px] leading-[1.7] text-[#516075] mt-1.5">
                      {way.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
