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

// Tiny transparent placeholder to avoid layout jank on slow networks
const BLUR_DATA_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

export default function PreWeddingGallery() {
  const photos = preweddingPhotos
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [imageRatios, setImageRatios] = useState<Record<number, number>>({})

  const getAspectRatio = (index: number, photo: Photo) => {
    const loadedRatio = imageRatios[index]
    if (loadedRatio) {
      return loadedRatio
    }

    if (photo.aspectRatio) {
      const [width, height] = photo.aspectRatio
        .split('/')
        .map((value) => Number.parseFloat(value))
      if (width > 0 && height > 0) {
        return width / height
      }
    }

    return 1
  }

  const getFrameHeight = (ratio: number) => {
    if (ratio >= 1.25) {
      return 'clamp(220px, 38vw, 320px)'
    }

    if (ratio >= 0.95) {
      return 'clamp(240px, 44vw, 360px)'
    }

    return 'clamp(280px, 52vw, 420px)'
  }

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
        <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
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
              dynamicBullets: true,
              dynamicMainBullets: 3,
            }}
            className="rounded-lg overflow-hidden"
          >
            {photos.map((photo, index) => {
              const aspectRatio = getAspectRatio(index, photo)

              return (
                <SwiperSlide key={photo.filename} className="pb-10">
                  <div
                    className="relative cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                    onClick={() => setSelectedImage(index)}
                  >
                    <div
                      className="bg-white p-2 sm:p-3 rounded-xl shadow-md"
                      style={{
                        boxShadow:
                          '0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
                      }}
                    >
                      <div
                        className="relative w-full bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden rounded-lg"
                        style={{ height: getFrameHeight(aspectRatio) }}
                      >
                        <Image
                          src={`/images/prewedding/${photo.filename}`}
                          alt={`Pre-wedding photo ${index + 1}`}
                          fill
                          className="object-contain"
                          sizes="(min-width: 1024px) 380px, (min-width: 640px) 320px, 90vw"
                          priority={index < 2}
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          loading="lazy"
                          decoding="async"
                          onLoad={(event) => {
                            const imgElement = event.currentTarget as HTMLImageElement
                            if (imgElement.naturalHeight === 0) {
                              return
                            }
                            const ratio =
                              imgElement.naturalWidth / imgElement.naturalHeight
                            setImageRatios((prev) => {
                              const existing = prev[index]
                              if (existing && Math.abs(existing - ratio) < 0.01) {
                                return prev
                              }
                              return { ...prev, [index]: ratio }
                            })
                          }}
                        />
                      </div>
                      <div className="mt-2 h-6" />
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
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