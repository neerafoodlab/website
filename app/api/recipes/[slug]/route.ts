import { NextRequest, NextResponse } from 'next/server'
import { getRecipeBySlug, getAllRecipes } from '@/lib/recipes'
import fs from 'fs'
import path from 'path'

const recipesDirectory = path.join(process.cwd(), 'content/recipes')

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const recipe = getRecipeBySlug(params.slug)

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
    }

    return NextResponse.json(recipe)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recipe' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    const { slug: newSlug } = body

    if (!newSlug || typeof newSlug !== 'string') {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
    }

    // Check if new slug already exists
    const existingRecipe = getRecipeBySlug(newSlug)
    if (existingRecipe) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }

    // Get current recipe
    const currentRecipe = getRecipeBySlug(params.slug)
    if (!currentRecipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
    }

    // Rename the file
    const oldPath = path.join(recipesDirectory, `${params.slug}.md`)
    const newPath = path.join(recipesDirectory, `${newSlug}.md`)

    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath)
    }

    // Update the recipe object with new slug
    const updatedRecipe = { ...currentRecipe, slug: newSlug }

    return NextResponse.json({
      message: 'Slug updated successfully',
      recipe: updatedRecipe
    })
  } catch (error) {
    console.error('Error updating recipe slug:', error)
    return NextResponse.json(
      { error: 'Failed to update recipe slug' },
      { status: 500 }
    )
  }
}
