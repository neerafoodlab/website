import Hero from '@/components/Hero'
import StatsSection from '@/components/StatsSection'
import FeaturedRecipes from '@/components/FeaturedRecipes'
import Categories from '@/components/Categories'
import Newsletter from '@/components/Newsletter'
import { getFeaturedRecipes, getAllRecipes } from '@/lib/recipes'

export default async function Home() {
  const featuredRecipes = await getFeaturedRecipes()
  const allRecipes = await getAllRecipes()
  
  // Get the most featured recipe for main hero
  const mainFeaturedRecipe = featuredRecipes[0]
  
  // Get latest recipes (sorted by published date)
  const latestRecipes = allRecipes.slice(0, 6)

  return (
    <div className="min-h-screen">
      <Hero 
        featuredRecipe={mainFeaturedRecipe}
        latestRecipes={latestRecipes}
      />
      <StatsSection />
      <FeaturedRecipes recipes={featuredRecipes} />
      <Categories />
      <Newsletter />
    </div>
  )
}
