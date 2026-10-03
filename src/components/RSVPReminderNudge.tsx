import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X } from 'lucide-react'
import { invitationData } from '../data/invitationData'

type RSVPReminderNudgeProps = {
  enabled: boolean
}

export function RSVPReminderNudge({ enabled }: RSVPReminderNudgeProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const { rsvp } = invitationData

  useEffect(() => {
    if (!enabled || isDismissed || rsvp.isClosed) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      // Show when scrolled past hero section
      if (scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enabled, isDismissed, rsvp.isClosed])

  const scrollToRsvp = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          className="fixed bottom-4 left-4 z-40 max-w-[280px] sm:max-w-[320px] rounded-2xl bg-white/95 p-3.5 shadow-xl border-2 border-[#82B5FB] backdrop-blur-md"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className="absolute top-2 right-2 text-[#708CAE] hover:text-[#1E3557] p-1 cursor-pointer"
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss reminder"
          >
            <X size={14} />
          </button>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF4E8] text-[#E8741E]">
              <Bell size={18} />
            </div>
            <div className="flex-1 pr-2 text-left">
              <p className="font-display text-xs font-bold text-[#1E3557]">
                Don&apos;t Forget to RSVP! 🎈
              </p>
              <p className="mt-0.5 font-body text-[0.72rem] text-[#708CAE]">
                Deadline is {rsvp.deadline}
              </p>
              <button
                className="mt-2 inline-flex items-center gap-1 font-display text-[0.75rem] font-bold text-[#3772FF] hover:underline cursor-pointer"
                type="button"
                onClick={scrollToRsvp}
              >
                <span>Confirm Attendance &rarr;</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
