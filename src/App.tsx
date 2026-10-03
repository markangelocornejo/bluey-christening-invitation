import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ClosingSection } from './components/ClosingSection'
import { CountdownSection } from './components/CountdownSection'
import { EnvelopeIntro } from './components/EnvelopeIntro'
import { EventDetails } from './components/EventDetails'
import { FAQSection } from './components/FAQSection'
import { FinerDetailsSection } from './components/FinerDetailsSection'
import { GallerySection } from './components/GallerySection'
import { GiftSection } from './components/GiftSection'
import { GodparentsSection } from './components/GodparentsSection'
import { HeroSection } from './components/HeroSection'
import { MusicToggle } from './components/MusicToggle'
import { RSVPReminderNudge } from './components/RSVPReminderNudge'
import { RSVPSection } from './components/RSVPSection'
import { SaveTheDateSection } from './components/SaveTheDateSection'
import { SpiritualSection } from './components/SpiritualSection'
import { TimelineSection } from './components/TimelineSection'
import { invitationData } from './data/invitationData'

const ease = [0.22, 1, 0.36, 1] as const

export function App() {
  const [isIntroVisible, setIsIntroVisible] = useState(true)
  const [isPageRevealed, setIsPageRevealed] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const revealPage = useCallback(() => setIsPageRevealed(true), [])
  const dismissIntro = useCallback(() => setIsIntroVisible(false), [])

  useEffect(() => {
    document.title = `${invitationData.baby.nickname}'s Christening & Dedication | Bluey Celebration`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        `Join us as we celebrate the Christening and dedication of ${invitationData.baby.fullName} with love, faith, and lots of Bluey fun!`
      )
  }, [])

  return (
    <>
      {/* Interactive Envelope Intro Overlay */}
      <AnimatePresence>
        {isIntroVisible && (
          <EnvelopeIntro
            onReveal={revealPage}
            onComplete={dismissIntro}
          />
        )}
      </AnimatePresence>

      {/* Persistent Floating Music Toggle */}
      <div
        className={`fixed bottom-4 right-4 z-40 transition-opacity duration-500 sm:bottom-6 sm:right-6 ${
          isIntroVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        aria-hidden={isIntroVisible}
      >
        <MusicToggle />
      </div>

      {/* Floating RSVP Reminder Nudge */}
      <RSVPReminderNudge enabled={!isIntroVisible} />

      {/* Main Invitation Canvas */}
      <motion.main
        className={`invitation-canvas ${isIntroVisible ? 'pointer-events-none' : ''}`}
        aria-hidden={isIntroVisible}
        inert={isIntroVisible}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 80 }}
        animate={
          isPageRevealed
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: shouldReduceMotion ? 0 : 80 }
        }
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.4, ease }}
      >
        {/* 1. Welcoming & Baby Presentation */}
        <SaveTheDateSection />
        <HeroSection />
        <CountdownSection />

        {/* 2. Venues & Schedule */}
        <EventDetails />
        <TimelineSection />

        {/* 3. RSVP Section (Moved to the prominent center position!) */}
        <RSVPSection />

        {/* 4. Spiritual Blessing & Godparents */}
        <SpiritualSection />
        <GodparentsSection />

        {/* 5. Photos, Theme Guide, FAQs, and Gifts */}
        <GallerySection />
        <FinerDetailsSection />
        <FAQSection />
        <GiftSection />

        {/* 6. Closing & Farewell */}
        <ClosingSection />
      </motion.main>
    </>
  )
}

export default App
