'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function RSVP() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guests: '1',
    dietary: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Google Apps Script Web App URL
    // You'll need to replace this with your own Web App URL after setting up the Google Sheet
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwQIsnIMSCiGEmAGyr87AktvEG7ZAffb1N50Bq9OPFH8QX3cOXcQ7q9pDnRjgV3htOXTg/exec'
    
    try {
      // If URL is not set, just log to console (for testing)
      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        console.log('RSVP Form Data:', formData)
        console.warn('⚠️ Google Sheets not configured. See RSVP_SETUP.md for instructions.')
      } else {
        // Send to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Important for Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
          }),
        })
      }
      
      // Show success state
      setSubmitted(true)
      setShowForm(false)
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      
      // Reset after delay
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          email: '',
          attending: 'yes',
          guests: '1',
          dietary: '',
          message: '',
        })
      }, 5000)
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      alert('There was an error submitting your RSVP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.6 }}
      className="my-14 text-center"
    >
      {!showForm && !submitted && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="inline-block px-10 py-4 bg-mid-brown hover:bg-suit-brown text-white text-sm font-normal tracking-[1.2px] uppercase rounded-full transition-all shadow-lg"
        >
          RSVP Now
        </motion.button>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-light-brown rounded-lg focus:outline-none focus:border-mid-brown"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-light-brown rounded-lg focus:outline-none focus:border-mid-brown"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Will you be attending? *</label>
                <select
                  value={formData.attending}
                  onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                  className="w-full px-3 py-2 border border-light-brown rounded-lg focus:outline-none focus:border-mid-brown"
                  disabled={isSubmitting}
                >
                  <option value="yes">Yes, I'll be there!</option>
                  <option value="no">Sorry, can't make it</option>
                </select>
              </div>

              {formData.attending === 'yes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Number of Guests *</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-3 py-2 border border-light-brown rounded-lg focus:outline-none focus:border-mid-brown"
                      disabled={isSubmitting}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Dietary Restrictions</label>
                    <input
                      type="text"
                      value={formData.dietary}
                      onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                      placeholder="Vegetarian, Allergies, etc."
                      className="w-full px-3 py-2 border border-light-brown rounded-lg focus:outline-none focus:border-mid-brown"
                      disabled={isSubmitting}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Message for the Couple</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-light-brown rounded-lg focus:outline-none focus:border-mid-brown"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-mid-brown text-mid-brown rounded-full hover:bg-light-brown transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-mid-brown text-white rounded-full hover:bg-suit-brown transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {submitted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-center p-8"
          >
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="font-playfair text-2xl mb-2">Thank You!</h3>
            <p className="text-mid-brown">Your RSVP has been received. We can't wait to celebrate with you!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}