import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, X } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { FluffyCloud } from './BlueyDecorations'

export function GallerySection() {
  const { gallery, baby } = invitationData
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  return (
    <section className="relative overflow-hidden px-5 py-24 text-center sm:px-7 sm:py-28" id="gallery">
      <FluffyCloud className="absolute -left-16 top-6 h-36 w-60 opacity-30" />
      <FluffyCloud className="absolute -right-16 bottom-6 h-36 w-60 opacity-30" />

      <motion.div
        className="relative mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85 }}
      >
        <p className="font-sub text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#5B93E6]">
          Precious Moments
        </p>
        <h2 className="mt-3 font-display text-[2.5rem] sm:text-[3.2rem] font-bold text-[#1E3557]">
          Little {baby.nickname}&apos;s Memory Album 📸
        </h2>

        <div className="my-5 bluey-divider">
          <span>🐾</span>
        </div>

        {/* Gallery Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((item, index) => (
            <motion.div
              key={item.tag}
              className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white p-4 shadow-md border-2 border-[#E3EDFC] hover:border-[#82B5FB] transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
              onClick={() => setSelectedPhoto(index)}
            >
              {/* Photo Frame / Image Box */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#EBF3FE] via-[#FFF4E8] to-[#FED766]/30 border-2 border-[#82B5FB]/30">
                <img
                  src={item.src}
                  alt={item.tag}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-0.5 font-display text-xs font-bold text-[#2D4F7C] shadow-xs backdrop-blur-xs">
                  {item.tag}
                </span>

                <Sparkles className="absolute top-2 right-2 h-4 w-4 text-[#FED766] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Caption */}
              <div className="mt-3 text-center">
                <p className="font-hand text-[1.1rem] font-bold text-[#E8741E] leading-snug">
                  &ldquo;{item.caption}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-w-md rounded-3xl bg-white p-6 shadow-2xl border-4 border-[#82B5FB] text-center"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#2D4F7C] shadow-md hover:bg-[#82B5FB] hover:text-white transition-colors cursor-pointer"
                type="button"
                onClick={() => setSelectedPhoto(null)}
              >
                <X size={18} />
              </button>

              <div className="mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl border-2 border-[#82B5FB] shadow-md">
                <img
                  src={gallery[selectedPhoto].src}
                  alt={gallery[selectedPhoto].tag}
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="mt-4 font-hand text-2xl font-bold text-[#E8741E]">
                &ldquo;{gallery[selectedPhoto].caption}&rdquo;
              </p>

              <div className="mt-3 flex items-center justify-center gap-1 text-sm font-sub font-bold text-[#82B5FB]">
                <Heart className="h-4 w-4 fill-[#82B5FB]" />
                <span>Liam&apos;s Christening Album</span>
                <Heart className="h-4 w-4 fill-[#82B5FB]" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
