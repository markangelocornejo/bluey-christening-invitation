import { motion } from 'framer-motion'
import { invitationData } from '../data/invitationData'

export function TimelineSection() {
  return (
    <section className="relative px-4 py-16 text-center sm:px-6 sm:py-20" id="schedule">
      <motion.div
        className="relative mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#4D88E6]">
          Event Schedule
        </p>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.8rem] font-bold text-[#192739]">
          Order of Events
        </h2>

        <div className="my-4 clean-divider">
          <span />
        </div>

        {/* Timeline Grid */}
        <div className="mx-auto mt-8 max-w-2xl text-left">
          <div className="space-y-3">
            {invitationData.timeline.map((item, index) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-[#DCE8FA] bg-white p-4 sm:p-5 shadow-xs"
              >
                <div className="flex h-10 w-20 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FD] font-display text-xs font-bold text-[#4D88E6]">
                  {item.time}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-[1.1rem] font-bold text-[#192739]">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-[#64748B] mt-0.5">
                    {item.detail}
                  </p>
                </div>
                <span className="font-sub text-xs font-bold text-[#D4E3FA]">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
