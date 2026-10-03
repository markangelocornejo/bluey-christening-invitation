import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { PawPrint, SparkleStar } from './BlueyDecorations'

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
    <section className="relative px-4 py-16 text-center sm:px-6 sm:py-20" id="gifts">
      <motion.div
        className="relative mx-auto max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center justify-center gap-1.5">
          <SparkleStar className="h-3 w-3 text-[#FED766]" />
          <p className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#4D88E6]">
            {gift.eyebrow}
          </p>
          <SparkleStar className="h-3 w-3 text-[#FED766]" />
        </div>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.8rem] font-bold text-[#192739]">
          {gift.title}
        </h2>

        <div className="my-4 flex items-center justify-center gap-3">
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
          <PawPrint className="h-3.5 w-3.5" color="#F58A3C" />
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
        </div>

        <p className="mx-auto max-w-md font-body text-sm text-[#64748B] leading-relaxed">
          {gift.note}
        </p>

        {/* Gift Box Card */}
        <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white p-6 border border-[#DCE8FA] shadow-xs">
          <span className="font-sub text-xs font-bold uppercase tracking-wider text-[#8297B3]">
            {gift.type} &bull; {gift.bankName}
          </span>

          <div className="mt-2 rounded-xl bg-[#F7FAFE] p-3 border border-[#E8F0FC]">
            <p className="font-display text-base font-bold text-[#4D88E6]">
              {gift.accountNumber}
            </p>
            <p className="font-body text-xs text-[#64748B] mt-0.5">
              {gift.accountName}
            </p>
          </div>

          <button
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#DCE8FA] bg-white px-4 py-2 font-sub text-xs font-bold text-[#192739] hover:bg-[#F7FAFE] transition-colors cursor-pointer"
            type="button"
            onClick={copyNumber}
          >
            {copied ? <Check size={14} className="text-[#48B87B]" /> : <Copy size={14} className="text-[#8297B3]" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Account Details'}</span>
          </button>
        </div>
      </motion.div>
    </section>
  )
}
