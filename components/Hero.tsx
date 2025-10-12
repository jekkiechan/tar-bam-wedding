'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <Image
        src="/images/full_page_combined.svg"
        alt=""
        width={320}
        height={200}
        className="mx-auto mb-3 w-80 max-w-[90%]"
        priority
      />
      <p className="font-playfair text-lg uppercase tracking-[0.35em] text-mid-brown mb-4">
        #andbam!itstar
      </p>
      <div className="w-20 h-px bg-gradient-to-r from-transparent via-mid-brown to-transparent mx-auto mb-5" />
    </motion.header>
  )
}