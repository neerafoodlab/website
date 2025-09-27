import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface PageFrontmatter {
  title: string
  description: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: string
}

interface PageFile {
  filename: string
  frontmatter: PageFrontmatter
  content: string
}

async function getPages(): Promise<PageFile[]> {
  const pagesDirectory = path.join(process.cwd(), 'content/pages')
  const filenames = fs.readdirSync(pagesDirectory)

  const pages = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(pagesDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        filename: filename.replace('.md', ''),
        frontmatter: data as PageFrontmatter,
        content
      }
    })

  return pages
}

export default async function PagesPage() {
  const pages = await getPages()

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
          Page Files
        </h1>
        <p style={{ color: '#6b7280' }}>
          Edit these markdown files to update your site pages. Files are located in <code>content/pages/</code>
        </p>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {pages.map((page) => (
          <div
            key={page.filename}
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
                  {page.frontmatter.title || page.filename}
                </h2>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {page.frontmatter.description}
                </p>
                {page.frontmatter.heroTitle && (
                  <p style={{ color: '#374151', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    Hero: {page.frontmatter.heroTitle}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link
                  href={`/${page.filename}`}
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
                  View Page
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
                  content/pages/{page.filename}.md
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                File: {page.filename}.md
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
                {page.content.substring(0, 500)}{page.content.length > 500 ? '...' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
          How to Edit Pages
        </h3>
        <ol style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
          <li>1. Open your code editor</li>
          <li>2. Navigate to the <code>content/pages/</code> directory</li>
          <li>3. Edit the markdown files (.md) directly</li>
          <li>4. Save the file - changes will be reflected on the site</li>
          <li>5. Use the &quot;Copy Path&quot; button above to quickly find the file</li>
        </ol>
      </div>
    </div>
  )
}
