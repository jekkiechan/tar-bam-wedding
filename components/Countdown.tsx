'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date('2025-12-20T17:00:00+07:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="my-10 text-center"
    >
      <p className="font-playfair text-lg font-normal text-mid-brown mb-5 tracking-wide">
        Celebrating in
      </p>
      <div className="flex justify-center gap-7 flex-wrap">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            className="text-center"
          >
            <span className="block font-playfair text-[42px] font-medium text-deep-brown leading-none">
              {String(unit.value).padStart(2, '0')}
            </span>
            <div className="text-xs uppercase tracking-[1.5px] text-mid-brown mt-1.5">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}