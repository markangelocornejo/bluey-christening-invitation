import { ArrowUp } from 'lucide-react'
import { invitationData } from '../data/invitationData'

export function ClosingSection() {
  const { closing, baby } = invitationData

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative px-4 pt-16 pb-14 text-center sm:px-6 sm:pt-20 sm:pb-16">
      <div className="relative mx-auto max-w-md">
        {/* Character image */}
        <div className="mx-auto mb-6 flex items-center justify-center gap-3">
          <div className="h-20 w-20 overflow-hidden rounded-2xl border border-[#DCE8FA] bg-white shadow-xs">
            <img src="/images/bluey.jpg" alt="Bluey" className="h-full w-full object-cover" />
          </div>
          <div className="h-20 w-20 overflow-hidden rounded-2xl border border-[#DCE8FA] bg-white shadow-xs">
            <img src="/images/bingo.jpg" alt="Bingo" className="h-full w-full object-cover" />
          </div>
        </div>

        <p className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#4D88E6]">
          {closing.eyebrow}
        </p>

        <p className="mt-3 font-body text-sm leading-relaxed text-[#64748B]">
          {closing.message}
        </p>

        <div className="my-4 clean-divider">
          <span />
        </div>

        <strong className="block font-hand text-2xl font-bold text-[#F58A3C]">
          {closing.signature}
        </strong>

        {/* Back to Top */}
        <div className="mt-8">
          <button
            className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE8FA] bg-white px-4 py-2 font-sub text-xs font-bold text-[#192739] hover:bg-[#F7FAFE] transition-colors cursor-pointer"
            type="button"
            onClick={scrollToTop}
          >
            <ArrowUp size={13} />
            <span>Back to Top</span>
          </button>
        </div>

        <p className="mt-8 font-sub text-[0.7rem] text-[#94A3B8]">
          Holy Christening of {baby.fullName}
        </p>
      </div>
    </footer>
  )
}
