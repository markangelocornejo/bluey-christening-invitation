import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy, Gift } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { FluffyCloud } from './BlueyDecorations'

export function GiftSection() {
  const { gift } = invitationData
  const [copied, setCopied] = useState(false)

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(gift.accountNumber)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="relative overflow-hidden px-5 py-24 text-center sm:px-7 sm:py-28" id="gifts">
      <FluffyCloud className="absolute -left-16 top-6 h-36 w-60 opacity-30" />
      <FluffyCloud className="absolute -right-16 bottom-6 h-36 w-60 opacity-30" />

      <motion.div
        className="relative mx-auto max-w-xl lg:max-w-2xl"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Eyebrow */}
        <p className="font-sub text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#5B93E6]">
          {gift.eyebrow}
        </p>

        {/* Heading */}
        <h2 className="mt-3 font-display text-[2.5rem] sm:text-[3.2rem] font-bold text-[#1E3557]">
          {gift.title} 🎁
        </h2>

        <div className="my-5 bluey-divider">
          <span>🐾</span>
        </div>

        {/* Note */}
        <p className="mx-auto max-w-lg font-body text-[1.05rem] leading-relaxed text-[#4A6282] sm:text-[1.12rem]">
          {gift.note}
        </p>

        {/* Gift Box Card */}
        <div className="mx-auto mt-8 max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-md border-2 border-[#E3EDFC]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF4E8] text-[#E8741E]">
            <Gift size={28} />
          </div>

          <span className="mt-4 inline-block font-sub text-[0.72rem] font-bold uppercase tracking-wider text-[#708CAE]">
            {gift.type}
          </span>

          <strong className="mt-2 block font-display text-[1.35rem] sm:text-[1.5rem] font-bold text-[#1E3557]">
            {gift.bankName}
          </strong>

          <div className="mt-3 rounded-2xl bg-[#F6FAFF] p-3 border border-[#82B5FB]/30">
            <p className="font-display text-lg font-bold text-[#3772FF]">
              {gift.accountNumber}
            </p>
            <p className="mt-0.5 font-body text-xs text-[#708CAE]">
              Account Name: {gift.accountName}
            </p>
          </div>

          <button
            className="bluey-button mt-5 w-full text-sm"
            type="button"
            onClick={copyNumber}
            aria-live="polite"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Details Copied to Clipboard!' : 'Copy Account Details'}</span>
          </button>
        </div>
      </motion.div>
    </section>
  )
}
