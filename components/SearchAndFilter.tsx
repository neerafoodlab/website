'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, X } from 'lucide-react'

interface SearchAndFilterProps {
  categories: Array<{
    name: string
    slug: string
    recipeCount: number
  }>
}

const SearchAndFilter = ({ categories }: SearchAndFilterProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const params = new URLSearchParams(searchParams)
    
    if (query) {
      params.set('search', query)
    } else {
      params.delete('search')
    }
    
    router.push(`/recipes?${params.toString()}`)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const params = new URLSearchParams(searchParams)
    
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    
    router.push(`/recipes?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    router.push('/recipes')
  }

  const hasActiveFilters = searchQuery || selectedCategory

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search recipes, ingredients, or tags..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          {hasActiveFilters && (
            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className={`mt-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name} ({category.recipeCount})
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {searchQuery && (
            <span className="inline-flex items-center space-x-2 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
              <span>Search: &quot;{searchQuery}&quot;</span>
              <button
                onClick={() => handleSearch('')}
                className="hover:text-primary-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center space-x-2 bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm">
              <span>Category: {categories.find(c => c.slug === selectedCategory)?.name}</span>
              <button
                onClick={() => handleCategoryChange('')}
                className="hover:text-secondary-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchAndFilter
