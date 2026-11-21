import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../ui/MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

interface StoryAct {
  id: string
  number: string
  kicker: string
  titleLine1: string
  titleAccent: string
  body: string
  caption: string
  image: string
  imageAlt: string
  objectPosition: string
  isQuote?: boolean
}

const STORY_ACTS: StoryAct[] = [
  {
    id: 'acte-1',
    number: '01',
    kicker: "Carnet 01 · L'espoir prend vie",
    titleLine1: 'Un enfant aimé est un avenir',
    titleAccent: 'espéré.',
    body: 'Chaque enfant mérite de grandir dans un environnement où il se sent protégé, aimé, encouragé et valorisé.',
    caption: "Complicité et rires partagés devant l'emblème du centre à Kimbanseke.",
    image: '/images/rires-ensemble.jpg',
    imageAlt:
      "Les enfants de l'Orphelinat l'Espoir du Demain riant ensemble devant le centre",
    objectPosition: '55% 12%',
  },
  {
    id: 'acte-2',
    number: '02',
    kicker: 'Carnet 02 · Fraternité & repères',
    titleLine1: "L'attention et la solidarité",
    titleAccent: 'transforment une vie.',
    body: "À l'Orphelinat l'Espoir du Demain, nous croyons que l'écoute, l'éducation et la chaleur d'une fratrie donnent à chaque enfant la force d'avancer.",
    caption: 'Un geste de tendresse et de fraternité au quotidien au sein du centre.',
    image: '/images/coeur-mains.jpg',
    imageAlt:
      "Une enfant du centre formant un cœur avec ses mains aux côtés d'un tout-petit",
    objectPosition: '76% 24%',
  },
  {
    id: 'acte-3',
    number: '03',
    kicker: 'Carnet 03 · Notre promesse',
    titleLine1: '« Nous ne leur offrons pas seulement un toit.',
    titleAccent:
      'Nous leur offrons une famille de cœur, des repères et la possibilité de rêver grand. »',
    body: "Orphelinat l'Espoir du Demain · O.E.D. · Kinshasa",
    caption: 'Grandir ensemble, protégés et entourés, pour préparer demain.',
    image: '/images/solidarite-enfants.jpg',
    imageAlt:
      "Les enfants de l'Orphelinat l'Espoir du Demain bras dessus bras dessous devant le centre",
    objectPosition: '55% 18%',
    isQuote: true,
  },
]

