import Image from 'next/image'
import { Heart, Users, Award, BookOpen } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { icon: BookOpen, label: 'Recipes Published', value: '300+' },
    { icon: Users, label: 'Happy Readers', value: '50K+' },
    { icon: Award, label: 'Years of Experience', value: '10+' },
    { icon: Heart, label: 'Recipes Loved', value: '1M+' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              About <span className="text-gradient">Neera Food Lab</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Welcome to my culinary journey! I&apos;m passionate about sharing authentic Indian recipes
              and helping you create delicious meals that bring families together.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Story */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">My Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Growing up in a traditional Indian household, I was surrounded by the aromas of
                spices and the warmth of home-cooked meals. My grandmother&apos;s kitchen was my
                first classroom, where I learned that cooking is not just about following recipes,
                but about creating memories and sharing love.
              </p>
              <p>
                After moving to the United States, I realized how much I missed the authentic 
                flavors of home. This led me to start documenting family recipes and experimenting 
                with traditional techniques to recreate those cherished dishes in my new kitchen.
              </p>
              <p>
                Neera Food Lab was born from this desire to preserve and share the rich culinary 
                heritage of India while making it accessible to home cooks everywhere.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about-chef.jpg"
                alt="Neera in her kitchen"
                width={500}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">My Mission</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              To make authentic Indian cuisine accessible to everyone, regardless of their cooking 
              experience or access to traditional ingredients. I believe that food has the power 
              to connect us across cultures and create lasting memories.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentic Recipes</h3>
                <p className="text-gray-600">Traditional family recipes passed down through generations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy to Follow</h3>
                <p className="text-gray-600">Step-by-step instructions with helpful tips and tricks</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600">A supportive community of food lovers and home cooks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Personal Touch */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Let&apos;s Cook Together</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              I&apos;m always excited to hear from fellow food enthusiasts! Whether you&apos;re trying
              one of my recipes for the first time or you&apos;re a seasoned cook looking for new
              inspiration, I&apos;d love to connect with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-primary inline-flex items-center justify-center"
              >
                Get in Touch
              </a>
              <a
                href="/recipes"
                className="btn-outline inline-flex items-center justify-center"
              >
                Explore Recipes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'About Neera Food Lab - Our Story & Mission',
    description: 'Learn about Neera Food Lab\'s journey in bringing authentic Indian cuisine to home cooks worldwide. Discover our mission and passion for food.',
    openGraph: {
      title: 'About Neera Food Lab - Our Story & Mission',
      description: 'Learn about our journey in bringing authentic Indian cuisine to home cooks worldwide.',
      url: 'https://www.neerafoodlab.com/about',
    },
  }
}