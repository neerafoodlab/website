'use client'

import { useState } from 'react'
import { Edit, Save, X, CheckCircle, AlertCircle, Globe, Share2, Settings, ImageIcon, Star } from 'lucide-react'

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

interface FeedbackMessage {
  type: 'success' | 'error' | 'info'
  message: string
  visible: boolean
}

const SettingsManagement = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    name: "Neera Food Lab",
    description: "Discover authentic Indian recipes, cooking tips, and food stories at Neera Food Lab.",
    logo: "/brand/neerafoodlab_logo.png",
    favicon: "/brand/neerafoodlab_favicon.png",
    social: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: ""
    }
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
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      if (parent === 'social') {
        setSettings(prev => ({
          ...prev,
          social: { ...prev.social, [child]: tempValue }
        }))
      }
    } else {
      setSettings(prev => ({ ...prev, [field]: tempValue }))
    }
    setEditingField(null)
    setTempValue('')
    showFeedback('success', `${field.replace('.', ' ')} updated successfully!`)
  }

  const handleCancel = () => {
    setEditingField(null)
    setTempValue('')
  }

  const generateJSON = () => {
    return JSON.stringify(settings, null, 2)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateJSON())
      showFeedback('success', 'Settings copied to clipboard! Save this to content/settings/site.json')
    } catch (error) {
      showFeedback('error', 'Failed to copy to clipboard')
    }
  }

  const getFieldValue = (field: string): string => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      if (parent === 'social') {
        return settings.social[child as keyof typeof settings.social] || ''
      }
    }
    return settings[field as keyof SiteSettings] as string
  }

  const renderField = (label: string, field: string, placeholder?: string, icon?: React.ReactNode) => {
    const value = getFieldValue(field)
    const isEditing = editingField === field

    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
          {icon}
          {label}
        </label>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              placeholder={placeholder}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #3b82f6',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            />
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                color: value ? '#374151' : '#9ca3af'
              }}
            >
              {value || placeholder || 'Not set'}
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
        Site Settings
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Configure your website settings including site information, branding, and social media links.
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
        {/* Site Information */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe className="w-5 h-5" />
            Site Information
          </h3>

          {renderField('Site Name', 'name', 'Your website name', <Settings className="w-4 h-4" />)}
          {renderField('Site Description', 'description', 'Brief description of your website')}
        </div>

        {/* Branding */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ImageIcon className="w-5 h-5" />
            Branding & Assets
          </h3>

          {renderField('Logo Path', 'logo', '/brand/neerafoodlab_logo.png', <ImageIcon className="w-4 h-4" />)}
          {renderField('Favicon Path', 'favicon', '/brand/neerafoodlab_favicon.png', <Star className="w-4 h-4" />)}

          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.375rem', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>Current Assets</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={settings.logo} alt="Site Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                <span>Logo</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={settings.favicon} alt="Site Favicon" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                <span>Favicon</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Share2 className="w-5 h-5" />
            Social Media Links
          </h3>

          {renderField('Facebook URL', 'social.facebook', 'https://facebook.com/yourpage')}
          {renderField('Instagram URL', 'social.instagram', 'https://instagram.com/youraccount')}
          {renderField('Twitter URL', 'social.twitter', 'https://twitter.com/youraccount')}
          {renderField('YouTube URL', 'social.youtube', 'https://youtube.com/yourchannel')}
        </div>

        {/* Export Settings */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#111827' }}>
            💾 Export Settings
          </h3>
          
          <div style={{ backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>Current Configuration</h4>
            <pre style={{ 
              fontSize: '0.75rem', 
              color: '#475569', 
              overflow: 'auto', 
              maxHeight: '200px',
              margin: 0,
              fontFamily: 'monospace'
            }}>
              {generateJSON()}
            </pre>
          </div>

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
            📋 Copy Settings to Clipboard
          </button>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
            After copying, save the content to <code>content/settings/site.json</code> to apply changes.
          </p>
        </div>

        {/* SEO & Meta Tags */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#111827' }}>
            🔍 SEO Information
          </h3>
          <div style={{ padding: '1rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.375rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
              SEO settings are currently configured in individual page files and the layout component.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
              <div>
                <strong>Meta Title:</strong> Dynamic per page
              </div>
              <div>
                <strong>Meta Description:</strong> From page/recipe content
              </div>
              <div>
                <strong>Open Graph:</strong> Configured per page
              </div>
              <div>
                <strong>Structured Data:</strong> Auto-generated for recipes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsManagement
