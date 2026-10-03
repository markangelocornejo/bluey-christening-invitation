import { motion } from 'framer-motion'
import { Sparkles, Star } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { FluffyCloud, PawPrint } from './BlueyDecorations'

export function GodparentsSection() {
  const { godparents } = invitationData

  return (
    <section className="relative overflow-hidden px-5 py-24 text-center sm:px-7 sm:py-28" id="godparents">
      <FluffyCloud className="absolute -left-20 top-10 h-40 w-64 opacity-35" />
      <FluffyCloud className="absolute -right-20 bottom-8 h-40 w-64 opacity-35" />

      <motion.div
        className="relative mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85 }}
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF3FE] px-3.5 py-1 border border-[#82B5FB]/40">
          <Star className="h-3.5 w-3.5 text-[#FED766] fill-[#FED766]" />
          <p className="font-sub text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#2D4F7C]">
            {godparents.eyebrow}
          </p>
          <Star className="h-3.5 w-3.5 text-[#FED766] fill-[#FED766]" />
        </div>

        <h2 className="mt-3 font-display text-[2.5rem] sm:text-[3.2rem] font-bold text-[#1E3557]">
          {godparents.heading}
        </h2>

        <div className="my-4 bluey-divider">
          <span>⭐</span>
        </div>

        <p className="mx-auto max-w-lg font-body text-[1rem] leading-relaxed text-[#4A6282]">
          {godparents.subtitle}
        </p>

        {/* Godparents Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {godparents.list.map((person, index) => {
            const isNinong = person.role === 'Ninong'
            return (
              <motion.div
                key={person.name}
                className="group relative flex flex-col items-center rounded-3xl bg-white p-6 shadow-sm border-2 border-[#E3EDFC] hover:border-[#82B5FB] hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                {/* Role Badge */}
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.65rem] font-display font-bold uppercase tracking-wider ${
                    isNinong
                      ? 'bg-[#EBF3FE] text-[#3772FF] border border-[#82B5FB]/40'
                      : 'bg-[#FFF4E8] text-[#E8741E] border border-[#FFB677]/40'
                  }`}
                >
                  <PawPrint className="h-3 w-3" color={isNinong ? '#3772FF' : '#E8741E'} />
                  {person.role}
                </span>

                {/* Name */}
                <h3 className="mt-3 font-display text-[1.22rem] font-bold text-[#1E3557]">
                  {person.name}
                </h3>

                {/* Honorary Fun Title */}
                <p className="mt-1 font-hand text-[1.1rem] font-bold text-[#5B93E6]">
                  {person.note}
                </p>

                {/* Decorative mini sparkle on corner */}
                <Sparkles className="absolute top-3 right-3 h-4 w-4 text-[#FED766] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
