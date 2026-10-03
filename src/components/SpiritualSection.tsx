import { motion } from 'framer-motion'
import { invitationData } from '../data/invitationData'

export function SpiritualSection() {
  const { spiritual } = invitationData

  return (
    <section className="relative px-4 py-16 text-center sm:px-6 sm:py-20" id="blessing">
      <motion.div
        className="relative mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#4D88E6]">
          {spiritual.eyebrow}
        </p>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.8rem] font-bold text-[#192739]">
          {spiritual.heading}
        </h2>

        <div className="my-4 clean-divider">
          <span />
        </div>

        {/* Scripture Quote Box */}
        <blockquote className="mx-auto mt-6 max-w-xl rounded-2xl bg-white p-6 sm:p-8 border border-[#DCE8FA] shadow-xs">
          <p className="font-body text-base sm:text-lg italic font-medium leading-relaxed text-[#192739]">
            {spiritual.verse}
          </p>
          <cite className="mt-3 block font-sub text-xs font-bold uppercase tracking-widest text-[#F58A3C] not-italic">
            {spiritual.citation}
          </cite>
        </blockquote>

        {/* Devotional Note */}
        <div className="mx-auto mt-6 max-w-lg space-y-3 font-body text-sm leading-relaxed text-[#64748B]">
          <p>{spiritual.message}</p>
          <p>{spiritual.parentsNote}</p>
        </div>
      </motion.div>
    </section>
  )
}
