'use client'

import { motion } from 'framer-motion'

const StatsSection = () => {
  const stats = [
    {
      number: '180+',
      label: 'Recipes.'
    },
    {
      number: '20M+',
      label: 'Recipes Views'
    },
    {
      number: '15k+',
      label: 'Followers.'
    }
  ]

  return (
    <section className="py-12" style={{ backgroundColor: '#D00550' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-lg md:text-xl font-medium opacity-90">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
