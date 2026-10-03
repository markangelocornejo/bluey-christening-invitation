import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import confetti from 'canvas-confetti'
import { invitationData } from '../data/invitationData'
import { FirstInvitationCard } from './FirstInvitationCard'
import { FluffyCloud, KeepyUppyBalloon, PawPrint } from './BlueyDecorations'
import { sound } from '../lib/sound'

type EnvelopeIntroProps = {
  onReveal: () => void
  onComplete: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

/* ─── Wax seal / balloon pop ─── */
const sealVariants: Variants = {
  resting: { opacity: 1, scale: 1 },
  opening: {
    opacity: 0,
    scale: 1.4,
    transition: { duration: 0.4, ease },
  },
}

/* ─── Top flap opens smoothly in 3D ─── */
const flapVariants: Variants = {
  resting: { rotateX: 0 },
  opening: {
    rotateX: -180,
    transition: { delay: 0.3, duration: 1.0, ease },
  },
}

/* ─── Invitation paper rises up ─── */
const paperVariants: Variants = {
  resting: { y: 80, scale: 0.52, opacity: 0.85 },
  opening: {
    y: [80, 40, -160, -280],
    scale: [0.52, 0.64, 0.92, 1.0],
    opacity: [0.85, 1, 1, 1],
    transition: {
      delay: 0.95,
      duration: 2.2,
      ease,
      times: [0, 0.2, 0.65, 1],
    },
  },
}

/* ─── Envelope body fades ─── */
const envelopeVariants: Variants = {
  resting: { opacity: 1, scale: 1, y: 0 },
  opening: {
    opacity: [1, 1, 0],
    scale: [1, 0.97, 0.93],
    y: [0, 8, 30],
    transition: {
      delay: 2.3,
      duration: 0.85,
      ease: 'easeInOut',
      times: [0, 0.3, 1],
    },
  },
}

/* ─── Header text ─── */
const headerVariants: Variants = {
  resting: { opacity: 1, y: 0 },
  opening: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.45, ease },
  },
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

    // Sound effect & confetti
    sound.playPop()
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5B93E6', '#F69145', '#FED766', '#82B5FB', '#FFB677'],
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
      className="fixed inset-0 z-50 flex h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#EBF4FF] via-[#F5F9FF] to-[#FFF3E8] px-5 py-5 text-center"
      exit={{ opacity: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease }}
    >
      {/* Background radial glow & cloud decorations */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(130,181,251,0.35),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(246,145,69,0.2),transparent_45%)]" />

      {/* Fluffy Clouds & Characters */}
      <FluffyCloud className="absolute -left-12 top-8 h-32 w-52 opacity-80 animate-cloud-drift lg:h-44 lg:w-72" />
      <FluffyCloud className="absolute -right-16 top-16 h-36 w-60 opacity-75 lg:h-48 lg:w-80" />
      <KeepyUppyBalloon className="absolute left-6 top-24 h-28 w-20 opacity-80 animate-float-gentle lg:h-40 lg:w-28" />
      <KeepyUppyBalloon
        className="absolute right-8 top-28 h-28 w-20 opacity-75 animate-float-gentle lg:h-40 lg:w-28"
        color="#F69145"
        shineColor="#FFD3A5"
      />

      {/* Real Bluey & Bingo Character Cutouts beside envelope */}
      <motion.div
        className="pointer-events-none absolute -left-4 sm:left-6 md:left-14 bottom-10 z-20 flex flex-col items-center"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl rotate-[-8deg]">
          <img src="/images/bluey.jpg" alt="Bluey" className="h-full w-full object-cover" />
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute -right-4 sm:right-6 md:right-14 bottom-10 z-20 flex flex-col items-center"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl rotate-[8deg]">
          <img src="/images/bingo.jpg" alt="Bingo" className="h-full w-full object-cover" />
        </div>
      </motion.div>

      {/* Header text */}
      <motion.div
        className="relative z-10 mb-4"
        variants={headerVariants}
        animate={animatedState}
        initial="resting"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 shadow-sm border border-[#82B5FB]/40 backdrop-blur-sm">
          <PawPrint className="h-3.5 w-3.5" color="#5B93E6" />
          <p className="text-[0.7rem] font-sub font-bold uppercase tracking-[0.2em] text-[#2D4F7C]">
            A Special Celebration For You
          </p>
          <PawPrint className="h-3.5 w-3.5" color="#F69145" />
        </div>

        <h2 className="mt-2 font-display text-[2.4rem] font-bold leading-tight text-[#1E3557] sm:text-[3rem]">
          You&apos;re Warmly Invited! 🎈
        </h2>
        <p className="mt-1 font-body text-[0.88rem] font-bold text-[#5B93E6]">
          {invitationData.baby.fullName}&apos;s Christening &bull; {invitationData.displayDate}
        </p>
      </motion.div>

      {/* ─── Envelope + Paper Scene ─── */}
      <div className="relative z-10 h-[min(44svh,320px)] w-[min(92vw,430px)] [perspective:1600px] sm:h-[min(46svh,340px)]">
        {/* Envelope body */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[200px] sm:h-[230px]"
          variants={envelopeVariants}
          animate={animatedState}
          initial="resting"
        >
          {/* Envelope outer shadow & base */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#82B5FB] to-[#5B93E6] shadow-[0_26px_56px_rgba(45,79,124,0.32)] border-2 border-white/60" />

          {/* Top flap (opens in 3D) */}
          <motion.div
            className="absolute inset-x-0 top-0 z-30 h-[120px] origin-top [clip-path:polygon(0_0,100%_0,50%_100%)] [backface-visibility:hidden] sm:h-[135px]"
            style={{ transformStyle: 'preserve-3d' }}
            variants={flapVariants}
            animate={animatedState}
            initial="resting"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#6EA5F5] to-[#558DE0] border-t-2 border-white/70" />
            {/* Back face of flap */}
            <div className="absolute inset-0 bg-[#E1EEFF] [backface-visibility:hidden] [transform:rotateX(180deg)]" />
          </motion.div>

          {/* Rear panels / Inner envelope lining */}
          <div className="absolute inset-0 z-20 bg-[#C7DFFF] [clip-path:polygon(0_0,50%_58%,100%_0,100%_100%,0_100%)]" />
          <div className="absolute inset-0 z-20 bg-[#D8E9FF] [clip-path:polygon(0_0,50%_58%,0_100%)]" />

          {/* Fluffy cloud inside envelope */}
          <div className="absolute inset-x-4 top-8 z-[5] h-[60%] rounded-xl bg-white/20 blur-xs" />
        </motion.div>

        {/* Rising Paper (FirstInvitationCard) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 flex justify-center"
          variants={paperVariants}
          animate={animatedState}
          initial="resting"
        >
          <FirstInvitationCard className="w-[min(82vw,21.5rem)] shrink-0" compact />
        </motion.div>

        {/* Wax / Paw-print Balloon Seal (Interactive Button) */}
        <motion.div
          className="absolute inset-x-0 bottom-12 z-40 flex justify-center"
          variants={sealVariants}
          animate={animatedState}
          initial="resting"
        >
          <button
            className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-[#F69145] to-[#FED766] p-1.5 shadow-[0_12px_28px_rgba(246,145,69,0.45)] border-4 border-white transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-4 focus-visible:outline-[#3772FF] sm:h-28 sm:w-28 cursor-pointer overflow-hidden"
            type="button"
            onClick={openInvitation}
            disabled={isOpening}
            aria-label="Open Christening Invitation"
          >
            {/* Animated pulsing ring */}
            <span className="absolute inset-0 rounded-full bg-[#FED766] opacity-60 animate-ping group-hover:opacity-80" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl">🎈</span>
              <span className="mt-0.5 font-display text-[0.68rem] sm:text-[0.75rem] font-bold uppercase tracking-wider text-white drop-shadow-sm">
                Open!
              </span>
            </div>
          </button>
        </motion.div>
      </div>

      {/* Secondary CTA Button */}
      <motion.button
        className="bluey-button relative z-10 mt-6 disabled:cursor-wait"
        type="button"
        onClick={openInvitation}
        disabled={isOpening}
        animate={isOpening && !shouldReduceMotion ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease }}
      >
        <span>{isOpening ? 'Unfolding Invitation...' : 'Open Christening Invitation ✨'}</span>
      </motion.button>
    </motion.div>
  )
}
