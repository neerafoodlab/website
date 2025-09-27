import { getAllRecipes } from '@/lib/recipes'
import AdminPageClient from '@/components/AdminPageClient'

export default async function AdminPage() {
  // Fetch recipes server-side where fs is available
  const recipes = getAllRecipes(true) // Include unpublished recipes for admin

  return <AdminPageClient recipes={recipes} />
}