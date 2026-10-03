import { motion } from 'framer-motion'
import { invitationData } from '../data/invitationData'
import { PawPrint, SparkleStar } from './BlueyDecorations'

export function FinerDetailsSection() {
  const { motif } = invitationData

  return (
    <section className="relative px-4 py-16 text-center sm:px-6 sm:py-20" id="attire">
      <motion.div
        className="relative mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center justify-center gap-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF4FD] px-3.5 py-1 border border-[#D0E2FB] shadow-xs">
            <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
            <span className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#1E40AF]">
              {motif.eyebrow}
            </span>
            <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
          </div>
        </div>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.8rem] font-bold text-[#0F172A]">
          {motif.title}
        </h2>

        <div className="my-4 flex items-center justify-center gap-3">
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
          <PawPrint className="h-3.5 w-3.5" color="#EA580C" />
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
        </div>

        <p className="mx-auto max-w-md font-body text-sm font-medium text-[#334155]">
          {motif.message}
        </p>

        {/* Color Palette Swatches */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
          {motif.colors.map((color) => (
            <div key={color.name} className="flex flex-col items-center gap-1.5 w-16">
              <span
                className="h-12 w-12 rounded-xl border border-black/15 shadow-sm"
                style={{ backgroundColor: color.value }}
              />
              <span className="font-display text-xs font-bold text-[#0F172A]">
                {color.name}
              </span>
            </div>
          ))}
        </div>

        {/* Attire recommendation */}
        <div className="mx-auto mt-8 max-w-md rounded-2xl bg-white p-5 border border-[#CBD5E1] text-center shadow-xs">
          <p className="font-sub text-xs font-extrabold uppercase tracking-wider text-[#475569]">
            Dress Code
          </p>
          <p className="mt-1 font-body text-sm font-bold text-[#0F172A]">
            {motif.dressCode}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
