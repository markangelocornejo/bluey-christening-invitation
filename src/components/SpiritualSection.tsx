import { motion } from 'framer-motion'
import { invitationData } from '../data/invitationData'
import {
  BaptismDoveAndCross,
  FluffyCloud,
  PawPrint,
  SparkleStar,
} from './BlueyDecorations'

export function SpiritualSection() {
  const { spiritual } = invitationData

  return (
    <section className="relative px-4 py-16 text-center sm:px-6 sm:py-20" id="blessing">
      {/* Background Soft Clouds */}
      <motion.div
        className="pointer-events-none absolute -top-4 right-[-5%] w-48 opacity-40 sm:right-10 sm:w-60"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FluffyCloud className="w-full" />
      </motion.div>

      <motion.div
        className="relative mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        {/* Radiant Dove & Cross SVG */}
        <div className="mx-auto mb-3 flex justify-center">
          <BaptismDoveAndCross className="h-24 w-24 drop-shadow-sm" />
        </div>

        <div className="flex items-center justify-center gap-1.5">
          <SparkleStar className="h-3 w-3 text-[#FED766]" />
          <p className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#4D88E6]">
            {spiritual.eyebrow}
          </p>
          <SparkleStar className="h-3 w-3 text-[#FED766]" />
        </div>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.8rem] font-bold text-[#192739]">
          {spiritual.heading}
        </h2>

        <div className="my-4 flex items-center justify-center gap-3">
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
          <PawPrint className="h-3.5 w-3.5" color="#4D88E6" />
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
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
