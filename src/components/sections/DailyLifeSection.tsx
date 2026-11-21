import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, MoonStar, Smile, Sun, Utensils } from 'lucide-react'
import { DAILY_LIFE_CHAPTERS } from '../../data/siteData'
import { prefersReducedMotion } from '../ui/MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

const CHAPTER_ICONS = [Sun, BookOpen, Utensils, Smile, MoonStar]

const THEME_STYLES = {
  forest: {
    bg: '#12366F',
    text: '#FFFDF8',
    muted: 'rgba(255, 253, 248, 0.86)',
    accent: '#F5C928',
    border: 'rgba(255, 253, 248, 0.18)',
    cardBg: 'rgba(12, 37, 77, 0.72)',
    cardBorder: 'rgba(255, 253, 248, 0.18)',
    pillActiveBg: '#F5C928',
    pillActiveText: '#12366F',
    pillIdleBg: 'rgba(255, 253, 248, 0.12)',
    pillIdleText: 'rgba(255, 253, 248, 0.82)',
  },
  terracotta: {
    bg: '#1554C7',
    text: '#FFFDF8',
    muted: 'rgba(255, 253, 248, 0.88)',
    accent: '#F5C928',
    border: 'rgba(255, 253, 248, 0.22)',
    cardBg: 'rgba(18, 54, 111, 0.78)',
    cardBorder: 'rgba(255, 253, 248, 0.2)',
    pillActiveBg: '#F5C928',
    pillActiveText: '#12366F',
    pillIdleBg: 'rgba(255, 253, 248, 0.14)',
    pillIdleText: 'rgba(255, 253, 248, 0.85)',
  },
  paper: {
    bg: '#FFFDF8',
    text: '#12366F',
    muted: 'rgba(30, 42, 61, 0.86)',
    accent: '#D62828',
    border: 'rgba(18, 54, 111, 0.16)',
    cardBg: '#F1F5FB',
    cardBorder: 'rgba(18, 54, 111, 0.14)',
    pillActiveBg: '#1554C7',
    pillActiveText: '#FFFDF8',
    pillIdleBg: '#F1F5FB',
    pillIdleText: '#12366F',
  },
  sun: {
    bg: '#FCF0C3',
    text: '#12366F',
    muted: 'rgba(30, 42, 61, 0.88)',
    accent: '#D62828',
    border: 'rgba(18, 54, 111, 0.18)',
    cardBg: 'rgba(255, 253, 248, 0.88)',
    cardBorder: 'rgba(18, 54, 111, 0.15)',
    pillActiveBg: '#12366F',
    pillActiveText: '#FFFDF8',
    pillIdleBg: 'rgba(255, 253, 248, 0.7)',
    pillIdleText: '#12366F',
  },
  dusk: {
    bg: '#0C254D',
    text: '#FFFDF8',
    muted: 'rgba(255, 253, 248, 0.86)',
    accent: '#F5C928',
    border: 'rgba(255, 253, 248, 0.18)',
    cardBg: 'rgba(18, 54, 111, 0.65)',
    cardBorder: 'rgba(255, 253, 248, 0.18)',
    pillActiveBg: '#F5C928',
    pillActiveText: '#12366F',
    pillIdleBg: 'rgba(255, 253, 248, 0.12)',
    pillIdleText: 'rgba(255, 253, 248, 0.82)',
  },
} as const

