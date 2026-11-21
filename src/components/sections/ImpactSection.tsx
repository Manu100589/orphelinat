import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IMPACT_BLOCKS, OFFICIAL_METRICS } from '../../data/siteData'
import { SplitMaskReveal, prefersReducedMotion } from '../ui/MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

export const ImpactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.impact-col',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.impact-band',
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
      id="impact"
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-[#F1F5FB] border-t border-[#12366F]/12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Asymmetric Header */}
        <div className="grid lg:grid-cols-12 gap-6 items-end pb-12 mb-12 border-b border-[#12366F]/16">
          <div className="lg:col-span-7 space-y-3">
            <span className="block font-ui font-bold text-xs uppercase tracking-[0.22em] text-[#1554C7]">
              Impact &amp; engagement
            </span>
            <SplitMaskReveal
              as="h2"
              className="font-serif-display font-semibold text-[2.15rem] sm:text-[2.95rem] lg:text-[3.3rem] leading-[1.08] tracking-[-0.02em] text-[#12366F]"
              lines={[
                <>Chaque geste compte.</>,
                <>
                  Chaque soutien <em className="italic font-normal text-[#D62828]">change une vie.</em>
                </>,
              ]}
            />
          </div>
          <div className="lg:col-span-5">
            <p className="text-[16px] leading-[1.74] text-[#516075]">
              Derrière chaque enfant, il y a une histoire, un rêve et un avenir à construire. Grâce à
              la solidarité, nous pouvons offrir un accompagnement durable et des opportunités à
              ceux qui en ont le plus besoin.
            </p>
          </div>
        </div>

        {/* 4-Column Typographic Editorial Band */}
        <div className="impact-band grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#12366F]/16">
          {IMPACT_BLOCKS.map((block) => (
            <div
              key={block.id}
              className="impact-col py-7 sm:py-4 sm:px-6 first:pl-0 last:pr-0 space-y-3.5"
            >
              <span className="block font-serif-display italic text-3xl text-[#D62828] leading-none">
                {block.roman}
              </span>
              <span className="block font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-[#1554C7]">
                {block.subtitle}
              </span>
              <h3 className="font-serif-display font-semibold text-2xl text-[#12366F] leading-snug">
                {block.title}
              </h3>
              <p className="text-[14.5px] leading-[1.72] text-[#1E2A3D]/80">
                {block.description}
              </p>
            </div>
          ))}
        </div>

        {/* Optional Official Verified Metrics Interface */}
        {OFFICIAL_METRICS.length > 0 && (
          <div className="mt-14 p-8 rounded-2xl bg-[#12366F] text-[#FFFDF8] grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFICIAL_METRICS.map((metric) => (
              <div key={metric.label} className="text-center">
                <span className="block font-serif-display font-semibold text-4xl text-[#F5C928]">
                  {metric.value}
                </span>
                <span className="block font-ui font-semibold text-sm mt-1">{metric.label}</span>
                {metric.note && (
                  <span className="block text-xs text-[#FFFDF8]/65 mt-0.5">{metric.note}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
