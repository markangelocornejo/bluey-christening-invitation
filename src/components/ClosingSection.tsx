import { ArrowUp, Heart } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { FluffyCloud } from './BlueyDecorations'

export function ClosingSection() {
  const { closing, baby } = invitationData

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden px-5 pt-20 pb-16 text-center sm:px-7 sm:pt-24 sm:pb-20">
      <FluffyCloud className="absolute -left-16 top-6 h-36 w-60 opacity-30" />
      <FluffyCloud className="absolute -right-16 top-10 h-36 w-60 opacity-30" />

      <div className="relative mx-auto max-w-lg">
        {/* Real Bluey & Bingo Character Cutout */}
        <div className="mx-auto mb-6 flex items-center justify-center gap-4">
          <div className="h-24 w-24 overflow-hidden rounded-2xl border-2 border-white bg-white shadow-md rotate-[-6deg]">
            <img src="/images/bluey.jpg" alt="Bluey Celebrating" className="h-full w-full object-cover" />
          </div>
          <div className="h-24 w-24 overflow-hidden rounded-2xl border-2 border-white bg-white shadow-md rotate-[6deg]">
            <img src="/images/bingo.jpg" alt="Bingo Waving" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Eyebrow */}
        <p className="font-sub text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#5B93E6]">
          {closing.eyebrow}
        </p>

        {/* Message */}
        <p className="mt-4 font-body text-[1.15rem] leading-relaxed text-[#1E3557] sm:text-[1.28rem]">
          {closing.message}
        </p>

        <div className="my-5 bluey-divider">
          <span>🐾</span>
        </div>

        {/* Signature */}
        <strong className="block font-hand text-[1.8rem] sm:text-[2.2rem] font-bold text-[#F69145]">
          {closing.signature}
        </strong>

        {/* Back to Top */}
        <div className="mt-10">
          <button
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display text-xs font-bold text-[#1E3557] shadow-sm border border-[#E3EDFC] hover:bg-[#EBF3FE] hover:border-[#82B5FB] transition-all cursor-pointer"
            type="button"
            onClick={scrollToTop}
          >
            <ArrowUp size={15} />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Footer Credit */}
        <p className="mt-8 font-sub text-xs text-[#A0B8D5] flex items-center justify-center gap-1">
          <span>Created with</span>
          <Heart className="h-3 w-3 fill-[#FF4D6D] text-[#FF4D6D]" />
          <span>for {baby.fullName}&apos;s Christening Celebration</span>
        </p>
      </div>
    </footer>
  )
}
