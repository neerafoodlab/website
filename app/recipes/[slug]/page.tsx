import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Recipe } from '@/types/recipe'
import { Clock, Users, Star, ChefHat, ExternalLink, Play } from 'lucide-react'
import { getAllRecipes, getRecipeBySlug, getRelatedRecipes } from '@/lib/recipes'

interface RecipePageProps {
  params: {
    slug: string
  }
}

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

  const relatedRecipes = getRelatedRecipes(params.slug, recipe.category, 4)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/recipes" className="hover:text-primary-600 transition-colors">
            Recipes
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">
            {recipe.title}
          </span>
        </nav>

      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Hero Image - 16:9 Aspect Ratio */}
        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
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
          <div 
            className="prose prose-base max-w-none"
            dangerouslySetInnerHTML={{ __html: recipe.description }}
          />
        </div>
      </div>

      {/* Recipe Details */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">

            {/* Jump to Video Button - Only show if video exists */}
            {recipe.youtubeVideoId && (
              <div className="mb-8">
                <a
                  href="#video-section"
                  className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm"
                >
                  <Play className="w-4 h-4" />
                  <span>Jump to Video</span>
                </a>
              </div>
            )}

            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Ingredients
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-3">
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="text-gray-700">
                        <span className="font-medium">{ingredient.amount} {ingredient.unit}</span> {ingredient.name}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">No ingredients listed</div>
                  )}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Instructions
              </h2>
              <div className="space-y-8">
                {recipe.instructions && recipe.instructions.length > 0 ? (
                  recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {instruction.title}
                      </h3>
                      <div 
                        className="prose prose-base max-w-none"
                        dangerouslySetInnerHTML={{ __html: instruction.description }}
                      />
                      {instruction.image && (
                        <div className="mt-4">
                          <Image
                            src={instruction.image}
                            alt={`Step ${instruction.step}: ${instruction.title}`}
                            width={400}
                            height={300}
                            className="w-full max-w-md h-64 object-cover rounded-lg shadow-sm"
                          />
                        </div>
                      )}
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
              <div id="video-section" className="mb-8">
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
                        <div className="w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg" style={{ backgroundColor: '#fe0000' }}>
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
                        className="inline-flex items-center space-x-2 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 hover:opacity-90"
                        style={{ backgroundColor: '#fe0000' }}
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
            {/* Empty sidebar for future use */}
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-b border-gray-200" style={{ marginTop: '60px', marginBottom: '60px' }}></div>

        {/* Social Sharing */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Share This Recipe</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.neerafoodlab.com/recipes/${recipe.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.x.com/neerafoodlab/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors duration-200"
              aria-label="Follow on X (Twitter)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/neerafoodlab/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors duration-200"
              aria-label="Follow on Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href={`https://www.threads.net/intent/post?text=${encodeURIComponent(`Check out this amazing recipe: ${recipe.title} ${`https://www.neerafoodlab.com/recipes/${recipe.slug}`}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200"
              aria-label="Share on Threads"
            >
              <Image
                src="/brand/threads.png"
                alt="Threads"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(`Recipe: ${recipe.title}`)}&body=${encodeURIComponent(`I thought you might enjoy this recipe: ${recipe.title}\n\n${recipe.description}\n\nCheck it out here: https://www.neerafoodlab.com/recipes/${recipe.slug}`)}`}
              className="p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
              aria-label="Share via Email"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedRecipes.map((relatedRecipe) => (
                <Link
                  key={relatedRecipe.slug}
                  href={`/recipes/${relatedRecipe.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-300 border border-gray-200">
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

        {/* Tags Section - Moved to end and made clickable */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recipe Tags</h2>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <Link
                key={index}
                href={`/recipes?search=${encodeURIComponent(tag)}`}
                className="recipe-tag inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
          {recipe.tags.length === 0 && (
            <p className="text-gray-500 text-sm italic">No tags assigned to this recipe</p>
          )}
        </div>
        
        {/* Spacing before footer */}
        <div style={{ height: '120px' }}></div>
      </div>
    </div>
  )
}

