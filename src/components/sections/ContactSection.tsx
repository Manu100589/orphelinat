import React, { useEffect, useState } from 'react'
import {
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'
import { SITE_CONTACT } from '../../data/siteData'
import { KineticTrackingHeading, MagneticButton } from '../ui/MotionPrimitives'

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M13.5 21v-8.2h2.75l.41-3.2H13.5V7.56c0-.93.26-1.56 1.59-1.56h1.7V3.14c-.29-.04-1.3-.14-2.48-.14-2.45 0-4.13 1.5-4.13 4.24v2.36H7.4v3.2h2.78V21h3.32z" />
  </svg>
)

interface ContactSectionProps {
  presetSubject?: string
}

const SUBJECT_PRESETS = [
  'Faire un don',
  'Devenir partenaire',
  'Don matériel / fournitures',
  'Visite & volontariat',
  'Autre demande',
]

export const ContactSection: React.FC<ContactSectionProps> = ({ presetSubject }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(presetSubject || 'Faire un don')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (presetSubject) {
      setSubject(presetSubject)
    }
  }, [presetSubject])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 bg-[#FFFDF8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl space-y-4 pb-10 mb-12 border-b border-[#12366F]/16">
          <div className="flex items-center gap-3">
            <span className="w-9 h-[2px] bg-[#D62828]" />
            <span className="font-ui font-bold text-xs uppercase tracking-[0.22em] text-[#1554C7]">
              Contact &amp; rencontre
            </span>
          </div>
          <KineticTrackingHeading
            as="h2"
            className="font-serif-display font-semibold text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] leading-[1.07] text-[#12366F]"
          >
            Parlons d&apos;un <em className="italic font-normal text-[#D62828]">avenir meilleur.</em>
          </KineticTrackingHeading>
          <p className="text-[16.5px] leading-[1.74] text-[#516075]">
            Une question, un projet de don, une visite au centre ou une envie de partenariat ?
            Notre équipe vous répond avec écoute, transparence et chaleur humaine.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* LEFT CONTACT LEDGER + MAP */}
          <div className="lg:col-span-5 space-y-8">
            <div className="divide-y divide-[#12366F]/14 border-b border-[#12366F]/14">
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="flex items-start gap-4 py-5 first:pt-0 group"
              >
                <Mail className="w-5 h-5 text-[#1554C7] shrink-0 mt-1" />
                <div className="min-w-0">
                  <span className="block text-[11px] font-ui font-bold uppercase tracking-[0.18em] text-[#516075]">
                    Email officiel
                  </span>
                  <span className="block font-ui font-semibold text-[15px] text-[#12366F] group-hover:text-[#1554C7] break-all mt-0.5 transition-colors">
                    {SITE_CONTACT.email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${SITE_CONTACT.phoneRaw}`}
                className="flex items-start gap-4 py-5 group"
              >
                <Phone className="w-5 h-5 text-[#1554C7] shrink-0 mt-1" />
                <div>
                  <span className="block text-[11px] font-ui font-bold uppercase tracking-[0.18em] text-[#516075]">
                    Téléphone / WhatsApp
                  </span>
                  <span className="block font-ui font-semibold text-base text-[#12366F] group-hover:text-[#1554C7] mt-0.5 transition-colors">
                    {SITE_CONTACT.phoneDisplay}
                  </span>
                </div>
              </a>

              <a
                href={SITE_CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 py-5 group"
              >
                <FacebookIcon className="w-5 h-5 text-[#1554C7] shrink-0 mt-1" />
                <div>
                  <span className="block text-[11px] font-ui font-bold uppercase tracking-[0.18em] text-[#516075]">
                    Facebook
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-ui font-semibold text-[15px] text-[#12366F] group-hover:text-[#1554C7] mt-0.5 transition-colors">
                    {SITE_CONTACT.facebookName}
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-4 py-5">
                <MapPin className="w-5 h-5 text-[#D62828] shrink-0 mt-1" />
                <div>
                  <span className="block text-[11px] font-ui font-bold uppercase tracking-[0.18em] text-[#516075]">
                    Adresse du centre
                  </span>
                  <p className="font-ui font-semibold text-[15px] text-[#12366F] mt-0.5 leading-snug">
                    {SITE_CONTACT.addressLine1}, {SITE_CONTACT.addressLine2}.
                  </p>
                  <p className="text-sm text-[#D62828] font-semibold mt-1">
                    {SITE_CONTACT.reference}
                  </p>
                  <p className="text-xs text-[#516075] mt-0.5">{SITE_CONTACT.city}</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <MagneticButton
              href={SITE_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full gap-2.5 py-4 px-6 rounded-full bg-[#12366F] hover:bg-[#0C254D] text-[#FFFDF8] font-ui font-bold text-sm shadow-journal"
            >
              <MessageCircle className="w-5 h-5 text-[#F5C928]" />
              <span>Discuter sur WhatsApp</span>
            </MagneticButton>

            {/* Location Map */}
            <div className="rounded-2xl overflow-hidden border border-[#12366F]/14 bg-[#F1F5FB]">
              <div className="relative h-52 w-full bg-[#DCE5F4]">
                <iframe
                  title="Localisation Orphelinat l'Espoir du Demain — Kimbanseke, Kinshasa"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=15.3600%2C-4.4350%2C15.4300%2C-4.3800&layer=mapnik&marker=-4.4075%2C15.3950"
                  loading="lazy"
                  className="w-full h-full border-0"
                />
              </div>
              <div className="px-5 py-3.5 flex items-center justify-between gap-3 text-xs">
                <span className="font-ui font-bold text-[#12366F]">
                  Kimbanseke · Pascal · Route Mokali
                </span>
                <a
                  href={SITE_CONTACT.mapQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-ui font-bold text-[#1554C7] hover:underline shrink-0"
                >
                  <span>Itinéraire</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT MINIMAL JOURNAL FORM */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 rounded-2xl bg-[#F1F5FB]/85 border border-[#12366F]/14">
              {submitted ? (
                <div className="py-10 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#1554C7]/10 text-[#1554C7] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-serif-display font-semibold text-2xl sm:text-3xl text-[#12366F]">
                    Merci pour votre message, {name || 'cher ami'} !
                  </h3>
                  <p className="text-[16px] leading-relaxed text-[#1E2A3D]/84 max-w-md mx-auto">
                    Votre demande concernant <strong className="text-[#12366F]">{subject}</strong> a
                    bien été préparée. Pour un échange immédiat avec la direction, vous pouvez
                    également nous écrire directement sur WhatsApp ou par email.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent(
                        `[O.E.D.] ${subject} — ${name}`,
                      )}&body=${encodeURIComponent(
                        `Nom : ${name}\nEmail : ${email}\n\n${message}`,
                      )}`}
                      className="px-6 py-3.5 rounded-full bg-[#1554C7] text-[#FFFDF8] font-ui font-bold text-sm hover:bg-[#12366F] transition-colors"
                    >
                      Ouvrir dans ma messagerie
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setName('')
                        setEmail('')
                        setMessage('')
                      }}
                      className="px-6 py-3.5 rounded-full border border-[#12366F]/20 text-[#12366F] font-ui font-semibold text-sm hover:bg-[#FFFDF8] transition-colors cursor-pointer"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-serif-display font-semibold text-2xl sm:text-3xl text-[#12366F]">
                      Écrivez-nous directement
                    </h3>
                    <p className="text-sm text-[#516075] mt-1">
                      Tous les champs marqués d&apos;un * sont requis.
                    </p>
                  </div>

                  {/* Quick Subject Pills */}
                  <div className="space-y-2.5">
                    <span className="block text-xs font-ui font-bold uppercase tracking-[0.16em] text-[#516075]">
                      Sujet de votre message
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {SUBJECT_PRESETS.map((item) => {
                        const active = subject === item
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setSubject(item)}
                            className={`px-3.5 py-2 rounded-full text-xs font-ui font-bold transition-all cursor-pointer ${
                              active
                                ? 'bg-[#1554C7] text-[#FFFDF8]'
                                : 'bg-[#FFFDF8] text-[#1E2A3D]/80 border border-[#12366F]/12 hover:border-[#1554C7] hover:text-[#1554C7]'
                            }`}
                          >
                            {item}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-ui font-bold text-[#12366F] mb-2"
                      >
                        Nom complet *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Votre nom et prénom"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF8] border border-[#12366F]/16 text-[#1E2A3D] placeholder:text-[#516075]/55 focus:border-[#1554C7] transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-ui font-bold text-[#12366F] mb-2"
                      >
                        Adresse email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF8] border border-[#12366F]/16 text-[#1E2A3D] placeholder:text-[#516075]/55 focus:border-[#1554C7] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-ui font-bold text-[#12366F] mb-2"
                    >
                      Sujet *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF8] border border-[#12366F]/16 text-[#1E2A3D] focus:border-[#1554C7] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-ui font-bold text-[#12366F] mb-2"
                    >
                      Votre message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Partagez votre message, votre projet de soutien ou vos questions..."
                      className="w-full px-4 py-3.5 rounded-xl bg-[#FFFDF8] border border-[#12366F]/16 text-[#1E2A3D] placeholder:text-[#516075]/55 focus:border-[#1554C7] transition-colors resize-y"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <MagneticButton
                      type="submit"
                      className="gap-2.5 px-8 py-4 rounded-full bg-[#1554C7] hover:bg-[#12366F] text-[#FFFDF8] font-ui font-bold text-sm shadow-cta"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer le message</span>
                    </MagneticButton>
                    <span className="text-xs text-[#516075]">
                      Réponse attentive de l&apos;équipe O.E.D.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
