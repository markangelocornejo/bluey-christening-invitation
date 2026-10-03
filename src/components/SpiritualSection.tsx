import { motion } from 'framer-motion'
import { invitationData } from '../data/invitationData'
import { BaptismDoveAndCross, FluffyCloud, PawPrint } from './BlueyDecorations'

const ease = [0.22, 1, 0.36, 1] as const

export function SpiritualSection() {
  const { spiritual } = invitationData

  return (
    <section className="relative overflow-hidden px-5 py-24 text-center sm:px-7 sm:py-28" id="blessing">
      <FluffyCloud className="absolute -left-16 top-6 h-36 w-60 opacity-30" />
      <FluffyCloud className="absolute -right-16 bottom-6 h-36 w-60 opacity-30" />

      <motion.div
        className="relative mx-auto max-w-xl lg:max-w-2xl"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease }}
      >
        {/* Dove & Cross Icon */}
        <div className="mx-auto mb-3 flex justify-center">
          <BaptismDoveAndCross className="h-28 w-28" />
        </div>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF3FE] px-3.5 py-1 border border-[#82B5FB]/40">
          <PawPrint className="h-3 w-3" color="#5B93E6" />
          <p className="font-sub text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#2D4F7C]">
            {spiritual.eyebrow}
          </p>
          <PawPrint className="h-3 w-3" color="#F69145" />
        </div>

        {/* Heading */}
        <h2 className="mt-3 font-display text-[2.5rem] sm:text-[3rem] font-bold text-[#1E3557]">
          {spiritual.heading}
        </h2>

        <div className="my-5 bluey-divider">
          <span>✨</span>
        </div>

        {/* Scripture Quote Box */}
        <motion.blockquote
          className="mx-auto mt-6 max-w-lg rounded-3xl bg-white/90 p-6 sm:p-8 border-2 border-[#82B5FB]/40 shadow-md"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          <p className="font-body text-[1.15rem] italic font-semibold leading-relaxed text-[#1E3557] sm:text-[1.28rem]">
            {spiritual.verse}
          </p>
          <cite className="mt-3 block font-sub text-[0.8rem] font-bold uppercase tracking-widest text-[#F69145] not-italic">
            {spiritual.citation}
          </cite>
        </motion.blockquote>

        {/* Parents' Devotional Note */}
        <motion.div
          className="mx-auto mt-8 max-w-lg space-y-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.8, ease }}
        >
          <p className="font-body text-[1.02rem] leading-relaxed text-[#4A6282] sm:text-[1.12rem]">
            {spiritual.message}
          </p>
          <p className="font-body text-[1.02rem] leading-relaxed text-[#4A6282] sm:text-[1.12rem]">
            {spiritual.parentsNote}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
