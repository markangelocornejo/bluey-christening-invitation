import { motion } from 'framer-motion'
import { invitationData } from '../data/invitationData'
import { PawPrint, SparkleStar } from './BlueyDecorations'

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
        <div className="flex items-center justify-center gap-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF4FD] px-3.5 py-1 border border-[#D0E2FB] shadow-xs">
            <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
            <span className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#1E40AF]">
              Event Schedule
            </span>
            <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
          </div>
        </div>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.8rem] font-bold text-[#0F172A]">
          Order of Events
        </h2>

        <div className="my-4 flex items-center justify-center gap-3">
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
          <PawPrint className="h-3.5 w-3.5" color="#2563EB" />
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
        </div>

        {/* Timeline Grid */}
        <div className="mx-auto mt-8 max-w-2xl text-left">
          <div className="space-y-3">
            {invitationData.timeline.map((item, index) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-[#CBD5E1] bg-white p-4 sm:p-5 shadow-xs hover:border-[#2563EB]/40 transition-colors"
              >
                <div className="flex h-10 w-20 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FD] font-display text-xs font-bold text-[#1E40AF] border border-[#D0E2FB]">
                  {item.time}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-[1.1rem] font-bold text-[#0F172A]">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs font-medium text-[#475569] mt-0.5">
                    {item.detail}
                  </p>
                </div>
                <span className="font-sub text-xs font-bold text-[#94A3B8]">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
