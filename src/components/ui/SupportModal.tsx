import React, { useEffect } from 'react'
import { ArrowRight, Heart, Mail, MessageCircle, ShieldCheck, X } from 'lucide-react'
import { SITE_CONTACT } from '../../data/siteData'

interface SupportModalProps {
  open: boolean
  onClose: () => void
  onGoToContact: () => void
}

export const SupportModal: React.FC<SupportModalProps> = ({
  open,
  onClose,
  onGoToContact,
}) => {
  useEffect(() => {
    if (!open) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
      className="fixed inset-0 z-50 bg-[#0C254D]/72 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FFFDF8] shadow-2xl border border-[#12366F]/15"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la fenêtre de soutien"
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-[#FFFDF8]/90 text-[#12366F] hover:bg-[#12366F] hover:text-[#FFFDF8] flex items-center justify-center shadow-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Logo Blue Banner */}
        <div className="bg-[#12366F] text-[#FFFDF8] p-7 sm:p-9">
          <div className="inline-flex items-center gap-2 text-[#F5C928] font-ui font-bold text-xs uppercase tracking-[0.2em] mb-3">
            <Heart className="w-3.5 h-3.5 text-[#D62828] fill-[#D62828]" />
            <span>Soutenir l&apos;O.E.D.</span>
          </div>
          <h3
            id="support-modal-title"
            className="font-serif-display font-semibold text-2xl sm:text-3xl leading-tight"
          >
            Votre générosité éclaire leur demain.
          </h3>
          <p className="text-sm sm:text-[15px] text-[#FFFDF8]/84 mt-2.5 leading-relaxed">
            Chaque soutien contribue directement à la scolarité, aux repas équilibrés, aux soins et
            au bien-être des enfants de l&apos;Orphelinat l&apos;Espoir du Demain.
          </p>
        </div>

        {/* Action Body */}
        <div className="p-7 sm:p-9 space-y-6">
          {SITE_CONTACT.donationCheckoutUrl ? (
            <a
              href={SITE_CONTACT.donationCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-full bg-[#F5C928] hover:bg-[#1554C7] hover:text-[#FFFDF8] text-[#12366F] font-ui font-extrabold text-sm flex items-center justify-center gap-2.5 transition-colors"
            >
              <Heart className="w-4 h-4 text-[#D62828] fill-[#D62828]" />
              <span>Accéder à la plateforme de don sécurisée</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <div className="p-5 rounded-xl bg-[#F1F5FB] border border-[#12366F]/12 space-y-2">
              <div className="flex items-center gap-2 text-[#12366F] font-ui font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-[#1554C7]" />
                <span>Transparence &amp; contact direct</span>
              </div>
              <p className="text-[14px] leading-relaxed text-[#1E2A3D]/82">
                Pour garantir la sécurité et la transparence de votre contribution (don financier,
                Mobile Money, fournitures scolaires ou denrées alimentaires), contactez directement
                la direction de l&apos;O.E.D. via nos canaux officiels ci-dessous.
              </p>
            </div>
          )}

          <div className="space-y-3">
            <a
              href={SITE_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-full bg-[#12366F] hover:bg-[#0C254D] text-[#FFFDF8] font-ui font-bold text-sm flex items-center justify-between transition-colors shadow-sm"
            >
              <span className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#F5C928]" />
                <span>Coordonner mon don sur WhatsApp</span>
              </span>
              <span className="text-xs text-[#F5C928] hidden sm:inline">
                {SITE_CONTACT.phoneDisplay}
              </span>
            </a>

            <a
              href={`mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent(
                "Soutien à l'Orphelinat l'Espoir du Demain",
              )}`}
              className="w-full py-4 px-6 rounded-full bg-[#1554C7] hover:bg-[#12366F] text-[#FFFDF8] font-ui font-bold text-sm flex items-center justify-between transition-colors shadow-cta"
            >
              <span className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>Écrire par email à la direction</span>
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => {
                onClose()
                onGoToContact()
              }}
              className="w-full py-3.5 px-6 rounded-full border border-[#12366F]/20 hover:bg-[#F1F5FB] text-[#12366F] font-ui font-bold text-sm transition-colors cursor-pointer"
            >
              Remplir le formulaire de contact &amp; partenariat
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
