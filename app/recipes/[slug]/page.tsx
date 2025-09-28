'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Recipe } from '@/types/recipe'
import { Clock, Users, Star, ChefHat, ExternalLink, Play, Bold, Italic, Underline, Link as LinkIcon, Image as ImageIcon, List, Quote } from 'lucide-react'

interface RecipePageProps {
  params: {
    slug: string
  }
}

// Rich Text Editor Component
const RichTextEditor = ({ content, onChange, placeholder = "Start typing..." }: {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false)

  const executeCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value)
    // Trigger onChange to update parent state
    const selection = window.getSelection()
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0)
      const container = range.commonAncestorContainer
      if (container.nodeType === Node.TEXT_NODE) {
        onChange((container as Text).textContent || '')
      } else if (container.nodeType === Node.ELEMENT_NODE) {
        onChange((container as Element).innerHTML || '')
      }
    }
  }

  return (
    <div className="relative">
      {/* Toolbar */}
      <div
        className={`rich-editor-toolbar absolute -top-12 left-0 right-0 p-2 flex items-center space-x-1 transition-all duration-200 ${
          isToolbarVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={() => setIsToolbarVisible(true)}
        onMouseLeave={() => setIsToolbarVisible(false)}
      >
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('underline')}
          className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', 'blockquote')}
          className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800"
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1" />
        <button
          type="button"
          className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800"
          title="Insert Link"
          onClick={() => {
            const url = prompt('Enter URL:')
            if (url) executeCommand('createLink', url)
          }}
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800"
          title="Insert Image"
          onClick={() => {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = 'image/*'
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onload = (event) => {
                  executeCommand('insertImage', event.target?.result as string)
                }
                reader.readAsDataURL(file)
              }
            }
            input.click()
          }}
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <div
        className="rich-editor-content min-h-[120px] p-3 prose prose-base max-w-none focus:outline-none"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onFocus={() => setIsToolbarVisible(true)}
        onBlur={() => setTimeout(() => setIsToolbarVisible(false), 200)}
        dangerouslySetInnerHTML={{ __html: content || `<p>${placeholder}</p>` }}
      />
    </div>
  )
}


export default function RecipePage({ params }: RecipePageProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [editableSlug, setEditableSlug] = useState('')
  const [isSlugSaving, setIsSlugSaving] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${params.slug}`)
        if (!response.ok) {
          throw new Error('Recipe not found')
        }
        const recipeData = await response.json()
        setRecipe(recipeData)
        setEditableSlug(recipeData.slug) // Initialize editable slug with current slug

        // Fetch related recipes
        const allRecipesResponse = await fetch('/api/recipes')
        if (allRecipesResponse.ok) {
          const allRecipes = await allRecipesResponse.json()
          const related = allRecipes
            .filter((r: Recipe) => r.slug !== params.slug && r.category.toLowerCase() === recipeData.category.toLowerCase())
            .slice(0, 4)
          setRelatedRecipes(related)
        }
      } catch (error) {
        console.error('Error fetching recipe:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (!recipe) {
    notFound()
  }

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

        {/* Slug Input Field */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipe URL Slug
          </label>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-sm">neerafoodlab.com/recipes/</span>
            <input
              type="text"
              value={editableSlug}
              onChange={(e) => {
                const newSlug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
                setEditableSlug(newSlug)
              }}
              className={`flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm ${
                editableSlug !== recipe?.slug ? 'border-orange-300 bg-orange-50' : 'border-gray-300'
              }`}
              placeholder="recipe-slug"
            />
            <button
              className="px-3 py-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSlugSaving || editableSlug === recipe?.slug}
              onClick={async () => {
                if (!recipe || editableSlug === recipe.slug) return

                setIsSlugSaving(true)
                try {
                  const response = await fetch(`/api/recipes/${recipe.slug}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ slug: editableSlug }),
                  })

                  if (response.ok) {
                    const updatedRecipe = await response.json()
                    // Update the recipe slug in state
                    setRecipe(updatedRecipe.recipe)
                    setEditableSlug(updatedRecipe.recipe.slug)

                    // Update the URL in the browser
                    window.history.replaceState({}, '', `/recipes/${updatedRecipe.recipe.slug}`)

                    alert('Slug updated successfully!')
                  } else {
                    const errorData = await response.json()
                    alert(`Failed to update slug: ${errorData.error}`)
                  }
                } catch (error) {
                  console.error('Error updating slug:', error)
                  alert('Failed to update slug. Please try again.')
                } finally {
                  setIsSlugSaving(false)
                }
              }}
            >
              {isSlugSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-500">
              Changing the slug will update the recipe URL. Use lowercase letters, numbers, and hyphens only.
            </p>
            {editableSlug !== recipe?.slug && (
              <span className="text-xs text-orange-600 font-medium">
                Unsaved changes
              </span>
            )}
          </div>
        </div>
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
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            contentEditable={true}
            suppressContentEditableWarning={true}
            style={{ outline: 'none', padding: '0.5rem 0' }}
          >
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
          <RichTextEditor
            content={recipe.description}
            onChange={(content) => {
              // Update recipe description
              console.log('Description updated:', content)
            }}
            placeholder="Write a compelling description for your recipe..."
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
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                contentEditable={true}
                suppressContentEditableWarning={true}
                style={{ outline: 'none', padding: '0.25rem 0' }}
              >
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
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                contentEditable={true}
                suppressContentEditableWarning={true}
                style={{ outline: 'none', padding: '0.25rem 0' }}
              >
                Instructions
              </h2>
              <div className="space-y-8">
                {recipe.instructions && recipe.instructions.length > 0 ? (
                  recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex-1">
                      <div className="relative">
                        <h3
                          className="font-semibold text-gray-900 mb-2"
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          style={{ outline: 'none', padding: '0.25rem 0' }}
                        >
                          {instruction.title}
                        </h3>
                        {/* Image insertion button for titles */}
                        <button
                          type="button"
                          className="image-insert-btn absolute -top-1 -right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium shadow-lg transition-colors duration-200"
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  const img = document.createElement('img');
                                  img.src = event.target?.result as string;
                                  img.style.maxWidth = '100%';
                                  img.style.height = 'auto';
                                  img.style.aspectRatio = '4/3';
                                  img.className = 'rounded-lg shadow-sm my-2';

                                  const selection = window.getSelection();
                                  if (selection?.rangeCount) {
                                    const range = selection.getRangeAt(0);
                                    range.insertNode(img);
                                    range.collapse(false);
                                    selection.removeAllRanges();
                                    selection.addRange(range);
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            };
                            input.click();
                          }}
                          title="Insert Image (4:3 aspect ratio)"
                        >
                          📷
                        </button>
                      </div>
                      <RichTextEditor
                        content={instruction.description}
                        onChange={(content) => {
                          // Update instruction description
                          console.log('Instruction updated:', content)
                        }}
                        placeholder="Write detailed cooking instructions..."
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

