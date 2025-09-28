'use client'

import { useState } from 'react'
import ComprehensiveRecipeEditor from './ComprehensiveRecipeEditor'

interface RecipeFrontmatter {
  title: string
  description: string
  coverImage: string
  category: string
  tags: string[]
  prepTime: string
  cookTime: string
  totalTime: string
  servings: number
  difficulty: string
  rating: number
  featured: boolean
  publishedAt: string
  updatedAt: string
  author: {
    name: string
    bio: string
    avatar: string
  }
}

interface RecipeFile {
  filename: string
  frontmatter: RecipeFrontmatter
  content: string
}

interface Props {
  recipes: RecipeFile[]
}

export default function RecipeManagementClient({ recipes }: Props) {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list')
  const [editingRecipe, setEditingRecipe] = useState<RecipeFile | null>(null)

  const handleCreateNew = () => {
    setView('create')
    setEditingRecipe(null)
  }

  const handleEditRecipe = (recipe: RecipeFile) => {
    // Parse the recipe content to extract sections
    const content = recipe.content
    
    // Extract sections from markdown content
    const parseSection = (content: string, pattern: RegExp) => {
      const match = content.match(pattern)
      return match ? match[1].trim() : ''
    }

    // Parse ingredients from content
    const ingredientsMatch = content.match(/## Ingredients for[^#]*?\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const ingredients = ingredientsMatch ? ingredientsMatch[1].replace(/\n\n/g, '\n').trim() : ''

    // Parse method/instructions
    const methodMatch = content.match(/## Method\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const instructions = methodMatch ? 
      methodMatch[1]
        .replace(/### Step \d+:.*?\n\n/g, '')
        .split('\n\n')
        .filter(line => line.trim())
        .join('\n') : ''

    // Parse other sections
    const introduction = parseSection(content, /^(.*?)(?=\n##|\n---)/s)
    const history = parseSection(content, /## Introduction & History\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const whyThisWorks = parseSection(content, /## Why This Recipe Works\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const proTips = parseSection(content, /## Pro Tips.*?\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const faqs = parseSection(content, /## FAQs\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const servingSuggestions = parseSection(content, /## Serving Suggestions\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const storageInstructions = parseSection(content, /## Storage Instructions\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const conclusion = parseSection(content, /## Conclusion\n\n(.*?)(?=\n##|\n---|\n$)/s)

    const initialData = {
      title: recipe.frontmatter.title,
      description: recipe.frontmatter.description,
      category: recipe.frontmatter.category,
      tags: recipe.frontmatter.tags.join(', '),
      seoTitle: recipe.frontmatter.title,
      metaDescription: recipe.frontmatter.description,
      heroImage: recipe.frontmatter.coverImage,
      youtubeVideoId: '',
      prepTime: recipe.frontmatter.prepTime,
      cookTime: recipe.frontmatter.cookTime,
      servings: recipe.frontmatter.servings.toString(),
      difficulty: recipe.frontmatter.difficulty,
      rating: recipe.frontmatter.rating.toString(),
      featured: recipe.frontmatter.featured,
      status: 'published',
      introduction,
      history,
      whyThisWorks,
      proTips,
      servingSuggestions,
      storageInstructions,
      conclusion,
      ingredients,
      instructions,
      faqs,
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: ''
    }

    setEditingRecipe(recipe)
    setView('edit')
  }

  const handleBackToList = () => {
    setView('list')
    setEditingRecipe(null)
  }

  if (view === 'create') {
    return (
      <div>
        <div className="mb-6">
          <button
            onClick={handleBackToList}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 mb-4"
          >
            ← Back to Recipe List
          </button>
        </div>
        <ComprehensiveRecipeEditor />
      </div>
    )
  }

  if (view === 'edit' && editingRecipe) {
    // Parse content for editing
    const content = editingRecipe.content
    
    // Extract sections from markdown content
    const parseSection = (content: string, pattern: RegExp) => {
      const match = content.match(pattern)
      return match ? match[1].trim() : ''
    }

    // Parse ingredients from content
    const ingredientsMatch = content.match(/## Ingredients for[^#]*?\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const ingredients = ingredientsMatch ? ingredientsMatch[1].replace(/\n\n/g, '\n').trim() : ''

    // Parse method/instructions
    const methodMatch = content.match(/## Method\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const instructions = methodMatch ? 
      methodMatch[1]
        .replace(/### Step \d+:.*?\n\n/g, '')
        .split('\n\n')
        .filter(line => line.trim())
        .join('\n') : ''

    // Parse other sections
    const introduction = parseSection(content, /^(.*?)(?=\n##|\n---)/s)
    const history = parseSection(content, /## Introduction & History\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const whyThisWorks = parseSection(content, /## Why This Recipe Works\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const proTips = parseSection(content, /## Pro Tips.*?\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const faqs = parseSection(content, /## FAQs\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const servingSuggestions = parseSection(content, /## Serving Suggestions\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const storageInstructions = parseSection(content, /## Storage Instructions\n\n(.*?)(?=\n##|\n---|\n$)/s)
    const conclusion = parseSection(content, /## Conclusion\n\n(.*?)(?=\n##|\n---|\n$)/s)

    const initialData = {
      title: editingRecipe.frontmatter.title,
      description: editingRecipe.frontmatter.description,
      category: editingRecipe.frontmatter.category,
      tags: editingRecipe.frontmatter.tags.join(', '),
      seoTitle: editingRecipe.frontmatter.title,
      metaDescription: editingRecipe.frontmatter.description,
      heroImage: editingRecipe.frontmatter.coverImage,
      youtubeVideoId: '',
      prepTime: editingRecipe.frontmatter.prepTime,
      cookTime: editingRecipe.frontmatter.cookTime,
      servings: editingRecipe.frontmatter.servings.toString(),
      difficulty: editingRecipe.frontmatter.difficulty,
      rating: editingRecipe.frontmatter.rating.toString(),
      featured: editingRecipe.frontmatter.featured,
      status: 'published',
      introduction,
      history,
      whyThisWorks,
      proTips,
      servingSuggestions,
      storageInstructions,
      conclusion,
      ingredients,
      instructions,
      faqs,
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: ''
    }

    return (
      <div>
        <div className="mb-6">
          <button
            onClick={handleBackToList}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 mb-4"
          >
            ← Back to Recipe List
          </button>
        </div>
        <ComprehensiveRecipeEditor 
          initialData={initialData}
          isEditing={true}
          existingFilename={editingRecipe.filename}
        />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recipe Management</h1>
          <p className="text-gray-600">Create, edit, and manage your recipes with the comprehensive editor.</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          ➕ Create New Recipe
        </button>
      </div>

      {recipes.length === 0 ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">No Recipe Files Found</h2>
          <p>Could not load recipe files. Please check that the content/recipes/ directory exists and contains markdown files.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.filename}
              className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleEditRecipe(recipe)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {recipe.frontmatter.title || recipe.filename}
                  </h2>
                  <p className="text-gray-600 mb-3">
                    {recipe.frontmatter.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">📂 {recipe.frontmatter.category}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">⭐ {recipe.frontmatter.rating}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">🍽️ {recipe.frontmatter.servings} servings</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">⏱️ {recipe.frontmatter.prepTime}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">🔥 {recipe.frontmatter.difficulty}</span>
                    {recipe.frontmatter.featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">⭐ Featured</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 ml-6">
                  <a
                    href={`/recipes/${recipe.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    👁️ Preview
                  </a>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">File: content/recipes/{recipe.filename}.md</p>
                <div className="bg-gray-50 p-3 rounded border text-xs font-mono text-gray-600 max-h-32 overflow-auto">
                  {recipe.content.substring(0, 300)}{recipe.content.length > 300 ? '...' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Recipe Editor Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">📝 Content Sections:</h4>
            <ul className="space-y-1">
              <li>• SEO Title & Meta Description</li>
              <li>• Introduction & History</li>
              <li>• Why This Recipe Works</li>
              <li>• Pro Tips & Serving Suggestions</li>
              <li>• FAQs & Storage Instructions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">⚡ Advanced Features:</h4>
            <ul className="space-y-1">
              <li>• Comprehensive ingredient formatting</li>
              <li>• Step-by-step instruction parsing</li>
              <li>• Nutrition information</li>
              <li>• YouTube video integration</li>
              <li>• Article-style content creation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
