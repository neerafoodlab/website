'use client'

import { useState } from 'react'
import Link from 'next/link'
import EasyRecipeForm from '@/components/EasyRecipeForm'

export default function AdminPage() {
  const [currentView, setCurrentView] = useState('dashboard')

  const AdminDashboard = () => (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
          Neera Food Lab Admin
        </h1>
        <p style={{ color: '#6b7280' }}>
          Manage your recipes, content, and site settings
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
            Recipes
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Manage your recipe collection
          </p>
          <button
            onClick={() => setCurrentView('recipes')}
            style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            View Recipes
          </button>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
            Content
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Edit pages and content
          </p>
          <button
            onClick={() => setCurrentView('content')}
            style={{
              backgroundColor: '#059669',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Edit Content
          </button>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
            Settings
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Configure site settings
          </p>
          <button
            onClick={() => setCurrentView('settings')}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Site Settings
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
          Quick Stats
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7c3aed' }}>5</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Recipes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>3</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Categories</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>1</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Pages</div>
          </div>
        </div>
      </div>
    </div>
  )

  const RecipesView = () => (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setCurrentView('dashboard')}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1rem',
            fontSize: '0.875rem'
          }}
        >
          ← Back to Dashboard
        </button>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
          Add New Recipe - Easy Form
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          Fill out the form below to add a new recipe. Just copy and paste your content!
        </p>
      </div>

      <EasyRecipeForm />
    </div>
  )

  const ContentView = () => (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setCurrentView('dashboard')}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1rem',
            fontSize: '0.875rem'
          }}
        >
          ← Back to Dashboard
        </button>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
          Content Management
        </h2>
      </div>

      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          Content management is currently available through file editing. You can edit page files in the <code>content/pages/</code> directory.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link
            href="/content/pages"
            style={{
              backgroundColor: '#059669',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            View Page Files
          </Link>
          <Link
            href="/content/settings"
            style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            View Settings
          </Link>
        </div>
      </div>
    </div>
  )

  const SettingsView = () => (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setCurrentView('dashboard')}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1rem',
            fontSize: '0.875rem'
          }}
        >
          ← Back to Dashboard
        </button>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
          Site Settings
        </h2>
      </div>

      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          Site settings can be edited in the <code>content/settings/site.json</code> file.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link
            href="/content/settings"
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            View Settings File
          </Link>
          <Link
            href="/admin"
            style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {currentView === 'dashboard' && <AdminDashboard />}
      {currentView === 'recipes' && <RecipesView />}
      {currentView === 'content' && <ContentView />}
      {currentView === 'settings' && <SettingsView />}
    </div>
  )
}