'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Eye } from 'lucide-react'
import { getAllRecipes } from '@/lib/recipes'
import { Recipe } from '@/types/recipe'

interface HeroProps {
  featuredRecipe?: Recipe
  latestRecipes?: Recipe[]
}

const Hero = ({ featuredRecipe, latestRecipes }: HeroProps) => {
  // Get featured recipe or fallback to first recipe
  const mainRecipe = featuredRecipe || (latestRecipes && latestRecipes[0])
  
  // Get latest recipes excluding the featured one
  const sidebarRecipes = latestRecipes?.filter(recipe => recipe.slug !== mainRecipe?.slug).slice(0, 4) || []

  const recipeCategories = [
    { name: 'Indian Classics', color: 'bg-red-500' },
    { name: 'Quick & Easy', color: 'bg-green-500' },
    { name: 'Vegetarian', color: 'bg-yellow-500' },
    { name: 'Desserts', color: 'bg-purple-500' },
    { name: 'Healthy', color: 'bg-blue-500' }
  ]

  return (
    <section className="bg-white pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Recipe - Left Side */}
          <div className="lg:col-span-2">
            {mainRecipe ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {/* Clean Image */}
                <Link href={`/recipes/${mainRecipe.slug}`} className="group cursor-pointer block">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={mainRecipe.coverImage || "/images/hero-dish.jpg"}
                      alt={mainRecipe.title}
                      width={800}
                      height={450}
                      className="w-full h-[300px] sm:h-[400px] lg:h-[450px] object-cover group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                  </div>
                </Link>

                {/* All Content Below Image */}
                <div className="space-y-3">
                  {/* Category Tag */}
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full uppercase tracking-wide" style={{ backgroundColor: 'rgba(255, 0, 96, 0.05)', color: '#ff0060' }}>
                    {mainRecipe.category}
                  </span>
                  
                  {/* Recipe Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    {mainRecipe.title}
                  </h1>
                  
                  {/* Recipe Metadata */}
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{mainRecipe.prepTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{mainRecipe.servings} servings</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>⭐</span>
                      <span>{mainRecipe.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-100 rounded-lg h-[450px] flex items-center justify-center">
                <p className="text-gray-500">No featured recipe available</p>
              </div>
            )}
          </div>

          {/* The Latest - Right Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white"
            >
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  The Latest
                </h2>
                <div className="w-12 h-1 bg-primary-600 rounded"></div>
              </div>

              {/* Latest Recipes List */}
              <div className="space-y-4">
                {sidebarRecipes.map((recipe, index) => (
                  <motion.div
                    key={recipe.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="group"
                  >
                    <Link href={`/recipes/${recipe.slug}`} className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex-shrink-0">
                        <Image
                          src={recipe.coverImage || "/images/hero-dish.jpg"}
                          alt={recipe.title}
                          width={80}
                          height={60}
                          className="w-20 h-16 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="mb-1">
                          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(255, 0, 96, 0.05)', color: '#ff0060' }}>
                            {recipe.category.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                          {recipe.title}
                        </h3>
                        <div className="flex items-center mt-1 text-xs text-gray-500 space-x-2">
                          <span>{recipe.prepTime}</span>
                          <span>•</span>
                          <span>⭐ {recipe.rating}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* See More Button */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link 
                  href="/recipes" 
                  className="inline-flex items-center justify-center w-full px-4 py-2 border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors duration-200"
                >
                  See More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
