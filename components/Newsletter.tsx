'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubscribed(true)
        setEmail('')
        // Reset after 5 seconds
        setTimeout(() => setIsSubscribed(false), 5000)
      } else {
        console.error('Newsletter subscription failed:', data)
        setError(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 bg-primary-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-white font-heading">
              Stay Updated with New Recipes
            </h2>
            <p className="text-xl text-brand-white/90 max-w-2xl mx-auto">
              Get the latest recipes, cooking tips, and food stories delivered straight to your inbox. 
              Join our community of food lovers!
            </p>
          </div>

          {!isSubscribed ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 focus:outline-none text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              <p className="text-primary-100 text-sm mt-3">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
              {error && (
                <p className="text-red-200 text-sm mt-2 bg-red-500/20 px-3 py-2 rounded-lg">
                  {error}
                </p>
              )}
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center space-x-3 text-white"
            >
              <CheckCircle className="w-8 h-8 text-green-300" />
              <span className="text-xl font-semibold">Thank you for subscribing!</span>
            </motion.div>
          )}

          <div className="flex items-center justify-center space-x-8 text-primary-100 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Weekly recipes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Cooking tips</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Free to join</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
