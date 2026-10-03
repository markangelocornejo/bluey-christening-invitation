import { FirstInvitationCard } from './FirstInvitationCard'
import { FluffyCloud, KeepyUppyBalloon, PawPrint } from './BlueyDecorations'

export function SaveTheDateSection() {
  return (
    <section className="relative overflow-hidden px-5 pt-12 pb-16 text-center sm:px-7 sm:pt-16 sm:pb-24">
      {/* Decorative Cloud & Floating Balloons */}
      <FluffyCloud className="absolute -left-16 top-6 h-36 w-60 opacity-60 animate-cloud-drift lg:h-48 lg:w-80" />
      <FluffyCloud className="absolute -right-16 top-12 h-40 w-64 opacity-50 lg:h-52 lg:w-88" />
      <KeepyUppyBalloon className="absolute left-4 top-28 h-32 w-20 opacity-75 animate-float-gentle lg:left-12 lg:h-44 lg:w-28" />
      <KeepyUppyBalloon
        className="absolute right-4 top-36 h-28 w-18 opacity-70 animate-float-gentle lg:right-12 lg:h-40 lg:w-24"
        color="#F69145"
        shineColor="#FFD3A5"
      />

      {/* Floating Paw Prints */}
      <PawPrint className="absolute left-8 bottom-12 h-6 w-6 opacity-30 rotate-12" color="#5B93E6" />
      <PawPrint className="absolute right-8 bottom-16 h-7 w-7 opacity-30 -rotate-12" color="#F69145" />

      <div className="relative z-10 mx-auto max-w-lg">
        <FirstInvitationCard />
      </div>
    </section>
  )
}
