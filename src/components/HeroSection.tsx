import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ChevronDown, MapPin } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { getGoogleCalendarUrl } from '../lib/calendar'

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const diff = new Date(targetIso).getTime() - new Date().getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  }
}

export function HeroSection() {
  const { baby, displayDate, displayTime, eventDate, event } = invitationData
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(eventDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(eventDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [eventDate])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden px-4 pt-10 pb-16 text-center sm:px-6 sm:pt-14 sm:pb-20" id="welcome">
      <motion.div
        className="relative mx-auto max-w-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Main Invitation Card */}
        <div className="relative overflow-hidden rounded-[2.2rem] border border-[#DCE8FA] bg-white p-7 shadow-sm sm:p-10">
          {/* Eyebrow */}
          <p className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#4D88E6]">
            Holy Baptism &amp; Dedication
          </p>

          {/* Child Name */}
          <h1 className="mt-3 font-display text-[2.6rem] font-bold leading-tight text-[#192739] sm:text-[3.2rem]">
            {baby.fullName}
          </h1>

          {/* Parents */}
          <p className="mt-1 font-body text-sm font-medium text-[#64748B]">
            Beloved son of <strong className="font-semibold text-[#192739]">{baby.parents.display}</strong>
          </p>

          {/* Clean hairline divider */}
          <div className="my-6 clean-divider">
            <span />
          </div>

          {/* Authentic Bluey Family Character Illustration */}
          <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-[#E2EBF8] bg-[#F7FAFE] shadow-inner">
            <img
              src="/images/bluey-family.jpg"
              alt="Bluey and the Heeler Family"
              className="h-48 w-full object-cover sm:h-56"
            />
          </div>

          {/* Date, Time & Church Highlight */}
          <div className="mt-6 rounded-2xl bg-[#F7FAFE] p-4 text-left sm:p-5 border border-[#E8F0FC]">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <Calendar className="h-4 w-4 shrink-0 text-[#4D88E6] mt-0.5" />
                <div>
                  <p className="font-sub text-[0.65rem] font-bold uppercase tracking-wider text-[#8297B3]">Date &amp; Time</p>
                  <p className="font-display text-sm font-bold text-[#192739]">{displayDate}</p>
                  <p className="font-body text-xs text-[#64748B]">{displayTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[#F58A3C] mt-0.5" />
                <div>
                  <p className="font-sub text-[0.65rem] font-bold uppercase tracking-wider text-[#8297B3]">Ceremony Venue</p>
                  <p className="font-display text-sm font-bold text-[#192739]">{event.ceremony.venue}</p>
                  <p className="font-body text-xs text-[#64748B]">San Juan City</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Countdown Pills */}
          <div className="mt-6 flex items-center justify-center gap-2 font-display">
            <div className="rounded-xl bg-[#EEF4FD] px-3 py-2 text-center min-w-[3.5rem]">
              <span className="block text-lg font-bold text-[#4D88E6] leading-none">{timeLeft.days}</span>
              <span className="font-sub text-[0.6rem] font-bold uppercase text-[#8297B3]">Days</span>
            </div>
            <div className="rounded-xl bg-[#FFF7EE] px-3 py-2 text-center min-w-[3.5rem]">
              <span className="block text-lg font-bold text-[#F58A3C] leading-none">{timeLeft.hours}</span>
              <span className="font-sub text-[0.6rem] font-bold uppercase text-[#8297B3]">Hours</span>
            </div>
            <div className="rounded-xl bg-[#FDF9EE] px-3 py-2 text-center min-w-[3.5rem]">
              <span className="block text-lg font-bold text-[#E5B53A] leading-none">{timeLeft.minutes}</span>
              <span className="font-sub text-[0.6rem] font-bold uppercase text-[#8297B3]">Mins</span>
            </div>
            <div className="rounded-xl bg-[#F0FBF5] px-3 py-2 text-center min-w-[3.5rem]">
              <span className="block text-lg font-bold text-[#48B87B] leading-none">{timeLeft.seconds}</span>
              <span className="font-sub text-[0.6rem] font-bold uppercase text-[#8297B3]">Secs</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              className="bingo-button"
              type="button"
              onClick={() => scrollToSection('rsvp')}
            >
              <span>Confirm Attendance</span>
            </button>
            <a
              className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE8FA] bg-white px-5 py-3 font-display text-[0.88rem] font-bold text-[#192739] hover:bg-[#F7FAFE] transition-colors"
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
            >
              <Calendar size={15} className="text-[#4D88E6]" />
              <span>Add to Calendar</span>
            </a>
          </div>
        </div>

        {/* Subtle scroll down indicator */}
        <button
          className="mt-6 inline-flex items-center gap-1.5 font-sub text-xs font-bold uppercase tracking-wider text-[#8297B3] hover:text-[#4D88E6] transition-colors cursor-pointer"
          type="button"
          onClick={() => scrollToSection('event-details')}
        >
          <span>View Ceremony &amp; Reception Details</span>
          <ChevronDown size={14} />
        </button>
      </motion.div>
    </section>
  )
}
