import { motion } from 'framer-motion'
import { invitationData } from '../data/invitationData'
import { FluffyCloud } from './BlueyDecorations'

export function RSVPPromptSection() {
  const { rsvp } = invitationData

  const scrollToRsvp = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden px-5 py-16 text-center sm:px-7 sm:py-20">
      <FluffyCloud className="absolute -left-12 top-4 h-32 w-52 opacity-30" />
      <FluffyCloud className="absolute -right-12 bottom-4 h-32 w-52 opacity-30" />

      <motion.div
        className="relative mx-auto max-w-xl rounded-3xl bg-gradient-to-r from-[#5B93E6] to-[#3772FF] p-8 text-white shadow-xl sm:p-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-3xl">🎈</span>
        <h2 className="mt-2 font-display text-[2rem] sm:text-[2.5rem] font-bold leading-tight text-white">
          {rsvp.promptTitle}
        </h2>
        <p className="mx-auto mt-2 max-w-md font-body text-[0.98rem] text-white/90">
          {rsvp.promptMessage}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            className="bingo-button text-base px-8 py-3.5 shadow-lg cursor-pointer"
            type="button"
            onClick={scrollToRsvp}
          >
            <span>Confirm Your RSVP ✉️</span>
          </button>
        </div>

        <p className="mt-4 font-sub text-xs text-white/80">
          Kindly confirm by <strong>{rsvp.deadline}</strong>
        </p>
      </motion.div>
    </section>
  )
}
