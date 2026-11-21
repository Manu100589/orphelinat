import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CORE_VALUES } from '../../data/siteData'
import { prefersReducedMotion } from '../ui/MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

const ABOUT_SLIDES = [
  {
    id: 'about-1',
    number: '01',
    label: 'Identité & foyer',
    image: '/images/centre-famille.jpg',
    imageAlt:
      "Les enfants et les adultes encadreurs réunis devant l'Orphelinat l'Espoir du Demain",
    objectPosition: '50% 26%',
    caption: 'Les enfants et les encadreurs rassemblés devant la façade du centre O.E.D. à Kimbanseke.',
  },
  {
    id: 'about-2',
    number: '02',
    label: 'Notre mission',
    image: '/images/enfants-ensemble.jpg',
    imageAlt:
      "Enfants accueillis au sein du centre d'encadrement et d'hébergement O.E.D.",
    objectPosition: '50% 25%',
    caption: 'Un accompagnement quotidien fondé sur l’écoute, les soins, l’éducation et la bienveillance.',
  },
  {
    id: 'about-3',
    number: '03',
    label: 'Nos 6 valeurs',
    image: '/images/gouter-centre.jpg',
    imageAlt:
      "Moments de vie quotidienne et d'entraide entre grands et petits au centre O.E.D.",
    objectPosition: '50% 25%',
    caption: 'Six repères humains qui guident chaque journée pour construire leur autonomie.',
  },
] as const

