'use client'

import { useState } from 'react'
import { Recipe } from '@/types/recipe'
import AdminDashboard from '@/components/AdminDashboard'
import PageManagement from '@/components/PageManagement'
import SettingsManagement from '@/components/SettingsManagement'

interface AdminPageClientProps {
  recipes: Recipe[]
}

export default function AdminPageClient({ recipes }: AdminPageClientProps) {
  const [currentView, setCurrentView] = useState('dashboard')

  const renderView = () => {
    switch (currentView) {
      case 'recipes':
        return <AdminDashboard initialRecipes={recipes} />
      case 'pages':
        return <PageManagement />
      case 'settings':
        return <SettingsManagement />
      default:
        return <DashboardView recipes={recipes} setCurrentView={setCurrentView} />
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
              Neera Food Lab Admin
            </h1>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setCurrentView('dashboard')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: currentView === 'dashboard' ? '#3b82f6' : 'transparent',
                  color: currentView === 'dashboard' ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('recipes')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: currentView === 'recipes' ? '#3b82f6' : 'transparent',
                  color: currentView === 'recipes' ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Manage Recipes
              </button>
              <a
                href="/content/recipes"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                + Add Recipe
              </a>
              <button
                onClick={() => setCurrentView('pages')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: currentView === 'pages' ? '#3b82f6' : 'transparent',
                  color: currentView === 'pages' ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Pages
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: currentView === 'settings' ? '#3b82f6' : 'transparent',
                  color: currentView === 'settings' ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: currentView === 'recipes' ? '0' : '2rem 1rem' }}>
        {renderView()}
      </main>
    </div>
  )
}

// Dashboard View
const DashboardView = ({ recipes, setCurrentView }: { recipes: Recipe[], setCurrentView: (view: string) => void }) => {
  const publishedCount = recipes.filter(r => r.status === 'published').length
  const draftCount = recipes.filter(r => r.status === 'draft').length
  const featuredCount = recipes.filter(r => r.featured && r.status === 'published').length

  return (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
        Welcome to Admin Dashboard
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Manage your recipes, content, and website settings from here.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>Recipe Stats</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem', color: '#374151', display: 'flex', justifyContent: 'space-between' }}>
              <span>📝 Total Recipes</span>
              <strong>{recipes.length}</strong>
            </li>
            <li style={{ marginBottom: '0.5rem', color: '#374151', display: 'flex', justifyContent: 'space-between' }}>
              <span>🌟 Published</span>
              <strong style={{ color: '#10b981' }}>{publishedCount}</strong>
            </li>
            <li style={{ marginBottom: '0.5rem', color: '#374151', display: 'flex', justifyContent: 'space-between' }}>
              <span>💾 Drafts</span>
              <strong style={{ color: '#f59e0b' }}>{draftCount}</strong>
            </li>
            <li style={{ marginBottom: '0.5rem', color: '#374151', display: 'flex', justifyContent: 'space-between' }}>
              <span>⭐ Featured</span>
              <strong style={{ color: '#8b5cf6' }}>{featuredCount}</strong>
            </li>
          </ul>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>Recent Activity</h3>
          <div style={{ color: '#6b7280' }}>
            {recipes.slice(0, 3).map((recipe, index) => (
              <div key={index} style={{ 
                padding: '0.5rem 0', 
                borderBottom: index < 2 ? '1px solid #f3f4f6' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.875rem', flex: 1 }}>{recipe.title}</span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '0.375rem',
                  backgroundColor: recipe.status === 'published' ? '#dcfce7' : '#fef3c7',
                  color: recipe.status === 'published' ? '#166534' : '#92400e'
                }}>
                  {recipe.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a 
              href="/content/recipes"
              style={{ padding: '0.75rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'none', display: 'block', textAlign: 'center' }}
            >
              📝 Add New Recipe
            </a>
            <button 
              onClick={() => setCurrentView('recipes')}
              style={{ padding: '0.75rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.875rem' }}
            >
              🍽️ Manage Recipes
            </button>
            <button 
              onClick={() => setCurrentView('pages')}
              style={{ padding: '0.75rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.875rem' }}
            >
              📄 Manage Pages
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

