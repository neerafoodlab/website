import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { filename, content } = await request.json()
    
    if (!filename || !content) {
      return NextResponse.json(
        { error: 'Filename and content are required' },
        { status: 400 }
      )
    }

    // Validate filename to prevent directory traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      )
    }

    const recipesDirectory = path.join(process.cwd(), 'content/recipes')
    const filePath = path.join(recipesDirectory, `${filename}.md`)

    // Create directory if it doesn't exist
    if (!fs.existsSync(recipesDirectory)) {
      fs.mkdirSync(recipesDirectory, { recursive: true })
    }

    // Write the file
    fs.writeFileSync(filePath, content, 'utf8')

    return NextResponse.json(
      { success: true, message: `Recipe ${filename} saved successfully` },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error saving recipe:', error)
    return NextResponse.json(
      { error: 'Failed to save recipe' },
      { status: 500 }
    )
  }
}
