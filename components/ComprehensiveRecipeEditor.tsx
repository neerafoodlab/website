'use client'

import { useState } from 'react'

interface RecipeFormData {
  // Basic info
  title: string
  description: string
  category: string
  tags: string
  
  // SEO
  seoTitle: string
  metaDescription: string
  
  // Media
  heroImage: string
  youtubeVideoId: string
  
  // Timing & Details
  prepTime: string
  cookTime: string
  servings: string
  difficulty: string
  rating: string
  featured: boolean
  status: string
  
  // Content sections
  introduction: string
  history: string
  whyThisWorks: string
  proTips: string
  servingSuggestions: string
  storageInstructions: string
  conclusion: string
  
  // Ingredients (as text for easier editing)
  ingredients: string
  
  // Instructions (as text for easier editing)
  instructions: string
  
  // FAQs
  faqs: string
  
  // Nutrition
  calories: string
  protein: string
  carbs: string
  fat: string
  fiber: string
}

interface Props {
  initialData?: Partial<RecipeFormData>
  onSave?: (data: RecipeFormData) => void
  isEditing?: boolean
  existingFilename?: string
}

export default function ComprehensiveRecipeEditor({ initialData, onSave, isEditing = false, existingFilename }: Props) {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    category: '',
    tags: '',
    seoTitle: '',
    metaDescription: '',
    heroImage: '',
    youtubeVideoId: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Medium',
    rating: '4.5',
    featured: false,
    status: 'draft',
    introduction: '',
    history: '',
    whyThisWorks: '',
    proTips: '',
    servingSuggestions: '',
    storageInstructions: '',
    conclusion: '',
    ingredients: '',
    instructions: '',
    faqs: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    ...initialData
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [activeTab, setActiveTab] = useState('basic')


  const handleInputChange = (field: keyof RecipeFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateMarkdownContent = () => {
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
    const currentDate = new Date().toISOString()
    
    // Parse ingredients (one per line)
    const ingredientsList = formData.ingredients.split('\n').filter(line => line.trim()).map(line => {
      const trimmedLine = line.trim()
      if (trimmedLine.includes(' – ') || trimmedLine.includes(' - ')) {
        const parts = trimmedLine.split(/ – | - /)
        const amount = parts[0].trim()
        const name = parts[1].trim()
        const amountParts = amount.split(' ')
        const quantity = amountParts[0]
        const unit = amountParts.slice(1).join(' ') || ''
        return `  - name: "${name}"
    amount: "${quantity}"
    unit: "${unit}"`
      } else {
        return `  - name: "${trimmedLine}"
    amount: "1"
    unit: "piece"`
      }
    }).join('\n')

    // Parse instructions (extract steps from numbered format)
    const instructionsList = formData.instructions.split('\n').filter(line => line.trim()).map((line, index) => {
      const trimmedLine = line.trim()
      const stepNumber = index + 1
      
      // Remove any existing step numbering
      const cleanLine = trimmedLine.replace(/^Step \d+:?\s*/i, '').replace(/^\d+\.\s*/, '')
      
      return `  - step: ${stepNumber}
    title: "Step ${stepNumber}"
    description: "${cleanLine}"`
    }).join('\n')

    // Parse FAQs
    const faqsList = formData.faqs.split('\n\n').filter(block => block.trim()).map(block => {
      const lines = block.trim().split('\n')
      const question = lines[0].replace(/^Q\d*:?\s*/i, '').trim()
      const answer = lines.slice(1).join(' ').trim()
      return `  - question: "${question}"
    answer: "${answer}"`
    }).join('\n')

    const tagsArray = formData.tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')

    // Parse list items (Why This Works, Pro Tips, etc.)
    const parseListItems = (text: string) => {
      return text.split('\n').filter(line => line.trim()).map(line => {
        const cleaned = line.trim().replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, '')
        return `  - "${cleaned}"`
      }).join('\n')
    }

    return `---
title: "${formData.title}"
description: "${formData.description}"
coverImage: "${formData.heroImage || `/images/recipes/${slug}.jpg`}"
category: "${formData.category}"
tags: [${tagsArray}]
prepTime: "${formData.prepTime}"
cookTime: "${formData.cookTime}"
totalTime: "${formData.prepTime}"
servings: ${formData.servings || 4}
difficulty: "${formData.difficulty}"
rating: ${formData.rating}
featured: ${formData.featured}
status: "${formData.status}"${formData.youtubeVideoId ? `
youtubeVideoId: "${formData.youtubeVideoId}"` : ''}
publishedAt: "${currentDate}"
updatedAt: "${currentDate}"
author:
  name: "Neera"
  bio: "Passionate home cook and recipe creator"
  avatar: "/brand/neerafoodlab_favicon.png"${formData.ingredients ? `
ingredients:
${ingredientsList}` : ''}${formData.instructions ? `
instructions:
${instructionsList}` : ''}
nutrition:
  calories: ${formData.calories || 0}
  protein: ${formData.protein || 0}
  carbs: ${formData.carbs || 0}
  fat: ${formData.fat || 0}
  fiber: ${formData.fiber || 0}
seo:
  metaTitle: "${formData.seoTitle || formData.title + ' - Neera Food Lab'}"
  metaDescription: "${formData.metaDescription || formData.description}"
  keywords: [${tagsArray}]${formData.introduction ? `
introduction: "${formData.introduction}"` : ''}${formData.history ? `
history: "${formData.history}"` : ''}${formData.whyThisWorks ? `
whyThisWorks:
${parseListItems(formData.whyThisWorks)}` : ''}${formData.proTips ? `
proTips:
${parseListItems(formData.proTips)}` : ''}${formData.servingSuggestions ? `
servingSuggestions:
${parseListItems(formData.servingSuggestions)}` : ''}${formData.storageInstructions ? `
storageInstructions:
${parseListItems(formData.storageInstructions)}` : ''}${faqsList ? `
faqs:
${faqsList}` : ''}${formData.conclusion ? `
conclusion: "${formData.conclusion}"` : ''}
---

${formData.seoTitle ? `# ${formData.seoTitle}` : `# ${formData.title}`}

${formData.introduction || formData.description}

${formData.history ? `## Introduction & History

${formData.history}` : ''}

${formData.ingredients ? `## Ingredients for ${formData.title}

${formData.ingredients.split('\n').filter(line => line.trim()).map(line => `${line.trim()}`).join('\n\n')}` : ''}

${formData.instructions ? `## Method

${formData.instructions.split('\n').filter(line => line.trim()).map((line, index) => {
  const stepNumber = index + 1
  const cleanLine = line.trim().replace(/^Step \d+:?\s*/i, '').replace(/^\d+\.\s*/, '')
  return `### Step ${stepNumber}: ${cleanLine.split(' ').slice(0, 5).join(' ')}...

${cleanLine}`
}).join('\n\n')}` : ''}

${formData.whyThisWorks ? `## Why This Recipe Works

${formData.whyThisWorks.split('\n').filter(line => line.trim()).map(line => `- ${line.trim().replace(/^[-*]\s*/, '')}`).join('\n')}` : ''}

${formData.proTips ? `## Pro Tips for Perfect ${formData.title}

${formData.proTips.split('\n').filter(line => line.trim()).map(line => `${line.trim().replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, '')}`).join('\n\n')}` : ''}

${formData.faqs ? `## FAQs

${formData.faqs.split('\n\n').filter(block => block.trim()).map(block => {
  const lines = block.trim().split('\n')
  const question = lines[0].replace(/^Q\d*:?\s*/i, '').trim()
  const answer = lines.slice(1).join(' ').trim()
  return `**${question}**
${answer}`
}).join('\n\n')}` : ''}

${formData.servingSuggestions ? `## Serving Suggestions

${formData.servingSuggestions.split('\n').filter(line => line.trim()).map(line => `${line.trim().replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, '')}`).join('\n\n')}` : ''}

