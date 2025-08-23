'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { preweddingPhotos, type Photo } from '@/lib/photos'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function PreWeddingGallery() {
  const photos = preweddingPhotos
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => 
        prev === 0 ? photos.length - 1 : (prev ?? 0) - 1
      )
    }
  }

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => 
        prev === photos.length - 1 ? 0 : (prev ?? 0) + 1
      )
    }
  }

  if (photos.length === 0) {
    return null
  }

  return (
    <>
      <section className="my-16">
        <h2 className="font-playfair text-[28px] font-medium text-center text-deep-brown mb-12 tracking-wide">
          Our Story in Photos
        </h2>

        {/* Polaroid-Style Photo Gallery */}
        <div className="relative max-w-md mx-auto">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            loop={photos.length > 1}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
            pagination={{ 
              clickable: true,
            }}
            className="rounded-lg overflow-hidden"
          >
            {photos.map((photo, index) => (
              <SwiperSlide key={photo.filename}>
                <div 
                  className="relative cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="bg-white p-3 md:p-4 rounded-lg shadow-md" style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)'
                  }}>
                    <div className="relative h-[380px] md:h-[450px] bg-gradient-to-b from-gray-50 to-gray-100">
                      <Image
                        src={`/images/prewedding/${photo.filename}`}
                        alt={`Pre-wedding photo ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority={index === 0}
                      />
                    </div>
                    <div className="mt-3 h-8" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Subtle Navigation Buttons */}
          <button className="swiper-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 backdrop-blur-sm rounded-full p-2 hover:bg-white/80 transition-all duration-300">
            <svg className="w-5 h-5 text-mid-brown/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="swiper-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 backdrop-blur-sm rounded-full p-2 hover:bg-white/80 transition-all duration-300">
            <svg className="w-5 h-5 text-mid-brown/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/images/prewedding/${photos[selectedImage].filename}`}
                alt={`Pre-wedding photo ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              {/* Navigation buttons */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white transition-colors"
              >
                <svg className="w-6 h-6 text-deep-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white transition-colors"
              >
                <svg className="w-6 h-6 text-deep-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
              >
                <svg className="w-6 h-6 text-deep-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Photo counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 rounded-full px-4 py-2 shadow-lg">
                <span className="font-lato text-sm text-deep-brown">
                  {selectedImage + 1} / {photos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal Swiper styles */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 20px !important;
        }
        .swiper-pagination-bullet {
          background: #7A5A42 !important;
          opacity: 0.2 !important;
          width: 8px;
          height: 8px;
          margin: 0 5px !important;
          transition: opacity 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 0.6 !important;
        }
        .swiper-button-disabled {
          opacity: 0.2 !important;
        }
      `}</style>
    </>
  )
}