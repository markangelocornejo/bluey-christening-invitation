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
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF4FD] px-3.5 py-1 border border-[#D0E2FB] shadow-xs">
            <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
            <span className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#1E40AF]">
              {gift.eyebrow}
            </span>
            <SparkleStar className="h-3 w-3 text-[#E5B53A]" />
          </div>
        </div>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.8rem] font-bold text-[#0F172A]">
          {gift.title}
        </h2>

        <div className="my-4 flex items-center justify-center gap-3">
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
          <PawPrint className="h-3.5 w-3.5" color="#EA580C" />
          <div className="h-[1px] w-10 bg-[#D4E3FA]" />
        </div>

        <p className="mx-auto max-w-md font-body text-sm font-medium text-[#334155] leading-relaxed">
          {gift.note}
        </p>

        {/* Gift Box Card */}
        <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white p-6 border border-[#CBD5E1] shadow-xs">
          <span className="font-sub text-xs font-extrabold uppercase tracking-wider text-[#475569]">
            {gift.type} &bull; {gift.bankName}
          </span>

          <div className="mt-2 rounded-xl bg-[#F8FAFC] p-3.5 border border-[#E2E8F0]">
            <p className="font-display text-lg font-bold text-[#1E40AF]">
              {gift.accountNumber}
            </p>
            <p className="font-body text-xs font-semibold text-[#334155] mt-0.5">
              {gift.accountName}
            </p>
          </div>

          <button
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#CBD5E1] bg-white px-5 py-2.5 font-sub text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC] hover:border-[#1E40AF]/40 transition-colors shadow-xs cursor-pointer"
            type="button"
            onClick={copyNumber}
          >
            {copied ? <Check size={14} className="text-[#16A34A]" /> : <Copy size={14} className="text-[#64748B]" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Account Details'}</span>
          </button>
        </div>
      </motion.div>
    </section>
  )
}
