import { ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { invitationData } from '../data/invitationData'
import {
  FluffyCloud,
  KeepyUppyBalloon,
  PawPrint,
  SparkleStar,
} from './BlueyDecorations'

export function ClosingSection() {
  const { closing, baby } = invitationData

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden px-4 pt-16 pb-14 text-center sm:px-6 sm:pt-20 sm:pb-16">
      {/* Background Soft Clouds */}
      <motion.div
        className="pointer-events-none absolute bottom-4 left-[-5%] w-48 opacity-40 sm:left-10 sm:w-60"
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FluffyCloud className="w-full" />
      </motion.div>

      {/* Floating Balloon on Side */}
      <motion.div
        className="pointer-events-none absolute right-6 top-12 z-10 hidden sm:block w-14 lg:right-20 lg:w-16"
        animate={{
          y: [-8, 8, -8],
          rotate: [4, -4, 4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <KeepyUppyBalloon color="#FF4D6D" shineColor="#FFA8B8" className="w-full drop-shadow-md" />
      </motion.div>

      <div className="relative mx-auto max-w-md">
        {/* Character images with playful border styling */}
        <div className="mx-auto mb-6 flex items-center justify-center gap-4">
          <motion.div
            className="h-22 w-22 overflow-hidden rounded-3xl border-2 border-[#4D88E6]/40 bg-white p-1 shadow-sm"
            whileHover={{ scale: 1.05, rotate: -2 }}
          >
            <img src="/images/bluey.jpg" alt="Bluey" className="h-full w-full object-cover rounded-2xl" />
          </motion.div>
          <motion.div
            className="h-22 w-22 overflow-hidden rounded-3xl border-2 border-[#F58A3C]/40 bg-white p-1 shadow-sm"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <img src="/images/bingo.jpg" alt="Bingo" className="h-full w-full object-cover rounded-2xl" />
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF4FD] px-3.5 py-1 border border-[#D0E2FB] shadow-xs">
            <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
            <span className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#1E40AF]">
              {closing.eyebrow}
            </span>
            <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
          </div>
        </div>

        <p className="mt-3 font-body text-base font-medium leading-relaxed text-[#334155]">
          {closing.message}
        </p>

        <div className="my-4 flex items-center justify-center gap-3">
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
          <PawPrint className="h-3.5 w-3.5" color="#2563EB" />
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
        </div>

        <strong className="block font-hand text-3xl font-bold text-[#EA580C]">
          {closing.signature}
        </strong>

        {/* Back to Top */}
        <div className="mt-8">
          <button
            className="inline-flex items-center gap-1.5 rounded-full border border-[#CBD5E1] bg-white px-5 py-2.5 font-sub text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC] hover:border-[#1E40AF]/50 transition-all shadow-xs cursor-pointer"
            type="button"
            onClick={scrollToTop}
          >
            <ArrowUp size={13} />
            <span>Back to Top</span>
          </button>
        </div>

        <p className="mt-8 font-sub text-xs font-semibold text-[#64748B]">
          Holy Christening of {baby.fullName}
        </p>
      </div>
    </footer>
  )
}
