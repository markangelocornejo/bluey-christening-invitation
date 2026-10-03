import { motion } from 'framer-motion'
import { Clock, MapPin, Navigation } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { ChurchChapelIllustration, FluffyCloud, ReceptionPartyIllustration } from './BlueyDecorations'

export function EventDetails() {
  const { event } = invitationData

  const locations = [
    {
      ...event.ceremony,
      illustrationType: 'church',
      badge: 'Ceremony',
      badgeColor: 'bg-[#EBF3FE] text-[#3772FF] border-[#82B5FB]/40',
      btnClass: 'bluey-button',
    },
    {
      ...event.reception,
      illustrationType: 'reception',
      badge: 'Reception & Party',
      badgeColor: 'bg-[#FFF4E8] text-[#E8741E] border-[#FFB677]/40',
      btnClass: 'bingo-button',
    },
  ]

  return (
    <section className="relative overflow-hidden px-5 py-24 text-center sm:px-7 sm:py-28" id="event-details">
      <FluffyCloud className="absolute -left-16 top-6 h-36 w-60 opacity-35" />
      <FluffyCloud className="absolute -right-16 bottom-6 h-36 w-60 opacity-35" />

      <motion.div
        className="relative mx-auto max-w-xl lg:max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85 }}
      >
        {/* Eyebrow */}
        <p className="font-sub text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#5B93E6]">
          Where &amp; When
        </p>

        {/* Heading */}
        <h2 className="mt-3 font-display text-[2.5rem] sm:text-[3.2rem] lg:text-[3.8rem] font-bold text-[#1E3557]">
          Celebration Locations 📍
        </h2>

        <div className="my-5 bluey-divider">
          <span>⛪</span>
        </div>

        {/* Location Cards Grid */}
        <div className="mx-auto mt-10 grid gap-8 sm:grid-cols-2 lg:gap-10">
          {locations.map((loc) => (
            <motion.article
              key={loc.venue}
              className="flex flex-col justify-between rounded-3xl bg-white p-7 sm:p-9 shadow-md border-2 border-[#E3EDFC] hover:border-[#82B5FB] transition-all"
              whileHover={{ y: -6 }}
            >
              <div>
                {/* Illustration */}
                <div className="mx-auto flex h-28 w-44 items-center justify-center">
                  {loc.illustrationType === 'church' ? (
                    <ChurchChapelIllustration className="h-full w-full" />
                  ) : (
                    <ReceptionPartyIllustration className="h-full w-full" />
                  )}
                </div>

                {/* Badge */}
                <span
                  className={`mt-4 inline-block rounded-full px-3.5 py-1 text-[0.68rem] font-display font-bold uppercase tracking-wider border ${loc.badgeColor}`}
                >
                  {loc.badge}
                </span>

                {/* Venue Name */}
                <h3 className="mt-3 font-display text-[1.5rem] sm:text-[1.75rem] font-bold text-[#1E3557]">
                  {loc.venue}
                </h3>

                {/* Time */}
                <div className="mt-2.5 flex items-center justify-center gap-1.5 font-sub text-[0.88rem] font-bold text-[#F69145]">
                  <Clock className="h-4 w-4" />
                  <span>{loc.time}</span>
                </div>

                {/* Address */}
                <div className="mt-3 flex items-center justify-center gap-1.5 font-body text-[0.95rem] text-[#4A6282]">
                  <MapPin className="h-4 w-4 shrink-0 text-[#82B5FB]" />
                  <span>{loc.address}</span>
                </div>

                {/* Special Note */}
                <p className="mt-3 font-hand text-[1.15rem] font-bold text-[#2D4F7C] leading-snug">
                  {loc.note}
                </p>
              </div>

              {/* Map Button */}
              <div className="mt-7 pt-4 border-t border-[#F0F6FF]">
                <a
                  className={`${loc.btnClass} w-full`}
                  href={loc.mapLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Navigation size={16} />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