${formData.storageInstructions ? `## Storage Instructions

${formData.storageInstructions.split('\n').filter(line => line.trim()).map(line => `${line.trim().replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, '')}`).join('\n\n')}` : ''}

${formData.conclusion ? `## Conclusion

${formData.conclusion}` : ''}`
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      setSubmitMessage('❌ Please fill in at least Title and Description')
      return
    }

    setIsSubmitting(true)
    try {
      const markdownContent = generateMarkdownContent()
      const slug = existingFilename || formData.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
      
      // Copy to clipboard
      await navigator.clipboard.writeText(markdownContent)
      
      // Try to save to file system via API
      try {
        const response = await fetch('/api/recipes/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filename: slug,
            content: markdownContent
          })
        })

        if (response.ok) {
          setSubmitMessage(`✅ Recipe ${isEditing ? 'updated' : 'created'} and saved successfully! 

💾 File saved to: content/recipes/${slug}.md
📋 Content also copied to clipboard as backup
🖼️ Add image as: public/images/recipes/${slug}.jpg

🔄 The page will refresh in 3 seconds to show your changes...`)
          
          // Refresh the page after a delay to show the updated recipe
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        } else {
          throw new Error('Failed to save file')
        }
      } catch (saveError) {
        console.error('Save error:', saveError)
        setSubmitMessage(`⚠️ Recipe ${isEditing ? 'updated' : 'created'} but auto-save failed.

