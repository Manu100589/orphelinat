import React, { useState } from 'react'
import { Heart, Mail, MapPin, Phone, Sun, X } from 'lucide-react'
import { SITE_CONTACT } from '../../data/siteData'

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M13.5 21v-8.2h2.75l.41-3.2H13.5V7.56c0-.93.26-1.56 1.59-1.56h1.7V3.14c-.29-.04-1.3-.14-2.48-.14-2.45 0-4.13 1.5-4.13 4.24v2.36H7.4v3.2h2.78V21h3.32z" />
  </svg>
)

interface FooterProps {
  onOpenDonate: () => void
  onNavigate: (sectionId: string) => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenDonate, onNavigate }) => {
  const [legalModal, setLegalModal] = useState<'mentions' | 'privacy' | null>(null)

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    onNavigate(id)
  }

  return (
    <footer className="relative bg-[#0C254D] text-[#FFFDF8] pt-20 pb-10 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#FFFDF8]/14">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#F5C928]/85 bg-white shrink-0">
                <img
                  src="/images/logo-oed.png"
                  alt="Logo Orphelinat l'Espoir du Demain"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="block font-serif-display font-semibold text-lg leading-tight">
                  Orphelinat l&apos;Espoir du Demain
                </span>
                <span className="block text-xs font-ui font-semibold uppercase tracking-[0.18em] text-[#F5C928] mt-0.5">
                  O.E.D. · Kinshasa, RDC
                </span>
              </div>
            </div>

            <p className="text-[14.5px] leading-[1.75] text-[#FFFDF8]/78 max-w-sm">
              Centre d&apos;encadrement et d&apos;hébergement dédié à l&apos;accueil, à
              l&apos;éducation et à l&apos;épanouissement des enfants orphelins et vulnérables.
            </p>

            <button
              type="button"
              onClick={onOpenDonate}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#F5C928] hover:bg-[#FFFDF8] text-[#12366F] font-ui font-extrabold text-xs uppercase tracking-[0.08em] transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#D62828] fill-[#D62828]" />
              <span>Soutenir l&apos;orphelinat</span>
            </button>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-ui font-bold text-xs uppercase tracking-[0.2em] text-[#F5C928]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FFFDF8]/80">
              {[
                { label: 'Accueil', id: 'accueil' },
                { label: 'Qui sommes-nous', id: 'qui-sommes-nous' },
                { label: 'Nos activités', id: 'activites' },
                { label: 'Galerie', id: 'galerie' },
                { label: 'Actualités', id: 'actualites' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNav(e, item.id)}
                    className="hover:text-[#F5C928] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nos actions */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-ui font-bold text-xs uppercase tracking-[0.2em] text-[#F5C928]">
              Nos actions
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FFFDF8]/80">
              {[
                'Hébergement & Protection',
                'Éducation',
                'Alimentation',
                'Loisirs & Joie',
                'Devenir partenaire',
              ].map((label) => (
                <li key={label}>
                  <a
                    href={label === 'Devenir partenaire' ? '#partenaires' : '#actions'}
                    onClick={(e) =>
                      handleNav(e, label === 'Devenir partenaire' ? 'partenaires' : 'actions')
                    }
                    className="hover:text-[#F5C928] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-ui font-bold text-xs uppercase tracking-[0.2em] text-[#F5C928]">
              Contact &amp; localisation
            </h3>
            <ul className="space-y-3 text-sm text-[#FFFDF8]/82">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F5C928] shrink-0 mt-1" />
                <span>
                  {SITE_CONTACT.addressLine1}, {SITE_CONTACT.addressLine2}.{' '}
                  <strong className="text-[#FFFDF8]">{SITE_CONTACT.reference}</strong>.
                </span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONTACT.phoneRaw}`}
                  className="flex items-center gap-3 hover:text-[#F5C928] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F5C928] shrink-0" />
                  <span>{SITE_CONTACT.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="flex items-center gap-3 hover:text-[#F5C928] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#F5C928] shrink-0" />
                  <span>{SITE_CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONTACT.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:text-[#F5C928] transition-colors"
                >
                  <FacebookIcon className="w-4 h-4 text-[#F5C928] shrink-0" />
                  <span>{SITE_CONTACT.facebookName}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Poetic Final Signature with Sun Emblem */}
        <div className="py-10 flex flex-col items-center text-center gap-4 border-b border-[#FFFDF8]/12">
          <Sun className="w-7 h-7 text-[#F5C928] animate-sun-spin" />
          <p className="font-serif-display italic text-2xl sm:text-3xl text-[#FFFDF8] max-w-2xl">
            L&apos;espoir d&apos;aujourd&apos;hui construit les adultes de demain.
          </p>
        </div>

        {/* Legal Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFFDF8]/65">
          <p>
            © {new Date().getFullYear()} Orphelinat l&apos;Espoir du Demain (O.E.D.). Tous droits
            réservés.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setLegalModal('mentions')}
              className="hover:text-[#F5C928] transition-colors cursor-pointer"
            >
              Mentions légales
            </button>
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-[#F5C928] transition-colors cursor-pointer"
            >
              Politique de confidentialité
            </button>
          </div>
        </div>
      </div>

      {/* Legal & Privacy Modals */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0C254D]/82 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#FFFDF8] text-[#1E2A3D] p-7 sm:p-9 shadow-2xl border border-[#12366F]/15"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              aria-label="Fermer"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F1F5FB] text-[#12366F] hover:bg-[#12366F] hover:text-[#FFFDF8] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {legalModal === 'mentions' ? (
              <div className="space-y-4">
                <h3 className="font-serif-display font-semibold text-2xl text-[#12366F]">
                  Mentions légales
                </h3>
                <p className="text-sm leading-relaxed">
                  <strong>Éditeur :</strong> Orphelinat l&apos;Espoir du Demain (O.E.D.) — Centre
                  d&apos;encadrement et d&apos;hébergement des enfants orphelins et vulnérables.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Adresse :</strong> {SITE_CONTACT.addressLine1},{' '}
                  {SITE_CONTACT.addressLine2}. {SITE_CONTACT.reference}. {SITE_CONTACT.city}.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Contact :</strong> {SITE_CONTACT.email} · {SITE_CONTACT.phoneDisplay}.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Respect de la dignité des enfants :</strong> Les photographies publiées
                  sur ce site illustrent la vie et les activités du centre dans le respect strict de
                  la dignité des enfants accueillis. Toute reproduction sans autorisation préalable
                  de la direction de l&apos;O.E.D. est interdite.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-serif-display font-semibold text-2xl text-[#12366F]">
                  Politique de confidentialité
                </h3>
                <p className="text-sm leading-relaxed">
                  L&apos;Orphelinat l&apos;Espoir du Demain (O.E.D.) s&apos;engage à protéger les
                  informations personnelles partagées via son formulaire de contact ou par
                  messagerie.
                </p>
                <p className="text-sm leading-relaxed">
                  Les données transmises (nom, adresse email, message) sont utilisées exclusivement
                  pour répondre à vos demandes d&apos;information, de partenariat ou de soutien, et
                  ne sont jamais cédées ni vendues à des tiers.
                </p>
                <p className="text-sm leading-relaxed">
                  Pour toute question ou demande de suppression de vos coordonnées, écrivez-nous à{' '}
                  <a
                    href={`mailto:${SITE_CONTACT.email}`}
                    className="text-[#1554C7] font-semibold underline"
                  >
                    {SITE_CONTACT.email}
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  )
}
