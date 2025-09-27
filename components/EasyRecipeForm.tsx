'use client'

import { useState } from 'react'

export default function EasyRecipeForm() {
  const [recipeForm, setRecipeForm] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Medium',
    rating: '4.5',
    featured: false,
    heroImage: '',
    youtubeVideoId: '',
    ingredients: '',
    instructions: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (field: string, value: string | boolean) => {
    setRecipeForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateMarkdownContent = () => {
    const slug = recipeForm.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
    const currentDate = new Date().toISOString()
    
    // Parse ingredients (one per line)
    const ingredientsList = recipeForm.ingredients.split('\n').filter(line => line.trim()).map(line => {
      const parts = line.trim().split(' - ')
      if (parts.length >= 2) {
        const [amount, ...nameParts] = parts
        return `  - name: "${nameParts.join(' - ')}"
    amount: "${amount.split(' ')[0]}"
    unit: "${amount.split(' ').slice(1).join(' ') || 'piece'}"`
      } else {
        return `  - name: "${line.trim()}"
    amount: "1"
    unit: "piece"`
      }
    }).join('\n')

    // Parse instructions (one per line)
    const instructionsList = recipeForm.instructions.split('\n').filter(line => line.trim()).map((line, index) => {
      return `  - step: ${index + 1}
    title: "Step ${index + 1}"
    description: "${line.trim()}"`
    }).join('\n')

    const tagsArray = recipeForm.tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')

    return `---
title: "${recipeForm.title}"
description: "${recipeForm.description}"
coverImage: "${recipeForm.heroImage || `/images/recipes/${slug}.jpg`}"
category: "${recipeForm.category}"
tags: [${tagsArray}]
prepTime: "${recipeForm.prepTime}"
cookTime: "${recipeForm.cookTime}"
totalTime: "${recipeForm.prepTime}"
servings: ${recipeForm.servings}
difficulty: "${recipeForm.difficulty}"
rating: ${recipeForm.rating}
featured: ${recipeForm.featured}
${recipeForm.youtubeVideoId ? `youtubeVideoId: "${recipeForm.youtubeVideoId}"` : ''}
publishedAt: "${currentDate}"
updatedAt: "${currentDate}"
author:
  name: "Neera"
  bio: "Passionate home cook and recipe creator"
  avatar: "/brand/neerafoodlab_favicon.png"
ingredients:
${ingredientsList}
instructions:
${instructionsList}
nutrition:
  calories: ${recipeForm.calories || 0}
  protein: ${recipeForm.protein || 0}
  carbs: ${recipeForm.carbs || 0}
  fat: ${recipeForm.fat || 0}
  fiber: ${recipeForm.fiber || 0}
seo:
  metaTitle: "${recipeForm.title} - Neera Food Lab"
  metaDescription: "Learn how to make ${recipeForm.title.toLowerCase()} with this easy recipe. Perfect for any occasion."
  keywords: [${tagsArray}]
---

# ${recipeForm.title}

${recipeForm.description}

## Why This Recipe Works

- **Authentic flavors**: Traditional ingredients and cooking methods
- **Easy to follow**: Step-by-step instructions for perfect results
- **Customizable**: Adjust spices to your taste preference

## Pro Tips

1. **Preparation**: Read through all steps before starting
2. **Quality ingredients**: Use fresh spices for best flavor
3. **Timing**: Allow adequate time for preparation and cooking

## Serving Suggestions

- Serve with complementary sides
- Pair with your favorite beverages
- Garnish with fresh herbs for extra flavor

## Storage Instructions

- Store leftovers in refrigerator for up to 3 days
- Reheat gently to preserve flavors
- Freeze for up to 2 months for longer storage`
  }

  const handleSubmit = async () => {
    if (!recipeForm.title || !recipeForm.description || !recipeForm.category) {
      setSubmitMessage('❌ Please fill in at least Title, Description, and Category')
      return
    }

    setIsSubmitting(true)
    try {
      const markdownContent = generateMarkdownContent()
      const slug = recipeForm.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
      
      // Copy to clipboard for now (since we can't directly write files from browser)
      await navigator.clipboard.writeText(markdownContent)
      
      setSubmitMessage(`✅ Recipe markdown copied to clipboard! 

📝 Next steps:
1. Create a file named "${slug}.md" in the content/recipes/ folder
2. Paste the copied content into the file
3. Add an image named "${slug}.jpg" to public/images/recipes/
4. Your recipe will appear on the website automatically!`)
      
      // Reset form
      setRecipeForm({
        title: '',
        description: '',
        category: '',
        tags: '',
        prepTime: '',
        cookTime: '',
        servings: '',
        difficulty: 'Medium',
        rating: '4.5',
        featured: false,
        heroImage: '',
        youtubeVideoId: '',
        ingredients: '',
        instructions: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        fiber: ''
      })
    } catch (error) {
      setSubmitMessage('❌ Error generating recipe. Please try again.')
    }
    setIsSubmitting(false)
  }

  const clearForm = () => {
    setRecipeForm({
      title: '',
      description: '',
      category: '',
      tags: '',
      prepTime: '',
      cookTime: '',
      servings: '',
      difficulty: 'Medium',
      rating: '4.5',
      featured: false,
      heroImage: '',
      youtubeVideoId: '',
      ingredients: '',
      instructions: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: ''
    })
    setSubmitMessage('')
  }

  // Helper function to extract YouTube video ID from URL
  const extractYouTubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : url
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      {/* Basic Info */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>📝 Basic Information</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Recipe Title *</label>
          <input
            type="text"
            value={recipeForm.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="e.g., Butter Chicken"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Description *</label>
          <textarea
            value={recipeForm.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Brief description of the recipe..."
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Category *</label>
            <select
              value={recipeForm.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            >
              <option value="">Select Category</option>
              <option value="Indian">Indian</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Desserts">Desserts</option>
              <option value="Appetizers">Appetizers</option>
              <option value="Main Course">Main Course</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Healthy">Healthy</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Tags (comma separated)</label>
            <input
              type="text"
              value={recipeForm.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              placeholder="e.g., chicken, curry, indian, spicy"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        {/* Hero Image and Video */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Hero Image URL (optional)</label>
          <input
            type="url"
            value={recipeForm.heroImage}
            onChange={(e) => handleInputChange('heroImage', e.target.value)}
            placeholder="https://example.com/your-recipe-image.jpg"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
            Leave empty to use default naming: /images/recipes/recipe-name.jpg
          </p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>YouTube Video URL (optional)</label>
          <input
            type="url"
            value={recipeForm.youtubeVideoId}
            onChange={(e) => {
              const url = e.target.value
              const videoId = extractYouTubeVideoId(url)
              handleInputChange('youtubeVideoId', videoId)
            }}
            placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
            Paste full YouTube URL - will auto-extract video ID. Video will appear at end of recipe with thumbnail.
          </p>
          {recipeForm.youtubeVideoId && (
            <div style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem', fontSize: '0.875rem' }}>
              <strong>Preview:</strong> Video ID extracted: <code>{recipeForm.youtubeVideoId}</code>
            </div>
          )}
        </div>
      </div>

      {/* Recipe Details */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>⏱️ Recipe Details</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Prep Time</label>
            <input
              type="text"
              value={recipeForm.prepTime}
              onChange={(e) => handleInputChange('prepTime', e.target.value)}
              placeholder="e.g., 20 mins"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Cook Time</label>
            <input
              type="text"
              value={recipeForm.cookTime}
              onChange={(e) => handleInputChange('cookTime', e.target.value)}
              placeholder="e.g., 30 mins"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Servings</label>
            <input
              type="number"
              value={recipeForm.servings}
              onChange={(e) => handleInputChange('servings', e.target.value)}
              placeholder="4"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Difficulty</label>
            <select
              value={recipeForm.difficulty}
              onChange={(e) => handleInputChange('difficulty', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              value={recipeForm.rating}
              onChange={(e) => handleInputChange('rating', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', fontWeight: '500', color: '#374151' }}>
            <input
              type="checkbox"
              checked={recipeForm.featured}
              onChange={(e) => handleInputChange('featured', e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            Featured Recipe (appears on homepage)
          </label>
        </div>
      </div>

      {/* Ingredients */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>🥘 Ingredients</h3>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
          Enter one ingredient per line. Format: "2 cups - basmati rice" or just "salt"
        </p>
        <textarea
          value={recipeForm.ingredients}
          onChange={(e) => handleInputChange('ingredients', e.target.value)}
          placeholder={`2 lbs - chicken breast
1 cup - plain yogurt
2 tbsp - ginger garlic paste
1 tsp - turmeric powder
salt to taste`}
          rows={8}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            resize: 'vertical',
            fontFamily: 'monospace'
          }}
        />
      </div>

      {/* Instructions */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>📋 Instructions</h3>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
          Enter one step per line. Steps will be automatically numbered.
        </p>
        <textarea
          value={recipeForm.instructions}
          onChange={(e) => handleInputChange('instructions', e.target.value)}
          placeholder={`Marinate chicken with yogurt, spices and salt for 30 minutes
Heat oil in a pan and cook marinated chicken until golden brown
In the same pan, add onions and cook until golden
Add tomato puree and cook for 5 minutes
Add cream and simmer for 10 minutes
Garnish with cilantro and serve hot`}
          rows={8}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            resize: 'vertical',
            fontFamily: 'monospace'
          }}
        />
      </div>

      {/* Nutrition (Optional) */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>🍎 Nutrition (Optional)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Calories</label>
            <input
              type="number"
              value={recipeForm.calories}
              onChange={(e) => handleInputChange('calories', e.target.value)}
              placeholder="420"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Protein (g)</label>
            <input
              type="number"
              value={recipeForm.protein}
              onChange={(e) => handleInputChange('protein', e.target.value)}
              placeholder="35"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Carbs (g)</label>
            <input
              type="number"
              value={recipeForm.carbs}
              onChange={(e) => handleInputChange('carbs', e.target.value)}
              placeholder="12"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Fat (g)</label>
            <input
              type="number"
              value={recipeForm.fat}
              onChange={(e) => handleInputChange('fat', e.target.value)}
              placeholder="28"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>Fiber (g)</label>
            <input
              type="number"
              value={recipeForm.fiber}
              onChange={(e) => handleInputChange('fiber', e.target.value)}
              placeholder="2"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button
          onClick={clearForm}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          Clear Form
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? '#9ca3af' : '#059669',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          {isSubmitting ? 'Generating...' : '📋 Generate Recipe File'}
        </button>
      </div>

      {/* Submit Message */}
      {submitMessage && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: submitMessage.includes('❌') ? '#fee2e2' : '#d1fae5',
          border: `1px solid ${submitMessage.includes('❌') ? '#fca5a5' : '#86efac'}`,
          borderRadius: '0.375rem',
          whiteSpace: 'pre-line',
          fontSize: '0.875rem'
        }}>
          {submitMessage}
        </div>
      )}
    </div>
  )
}
