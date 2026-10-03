import { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import confetti from 'canvas-confetti'
import { sound } from '../lib/sound'
import { KeepyUppyBalloon, PawPrint } from './BlueyDecorations'

export function KeepyUppyMinigame() {
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const controls = useAnimation()

  const handleBounce = async () => {
    sound.playPop()
    const newScore = score + 1
    setScore(newScore)
    if (newScore > highScore) {
      setHighScore(newScore)
    }

    // Balloon jump animation
    await controls.start({
      y: [-20, -70, 0],
      rotate: [0, (Math.random() - 0.5) * 20, 0],
      scale: [1, 1.15, 1],
      transition: { duration: 0.5, ease: 'easeOut' },
    })

    // Confetti on milestone
    if (newScore > 0 && newScore % 5 === 0) {
      sound.playCheer()
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#FF4D6D', '#5B93E6', '#FED766', '#F69145'],
        })
      } catch {
        // safe ignore
      }
    }
  }

  return (
    <section className="relative overflow-hidden px-5 py-16 text-center sm:px-7 sm:py-20" id="keepy-uppy">
      <div className="relative mx-auto max-w-xl rounded-3xl bg-gradient-to-br from-[#FFF4E8] via-white to-[#EBF3FE] p-6 sm:p-8 border-2 border-[#82B5FB]/40 shadow-lg">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 border border-[#F69145]/30 shadow-xs">
          <PawPrint className="h-3.5 w-3.5" color="#F69145" />
          <p className="font-sub text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#E8741E]">
            Bluey&apos;s Favorite Game
          </p>
          <PawPrint className="h-3.5 w-3.5" color="#5B93E6" />
        </div>

        <h2 className="mt-2 font-display text-[2rem] sm:text-[2.4rem] font-bold text-[#1E3557]">
          Play Keepy Uppy! 🎈
        </h2>

        {/* Character Illustration Banner */}
        <div className="mx-auto my-3 max-w-xs overflow-hidden rounded-2xl border-2 border-[#82B5FB]/40 shadow-sm">
          <img
            src="/images/bluey-bingo-play.jpg"
            alt="Bluey and Bingo playing Keepy Uppy"
            className="h-36 w-full object-cover"
          />
        </div>

        <p className="mt-1 font-body text-sm text-[#708CAE]">
          Don&apos;t let the balloon touch the floor! Tap or click the balloon to bounce it!
        </p>

        {/* Scoreboard */}
        <div className="mt-4 flex items-center justify-center gap-6 font-display">
          <div className="rounded-xl bg-white px-4 py-1.5 shadow-sm border border-[#E3EDFC]">
            <span className="text-xs text-[#708CAE] uppercase font-sub font-bold mr-2">Bounces</span>
            <span className="text-xl font-bold text-[#FF4D6D]">{score}</span>
          </div>
          <div className="rounded-xl bg-white px-4 py-1.5 shadow-sm border border-[#E3EDFC]">
            <span className="text-xs text-[#708CAE] uppercase font-sub font-bold mr-2">Best</span>
            <span className="text-xl font-bold text-[#5B93E6]">{highScore}</span>
          </div>
        </div>

        {/* Interactive Balloon Playground */}
        <div className="relative mx-auto mt-6 flex h-48 sm:h-56 w-full max-w-xs items-center justify-center rounded-2xl bg-gradient-to-b from-[#EBF3FE] to-white/90 border border-dashed border-[#82B5FB]/60 overflow-hidden">
          <motion.div
            animate={controls}
            className="cursor-pointer select-none touch-none"
            onClick={handleBounce}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative flex flex-col items-center">
              <span className="absolute -top-3 font-sub text-[0.65rem] font-bold text-[#FF4D6D] bg-white/90 px-2 py-0.5 rounded-full shadow-xs">
                Tap Me!
              </span>
              <KeepyUppyBalloon className="h-32 w-24 sm:h-36 sm:w-28 drop-shadow-md" />
            </div>
          </motion.div>
        </div>

        {score > 0 && (
          <p className="mt-3 font-hand text-lg font-bold text-[#E8741E]">
            {score >= 15 ? '“Hooray! You are a Keepy Uppy Champion!” 🏆' : score >= 5 ? '“Keep it up! For real life!” ✨' : '“Boing! Keep bouncing!” 🎈'}
          </p>
        )}
      </div>
    </section>
  )
}
