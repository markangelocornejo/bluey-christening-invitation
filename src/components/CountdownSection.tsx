import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Download, Sparkles } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { downloadIcsFile, getGoogleCalendarUrl } from '../lib/calendar'
import { FluffyCloud } from './BlueyDecorations'

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const diff = new Date(targetIso).getTime() - new Date().getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  }
}

export function CountdownSection() {
  const { eventDate } = invitationData
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(eventDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(eventDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [eventDate])

  const units = [
    { label: 'Days', value: timeLeft.days, color: '#5B93E6', bg: 'bg-[#EBF3FE]' },
    { label: 'Hours', value: timeLeft.hours, color: '#F69145', bg: 'bg-[#FFF4E8]' },
    { label: 'Minutes', value: timeLeft.minutes, color: '#FED766', bg: 'bg-[#FFFDE8]' },
    { label: 'Seconds', value: timeLeft.seconds, color: '#9DE0AD', bg: 'bg-[#EDFDF3]' },
  ]

  return (
    <section className="relative overflow-hidden px-5 py-20 text-center sm:px-7 sm:py-24">
      <FluffyCloud className="absolute -left-16 top-4 h-32 w-52 opacity-40" />
      <FluffyCloud className="absolute -right-16 bottom-4 h-36 w-60 opacity-40" />

      <motion.div
        className="relative mx-auto max-w-xl lg:max-w-2xl"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EBF3FE] px-4 py-1.5 border border-[#82B5FB]/40">
          <Sparkles className="h-4 w-4 text-[#F69145]" />
          <p className="font-sub text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#2D4F7C]">
            Counting Down The Sleeps!
          </p>
          <Sparkles className="h-4 w-4 text-[#5B93E6]" />
        </div>

        <h2 className="mt-3 font-display text-[2.4rem] font-bold leading-tight text-[#1E3557] sm:text-[2.8rem]">
          The Big Day is Almost Here! ⏰
        </h2>

        <div className="my-4 bluey-divider">
          <span>🐾</span>
        </div>

        <p className="font-body text-[0.95rem] text-[#4A6282] max-w-md mx-auto">
          Save the date on your calendar and count down the moments with us until Liam&apos;s special blessing!
        </p>

        {/* Countdown Grid */}
        <div className="mt-8 grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto">
          {units.map((unit) => (
            <motion.div
              key={unit.label}
              className={`flex flex-col items-center justify-center rounded-2xl ${unit.bg} p-3 sm:p-4 border-2 border-white shadow-md`}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span
                className="font-display text-[1.8rem] sm:text-[2.5rem] font-bold leading-none"
                style={{ color: unit.color }}
              >
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="mt-1 font-sub text-[0.62rem] sm:text-[0.72rem] font-bold uppercase tracking-wider text-[#708CAE]">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Add to Calendar Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-sub text-[0.82rem] font-bold text-[#1E3557] shadow-sm border border-[#E3EDFC] hover:bg-[#F0F6FF] hover:border-[#82B5FB] transition-all"
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noreferrer"
          >
            <Calendar className="h-4 w-4 text-[#5B93E6]" />
            Add to Google Calendar
          </a>

          <button
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-sub text-[0.82rem] font-bold text-[#1E3557] shadow-sm border border-[#E3EDFC] hover:bg-[#F0F6FF] hover:border-[#82B5FB] transition-all cursor-pointer"
            type="button"
            onClick={downloadIcsFile}
          >
            <Download className="h-4 w-4 text-[#F69145]" />
            Download .ICS Event
          </button>
        </div>
      </motion.div>
    </section>
  )
}
