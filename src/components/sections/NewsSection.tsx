import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Calendar, Clock, X } from 'lucide-react'
import { NEWS_ARTICLES, type NewsArticle } from '../../data/siteData'
import { SplitMaskReveal, prefersReducedMotion } from '../ui/MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

export const NewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.news-entry',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.news-spread',
            start: 'top 84%',
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!selectedArticle) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null)
    }
    window.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [selectedArticle])

  const [leadArticle, ...companionArticles] = NEWS_ARTICLES

  return (
    <section
      id="actualites"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#F1F5FB] border-y border-[#12366F]/12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Journal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-12 border-b border-[#12366F]/16">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-9 h-[2px] bg-[#D62828]" />
              <span className="font-ui font-bold text-xs uppercase tracking-[0.22em] text-[#1554C7]">
                Journal du centre
              </span>
            </div>
            <SplitMaskReveal
              as="h2"
              className="font-serif-display font-semibold text-[2.2rem] sm:text-[2.95rem] lg:text-[3.3rem] leading-[1.07] tracking-[-0.02em] text-[#12366F]"
              lines={[
                <>
                  Les nouvelles de{' '}
                  <em className="italic font-normal text-[#D62828]">notre famille.</em>
                </>,
              ]}
            />
          </div>
          <p className="text-[15.5px] text-[#516075] max-w-md leading-relaxed">
            Les temps forts, les instants de partage et les élans solidaires qui rythment la vie de
            l&apos;Orphelinat l&apos;Espoir du Demain.
          </p>
        </div>

        {/* Newspaper Front-Page Spread: 1 Lead Story + 2 Companion Stories */}
        <div className="news-spread grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEAD FEATURE STORY (7 cols) */}
          {leadArticle && (
            <article className="news-entry lg:col-span-7 group space-y-5">
              <button
                type="button"
                onClick={() => setSelectedArticle(leadArticle)}
                className="block w-full text-left cursor-pointer focus-visible:outline-none"
              >
                <div className="overflow-hidden rounded-2xl aspect-[16/10] bg-[#12366F] shadow-journal ring-1 ring-[#12366F]/10">
                  <img
                    src={leadArticle.image}
                    alt={leadArticle.imageAlt}
                    loading="lazy"
                    style={{ objectPosition: leadArticle.imagePosition ?? '50% 25%' }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </button>

              <div className="space-y-3.5">
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#516075]">
                  <span className="uppercase tracking-[0.18em] text-[#D62828] font-bold">
                    {leadArticle.category}
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#1554C7]" />
                    {leadArticle.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#1554C7]" />
                    {leadArticle.readTime}
                  </span>
                </div>

                <h3 className="font-serif-display font-semibold text-2xl sm:text-3xl leading-tight text-[#12366F] group-hover:text-[#1554C7] transition-colors">
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(leadArticle)}
                    className="text-left cursor-pointer"
                  >
                    {leadArticle.title}
                  </button>
                </h3>

                <p className="text-[16px] leading-[1.74] text-[#1E2A3D]/84">
                  {leadArticle.excerpt}
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(leadArticle)}
                  className="inline-flex items-center gap-2 font-ui font-bold text-sm text-[#12366F] hover:text-[#1554C7] border-b-2 border-[#F5C928] pb-0.5 group/link cursor-pointer"
                >
                  <span>Lire l&apos;article</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </button>
              </div>
            </article>
          )}

          {/* TWO STACKED COMPANION STORIES (5 cols) */}
          <div className="lg:col-span-5 lg:border-l lg:border-[#12366F]/14 lg:pl-10 divide-y divide-[#12366F]/14">
            {companionArticles.map((article) => (
              <article
                key={article.id}
                className="news-entry group py-8 first:pt-0 last:pb-0 space-y-4"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5">
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(article)}
                      className="block w-full overflow-hidden rounded-xl aspect-[4/3.6] bg-[#12366F] ring-1 ring-[#12366F]/10 cursor-pointer"
                    >
                      <img
                        src={article.image}
                        alt={article.imageAlt}
                        loading="lazy"
                        style={{ objectPosition: article.imagePosition ?? '50% 22%' }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </button>
                  </div>
                  <div className="col-span-7 space-y-2">
                    <span className="block text-[11px] font-ui font-bold uppercase tracking-[0.18em] text-[#D62828]">
                      {article.category} · {article.dateLabel}
                    </span>
                    <h3 className="font-serif-display font-semibold text-xl leading-snug text-[#12366F] group-hover:text-[#1554C7] transition-colors">
                      <button
                        type="button"
                        onClick={() => setSelectedArticle(article)}
                        className="text-left cursor-pointer"
                      >
                        {article.title}
                      </button>
                    </h3>
                  </div>
                </div>

                <p className="text-[14.5px] leading-[1.7] text-[#1E2A3D]/80">{article.excerpt}</p>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-2 font-ui font-bold text-sm text-[#12366F] hover:text-[#1554C7] group/link cursor-pointer"
                >
                  <span>Lire l&apos;article</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 bg-[#0C254D]/72 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedArticle(null)}
        >
          <article
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FFFDF8] shadow-2xl border border-[#12366F]/15"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              aria-label="Fermer l'article"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#FFFDF8]/95 text-[#12366F] hover:bg-[#12366F] hover:text-[#FFFDF8] flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/9] overflow-hidden bg-[#12366F]">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.imageAlt}
                style={{ objectPosition: selectedArticle.imagePosition ?? '50% 25%' }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-7 sm:p-10 space-y-5">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                <span className="uppercase tracking-[0.18em] text-[#D62828] font-bold">
                  {selectedArticle.category}
                </span>
                <span className="text-[#516075]">·</span>
                <span className="text-[#516075]">{selectedArticle.dateLabel}</span>
                <span className="text-[#516075]">·</span>
                <span className="text-[#516075]">{selectedArticle.readTime}</span>
              </div>

              <h3
                id="article-modal-title"
                className="font-serif-display font-semibold text-2xl sm:text-3xl leading-tight text-[#12366F]"
              >
                {selectedArticle.title}
              </h3>

              <div className="space-y-4 text-[16px] leading-[1.8] text-[#1E2A3D]/86">
                {selectedArticle.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  )
}
