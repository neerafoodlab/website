'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, Star, Search } from 'lucide-react'
import { Recipe, RecipeCard } from '@/types/recipe'

interface RecipeListProps {
  recipes: Recipe[]
  searchParams: {
    search?: string
    category?: string
    page?: string
  }
}

const RecipeList = ({ recipes, searchParams }: RecipeListProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const recipesPerPage = 12

  const filteredRecipes = useMemo(() => {
    let filtered = recipes

    // Filter by search query
    if (searchParams.search) {
      const query = searchParams.search.toLowerCase()
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
        recipe.category.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (searchParams.category) {
      filtered = filtered.filter(recipe =>
        recipe.category.toLowerCase() === searchParams.category?.toLowerCase()
      )
    }

    return filtered
  }, [recipes, searchParams])

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage)
  const startIndex = (currentPage - 1) * recipesPerPage
  const endIndex = startIndex + recipesPerPage
  const currentRecipes = filteredRecipes.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (filteredRecipes.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
        <p className="text-gray-600">
          Try adjusting your search criteria or browse all recipes.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredRecipes.length)} of {filteredRecipes.length} recipes
        </p>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {currentRecipes.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/recipes/${recipe.slug}`}
            className="group"
          >
            <div className="card overflow-hidden group-hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <Image
                  src={recipe.coverImage}
                  alt={recipe.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {recipe.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {recipe.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                page === currentPage
                  ? 'bg-primary-600 text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default RecipeList
