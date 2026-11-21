import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Handshake, Heart, Mail, Sun } from 'lucide-react'
import { MagneticButton, SplitMaskReveal, prefersReducedMotion } from '../ui/MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

interface SupportSectionProps {
  onOpenDonate: () => void
  onNavigate: (sectionId: string) => void
}

export const SupportSection: React.FC<SupportSectionProps> = ({
  onOpenDonate,
  onNavigate,
}) => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.support-fade',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="soutenir"
      ref={sectionRef}
      className="relative bg-[#1554C7] text-[#FFFDF8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT CALL TO ACTION */}
          <div className="lg:col-span-7 space-y-7">
            <div className="support-fade inline-flex items-center gap-2.5 text-[#F5C928] font-ui font-bold text-xs uppercase tracking-[0.22em]">
              <Sun className="w-4 h-4" />
              <span>Agir aujourd&apos;hui pour leur avenir</span>
            </div>

            <SplitMaskReveal
              as="h2"
              className="font-serif-display font-semibold text-[2.3rem] sm:text-[3.2rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-[#FFFDF8]"
              lines={[
                <>Et si vous deveniez</>,
                <>
                  une partie de <em className="italic font-normal text-[#F5C928]">leur histoire ?</em>
                </>,
              ]}
            />

            <p className="support-fade text-[17px] sm:text-[18px] leading-[1.74] text-[#FFFDF8]/90 max-w-2xl">
              Votre soutien peut contribuer à offrir aux enfants un environnement sécurisé, une
              éducation, des repas, des soins et des opportunités pour construire leur avenir.
            </p>

            <div className="support-fade pt-2 flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={onOpenDonate}
                className="group gap-2.5 px-8 py-4 rounded-full bg-[#F5C928] hover:bg-[#FFFDF8] text-[#12366F] font-ui font-extrabold text-sm sm:text-[15px] shadow-journal"
              >
                <Heart className="w-4 h-4 text-[#D62828] fill-[#D62828] transition-transform duration-300 group-hover:scale-110" />
                <span>Faire un don</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>

              <MagneticButton
                onClick={() => onNavigate('partenaires')}
                className="gap-2.5 px-7 py-4 rounded-full bg-[#12366F] hover:bg-[#0C254D] text-[#FFFDF8] font-ui font-bold text-sm sm:text-[15px]"
              >
                <Handshake className="w-4 h-4 text-[#F5C928]" />
                <span>Devenir partenaire</span>
              </MagneticButton>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-3 py-2 font-ui font-bold text-sm sm:text-[15px] text-[#FFFDF8] hover:text-[#F5C928] border-b border-[#FFFDF8]/45 hover:border-[#F5C928] transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Nous contacter</span>
              </button>
            </div>
          </div>

          {/* RIGHT HUMAN PHOTOGRAPH */}
          <figure className="support-fade lg:col-span-5 space-y-2.5">
            <div className="overflow-hidden rounded-2xl aspect-[3/3.9] max-w-md mx-auto lg:ml-auto bg-[#12366F] ring-1 ring-[#FFFDF8]/20 shadow-2xl">
              <img
                src="/images/joie-groupe.jpg"
                alt="Les enfants de l'Orphelinat l'Espoir du Demain souriant ensemble"
                loading="lazy"
                style={{ objectPosition: '50% 0%' }}
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="text-xs text-[#FFFDF8]/82 max-w-md mx-auto lg:ml-auto">
              Chaque geste de générosité soutient directement la vie quotidienne au centre O.E.D.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
