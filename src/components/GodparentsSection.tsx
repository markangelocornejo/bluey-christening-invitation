import { motion } from 'framer-motion'
import { invitationData } from '../data/invitationData'

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
        <p className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#4D88E6]">
          {godparents.eyebrow}
        </p>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.8rem] font-bold text-[#192739]">
          {godparents.heading}
        </h2>

        <div className="my-4 clean-divider">
          <span />
        </div>

        <p className="mx-auto max-w-lg font-body text-xs text-[#64748B]">
          {godparents.subtitle}
        </p>

        {/* Godparents Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {godparents.list.map((person) => {
            const isNinong = person.role === 'Ninong'
            return (
              <div
                key={person.name}
                className="flex flex-col items-center rounded-2xl bg-white p-5 border border-[#DCE8FA] shadow-xs text-center"
              >
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-[0.65rem] font-display font-bold uppercase tracking-wider ${
                    isNinong
                      ? 'bg-[#EEF4FD] text-[#4D88E6]'
                      : 'bg-[#FFF7EE] text-[#F58A3C]'
                  }`}
                >
                  {person.role}
                </span>

                <h3 className="mt-2.5 font-display text-base font-bold text-[#192739]">
                  {person.name}
                </h3>

                <p className="mt-1 font-sub text-xs text-[#8297B3]">
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
