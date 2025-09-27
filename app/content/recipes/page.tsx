import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

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

  if (recipes.length === 0) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link
            href="/admin"
            style={{
              backgroundColor: '#6b7280',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontSize: '0.875rem',
              display: 'inline-block',
              marginBottom: '1rem'
            }}
          >
            ← Back to Admin
          </Link>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Recipe Files
          </h1>
        </div>

        <div style={{
          backgroundColor: '#fef2f2',
          color: '#dc2626',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          border: '1px solid #fecaca'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            No Recipe Files Found
          </h2>
          <p>Could not load recipe files. Please check that the <code>content/recipes/</code> directory exists and contains markdown files.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link
          href="/admin"
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontSize: '0.875rem',
            display: 'inline-block',
            marginBottom: '1rem'
          }}
        >
          ← Back to Admin
        </Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
          Recipe Files
        </h1>
        <p style={{ color: '#6b7280' }}>
          Edit these markdown files to update your recipes. Files are located in <code>content/recipes/</code>
        </p>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {recipes.map((recipe) => (
          <div
            key={recipe.filename}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                  {recipe.frontmatter.title || recipe.filename}
                </h2>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {recipe.frontmatter.description}
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                  <span>Category: {recipe.frontmatter.category}</span>
                  <span>Difficulty: {recipe.frontmatter.difficulty}</span>
                  <span>Servings: {recipe.frontmatter.servings}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link
                  href={`/recipes/${recipe.filename}`}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  View Recipe
                </Link>
                <span
                  style={{
                    backgroundColor: '#f9fafb',
                    color: '#374151',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  content/recipes/{recipe.filename}.md
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                File: {recipe.filename}.md
              </h3>
              <div
                style={{
                  backgroundColor: '#f9fafb',
                  padding: '1rem',
                  borderRadius: '0.375rem',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: '#374151',
                  whiteSpace: 'pre-wrap',
                  maxHeight: '200px',
                  overflow: 'auto',
                  border: '1px solid #e5e7eb'
                }}
              >
                {recipe.content.substring(0, 500)}{recipe.content.length > 500 ? '...' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
          How to Edit Recipes
        </h3>
        <ol style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
          <li>1. Open your code editor</li>
          <li>2. Navigate to the <code>content/recipes/</code> directory</li>
          <li>3. Edit the markdown files (.md) directly</li>
          <li>4. Save the file - changes will be reflected on the site</li>
          <li>5. Use the "Copy Path" button above to quickly find the file</li>
        </ol>
      </div>
    </div>
  )
}
