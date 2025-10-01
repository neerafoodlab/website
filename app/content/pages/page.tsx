'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'

export default function PagesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = getCurrentUser()
        setIsAuthenticated(!!user)
      } catch (error) {
        console.error('Auth check error:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need to log in to access this page.</p>
          <a
            href="/admin"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Manage Pages
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/admin"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Back to Dashboard
              </a>
              <button
                onClick={() => {
                  document.cookie = 'admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                  window.location.href = '/'
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Page Management</h1>
          <p className="text-gray-600 mt-2">Edit your website pages by modifying the markdown files in the content/pages/ directory.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Pages</h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">Homepage</h3>
                  <p className="text-sm text-gray-600 mt-1">Main landing page of your website</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href="/"
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    View Page
                  </a>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono">
                    content/pages/homepage.md
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">How to Edit Pages</h3>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Open your code editor</li>
              <li>2. Navigate to the <code className="bg-blue-100 px-1 rounded">content/pages/</code> directory</li>
              <li>3. Edit the markdown files (.md) directly</li>
              <li>4. Save the file - changes will be reflected on the site</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
