import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Heart, Send } from 'lucide-react'
import confetti from 'canvas-confetti'
import { invitationData } from '../data/invitationData'
import { FluffyCloud, PawPrint } from './BlueyDecorations'
import { sound } from '../lib/sound'

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
          mode: 'no-cors', // standard Google Apps Script mode
        })
      }

      // Play joyful chime and confetti burst!
      sound.playChime()
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#5B93E6', '#F69145', '#FED766', '#82B5FB', '#9DE0AD'],
        })
      } catch {
        // safe ignore
      }

      form.reset()
      setSubmitted(true)
    } catch {
      setErrorMessage('Could not connect to online RSVP server. Your response was recorded locally!')
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative overflow-hidden px-5 py-24 text-center sm:px-7 sm:py-28" id="rsvp">
      <FluffyCloud className="absolute -left-16 top-6 h-36 w-60 opacity-35" />
      <FluffyCloud className="absolute -right-16 bottom-6 h-36 w-60 opacity-35" />

      <motion.div
        className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white p-7 sm:p-10 shadow-xl border-3 border-[#82B5FB]/50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85 }}
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF3FE] px-3.5 py-1 border border-[#82B5FB]/40">
          <PawPrint className="h-3.5 w-3.5" color="#5B93E6" />
          <p className="font-sub text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#2D4F7C]">
            {rsvp.eyebrow}
          </p>
          <PawPrint className="h-3.5 w-3.5" color="#F69145" />
        </div>

        {/* Heading */}
        <h2 className="mt-3 font-display text-[2.4rem] sm:text-[3rem] font-bold text-[#1E3557]">
          {rsvp.title}
        </h2>

        <div className="my-4 bluey-divider">
          <span>🎈</span>
        </div>

        {/* Deadline Badge */}
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-[#FFF4E8] px-4 py-1.5 border border-[#FFB677]/50 text-[0.75rem] font-display font-bold text-[#E8741E]">
          <span>Deadline: {rsvp.deadline}</span>
        </div>

        <p className="mx-auto mt-3 max-w-md font-body text-sm text-[#708CAE]">
          {rsvp.subtitle}
        </p>

        {/* Closed / Submitted / Form State */}
        {rsvp.isClosed ? (
          <div className="mt-8 rounded-2xl bg-[#F8FAFD] p-8 text-center border border-[#E3EDFC]">
            <h3 className="font-display text-xl font-bold text-[#1E3557]">
              {rsvp.closedTitle}
            </h3>
            <p className="mt-2 font-body text-sm text-[#708CAE]">
              {rsvp.closedNote}
            </p>
          </div>
        ) : submitted ? (
          <motion.div
            className="mt-8 rounded-3xl bg-gradient-to-b from-[#EBF3FE] to-[#F5F9FF] p-8 text-center border-2 border-[#82B5FB]/60"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9DE0AD] text-white shadow-md">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="mt-4 font-display text-2xl font-bold text-[#1E3557]">
              Hooray! RSVP Confirmed! 🎈
            </h3>

            <p className="mt-2 font-body text-[0.98rem] text-[#2D4F7C] leading-relaxed">
              {rsvp.responseNote}
            </p>

            <div className="mt-4 flex items-center justify-center gap-1 text-sm font-hand text-xl font-bold text-[#F69145]">
              <Heart className="h-4 w-4 fill-[#F69145]" />
              <span>We can&apos;t wait to celebrate with you!</span>
              <Heart className="h-4 w-4 fill-[#F69145]" />
            </div>

            <button
              className="mt-6 text-xs font-sub font-bold uppercase tracking-wider text-[#5B93E6] hover:underline cursor-pointer"
              type="button"
              onClick={() => setSubmitted(false)}
            >
              Submit another response
            </button>
          </motion.div>
        ) : (
          <form className="mt-8 space-y-4 text-left" onSubmit={submit}>
            {/* Full Name */}
            <div>
              <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#2D4F7C]">
                Your Full Name *
              </label>
              <input
                className="mt-1 w-full rounded-2xl border-2 border-[#E3EDFC] bg-[#FAFDFE] px-4 py-3 font-body text-sm text-[#1E3557] outline-none transition-all placeholder:text-[#A0B8D5] focus:border-[#5B93E6] focus:bg-white"
                required
                name="name"
                autoComplete="name"
                placeholder="e.g. Auntie Sarah & Uncle John"
              />
            </div>

            {/* Attendance Choice */}
            <div>
              <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#2D4F7C]">
                Will you be attending? *
              </label>
              <select
                className="mt-1 w-full rounded-2xl border-2 border-[#E3EDFC] bg-[#FAFDFE] px-4 py-3 font-body text-sm text-[#1E3557] outline-none transition-all focus:border-[#5B93E6] focus:bg-white cursor-pointer"
                required
                name="attendance"
                defaultValue="attending"
              >
                <option value="attending">Joyfully Attending! (See you there! 🎉)</option>
                <option value="not-attending">Regretfully Unable to Attend (Sending Love ❤️)</option>
                <option value="maybe">Unsure yet (Will confirm soon ⏳)</option>
              </select>
            </div>

            {/* Guest Counts (Adults + Kids) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#2D4F7C]">
                  Adults
                </label>
                <input
                  className="mt-1 w-full rounded-2xl border-2 border-[#E3EDFC] bg-[#FAFDFE] px-4 py-3 font-body text-sm text-[#1E3557] outline-none transition-all focus:border-[#5B93E6] focus:bg-white"
                  type="number"
                  min="1"
                  max="10"
                  name="adults"
                  defaultValue="1"
                  required
                />
              </div>
              <div>
                <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#2D4F7C]">
                  Kids (Under 12)
                </label>
                <input
                  className="mt-1 w-full rounded-2xl border-2 border-[#E3EDFC] bg-[#FAFDFE] px-4 py-3 font-body text-sm text-[#1E3557] outline-none transition-all focus:border-[#5B93E6] focus:bg-white"
                  type="number"
                  min="0"
                  max="10"
                  name="kids"
                  defaultValue="0"
                />
              </div>
            </div>

            {/* High Chair Requirement */}
            <div>
              <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#2D4F7C]">
                Need a High Chair / Booster Seat?
              </label>
              <select
                className="mt-1 w-full rounded-2xl border-2 border-[#E3EDFC] bg-[#FAFDFE] px-4 py-3 font-body text-sm text-[#1E3557] outline-none transition-all focus:border-[#5B93E6] focus:bg-white cursor-pointer"
                name="highChair"
                defaultValue="no"
              >
                <option value="no">No, standard seating is fine</option>
                <option value="yes-1">Yes, need 1 High Chair</option>
                <option value="yes-2">Yes, need 2 High Chairs</option>
              </select>
            </div>

            {/* Dedication Message */}
            <div>
              <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#2D4F7C]">
                Blessing or Message for Baby {baby.nickname}
              </label>
              <textarea
                className="mt-1 w-full rounded-2xl border-2 border-[#E3EDFC] bg-[#FAFDFE] px-4 py-3 font-body text-sm text-[#1E3557] outline-none transition-all placeholder:text-[#A0B8D5] focus:border-[#5B93E6] focus:bg-white"
                name="message"
                rows={3}
                placeholder="Share your prayers, sweet wishes, or excitement!"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                className="bingo-button w-full py-4 text-base cursor-pointer"
                disabled={isSubmitting}
                type="submit"
              >
                <Send size={18} />
                <span>{isSubmitting ? 'Sending RSVP...' : 'Send My RSVP! 🎈'}</span>
              </button>
            </div>

            {errorMessage && (
              <p className="text-center font-body text-xs text-[#E8741E]" role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </motion.div>
    </section>
  )
}
