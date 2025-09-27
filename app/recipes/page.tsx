import RecipeListClient from '@/components/RecipeListClient'
import { getAllRecipes, getCategories } from '@/lib/recipes'

export default async function RecipesPage() {
  const allRecipes = getAllRecipes()
  const categories = getCategories()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Recipe Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of authentic Indian recipes, from traditional dishes to modern twists.
          </p>
        </div>

        {/* Client-side Recipe List with Search */}
        <RecipeListClient recipes={allRecipes} categories={categories} />
      </div>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'Recipe Collection - Neera Food Lab',
    description: 'Browse our complete collection of authentic Indian recipes, from traditional dishes to modern twists.',
    openGraph: {
      title: 'Recipe Collection - Neera Food Lab',
      description: 'Browse our complete collection of authentic Indian recipes.',
      url: 'https://www.neerafoodlab.com/recipes',
    },
  }
}
