import { motion } from 'framer-motion'
import { Sparkles, Shirt } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { FluffyCloud, PawPrint } from './BlueyDecorations'

const ease = [0.22, 1, 0.36, 1] as const

export function FinerDetailsSection() {
  const { motif } = invitationData

  return (
    <section className="relative overflow-hidden px-5 py-24 text-center sm:px-7 sm:py-28" id="attire">
      <FluffyCloud className="absolute -left-16 top-6 h-36 w-60 opacity-30" />
      <FluffyCloud className="absolute -right-16 bottom-6 h-36 w-60 opacity-30" />

      <motion.div
        className="relative mx-auto max-w-xl lg:max-w-2xl"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease }}
      >
        {/* Eyebrow */}
        <p className="font-sub text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#5B93E6]">
          {motif.eyebrow}
        </p>

        {/* Section Heading */}
        <h2 className="mt-3 font-display text-[2.5rem] sm:text-[3.2rem] font-bold text-[#1E3557]">
          {motif.title} 🎨
        </h2>

        <div className="my-5 bluey-divider">
          <span>🐾</span>
        </div>

        {/* Motif message */}
        <p className="mx-auto max-w-md font-body text-[1.05rem] leading-relaxed text-[#4A6282] sm:text-[1.12rem]">
          {motif.message}
        </p>

        {/* Color Palette Swatches */}
        <div className="mt-8 flex flex-wrap justify-center gap-3.5 sm:gap-5" aria-label="Bluey Theme Colors">
          {motif.colors.map((color, index) => (
            <motion.div
              key={color.name}
              className="flex w-[4.5rem] sm:w-[5.2rem] flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.45 }}
              whileHover={{ y: -4 }}
            >
              <span
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl border-3 border-white shadow-md flex items-center justify-center"
                style={{ backgroundColor: color.value }}
              >
                <PawPrint className="h-5 w-5 opacity-25" color="#FFFFFF" />
              </span>
              <span className="font-display text-[0.72rem] font-bold text-[#1E3557]">
                {color.name}
              </span>
              <span className="font-sub text-[0.62rem] text-[#708CAE]">
                {color.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Attire Guidelines Card */}
        <div className="mx-auto mt-10 rounded-3xl bg-white p-6 sm:p-8 shadow-md border-2 border-[#E3EDFC] max-w-lg">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EBF3FE] text-[#3772FF]">
            <Shirt size={24} />
          </div>
          <h3 className="font-display text-[1.35rem] font-bold text-[#1E3557]">
            Dress Code Recommendation
          </h3>
          <p className="mt-2 font-body text-[0.98rem] text-[#4A6282]">
            {motif.dressCode}
          </p>
          <div className="mt-4 rounded-xl bg-[#FFF4E8] p-3 text-left flex items-start gap-2 border border-[#FFB677]/30">
            <Sparkles className="h-4 w-4 shrink-0 text-[#F69145] mt-0.5" />
            <p className="font-hand text-base font-bold text-[#E8741E]">
              Tip: Feel free to add cheerful pastel accessories, suspenders, or cute puppy ears for the little ones!
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
