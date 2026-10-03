import { invitationData } from '../data/invitationData'
import { FluffyCloud, KeepyUppyBalloon, PartyBunting, PawPrint } from './BlueyDecorations'

type FirstInvitationCardProps = {
  className?: string
  /** compact = true for envelope paper preview (smaller text, tighter spacing) */
  compact?: boolean
}

/**
 * Shared invitation card used both:
 * 1. Inside the envelope (rising paper during reveal animation)
 * 2. As the first section of the main invitation page
 *
 * This ensures visual continuity — what rises from the envelope
 * is identical to what the viewer sees as the first real section.
 */
export function FirstInvitationCard({ className = '', compact = false }: FirstInvitationCardProps) {
  const { baby, displayDate, saveTheDate, displayTime } = invitationData

  return (
    <div
      className={`bluey-speckles relative mx-auto flex ${
        compact ? 'aspect-[0.72] p-5' : 'aspect-[0.68] p-7 sm:p-9'
      } w-full max-w-[25rem] flex-col items-center justify-between overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border-2 border-[#82B5FB]/70 bg-gradient-to-b from-[#FFFFFF] via-[#F6FAFF] to-[#EBF3FE] text-center shadow-[0_24px_54px_rgba(45,79,124,0.18)] ${className}`}
    >
      {/* Inner dash frame */}
      <div className="pointer-events-none absolute inset-[0.45rem] rounded-t-[9.7rem] rounded-b-[1.7rem] border-2 border-dashed border-[#82B5FB]/40" />

      {/* Cloud & Balloon Top Accents */}
      <FluffyCloud className={`${compact ? 'h-16 -top-4 -left-6' : 'h-24 -top-6 -left-8'} absolute opacity-80`} />
      <FluffyCloud className={`${compact ? 'h-14 -top-3 -right-6' : 'h-20 -top-4 -right-8'} absolute opacity-70`} />
      <KeepyUppyBalloon
        className={`${compact ? 'h-16 top-2 right-2' : 'h-24 top-4 right-4'} absolute animate-float-gentle`}
      />

      {/* Top Bunting Banner */}
      <div className="relative z-10 w-full pt-1">
        <PartyBunting className={compact ? 'h-4' : 'h-6'} />
      </div>

      {/* Card Body */}
      <div className="relative z-10 flex flex-col items-center my-auto w-full">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F2FF] px-3.5 py-1 border border-[#5B93E6]/30">
          <PawPrint className="h-3 w-3" color="#5B93E6" />
          <p className={`${compact ? 'text-[0.54rem]' : 'text-[0.68rem]'} font-sub font-bold uppercase tracking-[0.16em] text-[#2D4F7C]`}>
            {saveTheDate.eyebrow}
          </p>
          <PawPrint className="h-3 w-3" color="#F69145" />
        </div>

        {/* Baby's Christening Heading */}
        <h1 className={`${compact ? 'mt-2.5 text-[2.2rem]' : 'mt-4 text-[2.8rem] sm:text-[3.4rem]'} font-display font-bold leading-[0.95] text-[#1E3557]`}>
          <span className="text-[#3772FF]">{baby.nickname}&apos;s</span>
          <span className="block text-[#F69145] text-[0.88em]">Christening</span>
        </h1>

        {/* Tagline / Subtitle */}
        <p className={`${compact ? 'mt-1.5 text-[0.75rem]' : 'mt-2 text-[0.92rem]'} font-sub font-semibold text-[#5B93E6]`}>
          &amp; Holy Dedication
        </p>

        {/* Playful Divider */}
        <div className={`${compact ? 'my-2.5' : 'my-4'} flex items-center justify-center gap-2`}>
          <span className="h-[2px] w-8 bg-[#82B5FB]/60 rounded-full" />
          <span className="text-sm">🎈</span>
          <span className="h-[2px] w-8 bg-[#FFB677]/60 rounded-full" />
        </div>

        {/* Baby Full Name & Parents */}
        <div className="space-y-0.5">
          <h2 className={`${compact ? 'text-[0.95rem]' : 'text-[1.2rem] sm:text-[1.35rem]'} font-display font-bold text-[#2D4F7C]`}>
            {baby.fullName}
          </h2>
          <p className={`${compact ? 'text-[0.62rem]' : 'text-[0.75rem]'} font-body text-[#708CAE]`}>
            Beloved son of <strong className="text-[#2D4F7C]">{baby.parents.display}</strong>
          </p>
        </div>

        {/* Quote / Tagline */}
        <div className={`${compact ? 'mt-2.5 px-2' : 'mt-4 px-4'} rounded-xl bg-white/70 py-1.5 border border-[#82B5FB]/25`}>
          <p className={`${compact ? 'text-[0.82rem]' : 'text-[1.05rem] sm:text-[1.18rem]'} font-hand font-bold text-[#E8741E] leading-tight`}>
            &ldquo;{saveTheDate.tagline}&rdquo;
          </p>
        </div>

        {/* Date & Time pill */}
        <div className={`${compact ? 'mt-3 py-1 px-3' : 'mt-5 py-2 px-5'} rounded-full bg-gradient-to-r from-[#5B93E6] to-[#3772FF] text-white shadow-md`}>
          <p className={`${compact ? 'text-[0.58rem]' : 'text-[0.78rem]'} font-display font-semibold uppercase tracking-wider`}>
            {displayDate} &bull; {displayTime}
          </p>
        </div>
      </div>

      {/* Bottom cloud floor & Character Badges */}
      <div className="relative z-10 w-full flex justify-between items-center pt-1 px-1">
        <div className={`${compact ? 'h-7 w-7' : 'h-10 w-10'} overflow-hidden rounded-full border-2 border-white shadow-md bg-white shrink-0`}>
          <img src="/images/bluey.jpg" alt="Bluey" className="h-full w-full object-cover" />
        </div>
        <p className={`${compact ? 'text-[0.5rem]' : 'text-[0.62rem]'} font-sub font-bold text-[#82B5FB] uppercase tracking-widest`}>
          Join the Fun &bull; Celebrate with Us
        </p>
        <div className={`${compact ? 'h-7 w-7' : 'h-10 w-10'} overflow-hidden rounded-full border-2 border-white shadow-md bg-white shrink-0`}>
          <img src="/images/bingo.jpg" alt="Bingo" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  )
}
