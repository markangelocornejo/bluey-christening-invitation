import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { invitationData } from '../data/invitationData'

export function FAQSection() {
  const { faq } = invitationData
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative px-4 py-16 text-center sm:px-6 sm:py-20" id="faq">
      <motion.div
        className="relative mx-auto max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#4D88E6]">
          {faq.eyebrow}
        </p>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.8rem] font-bold text-[#192739]">
          {faq.title}
        </h2>

        <div className="my-4 clean-divider">
          <span />
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-8 space-y-3 text-left">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl bg-white border border-[#DCE8FA] shadow-xs"
              >
                <button
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-display text-base font-bold text-[#192739] hover:bg-[#F7FAFE] transition-colors cursor-pointer"
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{item.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-[#8297B3]"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="border-t border-[#F0F4FA] px-4 pb-4 pt-3 sm:px-5 sm:pb-5 font-body text-sm leading-relaxed text-[#64748B] bg-[#FAFBFD]">
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
