import { NextResponse } from 'next/server'
import { getAllRecipes } from '@/lib/recipes'

export async function GET() {
  try {
    const recipes = getAllRecipes()
    return NextResponse.json(recipes)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    )
  }
}