export const AboutSection: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const reducedMotion = prefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const container = stageRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024

      const img0 = container.querySelector('.about-img-0')
      const layer1 = container.querySelector('.about-layer-1')
      const img1 = container.querySelector('.about-img-1')
      const layer2 = container.querySelector('.about-layer-2')
      const img2 = container.querySelector('.about-img-2')

      const panel0 = container.querySelector('.about-panel-0')
      const panel1 = container.querySelector('.about-panel-1')
      const panel2 = container.querySelector('.about-panel-2')
      const progressBar = container.querySelector('.about-progress-fill')

      // Initial states — lateral cinematic wipe from right to left
      gsap.set(img0, { scale: 1.07, xPercent: 0 })
      gsap.set(layer1, { clipPath: 'inset(0% 0% 0% 100%)' })
      gsap.set(img1, { scale: 1.12, xPercent: 4 })
      gsap.set(layer2, { clipPath: 'inset(0% 0% 0% 100%)' })
      gsap.set(img2, { scale: 1.12, xPercent: 4 })

      gsap.set(panel0, { opacity: 1, y: 0 })
      gsap.set(panel1, { opacity: 0, y: 36 })
      gsap.set(panel2, { opacity: 0, y: 36 })
      gsap.set(progressBar, { scaleX: 0.33, transformOrigin: 'left center' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: isDesktop ? '+=250%' : '+=210%',
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: [0, 0.5, 1],
            duration: { min: 0.25, max: 0.55 },
            delay: 0.04,
            ease: 'power3.inOut',
          },
          onUpdate: (self) => {
            const idx = Math.min(2, Math.round(self.progress * 2))
            setActiveStep((prev) => (prev !== idx ? idx : prev))
          },
        },
      })
      scrollTriggerRef.current = tl.scrollTrigger ?? null

      // Step 1 (0.0 -> 1.0): Act 1 fixed plateau (0 -> 0.30), then transition 1 -> 2 (0.30 -> 0.70), then Act 2 fixed plateau (0.70 -> 1.0)
      tl.to(img0, { scale: 1.0, duration: 0.3, ease: 'none' }, 0)
      tl.to(panel0, { opacity: 0, y: -28, duration: 0.18, ease: 'power2.in' }, 0.3)
      tl.to(img0, { xPercent: -4, scale: 1.03, duration: 0.4, ease: 'power3.inOut' }, 0.3)
      tl.to(
        layer1,
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.4, ease: 'power3.inOut' },
        0.3,
      )
      tl.to(img1, { scale: 1.0, xPercent: 0, duration: 0.4, ease: 'power2.out' }, 0.3)
      tl.to(panel1, { opacity: 1, y: 0, duration: 0.22, ease: 'power3.out' }, 0.48)
      tl.to(progressBar, { scaleX: 0.66, duration: 0.4, ease: 'power3.inOut' }, 0.3)
      tl.to({}, { duration: 0.3 }, 0.7)

      // Step 2 (1.0 -> 2.0): Act 2 fixed plateau (1.0 -> 1.30), then transition 2 -> 3 (1.30 -> 1.70), then Act 3 fixed plateau (1.70 -> 2.0)
      tl.to(panel1, { opacity: 0, y: -28, duration: 0.18, ease: 'power2.in' }, 1.3)
      tl.to(img1, { xPercent: -4, scale: 1.03, duration: 0.4, ease: 'power3.inOut' }, 1.3)
      tl.to(
        layer2,
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.4, ease: 'power3.inOut' },
        1.3,
      )
      tl.to(img2, { scale: 1.0, xPercent: 0, duration: 0.4, ease: 'power2.out' }, 1.3)
      tl.to(panel2, { opacity: 1, y: 0, duration: 0.22, ease: 'power3.out' }, 1.48)
      tl.to(progressBar, { scaleX: 1, duration: 0.4, ease: 'power3.inOut' }, 1.3)
      tl.to({}, { duration: 0.3 }, 1.7)
    }, stageRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [reducedMotion])

  const jumpToStep = (index: number) => {
    const st = scrollTriggerRef.current
    if (!st) return
    const fractions = [0, 0.5, 1]
    const targetY = st.start + (st.end - st.start) * fractions[index]
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  return (
    <section
      id="qui-sommes-nous"
      aria-label="Qui sommes-nous — Orphelinat l'Espoir du Demain"
      className="relative bg-[#12366F] text-[#FFFDF8] overflow-hidden"
    >
      {/* ================================================================ */}
      {/* UNIFIED DESKTOP & MOBILE: PINNED 3-ACT STORYTELLING ABOUT        */}
      {/* ================================================================ */}
      {!reducedMotion && (
        <div
          ref={stageRef}
          className="relative w-full h-[100dvh] min-h-[640px] overflow-hidden bg-[#12366F]"
        >
          {/* Full-Bleed Background Photographic Layers */}
          {ABOUT_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`about-layer-${idx} absolute inset-0 w-full h-full overflow-hidden`}
              style={{
                zIndex: idx + 1,
                clipPath: idx > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 0% 0% 0%)',
              }}
            >
              <img
                src={slide.image}
                alt={slide.imageAlt}
                style={{ objectPosition: slide.objectPosition }}
                className={`about-img-${idx} w-full h-full object-cover will-change-transform`}
              />
              {/* Deep logo-blue editorial scrim for high contrast & warm visibility */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#0C254D]/94 via-[#12366F]/76 to-[#0C254D]/35"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0C254D]/94 via-[#0C254D]/35 to-[#0C254D]/45"
              />
            </div>
          ))}

          {/* Persistent Foreground Storytelling Frame */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-6 sm:pt-24 sm:pb-10 lg:py-14 flex flex-col justify-between pointer-events-none">
            {/* Top Masthead Bar */}
            <div className="flex items-center justify-between lg:pt-12 border-b border-[#FFFDF8]/20 pb-3.5 sm:pb-5 pointer-events-auto">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-6 sm:w-8 h-[2px] bg-[#F5C928]" />
                <span className="font-ui font-bold text-[10.5px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#F5C928]">
                  Qui sommes-nous ? · {ABOUT_SLIDES[activeStep].label}
                </span>
              </div>

              <div className="font-serif-display text-base sm:text-lg shrink-0">
                <span className="italic font-semibold text-[#F5C928]">0{activeStep + 1}</span>
                <span className="text-[#FFFDF8]/55"> / 0{ABOUT_SLIDES.length}</span>
              </div>
            </div>

            {/* Center Dynamic Storytelling Panels */}
            <div className="relative flex-1 flex items-end pb-4 sm:items-center sm:pb-0">
              {/* PANEL 01: Identity, O.E.D. Centre & Emblem */}
              <div className="about-panel-0 absolute left-0 right-0 max-w-3xl space-y-4 sm:space-y-6 will-change-transform opacity-100">
                <span className="inline-flex items-center gap-2 font-ui font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#F5C928]">
                  <span className="w-2 h-2 rounded-full bg-[#D62828]" />
                  Acte 01 · Notre foyer à Kinshasa
                </span>

                <h2 className="font-serif-display font-semibold text-[1.95rem] sm:text-[2.75rem] lg:text-[3.35rem] xl:text-[3.7rem] leading-[1.06] tracking-[-0.02em] text-[#FFFDF8] drop-shadow-[0_4px_24px_rgba(12,37,77,0.45)]">
                  Une famille de cœur pour ceux qui en ont{' '}
                  <em className="italic font-normal text-[#F5C928]">besoin.</em>
                </h2>

                <p className="text-[15px] sm:text-[17px] lg:text-[18px] leading-[1.7] sm:leading-[1.76] text-[#FFFDF8]/90 max-w-2xl">
                  L&apos;Orphelinat l&apos;Espoir du Demain (
                  <strong className="font-semibold text-white">O.E.D.</strong>) est un centre
                  d&apos;encadrement et d&apos;hébergement dédié à l&apos;accueil des enfants
                  orphelins et vulnérables. Notre mission est de leur offrir un environnement sûr,
                  aimant et propice à leur épanouissement.
                </p>

                {/* Official O.E.D. Emblem Badge */}
                <div className="inline-flex items-center gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-[#0C254D]/75 backdrop-blur-md border border-[#FFFDF8]/18 max-w-lg">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl overflow-hidden ring-1 ring-[#F5C928]/75">
                    <img
                      src="/images/centre-embleme.jpg"
                      alt="Emblème peint du Centre d'encadrement et d'hébergement O.E.D."
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-[11px] font-ui font-bold uppercase tracking-[0.18em] text-[#F5C928]">
                      O.E.D. · Centre officiel
                    </span>
                    <p className="font-serif-display text-xs sm:text-[14.5px] leading-snug text-[#FFFDF8] mt-0.5">
                      Centre d&apos;encadrement et d&apos;hébergement des enfants orphelins et
                      vulnérables · Kimbanseke
                    </p>
                  </div>
                </div>
              </div>

              {/* PANEL 02: Mission & Holistic Care */}
              <div className="about-panel-1 absolute left-0 right-0 max-w-3xl space-y-4 sm:space-y-6 will-change-transform opacity-0">
                <span className="inline-flex items-center gap-2 font-ui font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#F5C928]">
                  <span className="w-2 h-2 rounded-full bg-[#D62828]" />
                  Acte 02 · Notre engagement quotidien
                </span>

                <h3 className="font-serif-display font-semibold text-[1.9rem] sm:text-[2.65rem] lg:text-[3.25rem] xl:text-[3.55rem] leading-[1.06] tracking-[-0.02em] text-[#FFFDF8] drop-shadow-[0_4px_24px_rgba(12,37,77,0.45)]">
                  Redonner espoir et préparer des citoyens{' '}
                  <em className="italic font-normal text-[#F5C928]">responsables et autonomes.</em>
                </h3>

                <p className="text-[15px] sm:text-[17px] lg:text-[18px] leading-[1.7] sm:leading-[1.76] text-[#FFFDF8]/90 max-w-2xl">
                  À travers l&apos;éducation, les soins, l&apos;accompagnement psychosocial et les
                  valeurs de solidarité, nous œuvrons chaque jour pour entourer chaque enfant avec
                  dignité et lui donner les repères nécessaires pour construire sa vie.
                </p>

                {/* 3 Key Pillars Highlight Strip */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-1 max-w-2xl">
                  {[
                    { num: 'I', label: 'Éducation & suivi' },
                    { num: 'II', label: 'Soins & protection' },
                    { num: 'III', label: 'Écoute & solidarité' },
                  ].map((item) => (
                    <div
                      key={item.num}
                      className="p-3 sm:p-4 rounded-xl bg-[#0C254D]/70 backdrop-blur-md border border-[#FFFDF8]/16"
                    >
                      <span className="block font-serif-display italic text-sm sm:text-base text-[#F5C928]">
                        {item.num}
                      </span>
                      <span className="block font-ui font-bold text-xs sm:text-sm text-[#FFFDF8] mt-0.5">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PANEL 03: The 6 Core Values Ledger */}
              <div className="about-panel-2 absolute left-0 right-0 w-full space-y-3.5 sm:space-y-5 will-change-transform opacity-0">
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-2 font-ui font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#F5C928]">
                    <span className="w-2 h-2 rounded-full bg-[#D62828]" />
                    Acte 03 · Nos six repères au quotidien
                  </span>
                  <h3 className="font-serif-display font-semibold text-[1.7rem] sm:text-[2.35rem] lg:text-[2.75rem] leading-[1.08] text-[#FFFDF8]">
                    Les valeurs qui unissent{' '}
                    <em className="italic font-normal text-[#F5C928]">notre famille.</em>
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3.5 lg:gap-4">
                  {CORE_VALUES.map((val) => (
                    <div
                      key={val.name}
                      className="p-2.5 sm:p-3.5 lg:p-5 rounded-xl lg:rounded-2xl bg-[#0C254D]/78 backdrop-blur-md border border-[#FFFDF8]/16 space-y-0.5 sm:space-y-1"
                    >
                      <div className="flex items-baseline gap-1.5 sm:gap-2">
                        <span className="font-serif-display italic text-xs sm:text-sm text-[#F5C928]">
                          {val.number}
                        </span>
                        <h4 className="font-serif-display font-semibold text-[15px] sm:text-base lg:text-xl text-[#FFFDF8]">
                          {val.name}
                        </h4>
                      </div>
                      <p className="text-[11.5px] sm:text-[12.5px] lg:text-[13.5px] leading-snug lg:leading-relaxed text-[#FFFDF8]/84">
                        {val.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Caption + Interactive Progress Controls */}
            <div className="pt-3.5 sm:pt-5 border-t border-[#FFFDF8]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-8 pointer-events-auto">
              <p className="font-serif-display italic text-[13px] sm:text-[15px] text-[#FFFDF8]/88 line-clamp-1 sm:line-clamp-none">
                {ABOUT_SLIDES[activeStep].caption}
              </p>

              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-5 shrink-0">
                <div className="flex items-center gap-2">
                  {ABOUT_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => jumpToStep(idx)}
                      aria-label={`Aller au chapitre ${slide.number} : ${slide.label}`}
                      className={`px-3 py-1 rounded-full font-ui text-xs font-bold transition-all cursor-pointer ${
                        activeStep === idx
                          ? 'bg-[#F5C928] text-[#12366F]'
                          : 'bg-[#FFFDF8]/12 text-[#FFFDF8]/75 hover:bg-[#FFFDF8]/22'
                      }`}
                    >
                      {slide.number}
                    </button>
                  ))}
                </div>
                <div className="w-28 sm:w-32 h-1 rounded-full bg-[#FFFDF8]/20 overflow-hidden">
                  <div className="about-progress-fill w-full h-full bg-[#F5C928] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* REDUCED-MOTION FALLBACK                                          */}
      {/* ================================================================ */}
      {reducedMotion && (
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="font-ui font-bold text-xs uppercase tracking-[0.22em] text-[#F5C928]">
              Qui sommes-nous ?
            </span>
            <h2 className="font-serif-display font-semibold text-3xl sm:text-5xl text-[#FFFDF8]">
              Une famille de cœur pour ceux qui en ont{' '}
              <em className="italic font-normal text-[#F5C928]">besoin.</em>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#FFFDF8]/86">
              L&apos;Orphelinat l&apos;Espoir du Demain (O.E.D.) est un centre d&apos;encadrement
              et d&apos;hébergement dédié à l&apos;accueil des enfants orphelins et vulnérables à
              Kimbanseke, Kinshasa.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_VALUES.map((val) => (
              <div
                key={val.name}
                className="p-5 rounded-2xl bg-[#0C254D]/75 border border-[#FFFDF8]/15"
              >
                <span className="font-serif-display italic text-sm text-[#F5C928]">
                  {val.number}
                </span>
                <h3 className="font-serif-display font-semibold text-xl text-[#FFFDF8] mt-1">
                  {val.name}
                </h3>
                <p className="text-sm text-[#FFFDF8]/78 mt-1">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
