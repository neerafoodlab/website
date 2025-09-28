import { NextRequest, NextResponse } from 'next/server'

const CONVERTKIT_API_KEY = '33wp_NdaMfvIJmJ7XaZ7vA'
const CONVERTKIT_FORM_ID = '8607737'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Subscribe to ConvertKit using the correct v3 API endpoint
    const response = await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email: email,
        first_name: '' // Optional: ConvertKit expects this field
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('ConvertKit API error:', {
        status: response.status,
        statusText: response.statusText,
        data: data
      })
      return NextResponse.json(
        { 
          error: `ConvertKit API Error: ${data.message || 'Unknown error'}`,
          details: data
        },
        { status: response.status }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter!',
        subscriber: data.subscription
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
