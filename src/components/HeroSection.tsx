import { motion } from 'framer-motion'
import { Calendar, Heart, MapPin, Sparkles } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { FluffyCloud, PawPrint } from './BlueyDecorations'

const ease = [0.22, 1, 0.36, 1] as const

export function HeroSection() {
  const { baby, displayDate } = invitationData

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden px-5 py-20 text-center sm:px-7 sm:py-24" id="welcome">
      <FluffyCloud className="absolute -left-12 bottom-4 h-36 w-60 opacity-40" />
      <FluffyCloud className="absolute -right-16 top-8 h-40 w-64 opacity-35" />

      <motion.div
        className="relative mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease }}
      >
        {/* Top Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EBF3FE] px-4 py-1.5 border border-[#82B5FB]/40 shadow-xs">
          <Sparkles className="h-4 w-4 text-[#F69145]" />
          <span className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#2D4F7C]">
            Celebrating A Joyful New Beginning
          </span>
          <Sparkles className="h-4 w-4 text-[#5B93E6]" />
        </div>

        {/* Heading */}
        <h2 className="mt-4 font-display text-[2.6rem] font-bold leading-tight text-[#1E3557] sm:text-[3.2rem]">
          Welcoming Baby <span className="text-[#3772FF]">{baby.nickname}</span>
          <span className="block text-[#F69145] text-[0.88em]">Into God&apos;s Loving Family</span>
        </h2>

        {/* Playful Bluey Divider */}
        <div className="my-5 bluey-divider">
          <span>🐾</span>
        </div>

        {/* Baby Photo Card in Bluey Style */}
        <div className="relative mx-auto mt-6 max-w-md">
          {/* Card Frame */}
          <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-b from-[#82B5FB] to-[#5B93E6] p-4 shadow-xl">
            {/* Top Character Artwork Banner */}
            <div className="mx-auto mb-3 overflow-hidden rounded-2xl border-2 border-white/80 shadow-md">
              <img
                src="/images/bluey-family.jpg"
                alt="Bluey Heeler Family"
                className="h-44 w-full object-cover"
              />
            </div>

            {/* Inner Presentation Container */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-inner flex flex-col items-center justify-center text-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-[#FFF4E8] to-[#EBF3FE] border-3 border-[#82B5FB]/40 flex items-center justify-center shadow-sm">
                <span className="text-4xl">👶🍼</span>
              </div>
              <h3 className="mt-3 font-display text-[1.45rem] font-bold text-[#1E3557]">
                {baby.fullName}
              </h3>
              <p className="font-body text-xs font-bold text-[#F69145]">
                {baby.age} &bull; Blessed &amp; Loved
              </p>

              {/* Corner Paw Accents */}
              <PawPrint className="absolute top-2 left-2 h-4 w-4 opacity-30" color="#5B93E6" />
              <PawPrint className="absolute bottom-2 right-2 h-4 w-4 opacity-30" color="#F69145" />
            </div>

            {/* Parents Banner */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-white">
              <Heart className="h-3.5 w-3.5 fill-white" />
              <p className="font-sub text-[0.82rem] font-bold">
                Proud Parents: {baby.parents.display}
              </p>
              <Heart className="h-3.5 w-3.5 fill-white" />
            </div>
          </div>
        </div>

        {/* Welcoming Message */}
        <p className="mx-auto mt-7 max-w-lg font-body text-[1.05rem] leading-relaxed text-[#4A6282] sm:text-[1.15rem]">
          We are so blessed to share this milestone with our most beloved family and friends.
          Come celebrate Liam&apos;s baptism with fun games, sweet treats, lots of laughs, and
          a heart full of gratitude!
        </p>

        {/* Quick Details Badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-sm border border-[#E3EDFC]">
            <Calendar className="h-5 w-5 text-[#5B93E6]" />
            <div className="text-left">
              <p className="font-sub text-[0.65rem] font-bold uppercase text-[#708CAE]">When</p>
              <p className="font-display text-[0.88rem] font-bold text-[#1E3557]">{displayDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-sm border border-[#E3EDFC]">
            <MapPin className="h-5 w-5 text-[#F69145]" />
            <div className="text-left">
              <p className="font-sub text-[0.65rem] font-bold uppercase text-[#708CAE]">Where</p>
              <p className="font-display text-[0.88rem] font-bold text-[#1E3557]">{invitationData.event.ceremony.venue}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            className="bingo-button"
            type="button"
            onClick={() => scrollToSection('rsvp')}
          >
            <span>RSVP for Celebration 🎈</span>
          </button>
          <button
            className="bluey-button"
            type="button"
            onClick={() => scrollToSection('event-details')}
          >
            <span>View Event &amp; Map 📍</span>
          </button>
        </div>
      </motion.div>
    </section>
  )
}
