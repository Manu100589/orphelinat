import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, CheckCircle2, Heart, X } from 'lucide-react'
import { ACTION_PILLARS, type PillarItem } from '../../data/siteData'
import { MagneticButton, prefersReducedMotion } from '../ui/MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

interface ActionsSectionProps {
  onOpenDonate: () => void
}

export const ActionsSection: React.FC<ActionsSectionProps> = ({ onOpenDonate }) => {
  const stageRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activePillar, setActivePillar] = useState<PillarItem | null>(null)
  const reducedMotion = prefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const container = stageRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024
      const slides = gsap.utils.toArray<HTMLElement>('.action-vslide', container)
      const progressThumb = container.querySelector('.action-vprogress-fill')

      const total = slides.length
      const snapPoints = ACTION_PILLARS.map((_, i) => i / (total - 1))

      // Slide 0 fixed and 100% visible; Slides 1..3 solid (opacity: 1) waiting right below viewport (yPercent: 104)
      slides.forEach((slide, idx) => {
        if (idx === 0) {
          gsap.set(slide, { yPercent: 0, scale: 1, opacity: 1, zIndex: 1 })
        } else {
          gsap.set(slide, { yPercent: 104, scale: 1, opacity: 1, zIndex: idx + 1 })
        }
      })

      if (progressThumb) {
        gsap.set(progressThumb, {
          scaleY: 1 / total,
          transformOrigin: 'top center',
        })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: isDesktop ? '+=320%' : '+=280%',
          pin: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.2, max: 0.45 },
            delay: 0.02,
            ease: 'power3.out',
          },
          onUpdate: (self) => {
            const idx = Math.min(total - 1, Math.round(self.progress * (total - 1)))
            setActiveIndex((prev) => (prev !== idx ? idx : prev))
          },
        },
      })
      scrollTriggerRef.current = tl.scrollTrigger ?? null

      /**
       * 3 equal scroll intervals (1.0 unit each -> total duration 3.0):
       * Each block stays 100% FIXED & STATIONARY for 60% of the scroll step,
       * and glides vertically in a crisp 0.40 window so every block locks fixed
       * with all its elements (image, title, paragraph, need, buttons) completely visible.
       */
      for (let i = 0; i < total - 1; i++) {
        const currentSlide = slides[i]
        const nextSlide = slides[i + 1]
        const stepStart = i * 1.0

        // Stationary plateau before transition (stepStart -> stepStart + 0.30)
        tl.to(
          currentSlide,
          {
            yPercent: -104,
            scale: 0.96,
            duration: 0.4,
            ease: 'power3.inOut',
          },
          stepStart + 0.3,
        )

        tl.fromTo(
          nextSlide,
          { yPercent: 104, scale: 1, opacity: 1 },
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'power3.inOut',
          },
          stepStart + 0.3,
        )

        if (progressThumb) {
          tl.to(
            progressThumb,
            {
              scaleY: (i + 2) / total,
              duration: 0.4,
              ease: 'power3.inOut',
            },
            stepStart + 0.3,
          )
        }

        // Stationary plateau after transition (stepStart + 0.70 -> stepStart + 1.00)
        tl.to({}, { duration: 0.3 }, stepStart + 0.7)
      }
    }, stageRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [reducedMotion])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePillar(null)
    }
    if (activePillar) {
      window.addEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [activePillar])

  const jumpToSlide = (index: number) => {
    const st = scrollTriggerRef.current
    if (!st) return
    const total = ACTION_PILLARS.length
    const fraction = index / (total - 1)
    const targetY = st.start + (st.end - st.start) * fraction
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  return (
    <section
      id="actions"
      aria-label="Nos actions et besoins concrets"
      className="relative bg-[#FFFDF8] text-[#1E2A3D] overflow-hidden"
    >
      {/* ================================================================ */}
      {/* UNIFIED DESKTOP & MOBILE: SNAP-LOCKED VERTICAL SLIDING SLIDER    */}
      {/* ================================================================ */}
      {!reducedMotion && (
        <div
          ref={stageRef}
          className="relative w-full h-[100dvh] bg-[#FFFDF8] overflow-hidden flex flex-col"
        >
          {/* Subtle logo-colored background accents */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 right-[-6%] w-96 h-96 rounded-full bg-[#F5C928]/[0.14] blur-3xl" />
            <div className="absolute -bottom-24 left-[-6%] w-96 h-96 rounded-full bg-[#1554C7]/[0.07] blur-3xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[76px] pb-3 sm:pt-[80px] sm:pb-4 lg:pt-[86px] lg:pb-5 w-full h-full flex flex-col justify-between gap-2 sm:gap-3">
            {/* TOP COMPACT MASTHEAD & STEP COUNTER */}
            <div className="flex items-end justify-between gap-3 pb-2 sm:pb-3 border-b border-[#12366F]/14 shrink-0">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 sm:w-6 h-[2px] bg-[#D62828]" />
                  <span className="font-ui font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#1554C7]">
                    Nos actions &amp; besoins concrets
                  </span>
                </div>
                <h2 className="font-serif-display font-semibold text-[1.15rem] sm:text-[1.6rem] lg:text-[2rem] leading-[1.1] tracking-[-0.02em] text-[#12366F]">
                  Soins, école, repas, jeux : ce qui fait{' '}
                  <em className="italic font-normal text-[#D62828]">grandir</em> chaque jour.
                </h2>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-ui font-semibold text-[#516075] hidden md:inline">
                  Axe fixé · {ACTION_PILLARS[activeIndex].tag}
                </span>
                <div className="font-serif-display text-base sm:text-xl lg:text-2xl text-[#12366F]">
                  <span className="italic font-semibold text-[#D62828]">
                    {ACTION_PILLARS[activeIndex].number}
                  </span>
                  <span className="text-[#516075]/60 text-xs sm:text-sm">
                    {' '}
                    / 0{ACTION_PILLARS.length}
                  </span>
                </div>
              </div>
            </div>

            {/* CENTER VERTICAL SLIDING STAGE + RIGHT VERTICAL RAIL */}
            <div className="relative flex-1 min-h-0 flex items-center gap-4 lg:gap-5">
              {/* Vertical Sliding Viewport — All elements (image, title, paragraph, need, buttons) fit 100% */}
              <div className="relative flex-1 h-full overflow-hidden rounded-2xl sm:rounded-3xl">
                {ACTION_PILLARS.map((pillar) => {
                  const hasCompanionPhoto = Boolean(pillar.secondaryImage)

                  return (
                    <article
                      key={pillar.id}
                      className="action-vslide absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl bg-[#F1F5FB] border border-[#12366F]/14 shadow-journal p-3.5 sm:p-5 lg:p-8 flex flex-col justify-center md:grid md:grid-cols-12 gap-3 sm:gap-5 lg:gap-9 md:items-center overflow-y-auto md:overflow-hidden will-change-transform"
                    >
                      {/* Faint XXL Background Number */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none select-none absolute -bottom-4 right-5 font-serif-display italic font-bold text-[5.5rem] sm:text-[8.5rem] leading-none text-[#12366F]/[0.05]"
                      >
                        {pillar.number}
                      </span>

                      {/* LEFT / TOP COMPLETE PHOTO BLOCK */}
                      <div className="md:col-span-5 lg:col-span-6 w-full h-[148px] sm:h-[185px] md:h-[260px] lg:h-[330px] xl:h-[370px] flex items-center shrink-0">
                        {hasCompanionPhoto ? (
                          <div className="grid grid-cols-12 gap-2.5 sm:gap-3.5 w-full h-full items-center">
                            <div className="col-span-7 h-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#12366F] shadow-journal ring-1 ring-[#12366F]/10">
                              <img
                                src={pillar.image}
                                alt={pillar.imageAlt}
                                style={{ objectPosition: pillar.imagePosition ?? '50% 20%' }}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="col-span-5 h-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#12366F] shadow-journal ring-1 ring-[#12366F]/10">
                              <img
                                src={pillar.secondaryImage}
                                alt={pillar.secondaryImageAlt ?? pillar.imageAlt}
                                style={{ objectPosition: '50% 18%' }}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#12366F] shadow-journal ring-1 ring-[#12366F]/10 relative">
                            <img
                              src={pillar.image}
                              alt={pillar.imageAlt}
                              style={{ objectPosition: pillar.imagePosition ?? '50% 22%' }}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#FFFDF8]/95 backdrop-blur-md font-ui font-bold text-[10px] sm:text-[11px] text-[#12366F] shadow-sm">
                              Axe {pillar.number} · {pillar.tag}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* RIGHT / BOTTOM COMPLETE TEXT BLOCK (Number + Tag + Full Title + Full Paragraph + Need Box + CTAs) */}
                      <div className="md:col-span-7 lg:col-span-6 space-y-1.5 sm:space-y-2.5 lg:space-y-3.5 relative z-10 flex flex-col justify-center">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif-display italic text-lg sm:text-2xl lg:text-3xl text-[#D62828] leading-none">
                            {pillar.number}
                          </span>
                          <span className="font-ui text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#1554C7]">
                            {pillar.tag}
                          </span>
                        </div>

                        <h3 className="font-serif-display font-semibold text-[1.18rem] sm:text-[1.5rem] lg:text-[2rem] xl:text-[2.15rem] leading-[1.12] tracking-[-0.02em] text-[#12366F]">
                          {pillar.title}
                        </h3>

                        {/* Full Paragraph — 100% visible, never truncated */}
                        <p className="text-[12.5px] sm:text-[14px] lg:text-[15.5px] leading-[1.52] sm:leading-[1.64] text-[#1E2A3D]/90">
                          {pillar.description}
                        </p>

                        {/* Concrete Need Callout — 100% visible */}
                        <div className="px-3 py-2 sm:p-3 rounded-xl bg-[#FFFDF8] border border-[#12366F]/12 space-y-0.5">
                          <span className="block font-ui text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1554C7]">
                            Besoin concret · {pillar.needLabel}
                          </span>
                          <p className="text-[11.5px] sm:text-[13px] text-[#516075] leading-snug">
                            {pillar.howToHelp}.
                          </p>
                        </div>

                        {/* Interactive CTAs — 100% visible */}
                        <div className="pt-0.5 flex flex-wrap items-center gap-4 sm:gap-6">
                          <button
                            type="button"
                            onClick={() => setActivePillar(pillar)}
                            className="group inline-flex items-center gap-1.5 font-ui font-bold text-xs sm:text-sm text-[#12366F] hover:text-[#1554C7] border-b-2 border-[#F5C928] pb-0.5 transition-colors cursor-pointer"
                          >
                            <span>Découvrir en détail</span>
                            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </button>

                          <button
                            type="button"
                            onClick={onOpenDonate}
                            className="inline-flex items-center gap-1.5 font-ui font-bold text-xs sm:text-sm text-[#D62828] hover:text-[#B01E1E] transition-colors cursor-pointer"
                          >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            <span>Aider sur ce besoin</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>

              {/* VERTICAL SLIDER NAVIGATION RAIL (Desktop Right Side) */}
              <div className="hidden lg:flex flex-col items-center justify-center gap-3.5 pl-1 shrink-0">
                <div className="flex flex-col gap-2">
                  {ACTION_PILLARS.map((pillar, idx) => (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => jumpToSlide(idx)}
                      aria-label={`Aller à l'axe ${pillar.number} : ${pillar.tag}`}
                      className={`w-9 h-9 rounded-full font-ui text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                        activeIndex === idx
                          ? 'bg-[#1554C7] text-[#FFFDF8] shadow-cta scale-105'
                          : 'bg-[#F1F5FB] text-[#12366F]/70 hover:bg-[#1554C7]/15 hover:text-[#1554C7]'
                      }`}
                    >
                      {pillar.number}
                    </button>
                  ))}
                </div>

                {/* Vertical Progress Bar */}
                <div className="w-1.5 h-24 rounded-full bg-[#12366F]/14 overflow-hidden">
                  <div className="action-vprogress-fill w-full h-full bg-[#D62828] rounded-full" />
                </div>
              </div>
            </div>

            {/* BOTTOM STEP SELECTOR BAR */}
            <div className="pt-1.5 sm:pt-2 border-t border-[#12366F]/12 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
                {ACTION_PILLARS.map((pillar, idx) => (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => jumpToSlide(idx)}
                    className={`px-2.5 sm:px-3 py-1 rounded-full font-ui text-[10.5px] sm:text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      activeIndex === idx
                        ? 'bg-[#1554C7] text-[#FFFDF8]'
                        : 'bg-[#F1F5FB] text-[#12366F]/75 hover:bg-[#1554C7]/12'
                    }`}
                  >
                    <span>{pillar.number}</span>
                    <span className="hidden sm:inline"> · {pillar.tag}</span>
                  </button>
                ))}
              </div>

              <span className="text-[10.5px] sm:text-xs font-ui font-medium text-[#516075] shrink-0">
                Chaque scroll verrouille un axe
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* REDUCED-MOTION FALLBACK                                          */}
      {/* ================================================================ */}
      {reducedMotion && (
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 space-y-12">
          <div className="space-y-3 max-w-2xl">
            <span className="font-ui font-bold text-xs uppercase tracking-[0.22em] text-[#1554C7]">
              Nos actions &amp; besoins concrets
            </span>
            <h2 className="font-serif-display font-semibold text-3xl sm:text-4xl text-[#12366F]">
              Soins, école, repas, jeux : ce qui fait{' '}
              <em className="italic font-normal text-[#D62828]">grandir</em> chaque jour.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ACTION_PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                className="rounded-2xl bg-[#F1F5FB] border border-[#12366F]/12 p-6 space-y-4"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#12366F]">
                  <img
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    loading="lazy"
                    style={{ objectPosition: pillar.imagePosition ?? '50% 25%' }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-serif-display italic text-2xl text-[#D62828]">
                    {pillar.number}
                  </span>
                  <span className="font-ui text-xs font-bold uppercase tracking-[0.18em] text-[#1554C7]">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="font-serif-display font-semibold text-2xl text-[#12366F]">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#1E2A3D]/85">{pillar.description}</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setActivePillar(pillar)}
                    className="font-ui font-bold text-sm text-[#12366F] underline cursor-pointer"
                  >
                    Découvrir en détail
                  </button>
                  <button
                    type="button"
                    onClick={onOpenDonate}
                    className="font-ui font-bold text-sm text-[#D62828] cursor-pointer"
                  >
                    Aider sur ce besoin
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Pillar Detail Modal */}
      {activePillar && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pillar-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0C254D]/70 backdrop-blur-md"
          onClick={() => setActivePillar(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FFFDF8] shadow-2xl border border-[#12366F]/15"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePillar(null)}
              aria-label="Fermer la fenêtre"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#FFFDF8]/95 text-[#12366F] flex items-center justify-center shadow-md hover:bg-[#12366F] hover:text-[#FFFDF8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10.5] overflow-hidden bg-[#12366F]">
              <img
                src={activePillar.image}
                alt={activePillar.imageAlt}
                style={{ objectPosition: activePillar.imagePosition ?? '50% 10%' }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-7 sm:p-9 space-y-5">
              <div className="flex items-center gap-2.5 text-[#1554C7] font-ui font-bold text-xs uppercase tracking-[0.18em]">
                <span className="text-[#D62828]">{activePillar.number}</span>
                <span>·</span>
                <span>{activePillar.tag}</span>
              </div>

              <h3
                id="pillar-modal-title"
                className="font-serif-display font-semibold text-2xl sm:text-3xl text-[#12366F]"
              >
                {activePillar.title}
              </h3>

              <p className="text-[16px] leading-[1.76] text-[#1E2A3D]/85">
                {activePillar.extendedStory}
              </p>

              <div className="space-y-3 pt-3 border-t border-[#12366F]/12">
                <p className="font-ui font-bold text-xs uppercase tracking-[0.18em] text-[#516075]">
                  Notre engagement au quotidien
                </p>
                {activePillar.commitments.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1554C7] shrink-0 mt-0.5" />
                    <span className="text-[15px] text-[#1E2A3D]/85">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <MagneticButton
                  onClick={() => {
                    setActivePillar(null)
                    onOpenDonate()
                  }}
                  className="gap-2.5 px-6 py-3.5 rounded-full bg-[#1554C7] hover:bg-[#12366F] text-[#FFFDF8] font-ui font-bold text-sm shadow-cta"
                >
                  <Heart className="w-4 h-4 text-[#F5C928] fill-[#F5C928]" />
                  <span>Soutenir ce pilier</span>
                </MagneticButton>
                <button
                  type="button"
                  onClick={() => setActivePillar(null)}
                  className="px-6 py-3.5 rounded-full border border-[#12366F]/20 text-[#12366F] font-ui font-semibold text-sm hover:bg-[#F1F5FB] transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
