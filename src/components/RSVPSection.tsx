import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
import confetti from 'canvas-confetti'
import { invitationData } from '../data/invitationData'
import { sound } from '../lib/sound'
import {
  BlueyCharacterSilhouette,
  KeepyUppyBalloon,
  PawPrint,
  SparkleStar,
} from './BlueyDecorations'

export function RSVPSection() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { rsvp, baby } = invitationData

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('name') || '').trim(),
      attendance: String(formData.get('attendance') || ''),
      adults: String(formData.get('adults') || '1'),
      kids: String(formData.get('kids') || '0'),
      highChair: String(formData.get('highChair') || 'no'),
      message: String(formData.get('message') || '').trim(),
      submittedAt: new Date().toISOString(),
    }

    try {
      if (rsvp.submissionEndpoint) {
        await fetch(rsvp.submissionEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
          mode: 'no-cors',
        })
      }

      sound.playChime()
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#4D88E6', '#F58A3C', '#FBE8A6', '#FF4D6D'],
        })
      } catch {
        // safe ignore
      }

      form.reset()
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative px-4 py-16 text-center sm:px-6 sm:py-20" id="rsvp">
      {/* Floating Side Balloons */}
      <motion.div
        className="pointer-events-none absolute left-4 top-1/4 z-10 hidden lg:block w-16"
        animate={{
          y: [-10, 10, -10],
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <KeepyUppyBalloon color="#4D88E6" shineColor="#96BEFB" className="w-full drop-shadow-md" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-4 top-1/3 z-10 hidden lg:block w-16"
        animate={{
          y: [10, -10, 10],
          rotate: [4, -4, 4],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        <KeepyUppyBalloon color="#F58A3C" shineColor="#FFC89E" className="w-full drop-shadow-md" />
      </motion.div>

      <motion.div
        className="relative mx-auto max-w-lg rounded-[2.4rem] border border-[#DCE8FA] bg-white p-6 pt-10 sm:p-10 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        {/* Bluey & Bingo Silhouette Peeker */}
        <div className="mx-auto -mt-16 mb-2 flex justify-center">
          <div className="h-16 w-32 drop-shadow-sm">
            <BlueyCharacterSilhouette className="w-full h-full" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF4FD] px-3.5 py-1 border border-[#D0E2FB] shadow-xs">
            <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
            <span className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#1E40AF]">
              {rsvp.eyebrow}
            </span>
            <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
          </div>
        </div>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.6rem] font-bold text-[#0F172A]">
          {rsvp.title}
        </h2>

        <p className="mx-auto mt-2 font-body text-sm font-medium text-[#334155] max-w-md">
          {rsvp.subtitle}
        </p>

        <div className="my-5 flex items-center justify-center gap-3">
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
          <PawPrint className="h-3.5 w-3.5" color="#EA580C" />
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
        </div>

        {rsvp.isClosed ? (
          <div className="mt-6 rounded-2xl bg-[#F8FAFC] p-6 text-center border border-[#E2E8F0]">
            <h3 className="font-display text-lg font-bold text-[#0F172A]">
              {rsvp.closedTitle}
            </h3>
            <p className="mt-1 font-body text-xs font-medium text-[#334155]">
              {rsvp.closedNote}
            </p>
          </div>
        ) : submitted ? (
          <div className="mt-6 rounded-2xl bg-[#F0FDF4] p-6 text-center border border-[#BBF7D0]">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#16A34A] text-white shadow-xs">
              <CheckCircle2 size={24} />
            </div>

            <h3 className="mt-3 font-display text-xl font-bold text-[#0F172A]">
              RSVP Received
            </h3>

            <p className="mt-1 font-body text-sm font-medium text-[#334155]">
              {rsvp.responseNote}
            </p>

            <button
              className="mt-5 text-xs font-sub font-bold text-[#1E40AF] hover:underline cursor-pointer"
              type="button"
              onClick={() => setSubmitted(false)}
            >
              Submit another response
            </button>
          </div>
        ) : (
          <form className="mt-6 space-y-4 text-left" onSubmit={submit}>
            <div>
              <label className="block font-sub text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                Your Full Name *
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 font-body text-sm font-semibold text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:bg-white"
                required
                name="name"
                autoComplete="name"
                placeholder="Full Name"
              />
            </div>

            <div>
              <label className="block font-sub text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                Will you attend? *
              </label>
              <select
                className="mt-1 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 font-body text-sm font-semibold text-[#0F172A] outline-none transition-all focus:border-[#2563EB] focus:bg-white cursor-pointer"
                required
                name="attendance"
                defaultValue="attending"
              >
                <option value="attending">Joyfully Attending</option>
                <option value="not-attending">Regretfully Unable to Attend</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-sub text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                  Adults
                </label>
                <input
                  className="mt-1 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 font-body text-sm font-semibold text-[#0F172A] outline-none transition-all focus:border-[#2563EB] focus:bg-white"
                  type="number"
                  min="1"
                  max="8"
                  name="adults"
                  defaultValue="1"
                  required
                />
              </div>
              <div>
                <label className="block font-sub text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                  Children
                </label>
                <input
                  className="mt-1 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 font-body text-sm font-semibold text-[#0F172A] outline-none transition-all focus:border-[#2563EB] focus:bg-white"
                  type="number"
                  min="0"
                  max="8"
                  name="kids"
                  defaultValue="0"
                />
              </div>
            </div>

            <div>
              <label className="block font-sub text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                High Chair / Booster Needed?
              </label>
              <select
                className="mt-1 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 font-body text-sm font-semibold text-[#0F172A] outline-none transition-all focus:border-[#2563EB] focus:bg-white cursor-pointer"
                name="highChair"
                defaultValue="no"
              >
                <option value="no">No</option>
                <option value="yes-1">Yes (1 High Chair)</option>
                <option value="yes-2">Yes (2 High Chairs)</option>
              </select>
            </div>

            <div>
              <label className="block font-sub text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                Note or Blessing for Baby {baby.nickname}
              </label>
              <textarea
                className="mt-1 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 font-body text-sm font-medium text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:bg-white"
                name="message"
                rows={3}
                placeholder="Share your wishes or dietary notes"
              />
            </div>

            <div className="pt-2">
              <button
                className="bingo-button w-full py-3.5 text-sm cursor-pointer shadow-md"
                disabled={isSubmitting}
                type="submit"
              >
                <Send size={15} />
                <span>{isSubmitting ? 'Sending...' : 'Submit RSVP'}</span>
              </button>
            </div>

            {errorMessage && (
              <p className="text-center font-body text-xs font-bold text-[#DC2626]">
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </motion.div>
    </section>
  )
}
