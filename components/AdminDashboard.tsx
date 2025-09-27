'use client'

import { useState, useEffect } from 'react'
import { Recipe } from '@/types/recipe'
import { 
  Edit, 
  Trash2, 
  Save, 
  Plus, 
  Eye, 
  EyeOff, 
  Filter, 
  Search,
  Calendar,
  Tag,
  Clock,
  Users,
  Star,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react'

interface AdminDashboardProps {
  initialRecipes: Recipe[]
}

type StatusFilter = 'all' | 'published' | 'draft'
type ActionType = 'edit' | 'delete' | 'toggle-status' | 'create'

interface ActionFeedback {
  type: 'success' | 'error' | 'info'
  message: string
  visible: boolean
}

const AdminDashboard = ({ initialRecipes }: AdminDashboardProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes)
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(initialRecipes)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Recipe>>({})
  const [isCreating, setIsCreating] = useState(false)
  const [feedback, setFeedback] = useState<ActionFeedback>({ type: 'info', message: '', visible: false })

  // Filter and search recipes
  useEffect(() => {
    let filtered = recipes

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(recipe => recipe.status === statusFilter)
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredRecipes(filtered)
  }, [recipes, statusFilter, searchQuery])

  const showFeedback = (type: ActionFeedback['type'], message: string) => {
    setFeedback({ type, message, visible: true })
    setTimeout(() => setFeedback(prev => ({ ...prev, visible: false })), 3000)
  }

  const handleEdit = (recipe: Recipe) => {
    setEditingId(recipe.slug)
    setEditForm(recipe)
  }

  const handleSave = async (slug: string) => {
    try {
      const updatedRecipes = recipes.map(recipe => 
        recipe.slug === slug ? { ...recipe, ...editForm, updatedAt: new Date().toISOString() } : recipe
      )
      setRecipes(updatedRecipes)
      setEditingId(null)
      setEditForm({})
      showFeedback('success', 'Recipe updated successfully!')
    } catch (error) {
      showFeedback('error', 'Failed to update recipe. Please try again.')
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      return
    }

    try {
      const updatedRecipes = recipes.filter(recipe => recipe.slug !== slug)
      setRecipes(updatedRecipes)
      showFeedback('success', 'Recipe deleted successfully!')
    } catch (error) {
      showFeedback('error', 'Failed to delete recipe. Please try again.')
    }
  }

  const handleToggleStatus = async (slug: string) => {
    try {
      const updatedRecipes = recipes.map(recipe => 
        recipe.slug === slug 
          ? { 
              ...recipe, 
              status: (recipe.status === 'published' ? 'draft' : 'published') as 'published' | 'draft',
              updatedAt: new Date().toISOString()
            }
          : recipe
      )
      setRecipes(updatedRecipes)
      const recipe = updatedRecipes.find(r => r.slug === slug)
      showFeedback('success', `Recipe ${recipe?.status === 'published' ? 'published' : 'saved as draft'}!`)
    } catch (error) {
      showFeedback('error', 'Failed to update recipe status. Please try again.')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm({})
    setIsCreating(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status: Recipe['status']) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
    if (status === 'published') {
      return `${baseClasses} bg-green-100 text-green-800`
    }
    return `${baseClasses} bg-yellow-100 text-yellow-800`
  }

  const publishedCount = recipes.filter(r => r.status === 'published').length
  const draftCount = recipes.filter(r => r.status === 'draft').length

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recipe Management</h1>
            <p className="text-gray-600 mt-1">Manage your recipes, content, and website settings</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Recipe
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">{publishedCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <EyeOff className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-900">{draftCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{recipes.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Message */}
      {feedback.visible && (
        <div className={`mb-4 p-4 rounded-lg flex items-center justify-between ${
          feedback.type === 'success' ? 'bg-green-50 text-green-800' :
          feedback.type === 'error' ? 'bg-red-50 text-red-800' :
          'bg-blue-50 text-blue-800'
        }`}>
          <div className="flex items-center">
            {feedback.type === 'success' ? <CheckCircle className="w-5 h-5 mr-2" /> :
             feedback.type === 'error' ? <AlertCircle className="w-5 h-5 mr-2" /> :
             <AlertCircle className="w-5 h-5 mr-2" />}
            {feedback.message}
          </div>
          <button onClick={() => setFeedback(prev => ({ ...prev, visible: false }))}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search recipes by title, category, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Recipes</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>
      </div>

      {/* Recipe Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecipes.map((recipe) => (
                <tr key={recipe.slug} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === recipe.slug ? (
                      <input
                        type="text"
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                        className="text-sm font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <div>
                        <div className="text-sm font-medium text-gray-900">{recipe.title}</div>
                        <div className="text-sm text-gray-500">{recipe.description?.substring(0, 60)}...</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(recipe.status)}>
                      {recipe.status === 'published' ? 'Live' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === recipe.slug ? (
                      <input
                        type="text"
                        value={editForm.category || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                        className="text-sm text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <div className="flex items-center">
                        <Tag className="w-3 h-3 mr-1 text-gray-400" />
                        <span className="text-sm text-gray-900">{recipe.category}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(recipe.updatedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {recipe.prepTime}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {recipe.servings}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        {recipe.rating}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {editingId === recipe.slug ? (
                        <>
                          <button
                            onClick={() => handleSave(recipe.slug)}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                            title="Save changes"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-gray-600 hover:text-gray-900 p-1 rounded"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(recipe)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="Edit recipe"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(recipe.slug)}
                            className={`p-1 rounded ${
                              recipe.status === 'published' 
                                ? 'text-yellow-600 hover:text-yellow-900' 
                                : 'text-green-600 hover:text-green-900'
                            }`}
                            title={recipe.status === 'published' ? 'Move to draft' : 'Publish recipe'}
                          >
                            {recipe.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <a
                            href={`/recipes/${recipe.slug}`}
                            target="_blank"
                            className="text-gray-600 hover:text-gray-900 p-1 rounded"
                            title="View recipe"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(recipe.slug)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Delete recipe"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {searchQuery || statusFilter !== 'all' 
                ? 'No recipes match your current filters.' 
                : 'No recipes found. Create your first recipe to get started!'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
