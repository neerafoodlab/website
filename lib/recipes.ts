import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Recipe, RecipeCard } from '@/types/recipe'

const recipesDirectory = path.join(process.cwd(), 'content/recipes')

export function getAllRecipes(): Recipe[] {
  const fileNames = fs.readdirSync(recipesDirectory)
  const allRecipesData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const fullPath = path.join(recipesDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: name.replace(/\.md$/, ''),
        ...data,
        content,
      } as unknown as Recipe
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return allRecipesData
}

export function getFeaturedRecipes(): Recipe[] {
  const allRecipes = getAllRecipes()
  return allRecipes.filter(recipe => recipe.featured).slice(0, 6)
}

export function getRecipesByCategory(category: string): Recipe[] {
  const allRecipes = getAllRecipes()
  return allRecipes.filter(recipe => 
    recipe.category.toLowerCase() === category.toLowerCase()
  )
}

export function getRecipeBySlug(slug: string): Recipe | null {
  try {
    const fullPath = path.join(recipesDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      ...data,
      content,
    } as unknown as Recipe
  } catch (error) {
    return null
  }
}

export function getRelatedRecipes(currentSlug: string, category: string, limit: number = 3): Recipe[] {
  const allRecipes = getAllRecipes()
  return allRecipes
    .filter(recipe => 
      recipe.slug !== currentSlug && 
      recipe.category.toLowerCase() === category.toLowerCase()
    )
    .slice(0, limit)
}

export function searchRecipes(query: string): Recipe[] {
  const allRecipes = getAllRecipes()
  const lowercaseQuery = query.toLowerCase()
  
  return allRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(lowercaseQuery) ||
    recipe.description.toLowerCase().includes(lowercaseQuery) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    recipe.category.toLowerCase().includes(lowercaseQuery)
  )
}

export function getRecipeCards(recipes: Recipe[]): RecipeCard[] {
  return recipes.map(recipe => ({
    slug: recipe.slug,
    title: recipe.title,
    description: recipe.description,
    coverImage: recipe.coverImage,
    category: recipe.category,
    prepTime: recipe.prepTime,
    servings: recipe.servings,
    rating: recipe.rating,
    featured: recipe.featured,
    publishedAt: recipe.publishedAt,
  }))
}

export function getCategories() {
  const allRecipes = getAllRecipes()
  const categoryMap = new Map()
  
  allRecipes.forEach(recipe => {
    const category = recipe.category
    if (categoryMap.has(category)) {
      categoryMap.set(category, categoryMap.get(category) + 1)
    } else {
      categoryMap.set(category, 1)
    }
  })
  
  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    recipeCount: count
  }))
}
