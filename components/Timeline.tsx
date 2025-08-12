'use client'

import { motion } from 'framer-motion'

// SVG Icons as components
const CameraIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const DoorIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 3v18M10 3h7a1 1 0 011 1v16a1 1 0 01-1 1h-7M10 3H7a1 1 0 00-1 1v16a1 1 0 001 1h3m4-9h.01" />
  </svg>
)

const GlassIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12.5l3-9.5h8l3 9.5M5 12.5a7 7 0 1014 0M5 12.5h14" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v5m-3 0h6" />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const events = [
  {
    time: '17:00',
    title: 'Welcome & Photos',
    icon: CameraIcon,
  },
  {
    time: '18:00',
    title: 'Grand Entrance',
    icon: DoorIcon,
  },
  {
    time: '18:30',
    title: 'Celebration & Dinner',
    icon: GlassIcon,
  },
  {
    time: '21:30',
    title: 'Love & Thanks',
    icon: HeartIcon,
  },
]

export default function Timeline() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="my-14"
    >
      <h2 className="font-playfair text-[26px] font-medium text-center text-deep-brown mb-10 tracking-wide">
        Order of Events
      </h2>
      
      {/* Vertical list for both desktop and mobile */}
      <div className="max-w-md mx-auto space-y-6">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex items-center gap-4 p-3 rounded-lg hover:bg-light-brown/5 transition-all duration-300"
          >
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 bg-light-brown/10 group-hover:bg-light-brown/20 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
            >
              <span className="text-mid-brown">
                <event.icon />
              </span>
            </motion.div>
            
            {/* Content */}
            <div className="flex-1">
              <p className="font-playfair text-lg text-deep-brown">{event.title}</p>
              <p className="text-sm text-mid-brown">{event.time}</p>
            </div>

            {/* Optional decorative element on hover */}
            <div className="opacity-0 group-hover:opacity-20 transition-opacity duration-300 text-mid-brown">
              ❦
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}