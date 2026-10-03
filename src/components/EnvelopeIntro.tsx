import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { sound } from '../lib/sound'
import {
  FluffyCloud,
  KeepyUppyBalloon,
  PartyBunting,
  PawPrint,
  SparkleStar,
} from './BlueyDecorations'

type EnvelopeIntroProps = {
  onReveal: () => void
  onComplete: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

const sealVariants: Variants = {
  resting: { opacity: 1, scale: 1 },
  opening: { opacity: 0, scale: 1.25, transition: { duration: 0.35, ease } },
}

const flapVariants: Variants = {
  resting: { rotateX: 0 },
  opening: { rotateX: -180, transition: { delay: 0.25, duration: 0.85, ease } },
}

const paperVariants: Variants = {
  resting: { y: 20, scale: 0.8, opacity: 0 },
  opening: {
    y: [20, 0, -120, -180],
    scale: [0.8, 0.9, 0.98, 1.0],
    opacity: [0, 0.9, 1, 1],
    transition: {
      delay: 0.7,
      duration: 1.8,
      ease,
      times: [0, 0.2, 0.6, 1],
    },
  },
}

const envelopeVariants: Variants = {
  resting: { opacity: 1, scale: 1, y: 0 },
  opening: {
    opacity: [1, 1, 0],
    scale: [1, 0.98, 0.92],
    y: [0, 10, 30],
    transition: {
      delay: 1.8,
      duration: 0.7,
      ease: 'easeInOut',
      times: [0, 0.3, 1],
    },
  },
}

const headerVariants: Variants = {
  resting: { opacity: 1, y: 0 },
  opening: { opacity: 0, y: -20, transition: { duration: 0.4, ease } },
}

export function EnvelopeIntro({ onReveal, onComplete }: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpening) return

    const revealTimer = window.setTimeout(onReveal, shouldReduceMotion ? 80 : 2100)
    const completeTimer = window.setTimeout(onComplete, shouldReduceMotion ? 180 : 3000)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(completeTimer)
    }
  }, [isOpening, onComplete, onReveal, shouldReduceMotion])

  const state = isOpening ? 'opening' : 'resting'
  const animatedState = shouldReduceMotion ? 'resting' : state

  const openInvitation = () => {
    if (isOpening) return

    sound.playPop()
    try {
      confetti({
        particleCount: 55,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#4D88E6', '#F58A3C', '#FED766', '#FF4D6D', '#48B87B'],
      })
    } catch {
      // safe ignore
    }

    window.dispatchEvent(new Event('christening-invitation:opened'))
    setIsOpening(true)
  }

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 flex h-svh flex-col items-center justify-between overflow-hidden bg-[#F8FAFC] px-4 py-6 text-center select-none"
      exit={{ opacity: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease }}
    >
      {/* Top Party Bunting Garland */}
      <div className="pointer-events-none absolute top-0 inset-x-0 overflow-hidden">
        <PartyBunting className="w-full h-8 sm:h-12 opacity-85" />
      </div>

      {/* Floating Background Clouds */}
      <motion.div
        className="pointer-events-none absolute top-8 left-[-5%] w-40 opacity-40 sm:left-8 sm:w-56"
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FluffyCloud className="w-full" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-16 right-[-5%] w-44 opacity-40 sm:right-8 sm:w-60"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FluffyCloud className="w-full" />
      </motion.div>

      {/* Floating Balloons */}
      <motion.div
        className="pointer-events-none absolute left-4 top-1/4 z-10 hidden sm:block w-14 lg:left-12 lg:w-18"
        animate={{
          y: [-10, 10, -10],
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <KeepyUppyBalloon color="#FF4D6D" shineColor="#FFA8B8" className="w-full drop-shadow-md" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-4 top-1/3 z-10 hidden sm:block w-14 lg:right-12 lg:w-18"
        animate={{
          y: [10, -10, 10],
          rotate: [4, -4, 4],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        <KeepyUppyBalloon color="#F58A3C" shineColor="#FFC89E" className="w-full drop-shadow-md" />
      </motion.div>

      {/* ─── 1. Header Text (High Contrast & Clear) ─── */}
      <motion.div
        className="relative z-10 pt-4"
        variants={headerVariants}
        animate={animatedState}
        initial="resting"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF4FD] px-4 py-1 border border-[#D0E2FB] shadow-xs">
          <SparkleStar className="h-3.5 w-3.5 text-[#E5B53A]" />
          <span className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#1E40AF]">
            A Special Invitation
          </span>
          <SparkleStar className="h-3.5 w-3.5 text-[#E5B53A]" />
        </div>

        <h1 className="mt-2.5 font-display text-[2.2rem] font-bold leading-tight text-[#0F172A] sm:text-4xl">
          {invitationData.baby.fullName}
        </h1>

        <div className="mt-1 flex items-center justify-center gap-2 font-body text-xs font-semibold text-[#334155] sm:text-sm">
          <PawPrint className="h-3 w-3 text-[#2563EB]" />
          <span>Holy Baptism &bull; {invitationData.displayDate}</span>
          <PawPrint className="h-3 w-3 text-[#EA580C]" />
        </div>
      </motion.div>

      {/* ─── 2. 3D Envelope Scene ─── */}
      <div className="relative z-10 my-auto flex items-center justify-center">
        <div
          className="relative h-[190px] w-[min(88vw,360px)] [perspective:1400px] sm:h-[220px] sm:w-[400px] cursor-pointer"
          onClick={openInvitation}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') openInvitation()
          }}
          aria-label="Open Christening Invitation"
        >
          {/* Rising Paper Preview Card (Only visible when opening) */}
          <motion.div
            className="absolute inset-x-0 bottom-2 z-10 flex justify-center pointer-events-none"
            variants={paperVariants}
            animate={animatedState}
            initial="resting"
          >
            <div className="w-[min(82vw,19rem)] rounded-2xl bg-white p-5 text-center shadow-xl border-2 border-[#DCE8FA]">
              <p className="font-sub text-[0.7rem] font-bold uppercase tracking-wider text-[#1E40AF]">
                Holy Baptism
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-[#0F172A]">
                {invitationData.baby.fullName}
              </h3>
              <p className="mt-1 font-body text-xs font-semibold text-[#475569]">
                {invitationData.displayDate}
              </p>
            </div>
          </motion.div>

          {/* Envelope Body */}
          <motion.div
            className="absolute inset-0 z-20"
            variants={envelopeVariants}
            animate={animatedState}
            initial="resting"
          >
            {/* Envelope Back Base */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#5B92E8] to-[#3B75D0] shadow-xl border border-white/40" />

            {/* Top Flap (Triangular fold) */}
            <motion.div
              className="absolute inset-x-0 top-0 z-30 h-[105px] origin-top [clip-path:polygon(0_0,100%_0,50%_100%)] [backface-visibility:hidden] sm:h-[120px]"
              style={{ transformStyle: 'preserve-3d' }}
              variants={flapVariants}
              animate={animatedState}
              initial="resting"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#4A85E6] to-[#3B75D0] border-t border-white/50" />
              <div className="absolute inset-0 bg-[#C8DCFA] [backface-visibility:hidden] [transform:rotateX(180deg)]" />
            </motion.div>

            {/* Front Envelope Pocket Folds */}
            <div className="absolute inset-0 z-20 bg-[#96BEFB] [clip-path:polygon(0_0,50%_56%,100%_0,100%_100%,0_100%)] rounded-b-2xl shadow-inner" />
            <div className="absolute inset-0 z-20 bg-[#A8CCFC] [clip-path:polygon(0_0,50%_56%,0_100%)] rounded-bl-2xl" />

            {/* Wax Seal Center Button */}
            <motion.div
              className="absolute inset-x-0 top-[40%] z-40 flex justify-center pointer-events-none"
              variants={sealVariants}
              animate={animatedState}
              initial="resting"
            >
              <div className="flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-gradient-to-tr from-[#EA580C] to-[#F59E0B] shadow-lg border-4 border-white transition-transform hover:scale-105">
                <div className="flex flex-col items-center justify-center text-center">
                  <PawPrint className="h-5 w-5 text-white drop-shadow-xs" />
                  <span className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-white">
                    OPEN
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─── 3. Single Prominent CTA Button ─── */}
      <motion.div
        className="relative z-10 pb-2"
        variants={headerVariants}
        animate={animatedState}
        initial="resting"
      >
        <button
          className="bluey-button flex items-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95"
          type="button"
          onClick={openInvitation}
          disabled={isOpening}
          aria-label="Open invitation"
        >
          <Sparkles className="h-4 w-4 text-[#FED766]" />
          <span>{isOpening ? 'Opening Envelope...' : 'Tap to Open Invitation'}</span>
          <Sparkles className="h-4 w-4 text-[#FED766]" />
        </button>
      </motion.div>
    </motion.div>
  )
}
