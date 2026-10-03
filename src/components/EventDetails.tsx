import { motion } from 'framer-motion'
import { Clock, MapPin, Navigation } from 'lucide-react'
import { invitationData } from '../data/invitationData'

export function EventDetails() {
  const { event } = invitationData

  const locations = [
    {
      ...event.ceremony,
      badge: 'Ceremony',
      badgeClass: 'bg-[#EEF4FD] text-[#4D88E6]',
      btnClass: 'bluey-button',
    },
    {
      ...event.reception,
      badge: 'Reception',
      badgeClass: 'bg-[#FFF7EE] text-[#F58A3C]',
      btnClass: 'bingo-button',
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
        <p className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#4D88E6]">
          Where &amp; When
        </p>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.8rem] font-bold text-[#192739]">
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
              className="flex flex-col justify-between rounded-3xl border border-[#DCE8FA] bg-white p-6 sm:p-8 text-left shadow-sm"
            >
              <div>
                <span className={`inline-block rounded-full px-3 py-1 font-display text-xs font-bold uppercase tracking-wider ${loc.badgeClass}`}>
                  {loc.badge}
                </span>

                <h3 className="mt-3 font-display text-[1.45rem] font-bold text-[#192739]">
                  {loc.venue}
                </h3>

                <div className="mt-2 flex items-center gap-2 font-sub text-xs font-bold text-[#F58A3C]">
                  <Clock size={14} />
                  <span>{loc.time}</span>
                </div>

                <div className="mt-3 flex items-start gap-2 font-body text-sm text-[#64748B]">
                  <MapPin size={16} className="shrink-0 text-[#8297B3] mt-0.5" />
                  <span>{loc.address}</span>
                </div>

                <p className="mt-3 font-body text-xs text-[#8297B3] border-t border-[#F0F4FA] pt-3 leading-relaxed">
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
