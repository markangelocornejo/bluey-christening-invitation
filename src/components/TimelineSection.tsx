import { motion } from 'framer-motion'
import { Cake, Camera, Church, Heart, PartyPopper, UtensilsCrossed } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { FluffyCloud, PawPrint } from './BlueyDecorations'

const timelineIcons = {
  church: Church,
  dove: Heart,
  camera: Camera,
  utensils: UtensilsCrossed,
  balloon: PartyPopper,
  cake: Cake,
}

export function TimelineSection() {
  return (
    <section className="relative overflow-hidden px-5 py-24 text-center sm:px-7 sm:py-28" id="schedule">
      <FluffyCloud className="absolute -left-16 top-6 h-36 w-60 opacity-30" />
      <FluffyCloud className="absolute -right-16 bottom-6 h-36 w-60 opacity-30" />

      <motion.div
        className="relative mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85 }}
      >
        <p className="font-sub text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#5B93E6]">
          The Program
        </p>
        <h2 className="mt-3 font-display text-[2.5rem] sm:text-[3.2rem] font-bold text-[#1E3557]">
          Schedule of Joy! 🎈
        </h2>

        <div className="my-5 bluey-divider">
          <span>🐾</span>
        </div>

        {/* Timeline Grid */}
        <div className="relative mx-auto mt-12 grid max-w-md gap-6 text-left sm:max-w-3xl sm:grid-cols-2 lg:grid-cols-3">
          {invitationData.timeline.map((item, index) => {
            const Icon = timelineIcons[item.icon as keyof typeof timelineIcons] ?? Heart
            const isBlue = index % 2 === 0
            return (
              <motion.article
                key={item.title}
                className="relative flex flex-col rounded-3xl bg-white p-6 shadow-sm border-2 border-[#E3EDFC] hover:border-[#82B5FB] transition-all"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                {/* Header with icon and time */}
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      isBlue ? 'bg-[#EBF3FE] text-[#3772FF]' : 'bg-[#FFF4E8] text-[#E8741E]'
                    } shadow-xs`}
                  >
                    <Icon size={20} />
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 font-display text-[0.72rem] font-bold uppercase tracking-wider ${
                      isBlue ? 'bg-[#EBF3FE] text-[#3772FF]' : 'bg-[#FFF4E8] text-[#E8741E]'
                    }`}
                  >
                    {item.time}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 font-display text-[1.25rem] font-bold text-[#1E3557]">
                  {item.title}
                </h3>

                {/* Detail */}
                <p className="mt-1 font-body text-sm text-[#708CAE]">
                  {item.detail}
                </p>

                {/* Paw decoration */}
                <PawPrint
                  className="absolute bottom-3 right-3 h-4 w-4 opacity-15"
                  color={isBlue ? '#3772FF' : '#E8741E'}
                />
              </motion.article>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
