import fs from 'fs'
import path from 'path'
import Link from 'next/link'

interface SiteSettings {
  name: string
  description: string
  logo: string
  favicon: string
  social: {
    facebook: string
    instagram: string
    twitter: string
    youtube: string
  }
}

async function getSettings(): Promise<SiteSettings | null> {
  try {
    const settingsPath = path.join(process.cwd(), 'content/settings/site.json')
    const settingsContent = fs.readFileSync(settingsPath, 'utf8')
    return JSON.parse(settingsContent) as SiteSettings
  } catch (error) {
    console.error('Failed to load settings:', error)
    return null
  }
}

export default async function SettingsPage() {
  const settings = await getSettings()

  if (!settings) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
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
        <div style={{
          backgroundColor: '#fef2f2',
          color: '#dc2626',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          border: '1px solid #fecaca'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Settings File Not Found
          </h2>
          <p>Could not load site settings. Please check that <code>content/settings/site.json</code> exists.</p>
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
          Site Settings
        </h1>
        <p style={{ color: '#6b7280' }}>
          Edit this JSON file to update your site configuration. File is located at <code>content/settings/site.json</code>
        </p>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
              Site Configuration
            </h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              {settings.description}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link
              href="/"
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
              View Site
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
              content/settings/site.json
            </span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            File: site.json
          </h3>

          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Site Name
                </label>
                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  color: '#374151',
                  border: '1px solid #e5e7eb'
                }}>
                  {settings.name}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Logo
                </label>
                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  color: '#374151',
                  border: '1px solid #e5e7eb',
                  fontFamily: 'monospace'
                }}>
                  {settings.logo}
                </div>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                Description
              </label>
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                color: '#374151',
                border: '1px solid #e5e7eb'
              }}>
                {settings.description}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Facebook
                </label>
                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  color: '#374151',
                  border: '1px solid #e5e7eb'
                }}>
                  {settings.social.facebook || 'Not set'}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Instagram
                </label>
                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  color: '#374151',
                  border: '1px solid #e5e7eb'
                }}>
                  {settings.social.instagram || 'Not set'}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  Twitter
                </label>
                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  color: '#374151',
                  border: '1px solid #e5e7eb'
                }}>
                  {settings.social.twitter || 'Not set'}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                  YouTube
                </label>
                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  color: '#374151',
                  border: '1px solid #e5e7eb'
                }}>
                  {settings.social.youtube || 'Not set'}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#f9fafb',
              padding: '1rem',
              borderRadius: '0.375rem',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: '#374151',
              whiteSpace: 'pre-wrap',
              border: '1px solid #e5e7eb',
              marginTop: '1rem'
            }}
          >
            {JSON.stringify(settings, null, 2)}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
          How to Edit Settings
        </h3>
        <ol style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
          <li>1. Open your code editor</li>
          <li>2. Open <code>content/settings/site.json</code></li>
          <li>3. Edit the JSON values directly</li>
          <li>4. Save the file - changes will be reflected on the site</li>
          <li>5. Use the &quot;Copy Path&quot; button above to quickly find the file</li>
        </ol>
      </div>
    </div>
  )
}
