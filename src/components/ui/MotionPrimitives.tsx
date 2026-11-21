import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * SplitMaskReveal — Editorial line-by-line mask reveal (H1 & Major Titles)
 */
interface SplitMaskRevealProps {
  lines: React.ReactNode[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  immediate?: boolean
  delay?: number
}

export const SplitMaskReveal: React.FC<SplitMaskRevealProps> = ({
  lines,
  as: Tag = 'h2',
  className = '',
  immediate = false,
  delay = 0.08,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || prefersReducedMotion()) return

    const lineEls = el.querySelectorAll('.split-line-inner')
    const ctx = gsap.context(() => {
      if (immediate) {
        gsap.fromTo(
          lineEls,
          {
            yPercent: 105,
            opacity: 0,
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          },
          {
            yPercent: 0,
            opacity: 1,
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            duration: 1.0,
            stagger: 0.11,
            delay,
            ease: 'power4.out',
          },
        )
      } else {
        gsap.fromTo(
          lineEls,
          {
            yPercent: 102,
            opacity: 0,
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          },
          {
            yPercent: 0,
            opacity: 1,
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              once: true,
            },
          },
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [immediate, delay])

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <span className="split-line-inner block will-change-transform">{line}</span>
          </span>
        ))}
      </Tag>
    </div>
  )
}

/**
 * KineticTrackingHeading — Subtle editorial tracking settle + blur-to-sharp
 */
interface KineticTrackingHeadingProps {
  children: React.ReactNode
  as?: 'h2' | 'h3'
  className?: string
}

export const KineticTrackingHeading: React.FC<KineticTrackingHeadingProps> = ({
  children,
  as: Tag = 'h2',
  className = '',
}) => {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          letterSpacing: '0.03em',
          opacity: 0,
          y: 22,
          filter: 'blur(4px)',
        },
        {
          letterSpacing: '-0.02em',
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/**
 * MagneticButton — Subtle tactile magnetic pull on desktop, effortless tap on mobile
 */
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  target?: string
  rel?: string
  strength?: number
  className?: string
  children: React.ReactNode
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  href,
  target,
  rel,
  strength = 0.2,
  className = '',
  children,
  onClick,
  ...rest
}) => {
  const ref = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion() || window.innerWidth < 1024) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    gsap.to(el, { x, y, duration: 0.35, ease: 'power3.out' })
  }

  const handleMouseLeave = () => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
  }

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`inline-flex items-center justify-center transition-colors will-change-transform ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={rest.type ?? 'button'}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center transition-colors will-change-transform cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

/**
 * RevealImage — Editorial clip-path reveal + slow cinematic settle scale with focal point control
 */
interface RevealImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  objectPosition?: string
  loading?: 'eager' | 'lazy'
}

export const RevealImage: React.FC<RevealImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  objectPosition = '50% 25%',
  loading = 'lazy',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const img = imgRef.current
    if (!wrapper || !img || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapper,
        {
          clipPath: 'inset(6% 0% 6% 0% round 16px)',
          opacity: 0.35,
        },
        {
          clipPath: 'inset(0% 0% 0% 0% round 16px)',
          opacity: 1,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 86%',
            once: true,
          },
        },
      )

      gsap.fromTo(
        img,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 86%',
            once: true,
          },
        },
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        style={{ objectPosition }}
        className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  )
}
