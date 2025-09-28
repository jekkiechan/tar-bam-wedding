'use client'

import { motion } from 'framer-motion'

const themeColors = [
  { name: 'Powder Blue', hex: '#BFD8E9' },
  { name: 'Blush Pink', hex: '#F6DADF' },
  { name: 'Champagne', hex: '#F6E4C7' },
  { name: 'Sage', hex: '#C6D6C1' },
]

export default function ThemeSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-12 text-center"
    >
      <h2 className="font-playfair text-2xl text-deep-brown md:text-3xl">Theme</h2>
      <p className="mt-3 mx-auto max-w-xs text-base leading-7 text-mid-brown">
        Our theme is soft pastels but this is not mandatory! Feel free to match the theme with your
        accessories if you like.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
        {themeColors.map((color) => (
          <div
            key={color.hex}
            className="h-14 w-14 rounded-full border border-light-brown shadow-[0_2px_6px_rgba(107,78,59,0.08)]"
            style={{ backgroundColor: color.hex }}
            aria-label={`${color.name} (${color.hex})`}
          />
        ))}
      </div>
    </motion.section>
  )
}
