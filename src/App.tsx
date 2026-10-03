import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ClosingSection } from './components/ClosingSection'
import { EnvelopeIntro } from './components/EnvelopeIntro'
import { EventDetails } from './components/EventDetails'
import { FAQSection } from './components/FAQSection'
import { FinerDetailsSection } from './components/FinerDetailsSection'
import { GallerySection } from './components/GallerySection'
import { GiftSection } from './components/GiftSection'
import { GodparentsSection } from './components/GodparentsSection'
import { HeroSection } from './components/HeroSection'
import { MusicToggle } from './components/MusicToggle'
import { RSVPSection } from './components/RSVPSection'
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
    document.title = `${invitationData.baby.fullName} | Christening Invitation`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        `Join us as we celebrate the Holy Baptism and Christening of ${invitationData.baby.fullName}.`
      )
  }, [])

  return (
    <>
      {/* 3D Opening Envelope Intro */}
      <AnimatePresence>
        {isIntroVisible && (
          <EnvelopeIntro
            onReveal={revealPage}
            onComplete={dismissIntro}
          />
        )}
      </AnimatePresence>

      {/* Floating Audio Controller */}
      <div
        className={`fixed bottom-4 right-4 z-40 transition-opacity duration-300 sm:bottom-6 sm:right-6 ${
          isIntroVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        aria-hidden={isIntroVisible}
      >
        <MusicToggle />
      </div>

      {/* Main Invitation Canvas */}
      <motion.main
        className={`invitation-canvas ${isIntroVisible ? 'pointer-events-none' : ''}`}
        aria-hidden={isIntroVisible}
        inert={isIntroVisible}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
        animate={
          isPageRevealed
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: shouldReduceMotion ? 0 : 40 }
        }
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.0, ease }}
      >
        {/* 1. Unified Hero Presentation & Countdown */}
        <HeroSection />

        {/* 2. Locations & Timeline */}
        <EventDetails />
        <TimelineSection />

        {/* 3. Central RSVP Form */}
        <RSVPSection />

        {/* 4. Spiritual Blessing & Godparents */}
        <SpiritualSection />
        <GodparentsSection />

        {/* 5. Photos, Attire Guide, FAQs, and Gifts */}
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