export const StorytellingSection: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const [activeAct, setActiveAct] = useState(0)
  const reducedMotion = prefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const container = stageRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024

      const img1 = container.querySelector('.story-img-0')
      const img2Wrap = container.querySelector('.story-layer-1')
      const img2 = container.querySelector('.story-img-1')
      const img3Wrap = container.querySelector('.story-layer-2')
      const img3 = container.querySelector('.story-img-2')

      const copy1 = container.querySelector('.story-copy-0')
      const copy2 = container.querySelector('.story-copy-1')
      const copy3 = container.querySelector('.story-copy-2')
      const progressBar = container.querySelector('.story-progress-fill')

      // Initial states
      gsap.set(img1, { scale: 1.07, yPercent: 0 })
      gsap.set(img2Wrap, { clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set(img2, { scale: 1.12 })
      gsap.set(img3Wrap, { clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set(img3, { scale: 1.12 })

      gsap.set(copy1, { opacity: 1, y: 0 })
      gsap.set(copy2, { opacity: 0, y: 36 })
      gsap.set(copy3, { opacity: 0, y: 36 })
      gsap.set(progressBar, { scaleX: 0.33, transformOrigin: 'left center' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: isDesktop ? '+=240%' : '+=200%',
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
            setActiveAct((prev) => (prev !== idx ? idx : prev))
          },
        },
      })
      scrollTriggerRef.current = tl.scrollTrigger ?? null

      // Step 1 (0.0 -> 1.0): Act 1 fixed plateau (0 -> 0.30), then transition 1 -> 2 (0.30 -> 0.70), then Act 2 fixed plateau (0.70 -> 1.0)
      tl.to(img1, { scale: 1.0, duration: 0.3, ease: 'none' }, 0)
      tl.to(copy1, { opacity: 0, y: -28, duration: 0.18, ease: 'power2.in' }, 0.3)
      tl.to(img1, { yPercent: -5, scale: 1.03, duration: 0.4, ease: 'power3.inOut' }, 0.3)
      tl.to(
        img2Wrap,
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.4, ease: 'power3.inOut' },
        0.3,
      )
      tl.to(img2, { scale: 1.0, duration: 0.4, ease: 'power2.out' }, 0.3)
      tl.to(copy2, { opacity: 1, y: 0, duration: 0.22, ease: 'power3.out' }, 0.48)
      tl.to(progressBar, { scaleX: 0.66, duration: 0.4, ease: 'power3.inOut' }, 0.3)
      tl.to({}, { duration: 0.3 }, 0.7)

      // Step 2 (1.0 -> 2.0): Act 2 fixed plateau (1.0 -> 1.30), then transition 2 -> 3 (1.30 -> 1.70), then Act 3 fixed plateau (1.70 -> 2.0)
      tl.to(copy2, { opacity: 0, y: -28, duration: 0.18, ease: 'power2.in' }, 1.3)
      tl.to(img2, { yPercent: -5, scale: 1.03, duration: 0.4, ease: 'power3.inOut' }, 1.3)
      tl.to(
        img3Wrap,
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.4, ease: 'power3.inOut' },
        1.3,
      )
      tl.to(img3, { scale: 1.0, duration: 0.4, ease: 'power2.out' }, 1.3)
      tl.to(copy3, { opacity: 1, y: 0, duration: 0.22, ease: 'power3.out' }, 1.48)
      tl.to(progressBar, { scaleX: 1, duration: 0.4, ease: 'power3.inOut' }, 1.3)
      tl.to({}, { duration: 0.3 }, 1.7)
    }, stageRef)

    return () => ctx.revert()
  }, [reducedMotion])

  const jumpToAct = (index: number) => {
    const st = scrollTriggerRef.current
    if (!st) return
    const fractions = [0, 0.5, 1]
    const targetY = st.start + (st.end - st.start) * fractions[index]
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  return (
    <section
      id="histoire"
      aria-label="Notre histoire — L'espoir prend vie"
      className="relative bg-[#0C254D] text-[#FFFDF8]"
    >
      {/* ================================================================ */}
      {/* UNIFIED DESKTOP & MOBILE: PINNED FULL-BLEED 3-ACT STORYTELLING   */}
      {/* ================================================================ */}
      {!reducedMotion && (
        <div
          ref={stageRef}
          className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-[#0C254D]"
        >
          {/* Stacked Full-Bleed Photographic Layers */}
          {STORY_ACTS.map((act, idx) => (
            <div
              key={act.id}
              className={`story-layer-${idx} absolute inset-0 w-full h-full overflow-hidden`}
              style={{
                zIndex: idx + 1,
                clipPath: idx > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 0% 0%)',
              }}
            >
              <img
                src={act.image}
                alt={act.imageAlt}
                style={{ objectPosition: act.objectPosition }}
                className={`story-img-${idx} w-full h-full object-cover will-change-transform`}
              />
              {/* Editorial directional blue gradient scrim — sharp text legibility, bright faces */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#0C254D]/92 via-[#12366F]/60 to-[#0C254D]/18"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0C254D]/92 via-[#0C254D]/35 to-[#0C254D]/40 lg:from-[#0C254D]/84 lg:via-transparent lg:to-[#0C254D]/36"
              />
            </div>
          ))}

          {/* Persistent Editorial Overlay Layer */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-6 sm:pt-24 sm:pb-10 lg:py-14 flex flex-col justify-between pointer-events-none">
            {/* Top Story Masthead */}
            <div className="flex items-center justify-between lg:pt-12 border-b border-[#FFFDF8]/20 pb-3.5 sm:pb-5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-6 sm:w-8 h-[2px] bg-[#D62828]" />
                <span className="font-ui font-bold text-[10.5px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#F5C928]">
                  Récit immersif · L&apos;espoir prend vie
                </span>
              </div>
              <div className="font-serif-display text-base sm:text-lg shrink-0">
                <span className="italic font-semibold text-[#F5C928]">0{activeAct + 1}</span>
                <span className="text-[#FFFDF8]/55"> / 0{STORY_ACTS.length}</span>
              </div>
            </div>

            {/* Synchronized Editorial Typography Container */}
            <div className="relative flex-1 flex items-end pb-5 sm:items-center sm:pb-0">
              {STORY_ACTS.map((act, idx) => (
                <div
                  key={act.id}
                  className={`story-copy-${idx} absolute left-0 right-0 sm:right-auto max-w-2xl space-y-4 sm:space-y-6 will-change-transform ${
                    idx > 0 ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <span className="inline-flex items-center gap-2 sm:gap-2.5 font-ui font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#F5C928]">
                    <span className="w-2 h-2 rounded-full bg-[#D62828]" />
                    {act.kicker}
                  </span>

                  {act.isQuote ? (
                    <blockquote className="pl-4 sm:pl-6 border-l-[3px] border-[#F5C928] space-y-3 sm:space-y-4">
                      <p className="font-serif-display font-semibold text-[1.45rem] sm:text-[2.1rem] lg:text-[2.45rem] xl:text-[2.75rem] leading-[1.2] sm:leading-[1.16] tracking-[-0.015em] text-[#FFFDF8] drop-shadow-[0_4px_24px_rgba(12,37,77,0.45)]">
                        {act.titleLine1}{' '}
                        <em className="italic font-normal text-[#F5C928]">{act.titleAccent}</em>
                      </p>
                      <footer className="font-ui text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#FFFDF8]/80">
                        {act.body}
                      </footer>
                    </blockquote>
                  ) : (
                    <>
                      <h2 className="font-serif-display font-semibold text-[1.95rem] sm:text-[2.7rem] lg:text-[3.2rem] xl:text-[3.75rem] leading-[1.06] sm:leading-[1.04] tracking-[-0.02em] text-[#FFFDF8] drop-shadow-[0_4px_24px_rgba(12,37,77,0.45)]">
                        {act.titleLine1}{' '}
                        <em className="italic font-normal text-[#F5C928]">{act.titleAccent}</em>
                      </h2>
                      <p className="text-[15px] sm:text-[17px] lg:text-[18px] leading-[1.68] sm:leading-[1.76] text-[#FFFDF8]/90 max-w-xl drop-shadow-[0_2px_12px_rgba(12,37,77,0.45)]">
                        {act.body}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Caption + Interactive Story Progress Controls */}
            <div className="pt-3.5 sm:pt-5 border-t border-[#FFFDF8]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-8 pointer-events-auto">
              <p className="font-serif-display italic text-[13px] sm:text-[15px] text-[#FFFDF8]/88 line-clamp-2 sm:line-clamp-none">
                {STORY_ACTS[activeAct].caption}
              </p>

              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-5 shrink-0">
                <div className="flex items-center gap-2">
                  {STORY_ACTS.map((act, idx) => (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => jumpToAct(idx)}
                      aria-label={`Aller à l'acte ${act.number}`}
                      className={`px-3 py-1 rounded-full font-ui text-xs font-bold transition-all cursor-pointer ${
                        activeAct === idx
                          ? 'bg-[#F5C928] text-[#12366F]'
                          : 'bg-[#FFFDF8]/12 text-[#FFFDF8]/75 hover:bg-[#FFFDF8]/22'
                      }`}
                    >
                      {act.number}
                    </button>
                  ))}
                </div>
                <div className="w-28 sm:w-32 h-1 rounded-full bg-[#FFFDF8]/20 overflow-hidden">
                  <div className="story-progress-fill w-full h-full bg-[#F5C928] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* REDUCED-MOTION FALLBACK: FULL-BLEED STACKED PANELS               */}
      {/* ================================================================ */}
      {reducedMotion && (
        <div>
          {STORY_ACTS.map((act) => (
            <article
              key={act.id}
              className="relative min-h-[82vh] flex flex-col justify-end overflow-hidden border-t border-[#FFFDF8]/12 first:border-t-0"
            >
              <img
                src={act.image}
                alt={act.imageAlt}
                loading="lazy"
                style={{ objectPosition: act.objectPosition }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0C254D]/94 via-[#12366F]/55 to-[#0C254D]/20"
              />

              <div className="relative z-10 px-5 sm:px-8 pt-28 pb-12 max-w-2xl space-y-5">
                <span className="inline-flex items-center gap-2 font-ui font-bold text-[11px] uppercase tracking-[0.2em] text-[#F5C928]">
                  <span className="w-2 h-2 rounded-full bg-[#D62828]" />
                  {act.kicker}
                </span>

                {act.isQuote ? (
                  <blockquote className="pl-5 border-l-[3px] border-[#F5C928] space-y-3">
                    <p className="font-serif-display font-semibold text-[1.75rem] sm:text-[2.2rem] leading-[1.2] text-[#FFFDF8]">
                      {act.titleLine1}{' '}
                      <em className="italic font-normal text-[#F5C928]">{act.titleAccent}</em>
                    </p>
                    <footer className="font-ui text-xs font-bold uppercase tracking-[0.18em] text-[#FFFDF8]/80">
                      {act.body}
                    </footer>
                  </blockquote>
                ) : (
                  <>
                    <h2 className="font-serif-display font-semibold text-[2.15rem] sm:text-[2.75rem] leading-[1.08] text-[#FFFDF8]">
                      {act.titleLine1}{' '}
                      <em className="italic font-normal text-[#F5C928]">{act.titleAccent}</em>
                    </h2>
                    <p className="text-[16px] leading-[1.72] text-[#FFFDF8]/90">{act.body}</p>
                  </>
                )}

                <p className="pt-3 border-t border-[#FFFDF8]/20 font-serif-display italic text-xs text-[#FFFDF8]/75">
                  {act.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
