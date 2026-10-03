import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { FluffyCloud, PawPrint } from './BlueyDecorations'

export function FAQSection() {
  const { faq } = invitationData
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative overflow-hidden px-5 py-20 text-center sm:px-7 sm:py-24" id="faq">
      <FluffyCloud className="absolute -left-16 top-6 h-36 w-60 opacity-30" />
      <FluffyCloud className="absolute -right-16 bottom-6 h-36 w-60 opacity-30" />

      <motion.div
        className="relative mx-auto max-w-xl lg:max-w-2xl"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85 }}
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF3FE] px-3.5 py-1 border border-[#82B5FB]/40">
          <HelpCircle className="h-3.5 w-3.5 text-[#3772FF]" />
          <p className="font-sub text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#2D4F7C]">
            {faq.eyebrow}
          </p>
          <PawPrint className="h-3.5 w-3.5" color="#F69145" />
        </div>

        <h2 className="mt-3 font-display text-[2.4rem] sm:text-[3rem] font-bold text-[#1E3557]">
          {faq.title} 💡
        </h2>

        <div className="my-4 bluey-divider">
          <span>🐾</span>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-8 space-y-3.5 text-left">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl bg-white border-2 border-[#E3EDFC] shadow-xs transition-all"
              >
                <button
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-display text-[1.05rem] font-bold text-[#1E3557] hover:bg-[#F6FAFF] transition-colors cursor-pointer"
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{item.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-[#82B5FB]"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="border-t border-[#F0F6FF] px-4 pb-4 pt-3 sm:px-5 sm:pb-5 font-body text-[0.95rem] leading-relaxed text-[#4A6282] bg-[#FAFDFE]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
