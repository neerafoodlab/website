import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neera Food Lab - Delicious Indian Recipes & Food Blog',
  description: 'Discover authentic Indian recipes, cooking tips, and food stories at Neera Food Lab. From traditional dishes to modern twists, find your next favorite recipe.',
  keywords: 'Indian recipes, food blog, cooking, traditional dishes, vegetarian recipes, healthy cooking',
  authors: [{ name: 'Neera Food Lab' }],
  openGraph: {
    title: 'Neera Food Lab - Delicious Indian Recipes & Food Blog',
    description: 'Discover authentic Indian recipes, cooking tips, and food stories at Neera Food Lab.',
    url: 'https://www.neerafoodlab.com',
    siteName: 'Neera Food Lab',
    images: [
      {
        url: 'https://www.neerafoodlab.com/brand/neerafoodlab_og-image.png',
        width: 1200,
        height: 630,
        alt: 'Neera Food Lab Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neera Food Lab - Delicious Indian Recipes & Food Blog',
    description: 'Discover authentic Indian recipes, cooking tips, and food stories at Neera Food Lab.',
    images: ['https://www.neerafoodlab.com/brand/neerafoodlab_og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/brand/neerafoodlab_favicon.png', sizes: '16x16', type: 'image/png' },
      { url: '/brand/neerafoodlab_favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/brand/neerafoodlab_favicon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.neerafoodlab.com" />
        <link rel="icon" href="/brand/neerafoodlab_favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/brand/neerafoodlab_favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/brand/neerafoodlab_favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/brand/neerafoodlab_favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta property="og:image" content="/brand/neerafoodlab_favicon.png" />
        <meta name="twitter:image" content="/brand/neerafoodlab_favicon.png" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
