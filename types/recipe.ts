export interface Recipe {
  slug: string
  title: string
  description: string
  coverImage: string
  category: string
  tags: string[]
  prepTime: string
  cookTime: string
  totalTime: string
  servings: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  rating: number
  featured: boolean
  youtubeVideoId?: string
  publishedAt: string
  updatedAt: string
  author: {
    name: string
    bio: string
    avatar: string
  }
  ingredients: {
    name: string
    amount: string
    unit?: string
  }[]
  instructions: {
    step: number
    title: string
    description: string
    image?: string
  }[]
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

export interface RecipeCard {
  slug: string
  title: string
  description: string
  coverImage: string
  category: string
  prepTime: string
  servings: number
  rating: number
  featured: boolean
  publishedAt: string
}

export interface Category {
  name: string
  slug: string
  description: string
  image: string
  recipeCount: number
}
