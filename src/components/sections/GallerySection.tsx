import React, { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Expand, Film, Play, X } from 'lucide-react'
import { GALLERY_PHOTOS, type GalleryPhoto } from '../../data/siteData'
import { KineticTrackingHeading, prefersReducedMotion } from '../ui/MotionPrimitives'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES: Array<'Tout' | GalleryPhoto['category']> = [
  'Tout',
  'Vie au centre',
  'Éducation',
  'Partage',
  'Jeux & Joie',
]

function getCollageTileClasses(layout: GalleryPhoto['layout'], index: number): string {
  switch (layout) {
    case 'feature':
      return 'md:col-span-7 aspect-[4/3] md:aspect-[16/10.5]'
    case 'portrait':
      return 'md:col-span-5 aspect-[4/4.6] md:aspect-[4/4.4]'
    case 'wide':
      return index % 2 === 0
        ? 'md:col-span-8 aspect-[4/3] md:aspect-[16/9.5]'
        : 'md:col-span-7 aspect-[4/3] md:aspect-[16/10]'
    case 'square':
    default:
      return 'md:col-span-4 aspect-[4/4] md:aspect-[4/4.2]'
  }
}

export const GallerySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<'Tout' | GalleryPhoto['category']>(
    'Tout',
  )
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [videoOpen, setVideoOpen] = useState(false)

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'Tout') return GALLERY_PHOTOS
    return GALLERY_PHOTOS.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.collage-tile',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.collage-grid',
            start: 'top 84%',
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (lightboxIndex === null && !videoOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
        setVideoOpen(false)
      } else if (lightboxIndex !== null && e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredPhotos.length,
        )
      } else if (lightboxIndex !== null && e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredPhotos.length) % filteredPhotos.length,
        )
      }
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, videoOpen, filteredPhotos.length])

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null

  return (
    <section
      id="galerie"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#FFFDF8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header + Video Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 mb-10 border-b border-[#12366F]/14">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-9 h-[2px] bg-[#D62828]" />
              <span className="font-ui font-bold text-xs uppercase tracking-[0.22em] text-[#1554C7]">
                Album du centre · Instants authentiques
              </span>
            </div>
            <KineticTrackingHeading
              as="h2"
              className="font-serif-display font-semibold text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] leading-[1.07] text-[#12366F]"
            >
              Des sourires qui racontent{' '}
              <em className="italic font-normal text-[#D62828]">notre histoire.</em>
            </KineticTrackingHeading>
            <p className="text-[16px] leading-[1.72] text-[#516075]">
              Apprentissage, repas partagés, jeux dans la cour et éclats de joie : un collage vivant
              du quotidien à l&apos;Orphelinat l&apos;Espoir du Demain.
            </p>
          </div>

          {/* Documentary Video Trigger */}
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="self-start lg:self-end group inline-flex items-center gap-3.5 px-5 py-3 rounded-full bg-[#12366F] hover:bg-[#1554C7] text-[#FFFDF8] font-ui font-bold text-sm transition-all cursor-pointer shadow-journal"
          >
            <span className="w-8 h-8 rounded-full bg-[#F5C928] text-[#12366F] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </span>
            <span>Voir la vidéo du centre</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div
          role="tablist"
          aria-label="Filtrer la galerie par catégorie"
          className="flex flex-wrap items-center gap-2.5 mb-10"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat)
                  setLightboxIndex(null)
                }}
                className={`px-4.5 py-2.5 rounded-full font-ui font-bold text-xs sm:text-[13px] transition-all duration-300 cursor-pointer ${
                  active
                    ? 'bg-[#1554C7] text-[#FFFDF8] shadow-cta'
                    : 'bg-[#F1F5FB] text-[#1E2A3D]/85 hover:bg-[#1554C7]/12 hover:text-[#1554C7]'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Living Varied-Proportion Photo Collage */}
        <div className="collage-grid grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 md:grid-flow-dense">
          {filteredPhotos.map((photo, index) => (
            <figure
              key={photo.id}
              className={`collage-tile group relative rounded-2xl overflow-hidden bg-[#12366F] ring-1 ring-[#12366F]/10 shadow-journal ${getCollageTileClasses(
                photo.layout,
                index,
              )}`}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="relative block w-full h-full text-left cursor-pointer focus-visible:outline-none"
                aria-label={`Agrandir la photo : ${photo.caption}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  style={{ objectPosition: photo.objectPosition }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] will-change-transform"
                />

                {/* Subtle hover editorial caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C254D]/88 via-[#0C254D]/15 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-400 flex flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#F5C928] text-[#12366F] font-ui font-bold text-[11px] uppercase tracking-[0.14em]">
                      {photo.category}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-[#FFFDF8]/95 text-[#12366F] flex items-center justify-center shadow-sm">
                      <Expand className="w-4 h-4" />
                    </span>
                  </div>
                  <figcaption className="text-[#FFFDF8] font-serif-display text-[15px] leading-snug">
                    {photo.caption}
                  </figcaption>
                </div>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse de la galerie"
          className="fixed inset-0 z-50 bg-[#0C254D]/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Fermer la visionneuse"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-[#FFFDF8] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex(
                (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length,
              )
            }}
            aria-label="Photo précédente"
            className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-[#FFFDF8] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <div className="text-center max-w-xl px-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F5C928]/20 text-[#F5C928] font-ui font-bold text-[11px] uppercase tracking-[0.16em] mb-2">
                {activePhoto.category} · {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
              <p className="text-[#FFFDF8] font-serif-display text-base sm:text-lg">
                {activePhoto.caption}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length)
            }}
            aria-label="Photo suivante"
            className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-[#FFFDF8] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Documentary Video Modal */}
      {videoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vidéo de la vie au centre O.E.D."
          className="fixed inset-0 z-50 bg-[#0C254D]/92 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-[#12366F] border border-[#FFFDF8]/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#FFFDF8]/12 text-[#FFFDF8]">
              <div className="flex items-center gap-2.5">
                <Film className="w-4 h-4 text-[#F5C928]" />
                <span className="font-ui font-bold text-sm">
                  Instant de vie · Orphelinat l&apos;Espoir du Demain
                </span>
              </div>
              <button
                type="button"
                onClick={() => setVideoOpen(false)}
                aria-label="Fermer la vidéo"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <video
              src="/media/vie-au-centre.mp4"
              controls
              autoPlay
              playsInline
              className="w-full max-h-[75vh] bg-black"
            />
          </div>
        </div>
      )}
    </section>
  )
}
