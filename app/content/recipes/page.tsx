import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import RecipeManagementClient from '../../../components/RecipeManagementClient'

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

async function getRecipes(): Promise<RecipeFile[]> {
  try {
    const recipesDirectory = path.join(process.cwd(), 'content/recipes')

    // Check if directory exists
    if (!fs.existsSync(recipesDirectory)) {
      console.error('Recipes directory not found:', recipesDirectory)
      return []
    }

    const filenames = fs.readdirSync(recipesDirectory)
    console.log('Found recipe files:', filenames)

    const recipes = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        try {
          const filePath = path.join(recipesDirectory, filename)
          const fileContents = fs.readFileSync(filePath, 'utf8')
          const { data, content } = matter(fileContents)

          return {
            filename: filename.replace('.md', ''),
            frontmatter: data as RecipeFrontmatter,
            content
          }
        } catch (error) {
          console.error(`Error reading file ${filename}:`, error)
          return null
        }
      })
      .filter((recipe): recipe is RecipeFile => recipe !== null)

    return recipes
  } catch (error) {
    console.error('Error in getRecipes:', error)
    return []
  }
}

export default async function RecipesPage() {
  const recipes = await getRecipes()

  return (
    <div>
      <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
        <Link
          href="/admin"
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontSize: '0.875rem',
            display: 'inline-block'
          }}
        >
          ← Back to Admin
        </Link>
      </div>
      <RecipeManagementClient recipes={recipes} />
    </div>
  )
}
