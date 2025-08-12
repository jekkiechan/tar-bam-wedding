'use client'

import { motion } from 'framer-motion'

const events = [
  {
    time: '17:00',
    title: 'Welcome & Photos',
  },
  {
    time: '18:00',
    title: 'Grand Entrance',
  },
  {
    time: '18:30',
    title: 'Celebration & Dinner',
  },
  {
    time: '21:30',
    title: 'Thank You & Farewell',
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
      
      {/* Desktop: Horizontal timeline */}
      <div className="hidden md:block relative max-w-5xl mx-auto px-12 py-8">
        {/* Horizontal line */}
        <div className="absolute left-12 right-12 top-1/2 h-[2px] bg-mid-brown/30 transform -translate-y-1/2" />
        
        {/* Events container with custom grid */}
        <div className="relative grid grid-cols-4 gap-4">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center"
            >
              {/* Content alternates above and below */}
              {index % 2 === 0 ? (
                <>
                  {/* Content above for even indices */}
                  <div className="text-center mb-6">
                    <p className="font-playfair text-xl text-deep-brown">{event.time}</p>
                    <p className="text-sm text-mid-brown mt-1">{event.title}</p>
                  </div>
                  {/* Dot */}
                  <div className="w-4 h-4 bg-mid-brown rounded-full border-2 border-white z-10 absolute top-1/2 transform -translate-y-1/2" />
                  {/* Spacer below */}
                  <div className="mt-6 h-12" />
                </>
              ) : (
                <>
                  {/* Spacer above */}
                  <div className="mb-6 h-12" />
                  {/* Dot */}
                  <div className="w-4 h-4 bg-mid-brown rounded-full border-2 border-white z-10 absolute top-1/2 transform -translate-y-1/2" />
                  {/* Content below for odd indices */}
                  <div className="text-center mt-6">
                    <p className="font-playfair text-xl text-deep-brown">{event.time}</p>
                    <p className="text-sm text-mid-brown mt-1">{event.title}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: Simple vertical list (unchanged) */}
      <div className="md:hidden relative max-w-sm mx-auto">
        {/* Vertical line on the left */}
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-mid-brown/30" />
        
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex items-start mb-8 pl-10"
          >
            {/* Dot */}
            <div className="absolute left-3 top-2 w-3 h-3 bg-mid-brown rounded-full border-2 border-white" />
            
            {/* Content */}
            <div>
              <p className="font-playfair text-xl text-deep-brown">{event.time}</p>
              <p className="text-sm text-mid-brown mt-1">{event.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}