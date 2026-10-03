import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ChevronDown, MapPin } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { getGoogleCalendarUrl } from '../lib/calendar'
import {
  FluffyCloud,
  KeepyUppyBalloon,
  PartyBunting,
  PawPrint,
  SparkleStar,
} from './BlueyDecorations'

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
      {/* Background Floating Clouds */}
      <motion.div
        className="pointer-events-none absolute -top-4 left-[-10%] w-48 opacity-40 sm:left-4 sm:w-64"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FluffyCloud className="w-full" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute top-12 right-[-10%] w-44 opacity-40 sm:right-6 sm:w-56"
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <FluffyCloud className="w-full" />
      </motion.div>

      {/* Floating Balloons on Left & Right Sides */}
      {/* Left Red Keepy Uppy Balloon */}
      <motion.div
        className="pointer-events-none absolute left-3 top-24 z-20 hidden md:block w-16 lg:left-12 lg:w-20"
        animate={{
          y: [-12, 12, -12],
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <KeepyUppyBalloon color="#FF4D6D" shineColor="#FFA8B8" className="w-full drop-shadow-md" />
      </motion.div>

      {/* Left Bluey Balloon */}
      <motion.div
        className="pointer-events-none absolute left-10 top-64 z-20 hidden md:block w-12 lg:left-24 lg:w-16"
        animate={{
          y: [10, -10, 10],
          rotate: [3, -3, 3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        <KeepyUppyBalloon color="#4D88E6" shineColor="#96BEFB" className="w-full drop-shadow-md" />
      </motion.div>

      {/* Right Bingo Orange Balloon */}
      <motion.div
        className="pointer-events-none absolute right-4 top-20 z-20 hidden md:block w-16 lg:right-12 lg:w-20"
        animate={{
          y: [12, -12, 12],
          rotate: [4, -4, 4],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
      >
        <KeepyUppyBalloon color="#F58A3C" shineColor="#FFC89E" className="w-full drop-shadow-md" />
      </motion.div>

      {/* Right Yellow Balloon */}
      <motion.div
        className="pointer-events-none absolute right-12 top-60 z-20 hidden md:block w-12 lg:right-24 lg:w-16"
        animate={{
          y: [-10, 10, -10],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 5.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
      >
        <KeepyUppyBalloon color="#FED766" shineColor="#FFF4D0" className="w-full drop-shadow-md" />
      </motion.div>

      <motion.div
        className="relative mx-auto max-w-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Main Invitation Card */}
        <div className="relative overflow-hidden rounded-[2.4rem] border border-[#DCE8FA] bg-white p-6 pt-7 shadow-sm sm:p-10 sm:pt-9">
          {/* Festive Top Bunting Garland */}
          <div className="absolute top-0 inset-x-0 overflow-hidden pointer-events-none">
            <PartyBunting className="w-full h-8 sm:h-10 opacity-90" />
          </div>

          {/* Eyebrow with Sparkles */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF4FD] px-3.5 py-1 border border-[#D0E2FB] shadow-xs">
              <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
              <span className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#1E40AF]">
                Holy Baptism &amp; Dedication
              </span>
              <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
            </div>
          </div>

          {/* Child Name */}
          <h1 className="mt-3 font-display text-[2.6rem] font-bold leading-tight text-[#0F172A] sm:text-[3.2rem]">
            {baby.fullName}
          </h1>

          {/* Parents */}
          <p className="mt-1 font-body text-sm font-semibold text-[#334155]">
            Beloved son of <strong className="font-bold text-[#0F172A]">{baby.parents.display}</strong>
          </p>

          {/* Hairline divider with subtle paw prints */}
          <div className="my-6 flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-[#D4E3FA]" />
            <PawPrint className="h-4 w-4" color="#2563EB" />
            <div className="h-[1px] w-12 bg-[#D4E3FA]" />
          </div>

          {/* Authentic Bluey Family Character Illustration */}
          <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-[#DCE8FA] bg-[#F7FAFE] shadow-inner">
            <img
              src="/images/bluey-family.jpg"
              alt="Bluey and the Heeler Family"
              className="h-48 w-full object-cover sm:h-56"
            />
          </div>

          {/* Date, Time & Church Highlight */}
          <div className="mt-6 rounded-2xl bg-[#F8FAFC] p-4 text-left sm:p-5 border border-[#E2E8F0]">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <Calendar className="h-4 w-4 shrink-0 text-[#2563EB] mt-0.5" />
                <div>
                  <p className="font-sub text-[0.68rem] font-extrabold uppercase tracking-wider text-[#475569]">Date &amp; Time</p>
                  <p className="font-display text-sm font-bold text-[#0F172A]">{displayDate}</p>
                  <p className="font-body text-xs font-semibold text-[#334155]">{displayTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[#EA580C] mt-0.5" />
                <div>
                  <p className="font-sub text-[0.68rem] font-extrabold uppercase tracking-wider text-[#475569]">Ceremony Venue</p>
                  <p className="font-display text-sm font-bold text-[#0F172A]">{event.ceremony.venue}</p>
                  <p className="font-body text-xs font-semibold text-[#334155]">San Juan City</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Countdown Pills */}
          <div className="mt-6 flex items-center justify-center gap-2 font-display">
            <div className="rounded-xl bg-[#EEF4FD] px-3 py-2 text-center min-w-[3.5rem] border border-[#D0E2FB]">
              <span className="block text-lg font-bold text-[#1E40AF] leading-none">{timeLeft.days}</span>
              <span className="font-sub text-[0.62rem] font-bold uppercase text-[#475569]">Days</span>
            </div>
            <div className="rounded-xl bg-[#FFF7EE] px-3 py-2 text-center min-w-[3.5rem] border border-[#FED7AA]">
              <span className="block text-lg font-bold text-[#C2410C] leading-none">{timeLeft.hours}</span>
              <span className="font-sub text-[0.62rem] font-bold uppercase text-[#475569]">Hours</span>
            </div>
            <div className="rounded-xl bg-[#FEF9C3] px-3 py-2 text-center min-w-[3.5rem] border border-[#FDE047]">
              <span className="block text-lg font-bold text-[#A16207] leading-none">{timeLeft.minutes}</span>
              <span className="font-sub text-[0.62rem] font-bold uppercase text-[#475569]">Mins</span>
            </div>
            <div className="rounded-xl bg-[#F0FDF4] px-3 py-2 text-center min-w-[3.5rem] border border-[#BBF7D0]">
              <span className="block text-lg font-bold text-[#15803D] leading-none">{timeLeft.seconds}</span>
              <span className="font-sub text-[0.62rem] font-bold uppercase text-[#475569]">Secs</span>
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
              className="inline-flex items-center gap-1.5 rounded-full border border-[#CBD5E1] bg-white px-5 py-3 font-display text-[0.88rem] font-bold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors shadow-xs"
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
            >
              <Calendar size={15} className="text-[#2563EB]" />
              <span>Add to Calendar</span>
            </a>
          </div>
        </div>

        {/* Subtle scroll down indicator */}
        <button
          className="mt-6 inline-flex items-center gap-1.5 font-sub text-xs font-bold uppercase tracking-wider text-[#475569] hover:text-[#1E40AF] transition-colors cursor-pointer"
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
