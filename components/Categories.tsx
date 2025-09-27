'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Utensils, 
  Cookie, 
  Cake, 
  Gift, 
  Heart, 
  Briefcase 
} from 'lucide-react'

const Categories = () => {
  const categories = [
    {
      name: 'Indian',
      icon: Utensils,
      href: '/recipes?category=indian',
      color: 'from-red-500 to-orange-500',
      count: '120+ recipes'
    },
    {
      name: 'Snacks',
      icon: Cookie,
      href: '/recipes?category=snacks',
      color: 'from-yellow-500 to-amber-500',
      count: '80+ recipes'
    },
    {
      name: 'Desserts',
      icon: Cake,
      href: '/recipes?category=desserts',
      color: 'from-pink-500 to-rose-500',
      count: '60+ recipes'
    },
    {
      name: 'Festive Recipes',
      icon: Gift,
      href: '/recipes?category=festive',
      color: 'from-purple-500 to-indigo-500',
      count: '40+ recipes'
    },
    {
      name: 'Healthy',
      icon: Heart,
      href: '/recipes?category=healthy',
      color: 'from-green-500 to-emerald-500',
      count: '90+ recipes'
    },
    {
      name: 'Lunchbox Ideas',
      icon: Briefcase,
      href: '/recipes?category=lunchbox',
      color: 'from-blue-500 to-cyan-500',
      count: '50+ recipes'
    }
  ]

  return (
    <section className="py-20 bg-brand-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-black mb-4 font-heading">
            Explore by Category
          </h2>
          <p className="text-xl text-brand-gray-600 max-w-2xl mx-auto">
            Find the perfect recipe for any occasion, from quick snacks to elaborate festive dishes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={category.href}>
                  <div className="card p-8 text-center group-hover:shadow-xl transition-all duration-300">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-brand-black mb-2 group-hover:text-primary-500 transition-colors duration-200 font-heading">
                      {category.name}
                    </h3>
                    <p className="text-brand-gray-600 text-sm">
                      {category.count}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Categories
