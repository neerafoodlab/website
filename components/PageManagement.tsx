'use client'

import { useState, useEffect } from 'react'
import { Edit, Save, X, CheckCircle, AlertCircle } from 'lucide-react'

interface PageData {
  title: string
  description: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  content: string
}

interface FeedbackMessage {
  type: 'success' | 'error' | 'info'
  message: string
  visible: boolean
}

const PageManagement = () => {
  const [pageData, setPageData] = useState<PageData>({
    title: "Welcome to Neera Food Lab",
    description: "Discover authentic Indian recipes and culinary traditions",
    heroTitle: "Discover the Magic of Indian Cooking",
    heroSubtitle: "From traditional family recipes to modern twists, explore our collection of authentic Indian dishes.",
    heroImage: "/images/hero-dish.jpg",
    content: `# Welcome to Neera Food Lab

Explore our collection of authentic Indian recipes, cooking tips, and food stories. From traditional family recipes to modern twists, find your next favorite dish.

## Featured Recipes

Browse our most popular recipes loved by thousands of home cooks.

## Cooking Tips

Learn essential Indian cooking techniques and kitchen secrets.

## About Neera

Passionate home cook sharing authentic Indian cuisine with the world.`
  })

  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState('')
  const [feedback, setFeedback] = useState<FeedbackMessage>({ type: 'info', message: '', visible: false })

  const showFeedback = (type: FeedbackMessage['type'], message: string) => {
    setFeedback({ type, message, visible: true })
    setTimeout(() => setFeedback(prev => ({ ...prev, visible: false })), 3000)
  }

  const handleEdit = (field: string, value: string) => {
    setEditingField(field)
    setTempValue(value)
  }

  const handleSave = (field: string) => {
    setPageData(prev => ({ ...prev, [field]: tempValue }))
    setEditingField(null)
    setTempValue('')
    showFeedback('success', `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`)
  }

  const handleCancel = () => {
    setEditingField(null)
    setTempValue('')
  }

  const generateMarkdown = () => {
    return `---
title: "${pageData.title}"
description: "${pageData.description}"
heroTitle: "${pageData.heroTitle}"
heroSubtitle: "${pageData.heroSubtitle}"
heroImage: "${pageData.heroImage}"
---

${pageData.content}
`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateMarkdown())
      showFeedback('success', 'Page content copied to clipboard! Save this to content/pages/homepage.md')
    } catch (error) {
      showFeedback('error', 'Failed to copy to clipboard')
    }
  }

  const renderField = (label: string, field: keyof PageData, isTextarea = false) => {
    const value = pageData[field]
    const isEditing = editingField === field

    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
          {label}
        </label>
        {isEditing ? (
          <div>
            {isTextarea ? (
              <textarea
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                rows={8}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #3b82f6',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace'
                }}
              />
            ) : (
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #3b82f6',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              />
            )}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => handleSave(field)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <div
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                whiteSpace: isTextarea ? 'pre-wrap' : 'nowrap',
                overflow: isTextarea ? 'visible' : 'hidden',
                textOverflow: isTextarea ? 'unset' : 'ellipsis'
              }}
            >
              {value}
            </div>
            <button
              onClick={() => handleEdit(field, value)}
              style={{
                padding: '0.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
        Pages Management
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Edit your website pages content including homepage sections, hero text, and page descriptions.
      </p>

      {/* Feedback Message */}
      {feedback.visible && (
        <div style={{
          marginBottom: '1rem',
          padding: '0.75rem 1rem',
          borderRadius: '0.375rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: feedback.type === 'success' ? '#dcfce7' : feedback.type === 'error' ? '#fef2f2' : '#dbeafe',
          color: feedback.type === 'success' ? '#166534' : feedback.type === 'error' ? '#dc2626' : '#1d4ed8'
        }}>
          {feedback.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {feedback.message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Homepage Content */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#111827' }}>
            📄 Homepage Content
          </h3>

          {renderField('Page Title', 'title')}
          {renderField('Page Description', 'description')}
          {renderField('Hero Title', 'heroTitle')}
          {renderField('Hero Subtitle', 'heroSubtitle')}
          {renderField('Hero Image URL', 'heroImage')}
          {renderField('Page Content (Markdown)', 'content', true)}

          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <button
              onClick={copyToClipboard}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              📋 Copy Updated Content to Clipboard
            </button>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
              After copying, save the content to <code>content/pages/homepage.md</code> to apply changes.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#111827' }}>
            🚀 Quick Actions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.375rem' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>Homepage</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Edit hero section and main content</p>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '500' }}>✓ Available above</span>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.375rem' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>About Page</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Managed via file editing</p>
              <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: '500' }}>📁 File-based</span>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.375rem' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>Contact Page</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Contact form and info</p>
              <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: '500' }}>📁 File-based</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageManagement
