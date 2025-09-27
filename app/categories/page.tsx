import { getCategories, getAllRecipes } from '@/lib/recipes'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, Star } from 'lucide-react'

export default function CategoriesPage() {
  const categories = getCategories()
  const allRecipes = getAllRecipes()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Recipe Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our recipes organized by category. Find the perfect dish for any occasion.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => {
            const categoryRecipes = allRecipes.filter(
              recipe => recipe.category.toLowerCase() === category.name.toLowerCase()
            ).slice(0, 3)

            return (
              <div key={category.slug} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {category.recipeCount} recipes
                  </p>
                  
                  {/* Featured Recipes */}
                  <div className="space-y-3">
                    {categoryRecipes.map((recipe) => (
                      <Link
                        key={recipe.slug}
                        href={`/recipes/${recipe.slug}`}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Image
                          src={recipe.coverImage}
                          alt={recipe.title}
                          width={60}
                          height={60}
                          className="w-15 h-15 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {recipe.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{recipe.prepTime}</span>
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span>{recipe.rating}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Link
                      href={`/recipes?category=${category.slug}`}
                      className="btn-primary w-full text-center inline-block"
                    >
                      View All {category.name} Recipes
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* All Recipes CTA */}
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-gray-600 mb-6">
            Browse our complete collection of recipes or use our search feature to find exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recipes" className="btn-primary">
              Browse All Recipes
            </Link>
            <Link href="/contact" className="btn-outline">
              Request a Recipe
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'Recipe Categories - Neera Food Lab',
    description: 'Explore our recipes organized by category. Find Indian, snacks, desserts, healthy, and festive recipes.',
    openGraph: {
      title: 'Recipe Categories - Neera Food Lab',
      description: 'Explore our recipes organized by category.',
      url: 'https://www.neerafoodlab.com/categories',
    },
  }
}
