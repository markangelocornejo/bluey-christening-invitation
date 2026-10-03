import { motion } from 'framer-motion'
import { invitationData } from '../data/invitationData'
import { PawPrint, SparkleStar } from './BlueyDecorations'

export function GodparentsSection() {
  const { godparents } = invitationData

  return (
    <section className="relative px-4 py-16 text-center sm:px-6 sm:py-20" id="godparents">
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
              {godparents.eyebrow}
            </span>
            <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
          </div>
        </div>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.8rem] font-bold text-[#0F172A]">
          {godparents.heading}
        </h2>

        <div className="my-4 flex items-center justify-center gap-3">
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
          <PawPrint className="h-3.5 w-3.5" color="#EA580C" />
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
        </div>

        <p className="mx-auto max-w-lg font-body text-sm font-medium text-[#334155]">
          {godparents.subtitle}
        </p>

        {/* Godparents Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {godparents.list.map((person) => {
            const isNinong = person.role === 'Ninong'
            return (
              <div
                key={person.name}
                className="flex flex-col items-center rounded-2xl bg-white p-5 border border-[#CBD5E1] shadow-xs text-center hover:border-[#2563EB]/40 transition-colors"
              >
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-[0.68rem] font-display font-extrabold uppercase tracking-wider ${
                    isNinong
                      ? 'bg-[#EEF4FD] text-[#1E40AF] border border-[#D0E2FB]'
                      : 'bg-[#FFF7EE] text-[#C2410C] border border-[#FED7AA]'
                  }`}
                >
                  {person.role}
                </span>

                <h3 className="mt-2.5 font-display text-base font-bold text-[#0F172A]">
                  {person.name}
                </h3>

                <p className="mt-1 font-sub text-xs font-semibold text-[#475569]">
                  {person.note}
                </p>
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
