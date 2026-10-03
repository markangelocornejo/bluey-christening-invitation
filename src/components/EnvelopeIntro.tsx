import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import confetti from 'canvas-confetti'
import { invitationData } from '../data/invitationData'
import { sound } from '../lib/sound'

type EnvelopeIntroProps = {
  onReveal: () => void
  onComplete: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

const sealVariants: Variants = {
  resting: { opacity: 1, scale: 1 },
  opening: { opacity: 0, scale: 1.3, transition: { duration: 0.35, ease } },
}

const flapVariants: Variants = {
  resting: { rotateX: 0 },
  opening: { rotateX: -180, transition: { delay: 0.3, duration: 1.0, ease } },
}

const paperVariants: Variants = {
  resting: { y: 80, scale: 0.55, opacity: 0.85 },
  opening: {
    y: [80, 40, -160, -280],
    scale: [0.55, 0.65, 0.92, 1.0],
    opacity: [0.85, 1, 1, 1],
    transition: {
      delay: 0.95,
      duration: 2.2,
      ease,
      times: [0, 0.2, 0.65, 1],
    },
  },
}

const envelopeVariants: Variants = {
  resting: { opacity: 1, scale: 1, y: 0 },
  opening: {
    opacity: [1, 1, 0],
    scale: [1, 0.98, 0.94],
    y: [0, 8, 30],
    transition: {
      delay: 2.3,
      duration: 0.85,
      ease: 'easeInOut',
      times: [0, 0.3, 1],
    },
  },
}

const headerVariants: Variants = {
  resting: { opacity: 1, y: 0 },
  opening: { opacity: 0, y: -20, transition: { duration: 0.45, ease } },
}

export function EnvelopeIntro({ onReveal, onComplete }: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpening) return

    const revealTimer = window.setTimeout(onReveal, shouldReduceMotion ? 80 : 2500)
    const completeTimer = window.setTimeout(onComplete, shouldReduceMotion ? 180 : 3600)

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
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#4D88E6', '#F58A3C', '#FBE8A6'],
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
      className="fixed inset-0 z-50 flex h-svh flex-col items-center justify-center overflow-hidden bg-[#FAFAF7] px-4 py-4 text-center"
      exit={{ opacity: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease }}
    >
      {/* Header text */}
      <motion.div
        className="relative z-10 mb-4"
        variants={headerVariants}
        animate={animatedState}
        initial="resting"
      >
        <p className="font-sub text-xs font-bold uppercase tracking-[0.2em] text-[#4D88E6]">
          A Special Invitation For You
        </p>

        <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-[#192739] sm:text-4xl">
          {invitationData.baby.fullName}
        </h2>
        <p className="mt-1 font-body text-xs text-[#64748B]">
          Holy Baptism &bull; {invitationData.displayDate}
        </p>
      </motion.div>

      {/* ─── Envelope Scene ─── */}
      <div className="relative z-10 h-[min(44svh,300px)] w-[min(90vw,400px)] [perspective:1600px] sm:h-[min(46svh,320px)]">
        {/* Envelope Body */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[190px] sm:h-[220px]"
          variants={envelopeVariants}
          animate={animatedState}
          initial="resting"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#6A9DF0] to-[#4D88E6] shadow-xl border border-white/40" />

          {/* Top Flap */}
          <motion.div
            className="absolute inset-x-0 top-0 z-30 h-[110px] origin-top [clip-path:polygon(0_0,100%_0,50%_100%)] [backface-visibility:hidden] sm:h-[125px]"
            style={{ transformStyle: 'preserve-3d' }}
            variants={flapVariants}
            animate={animatedState}
            initial="resting"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#5B92E8] to-[#4D88E6] border-t border-white/50" />
            <div className="absolute inset-0 bg-[#D4E4FC] [backface-visibility:hidden] [transform:rotateX(180deg)]" />
          </motion.div>

          <div className="absolute inset-0 z-20 bg-[#BFD8FB] [clip-path:polygon(0_0,50%_58%,100%_0,100%_100%,0_100%)]" />
          <div className="absolute inset-0 z-20 bg-[#CCE0FD] [clip-path:polygon(0_0,50%_58%,0_100%)]" />
        </motion.div>

        {/* Rising Paper Preview Card */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 flex justify-center"
          variants={paperVariants}
          animate={animatedState}
          initial="resting"
        >
          <div className="w-[min(80vw,20rem)] rounded-2xl bg-white p-5 text-center shadow-lg border border-[#DCE8FA]">
            <p className="font-sub text-[0.65rem] font-bold uppercase tracking-wider text-[#4D88E6]">
              Holy Baptism
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-[#192739]">
              {invitationData.baby.fullName}
            </h3>
            <p className="mt-1 font-body text-xs text-[#64748B]">
              {invitationData.displayDate}
            </p>
          </div>
        </motion.div>

        {/* Seal / Open Button */}
        <motion.div
          className="absolute inset-x-0 bottom-10 z-40 flex justify-center"
          variants={sealVariants}
          animate={animatedState}
          initial="resting"
        >
          <button
            className="group flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#F58A3C] to-[#FBE8A6] p-1 shadow-lg border-4 border-white transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer sm:h-24 sm:w-24"
            type="button"
            onClick={openInvitation}
            disabled={isOpening}
            aria-label="Open invitation"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-display text-xs font-bold uppercase tracking-wider text-white">
                Open
              </span>
            </div>
          </button>
        </motion.div>
      </div>

      {/* Button */}
      <motion.button
        className="bluey-button relative z-10 mt-6 text-xs"
        type="button"
        onClick={openInvitation}
        disabled={isOpening}
        animate={isOpening && !shouldReduceMotion ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
      >
        <span>{isOpening ? 'Opening...' : 'Open Invitation'}</span>
      </motion.button>
    </motion.div>
  )
}
