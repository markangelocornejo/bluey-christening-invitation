import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { invitationData } from '../data/invitationData'

export function GallerySection() {
  const { gallery } = invitationData
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  return (
    <section className="relative px-4 py-16 text-center sm:px-6 sm:py-20" id="gallery">
      <motion.div
        className="relative mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-sub text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#4D88E6]">
          Memory Album
        </p>

        <h2 className="mt-2 font-display text-[2.2rem] sm:text-[2.8rem] font-bold text-[#192739]">
          Little Moments of Joy
        </h2>

        <div className="my-4 clean-divider">
          <span />
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((item, index) => (
            <div
              key={item.tag}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white p-3 border border-[#DCE8FA] shadow-xs hover:border-[#4D88E6] transition-all text-left"
              onClick={() => setSelectedPhoto(index)}
            >
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-[#F7FAFE]">
                <img
                  src={item.src}
                  alt={item.tag}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mt-3 px-1">
                <span className="font-display text-xs font-bold text-[#192739]">
                  {item.tag}
                </span>
                <p className="font-body text-xs text-[#64748B] mt-0.5 line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-sm w-full rounded-2xl bg-white p-5 shadow-xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#192739] shadow-sm hover:bg-[#F0F4FA] transition-colors cursor-pointer"
                type="button"
                onClick={() => setSelectedPhoto(null)}
              >
                <X size={16} />
              </button>

              <div className="aspect-square w-full overflow-hidden rounded-xl">
                <img
                  src={gallery[selectedPhoto].src}
                  alt={gallery[selectedPhoto].tag}
                  className="h-full w-full object-cover"
                />
              </div>

              <h4 className="mt-3 font-display text-base font-bold text-[#192739]">
                {gallery[selectedPhoto].tag}
              </h4>
              <p className="font-body text-xs text-[#64748B] mt-0.5">
                {gallery[selectedPhoto].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
