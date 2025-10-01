// Simple authentication utilities for admin access
import Cookies from 'js-cookie'

// Admin credentials (in production, these should be hashed and stored securely)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'NeeraFoodLab2024!', // Strong password
  email: 'admin@neerafoodlab.com'
}

export interface AuthUser {
  username: string
  email: string
  role: 'admin'
}

export interface LoginCredentials {
  username: string
  password: string
}

// Authenticate user
export function authenticateUser(credentials: LoginCredentials): AuthUser | null {
  const { username, password } = credentials

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    return {
      username: ADMIN_CREDENTIALS.username,
      email: ADMIN_CREDENTIALS.email,
      role: 'admin'
    }
  }

  return null
}

// Login function
export function login(credentials: LoginCredentials): { success: boolean; user?: AuthUser; error?: string } {
  const user = authenticateUser(credentials)

  if (!user) {
    return {
      success: false,
      error: 'Invalid username or password'
    }
  }

  // Store simple auth flag in cookie (expires in 24 hours)
  Cookies.set('admin-auth', 'true', {
    expires: 1,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  })

  return {
    success: true,
    user
  }
}

// Logout function
export function logout(): void {
  Cookies.remove('admin-auth')
}

// Get current user
export function getCurrentUser(): AuthUser | null {
  const isAuth = Cookies.get('admin-auth')

  if (isAuth === 'true') {
    return {
      username: ADMIN_CREDENTIALS.username,
      email: ADMIN_CREDENTIALS.email,
      role: 'admin'
    }
  }

  return null
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}
