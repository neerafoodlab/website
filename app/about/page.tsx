export default function AboutPage() {
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
              Welcome to Neera Food Lab—where vegetarian magic happens in every kitchen!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            I&apos;m Neera Sharma, the food lover, experimenter, and creator behind Neera Food Lab.
            Cooking isn&apos;t just my passion—it&apos;s my way of bringing joy, flavor, and a dash of creativity to everyday life.
            My goal? Making delicious Indian and fusion recipes so simple and inviting, anyone can try them!
          </p>
        </div>

        {/* What We're All About */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What We&apos;re All About</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At Neera Food Lab, you&apos;ll find—
          </p>
          <ul className="text-gray-700 leading-relaxed space-y-2 mb-6">
            <li>Easy, step-by-step Indian vegetarian recipes for every mood, festival, or craving.</li>
            <li>Fun, fuss-free snack ideas for kids and adults.</li>
            <li>Unique twists on traditional street foods and festive sweets.</li>
            <li>Quick meals and time-saving tips designed for busy lives.</li>
            <li>Engaging, creative content—ready in under a minute!</li>
          </ul>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you&apos;re a seasoned home cook or a curious beginner, Neera Food Lab is your home for delicious inspiration.
          </p>
        </div>

        {/* Why Follow */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Follow Neera Food Lab?</h2>
          <ul className="text-gray-700 leading-relaxed space-y-4">
            <li>
              <strong>Approachable Cooking:</strong> Recipes are designed for everyone—simple enough for beginners, exciting enough for foodies.
            </li>
            <li>
              <strong>Flavor Experiments:</strong> We love playing with spices, textures, and trending ideas—there&apos;s always something new!
            </li>
            <li>
              <strong>Vegetarian Only:</strong> 100% vegetarian, with a strong focus on Indian home-style comfort recipes, healthy options, and fusion snacks.
            </li>
            <li>
              <strong>Community First:</strong> Making cooking fun, interactive, and accessible to all—join our growing family of food explorers!
            </li>
          </ul>
        </div>

        {/* Where You'll Find Us */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Where You&apos;ll Find Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Catch our daily recipes, quick cooking videos, and flavor-packed inspiration here and on:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <a href="https://www.instagram.com/neerafoodlab/" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg text-center hover:opacity-90 transition-opacity">
              <strong>Instagram</strong>
            </a>
            <a href="https://www.youtube.com/@neerafoodlab" className="bg-red-600 text-white p-4 rounded-lg text-center hover:opacity-90 transition-opacity">
              <strong>YouTube</strong>
            </a>
            <a href="https://www.x.com/neerafoodlab/" className="bg-black text-white p-4 rounded-lg text-center hover:opacity-90 transition-opacity">
              <strong>X (Twitter)</strong>
            </a>
            <a href="https://www.threads.net/@neerafoodlab" className="bg-gray-900 text-white p-4 rounded-lg text-center hover:opacity-90 transition-opacity">
              <strong>Threads</strong>
            </a>
            <a href="https://www.reddit.com/user/neerafoodlab/" className="bg-orange-600 text-white p-4 rounded-lg text-center hover:opacity-90 transition-opacity">
              <strong>Reddit</strong>
            </a>
            <div className="bg-gray-100 text-gray-600 p-4 rounded-lg text-center">
              <strong>...and more!</strong>
            </div>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mt-6">
            Got a craving or a food question? Message anytime or drop a comment—I love connecting with fellow foodies!
          </p>
        </div>

        {/* Mission */}
        <div className="bg-primary-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed text-center">
            To make vegetarian cooking fun, creative, and super easy—one step-by-step recipe at a time.
            From lunchbox wonders to festival feasts, Neera Food Lab is here to inspire your inner chef
            and add a burst of flavor to your kitchen.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Let&apos;s Cook Up Some Magic Together</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            Join thousands of food lovers who are already part of our culinary community.
            Let&apos;s create delicious memories, one recipe at a time!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/recipes"
              className="btn-primary inline-flex items-center justify-center"
            >
              Explore Recipes
            </a>
            <a
              href="/contact"
              className="btn-outline inline-flex items-center justify-center"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'About Neera Food Lab - Vegetarian Magic in Every Kitchen',
    description: 'Discover Neera Food Lab - where vegetarian magic happens! Learn about our passion for Indian and fusion recipes, easy cooking tips, and building a community of food explorers.',
    openGraph: {
      title: 'About Neera Food Lab - Vegetarian Magic in Every Kitchen',
      description: 'Discover Neera Food Lab - where vegetarian magic happens! Learn about our passion for Indian and fusion recipes.',
      url: 'https://www.neerafoodlab.com/about',
    },
  }
}