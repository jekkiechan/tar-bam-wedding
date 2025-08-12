'use client'

import { motion } from 'framer-motion'

export default function Venue() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.4 }}
      className="my-10 text-center"
    >
      <h2 className="font-playfair text-[26px] font-medium text-deep-brown mb-7 tracking-wide">
        Venue
      </h2>
      
      <div className="mb-5">
        <p className="font-playfair text-2xl font-medium text-deep-brown mb-1.5">
          Mandarin Oriental, Bangkok
        </p>
        <p className="text-base text-mid-brown font-normal">The Authors' Lounge</p>
        <p className="text-base text-mid-brown font-normal">48 Oriental Avenue, Bangkok 10500</p>
        
        <a
          href="https://maps.google.com/?q=13.7236158,100.5143168"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-suit-brown hover:text-deep-brown transition-colors text-base mt-3"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          View in Google Maps
        </a>
      </div>
      
      <div className="rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps?q=13.7236158,100.5143168&hl=en&z=15&output=embed"
          className="w-full h-80 border-0"
          loading="lazy"
        />
      </div>
    </motion.section>
  )
}