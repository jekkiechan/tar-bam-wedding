'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Hero from '@/components/Hero'
import Countdown from '@/components/Countdown'
import Timeline from '@/components/Timeline'
import PreWeddingGallery from '@/components/PreWeddingGallery'
import Venue from '@/components/Venue'
import RSVP from '@/components/RSVP'
import ThemeSection from '@/components/Theme'

export default function Home() {
  return (
    <>
      {/* Background flowers */}
      <div 
        className="fixed inset-0 opacity-35 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/images/flowers.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'top left',
        }}
      />
      
      
      {/* Paper texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(138, 106, 82, 0.02) 35px, rgba(138, 106, 82, 0.02) 70px),
            repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(138, 106, 82, 0.01) 35px, rgba(138, 106, 82, 0.01) 70px)
          `
        }}
      />
      
      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 py-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl px-5 py-7 md:px-7 md:py-10 shadow-lg"
          style={{
            boxShadow: '0 1px 3px rgba(107, 78, 59, 0.05), 0 4px 12px rgba(107, 78, 59, 0.08)',
            border: '1px solid rgba(138, 106, 82, 0.08)',
          }}
        >
          <Hero />
          <Countdown />
          <Timeline />
          
          {/* Couple Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-center my-10"
          >
            <Image
              src="/images/couple_illustration_transparent_clean.png"
              alt="Illustration of Tar and Bam"
              width={180}
              height={200}
              className="mx-auto w-44 max-w-[80%] drop-shadow-lg"
            />
          </motion.div>

          <ThemeSection />

          <PreWeddingGallery />
          <Venue />
          <RSVP />
          
          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-center mt-14 pt-5 border-t border-light-brown"
          >
            <p className="font-playfair text-lg text-mid-brown italic font-normal">
              We look forward to celebrating with you
            </p>
          </motion.footer>
        </motion.div>
      </div>
    </>
  )
}