import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getRecipeBySlug, getRelatedRecipes, getAllRecipes } from '@/lib/recipes'
import { Recipe } from '@/types/recipe'
import { Clock, Users, Star, ChefHat, ArrowLeft, ExternalLink, Play } from 'lucide-react'

interface RecipePageProps {
  params: {
    slug: string
  }
}

// Generate static params for all recipes
export async function generateStaticParams() {
  const recipes = getAllRecipes()
  
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }))
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = getRecipeBySlug(params.slug)
  
  if (!recipe) {
    notFound()
  }

  const relatedRecipes = getRelatedRecipes(params.slug, recipe.category, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/recipes" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Recipes
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Hero Image - 16:9 Aspect Ratio */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6" style={{ aspectRatio: '16/9' }}>
          <Image
            src={recipe.coverImage}
            alt={recipe.title}
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Title and Metadata Below Image */}
        <div className="space-y-4">
          {/* Category and Rating */}
          <div className="flex items-center space-x-3">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full uppercase tracking-wide" style={{ backgroundColor: 'rgba(255, 0, 96, 0.05)', color: '#ff0060' }}>
              {recipe.category}
            </span>
            <div className="flex items-center space-x-1 text-gray-600">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="text-sm font-medium">{recipe.rating}</span>
            </div>
          </div>
          
          {/* Recipe Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {recipe.title}
          </h1>
          
          {/* Recipe Metadata */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center space-x-1">
              <ChefHat className="w-4 h-4" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-lg text-gray-700 leading-relaxed">
            {recipe.description}
          </p>
        </div>
      </div>

      {/* Recipe Details */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">

            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-3">
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">
                          <span className="font-medium">{ingredient.amount} {ingredient.unit}</span> {ingredient.name}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No ingredients listed</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
              <div className="space-y-6">
                {recipe.instructions && recipe.instructions.length > 0 ? (
                  recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {instruction.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{instruction.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{instruction.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No instructions listed</p>
                )}
              </div>
            </div>

            {/* Nutrition Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nutrition Information</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{recipe.nutrition.calories}</p>
                    <p className="text-sm text-gray-600">Calories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{recipe.nutrition.protein}g</p>
                    <p className="text-sm text-gray-600">Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{recipe.nutrition.carbs}g</p>
                    <p className="text-sm text-gray-600">Carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{recipe.nutrition.fat}g</p>
                    <p className="text-sm text-gray-600">Fat</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{recipe.nutrition.fiber}g</p>
                    <p className="text-sm text-gray-600">Fiber</p>
                  </div>
                </div>
              </div>
            </div>

            {/* YouTube Video Section */}
            {recipe.youtubeVideoId && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Watch How to Make It</h2>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="relative group cursor-pointer">
                    {/* Video Thumbnail */}
                    <div className="relative rounded-lg overflow-hidden">
                      <Image
                        src={`https://img.youtube.com/vi/${recipe.youtubeVideoId}/maxresdefault.jpg`}
                        alt={`${recipe.title} Video Tutorial`}
                        width={560}
                        height={315}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors duration-300 shadow-lg">
                          <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Title and Button */}
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Step-by-step video tutorial for {recipe.title}
                      </h3>
                      <a
                        href={`https://www.youtube.com/watch?v=${recipe.youtubeVideoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        <Play className="w-4 h-4" fill="currentColor" />
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={recipe.author.avatar}
                  alt={recipe.author.name}
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{recipe.author.name}</p>
                  <p className="text-sm text-gray-600">Recipe Creator</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{recipe.author.bio}</p>
            </div>

            {/* Tags */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedRecipes.map((relatedRecipe) => (
                <Link
                  key={relatedRecipe.slug}
                  href={`/recipes/${relatedRecipe.slug}`}
                  className="group"
                >
                  <div className="card overflow-hidden group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={relatedRecipe.coverImage}
                      alt={relatedRecipe.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 mb-2">
                        {relatedRecipe.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedRecipe.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: RecipePageProps) {
  const recipe = getRecipeBySlug(params.slug)
  
  if (!recipe) {
    return {
      title: 'Recipe Not Found',
    }
  }

  return {
    title: `${recipe.title} - Neera Food Lab`,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      url: `https://www.neerafoodlab.com/recipes/${recipe.slug}`,
      images: [
        {
          url: recipe.coverImage,
          width: 800,
          height: 400,
          alt: recipe.title,
        },
      ],
    },
  }
}
