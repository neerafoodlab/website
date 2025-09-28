import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Mail, Phone, MapPin, Youtube } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    recipes: [
      { name: 'Indian Recipes', href: '/recipes?category=indian' },
      { name: 'Snacks', href: '/recipes?category=snacks' },
      { name: 'Desserts', href: '/recipes?category=desserts' },
      { name: 'Healthy', href: '/recipes?category=healthy' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    social: [
      { name: 'Facebook', href: 'https://www.facebook.com/neerafoodlab/', icon: Facebook },
      { name: 'Instagram', href: 'https://www.instagram.com/neerafoodlab/', icon: Instagram },
      { name: 'X (Twitter)', href: 'https://www.x.com/neerafoodlab/', icon: 'x' },
      { name: 'YouTube', href: 'https://www.youtube.com/@neerafoodlab', icon: Youtube },
    ],
  }

  return (
    <footer className="bg-brand-black text-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image 
                src="/brand/neerafoodlab_logo.png" 
                alt="Neera Food Lab Logo" 
                width={200}
                height={60}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-brand-gray-300 mb-6 max-w-sm">
              Discover the authentic flavors of Indian cuisine with our collection of traditional and modern recipes.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-brand-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    {Icon === 'x' ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Recipes Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recipes</h3>
            <ul className="space-y-2">
              {footerLinks.recipes.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-brand-gray-300 hover:text-brand-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-brand-gray-300 hover:text-brand-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500" />
                <span className="text-gray-300">neerafoodlab@gmail.com</span>
              </div>
            
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="text-gray-300">Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Neera Food Lab. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Made with ❤️ for food lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
