import { motion } from 'framer-motion'
import { Clock, MapPin, Navigation } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import {
  ChurchChapelIllustration,
  ReceptionPartyIllustration,
  SparkleStar,
} from './BlueyDecorations'

export function EventDetails() {
  const { event } = invitationData

  const locations = [
    {
      ...event.ceremony,
      badge: 'Ceremony',
      badgeClass: 'bg-[#EEF4FD] text-[#4D88E6]',
      btnClass: 'bluey-button',
      illustration: <ChurchChapelIllustration className="h-28 w-auto mx-auto my-1" />,
    },
    {
      ...event.reception,
      badge: 'Reception',
      badgeClass: 'bg-[#FFF7EE] text-[#F58A3C]',
      btnClass: 'bingo-button',
      illustration: <ReceptionPartyIllustration className="h-28 w-auto mx-auto my-1" />,
    },
  ]

  return (
    <section className="relative px-4 py-16 text-center sm:px-6 sm:py-20" id="event-details">
      <motion.div
        className="relative mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center justify-center gap-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF4FD] px-3.5 py-1 border border-[#D0E2FB] shadow-xs">
            <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
            <span className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#1E40AF]">
              Where &amp; When
            </span>
            <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
          </div>
        </div>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.8rem] font-bold text-[#0F172A]">
          Ceremony &amp; Reception
        </h2>

        <div className="my-4 clean-divider">
          <span />
        </div>

        {/* Location Cards Grid */}
        <div className="mx-auto mt-8 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {locations.map((loc) => (
            <div
              key={loc.venue}
              className="flex flex-col justify-between rounded-3xl border border-[#DCE8FA] bg-white p-6 sm:p-8 text-left shadow-sm hover:border-[#4D88E6]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`inline-block rounded-full px-3 py-1 font-display text-xs font-bold uppercase tracking-wider ${loc.badgeClass}`}>
                    {loc.badge}
                  </span>
                </div>

                {/* SVG Illustration */}
                <div className="my-3 flex justify-center rounded-2xl bg-[#F7FAFE] p-3 border border-[#E8F0FC]">
                  {loc.illustration}
                </div>

                <h3 className="mt-3 font-display text-[1.45rem] font-bold text-[#0F172A]">
                  {loc.venue}
                </h3>

                <div className="mt-2 flex items-center gap-2 font-sub text-xs font-bold text-[#C2410C]">
                  <Clock size={14} />
                  <span>{loc.time}</span>
                </div>

                <div className="mt-3 flex items-start gap-2 font-body text-sm font-medium text-[#334155]">
                  <MapPin size={16} className="shrink-0 text-[#2563EB] mt-0.5" />
                  <span>{loc.address}</span>
                </div>

                <p className="mt-3 font-body text-xs font-medium text-[#475569] border-t border-[#F0F4FA] pt-3 leading-relaxed">
                  {loc.note}
                </p>
              </div>

              <div className="mt-6 pt-2">
                <a
                  className={`${loc.btnClass} w-full text-xs font-bold`}
                  href={loc.mapLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Navigation size={14} />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