📋 Markdown content copied to clipboard.
📝 Manual step required:
1. Open your code editor
2. Create/edit file: content/recipes/${slug}.md
3. Paste the clipboard content (Cmd+V)
4. Save the file
🖼️ Add image as: public/images/recipes/${slug}.jpg`)
      }
      
      if (onSave) {
        onSave(formData)
      }
      
    } catch (error) {
      setSubmitMessage('❌ Error generating recipe. Please try again.')
    }
    setIsSubmitting(false)
  }

  const tabs = [
    { id: 'basic', label: '📝 Basic Info', icon: '📝' },
    { id: 'content', label: '📖 Content', icon: '📖' },
    { id: 'ingredients', label: '🥘 Ingredients', icon: '🥘' },
    { id: 'instructions', label: '📋 Method', icon: '📋' },
    { id: 'seo', label: '🔍 SEO & Meta', icon: '🔍' },
    { id: 'nutrition', label: '🍎 Nutrition', icon: '🍎' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Pyaaz ki Kachori"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description that appears in search results and cards..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="e.g., kachori, rajasthani, snack, crispy"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time</label>
                  <input
                    type="text"
                    value={formData.prepTime}
                    onChange={(e) => handleInputChange('prepTime', e.target.value)}
                    placeholder="30 mins"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cook Time</label>
                  <input
                    type="text"
                    value={formData.cookTime}
                    onChange={(e) => handleInputChange('cookTime', e.target.value)}
                    placeholder="20 mins"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Servings</label>
                  <input
                    type="number"
                    value={formData.servings}
                    onChange={(e) => handleInputChange('servings', e.target.value)}
                    placeholder="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => handleInputChange('rating', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL</label>
                  <input
                    type="url"
                    value={formData.heroImage}
                    onChange={(e) => handleInputChange('heroImage', e.target.value)}
                    placeholder="https://example.com/your-image.jpg"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">YouTube Video URL</label>
                  <input
                    type="url"
                    value={formData.youtubeVideoId}
                    onChange={(e) => {
                      const url = e.target.value
                      // Extract video ID from YouTube URL
                      let videoId = ''
                      if (url) {
                        const patterns = [
                          /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
                          /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
                          /(?:youtube\.com\/v\/)([^&\n?#]+)/,
                          /(?:youtu\.be\/)([^&\n?#]+)/,
                          /(?:youtube\.com\/shorts\/)([^&\n?#]+)/
                        ]
                        
                        for (const pattern of patterns) {
                          const match = url.match(pattern)
                          if (match && match[1]) {
                            videoId = match[1]
                            break
                          }
                        }
                        
                        // If no pattern matches, check if it's already a video ID
                        if (!videoId && url.length === 11 && /^[a-zA-Z0-9_-]+$/.test(url)) {
                          videoId = url
                        }
                      }
                      
                      handleInputChange('youtubeVideoId', videoId || url)
                    }}
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/... or video ID"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {formData.youtubeVideoId && formData.youtubeVideoId.length === 11 && (
                    <p className="text-xs text-green-600 mt-1">
                      ✅ Video ID extracted: {formData.youtubeVideoId}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured Recipe</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">💾 Draft</option>
                    <option value="published">🌟 Published</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )

      case 'content':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Introduction & History</label>
              <textarea
                value={formData.introduction}
                onChange={(e) => handleInputChange('introduction', e.target.value)}
                placeholder="Write about the origin, cultural significance, and background of this recipe..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">This will appear as the main introduction of your recipe article.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Why This Recipe Works</label>
              <textarea
                value={formData.whyThisWorks}
                onChange={(e) => handleInputChange('whyThisWorks', e.target.value)}
                placeholder="- Authentic flavors with traditional ingredients
- Easy to follow step-by-step instructions
- Customizable spice levels
- Perfect texture and consistency"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Enter one point per line. Use dashes or numbers.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pro Tips</label>
              <textarea
                value={formData.proTips}
                onChange={(e) => handleInputChange('proTips', e.target.value)}
                placeholder="Fry on low flame for a crispy, flaky crust.
Don't overstuff or the kachori may burst.
Add amchur powder for extra tanginess.
Resting the dough ensures softness and crispiness."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Enter one tip per line.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Serving Suggestions</label>
              <textarea
                value={formData.servingSuggestions}
                onChange={(e) => handleInputChange('servingSuggestions', e.target.value)}
                placeholder="Serve with tamarind chutney
Pair with green chutney
Great with aloo sabzi
Perfect with masala chai"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Storage Instructions</label>
              <textarea
                value={formData.storageInstructions}
                onChange={(e) => handleInputChange('storageInstructions', e.target.value)}
                placeholder="Store in refrigerator for up to 3 days
Reheat in oven for best texture
Can be frozen for up to 1 month"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">FAQs</label>
              <textarea
                value={formData.faqs}
                onChange={(e) => handleInputChange('faqs', e.target.value)}
                placeholder="Q1: Can I bake Pyaaz ki Kachori?
Yes, bake at 180°C for 25–30 minutes, brushing lightly with oil.

Q2: Can I make the filling in advance?
Yes, refrigerate for up to 2 days.

Q3: Why is my kachori not crispy?
It usually happens if oil is too hot—always fry on low to medium heat."
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Format: Question on first line, answer on following lines. Separate Q&As with blank lines.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Conclusion</label>
              <textarea
                value={formData.conclusion}
                onChange={(e) => handleInputChange('conclusion', e.target.value)}
                placeholder="Write a concluding paragraph that wraps up the recipe, its cultural significance, and encourages readers to try it..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )

      case 'ingredients':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
              <p className="text-sm text-gray-600 mb-3">
                Enter ingredients as shown in your example. Format: &ldquo;Quantity &ndash; Ingredient name&rdquo; (one per line)
              </p>
              <textarea
                value={formData.ingredients}
                onChange={(e) => handleInputChange('ingredients', e.target.value)}
                placeholder="Coriander seeds – 1 tbsp
Fennel seeds – 1 tbsp
Cumin seeds – 1 tbsp
Black pepper – 6–7
Green chillies – 2, finely chopped
Ginger – 1 inch, grated
Onion – 1 large, finely chopped
Boiled potatoes – 4, mashed
Besan (gram flour) – 2 tbsp
Turmeric powder – ½ tbsp
Red chilli powder – ½ tbsp
Garam masala – ½ tbsp
Sugar – ½ tbsp
Lemon juice – to taste
Fresh coriander – chopped
Oil – as needed
Salt – to taste"
                rows={15}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use the format from your example: &ldquo;Quantity &ndash; Ingredient description&rdquo;. Each ingredient on a new line.
              </p>
            </div>
          </div>
        )

      case 'instructions':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cooking Instructions</label>
              <p className="text-sm text-gray-600 mb-3">
                Enter cooking steps (one per line). Steps will be automatically numbered.
              </p>
              <textarea
                value={formData.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                placeholder="In a bowl, mix maida, ajwain, salt, and oil.
Rub until crumbly.
Gradually add water to form a soft dough.
Cover and rest for 15 minutes.
Coarsely grind coriander, fennel, cumin, and black pepper.
Heat oil in a pan, add ground spices.
Add green chillies and ginger, sauté briefly.
Add onions and cook until soft.
Mix in turmeric, chilli powder, and besan. Stir well.
Add potatoes, salt, sugar, garam masala, lemon juice, and coriander.
Cook 2–3 minutes, cool completely.
Divide dough and filling into equal portions.
Roll dough slightly, place filling, and seal edges.
Gently flatten into a kachori shape.
Heat oil on low-medium flame.
Fry kachoris until golden and crisp.
Drain on paper towels.
Serve hot with tamarind or green chutney."
                rows={15}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter one step per line. Steps will be automatically numbered in the final output.<br/>
                <strong>Note:</strong> To add images to steps, manually edit the markdown file to include image URLs in the instructions array.
              </p>
            </div>
          </div>
        )

      case 'seo':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                placeholder="🔥 How to Make Pyaaz ki Kachori at Home | Crispy Rajasthani Snack Recipe"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">This will be used as the H1 heading and browser title. Include emojis and keywords.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                placeholder="Learn how to make authentic Pyaaz ki Kachori at home with this easy recipe. Crispy, flaky, and stuffed with a spicy onion filling, this Rajasthani snack is perfect for tea-time or festive occasions."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">This appears in search results. Keep it under 160 characters and include main keywords.</p>
            </div>
          </div>
        )

      case 'nutrition':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nutrition Information (Optional)</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Calories</label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => handleInputChange('calories', e.target.value)}
                    placeholder="420"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Protein (g)</label>
                  <input
                    type="number"
                    value={formData.protein}
                    onChange={(e) => handleInputChange('protein', e.target.value)}
                    placeholder="35"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Carbs (g)</label>
                  <input
                    type="number"
                    value={formData.carbs}
                    onChange={(e) => handleInputChange('carbs', e.target.value)}
                    placeholder="12"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fat (g)</label>
                  <input
                    type="number"
                    value={formData.fat}
                    onChange={(e) => handleInputChange('fat', e.target.value)}
                    placeholder="28"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fiber (g)</label>
                  <input
                    type="number"
                    value={formData.fiber}
                    onChange={(e) => handleInputChange('fiber', e.target.value)}
                    placeholder="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isEditing ? '✏️ Edit Recipe' : '➕ Create New Recipe'}
        </h1>
        <p className="text-gray-600">
          Create comprehensive recipes with all content sections matching your article format.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {renderTabContent()}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={() => setFormData({
            title: '', description: '', category: '', tags: '', seoTitle: '', metaDescription: '',
            heroImage: '', youtubeVideoId: '', prepTime: '', cookTime: '', servings: '',
            difficulty: 'Medium', rating: '4.5', featured: false, status: 'draft',
            introduction: '', history: '', whyThisWorks: '', proTips: '', servingSuggestions: '',
            storageInstructions: '', conclusion: '', ingredients: '', instructions: '', faqs: '',
            calories: '', protein: '', carbs: '', fat: '', fiber: ''
          })}
          className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
        >
          Clear Form
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium"
        >
          {isSubmitting ? 'Generating...' : (isEditing ? '💾 Update Recipe' : '📋 Create Recipe')}
        </button>
      </div>

      {/* Submit Message */}
      {submitMessage && (
        <div className={`mt-6 p-4 rounded-lg ${
          submitMessage.includes('❌') 
            ? 'bg-red-50 border border-red-200 text-red-700' 
            : 'bg-green-50 border border-green-200 text-green-700'
        }`}>
          <div className="whitespace-pre-line text-sm">
            {submitMessage}
          </div>
        </div>
      )}
    </div>
  )
}