export const DailyLifeSection: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = prefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const container = stageRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024
      const slides = gsap.utils.toArray<HTMLElement>('.daily-hslide', container)
      const progressFill = container.querySelector('.daily-hprogress-fill')

      const total = slides.length
      const snapPoints = DAILY_LIFE_CHAPTERS.map((_, i) => i / (total - 1))

      // Initial state: Slide 0 fixed at center (xPercent: 0), Slides 1..4 solid waiting to the right (xPercent: 104)
      slides.forEach((slide, idx) => {
        if (idx === 0) {
          gsap.set(slide, { xPercent: 0, scale: 1, opacity: 1, zIndex: 1 })
        } else {
          gsap.set(slide, { xPercent: 104, scale: 1, opacity: 1, zIndex: idx + 1 })
        }
      })

      if (progressFill) {
        gsap.set(progressFill, {
          scaleX: 1 / total,
          transformOrigin: 'left center',
        })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: isDesktop ? '+=380%' : '+=320%',
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
       * 4 equal scroll intervals (1.0 unit each -> total duration 4.0):
       * Each block stays 100% FIXED & STATIONARY for 60% of the step,
       * and glides HORIZONTALLY (right to left) in a crisp 0.40 window.
       */
      for (let i = 0; i < total - 1; i++) {
        const currentSlide = slides[i]
        const nextSlide = slides[i + 1]
        const stepStart = i * 1.0

        // Stationary plateau before transition (stepStart -> stepStart + 0.30)
        tl.to(
          currentSlide,
          {
            xPercent: -104,
            scale: 0.96,
            duration: 0.4,
            ease: 'power3.inOut',
          },
          stepStart + 0.3,
        )

        tl.fromTo(
          nextSlide,
          { xPercent: 104, scale: 1, opacity: 1 },
          {
            xPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'power3.inOut',
          },
          stepStart + 0.3,
        )

        if (progressFill) {
          tl.to(
            progressFill,
            {
              scaleX: (i + 2) / total,
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

  const jumpToChapter = (index: number) => {
    const st = scrollTriggerRef.current
    if (!st) return
    const total = DAILY_LIFE_CHAPTERS.length
    const fraction = index / (total - 1)
    const targetY = st.start + (st.end - st.start) * fraction
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  const activeChapter = DAILY_LIFE_CHAPTERS[activeIndex]
  const theme = THEME_STYLES[activeChapter.theme]

  return (
    <section
      id="activites"
      aria-label="Une journée à l'orphelinat — Carnet de journée"
      className="relative transition-colors duration-700 ease-out overflow-hidden"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* ================================================================ */}
      {/* UNIFIED DESKTOP & MOBILE: SCROLL-DRIVEN HORIZONTAL SLIDER        */}
      {/* ================================================================ */}
      {!reducedMotion && (
        <div
          ref={stageRef}
          className="relative w-full h-[100dvh] overflow-hidden flex flex-col transition-colors duration-700"
          style={{ backgroundColor: theme.bg, color: theme.text }}
        >
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[76px] pb-3 sm:pt-[80px] sm:pb-4 lg:pt-[86px] lg:pb-5 w-full h-full flex flex-col justify-between gap-2.5 sm:gap-3.5">
            {/* TOP COMPACT MASTHEAD & STEP COUNTER */}
            <div
              className="flex items-end justify-between gap-3 pb-2.5 sm:pb-3 border-b transition-colors duration-500 shrink-0"
              style={{ borderColor: theme.border }}
            >
              <div className="space-y-0.5">
                <span
                  className="block font-ui font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em]"
                  style={{ color: theme.accent }}
                >
                  Carnet de journée · Au rythme du centre
                </span>
                <h2 className="font-serif-display font-semibold text-[1.15rem] sm:text-[1.6rem] lg:text-[2rem] leading-[1.08] tracking-[-0.02em]">
                  Des petits moments. Des grands changements.
                </h2>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className="text-xs font-ui font-semibold hidden md:inline"
                  style={{ color: theme.muted }}
                >
                  Moment fixé · {activeChapter.timeLabel}
                </span>
                <div className="font-serif-display text-base sm:text-xl lg:text-2xl">
                  <span className="italic font-semibold" style={{ color: theme.accent }}>
                    {activeChapter.number}
                  </span>
                  <span className="opacity-55 text-xs sm:text-sm">
                    {' '}
                    / 0{DAILY_LIFE_CHAPTERS.length}
                  </span>
                </div>
              </div>
            </div>

            {/* CENTER HORIZONTAL SLIDING STAGE */}
            <div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl">
              {DAILY_LIFE_CHAPTERS.map((chap, idx) => {
                const Icon = CHAPTER_ICONS[idx]
                const chapTheme = THEME_STYLES[chap.theme]

                return (
                  <article
                    key={chap.id}
                    className="daily-hslide absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl border shadow-2xl p-4 sm:p-5 lg:p-7 flex flex-col justify-start md:grid md:grid-cols-12 gap-3.5 sm:gap-5 lg:gap-8 md:items-center overflow-y-auto will-change-transform backdrop-blur-md"
                    style={{
                      backgroundColor: chapTheme.cardBg,
                      borderColor: chapTheme.cardBorder,
                      color: chapTheme.text,
                    }}
                  >
                    {/* Faint XXL Background Number */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none select-none absolute -bottom-5 right-6 font-serif-display italic font-bold text-[5rem] sm:text-[8rem] leading-none opacity-[0.07]"
                    >
                      {chap.number}
                    </span>

                    {/* LEFT / TOP COMPLETE PHOTOGRAPH — Fluid height so it never pushes text out on compact screens */}
                    <div className="md:col-span-6 w-full h-[175px] sm:h-[210px] md:h-full md:max-h-[370px] min-h-0 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/15 relative shrink-0">
                      <img
                        src={chap.image}
                        alt={chap.imageAlt}
                        style={{ objectPosition: chap.imagePosition ?? '50% 35%' }}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-[#FFFDF8]/95 text-[#12366F] font-ui font-bold text-[10.5px] sm:text-[11px] shadow-sm inline-flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-[#1554C7]" />
                        <span>
                          {chap.number} · {chap.timeLabel}
                        </span>
                      </span>
                    </div>

                    {/* RIGHT / BOTTOM COMPLETE EDITORIAL BLOCK */}
                    <div className="md:col-span-6 space-y-2 sm:space-y-2.5 lg:space-y-3.5 relative z-10 flex flex-col justify-center">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: chapTheme.pillIdleBg,
                            color: chapTheme.accent,
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <span
                          className="font-ui text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]"
                          style={{ color: chapTheme.accent }}
                        >
                          Étape {chap.number} · {chap.timeLabel}
                        </span>
                      </div>

                      <h3 className="font-serif-display font-semibold text-[1.25rem] sm:text-[1.6rem] lg:text-[2rem] xl:text-[2.25rem] leading-[1.1] tracking-[-0.02em]">
                        {chap.title}
                      </h3>

                      <p
                        className="font-serif-display italic text-[13.5px] sm:text-[15px] lg:text-[16.5px] leading-snug"
                        style={{ color: chapTheme.accent }}
                      >
                        {chap.subtitle}
                      </p>

                      {/* Full Narrative Paragraph — 100% visible, zero clipping */}
                      <p
                        className="text-[12.5px] sm:text-[13.5px] lg:text-[14.5px] xl:text-[15.5px] leading-[1.55] sm:leading-[1.65]"
                        style={{ color: chapTheme.muted }}
                      >
                        {chap.narrative}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* BOTTOM HORIZONTAL SLIDER CONTROLS & PROGRESS BAR */}
            <div
              className="pt-2 border-t flex items-center justify-between gap-3 shrink-0 transition-colors duration-500"
              style={{ borderColor: theme.border }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
                {DAILY_LIFE_CHAPTERS.map((chap, idx) => {
                  const isActive = idx === activeIndex
                  return (
                    <button
                      key={chap.id}
                      type="button"
                      onClick={() => jumpToChapter(idx)}
                      className="px-2.5 sm:px-3.5 py-1 rounded-full font-ui text-[10.5px] sm:text-xs font-bold transition-all cursor-pointer shrink-0"
                      style={{
                        backgroundColor: isActive ? theme.pillActiveBg : theme.pillIdleBg,
                        color: isActive ? theme.pillActiveText : theme.pillIdleText,
                      }}
                    >
                      <span>{chap.number}</span>
                      <span className="hidden sm:inline"> · {chap.timeLabel}</span>
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-ui opacity-75 hidden md:inline">
                  Slider horizontal au scroll
                </span>
                <div
                  className="w-20 sm:w-32 h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: theme.border }}
                >
                  <div
                    className="daily-hprogress-fill w-full h-full rounded-full transition-colors duration-300"
                    style={{ backgroundColor: theme.accent }}
                  />
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
        <div className="py-20 px-5 sm:px-8 bg-[#12366F] text-[#FFFDF8]">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-3 pb-6 border-b border-[#FFFDF8]/18">
              <span className="block font-ui font-bold text-xs uppercase tracking-[0.22em] text-[#F5C928]">
                Carnet de journée · Au rythme du centre
              </span>
              <h2 className="font-serif-display font-semibold text-3xl sm:text-4xl">
                Des petits moments. Des grands changements.
              </h2>
            </div>

            <div className="space-y-10">
              {DAILY_LIFE_CHAPTERS.map((chap, idx) => {
                const Icon = CHAPTER_ICONS[idx]
                return (
                  <article
                    key={chap.id}
                    className="grid md:grid-cols-12 gap-6 items-center pb-10 border-b border-[#FFFDF8]/14 last:border-b-0"
                  >
                    <div className="md:col-span-6 overflow-hidden rounded-2xl aspect-[4/3] bg-[#0C254D]">
                      <img
                        src={chap.image}
                        alt={chap.imageAlt}
                        loading="lazy"
                        style={{ objectPosition: chap.imagePosition ?? '50% 25%' }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-6 space-y-2.5">
                      <div className="flex items-center gap-2 text-[#F5C928] font-ui font-bold text-xs uppercase tracking-[0.18em]">
                        <Icon className="w-4 h-4" />
                        <span>
                          {chap.number} · {chap.timeLabel}
                        </span>
                      </div>
                      <h3 className="font-serif-display font-semibold text-2xl">{chap.title}</h3>
                      <p className="font-serif-display italic text-base text-[#F5C928]">
                        {chap.subtitle}
                      </p>
                      <p className="text-sm leading-relaxed text-[#FFFDF8]/84">{chap.narrative}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
