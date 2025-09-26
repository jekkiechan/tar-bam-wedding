'use client'

import { motion } from 'framer-motion'

const themeColors = [
  { name: 'Powder Blue', hex: '#BBD4E5' },
  { name: 'Blush Pink', hex: '#F4D6DA' },
  { name: 'Champagne', hex: '#F7E7CE' },
  { name: 'Sage', hex: '#C9D9C3' },
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
      <h2 className="font-playfair text-3xl text-deep-brown">Theme</h2>
      <p className="mt-3 text-base text-mid-brown leading-relaxed">
        Our theme is soft pastels but this is not mandatory! Feel free to match the theme with your
        accessories if you like.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
        {themeColors.map((color) => (
          <div
            key={color.hex}
            className="h-14 w-14 rounded-full border border-light-brown shadow-sm"
            style={{ backgroundColor: color.hex, boxShadow: '0 8px 20px rgba(107, 78, 59, 0.12)' }}
            aria-label={`${color.name} (${color.hex})`}
          />
        ))}
      </div>
    </motion.section>
  )
}
