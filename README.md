# Neera Food Lab - Food Blog Website

A modern, responsive food blog website built with Next.js, TypeScript, and Tailwind CSS, featuring a headless CMS for easy content management.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Headless CMS**: NetlifyCMS for easy content management
- **SEO Optimized**: Static site generation, sitemap, structured data
- **Mobile Responsive**: Beautiful design on all devices
- **Performance**: Optimized images, lazy loading, fast loading times
- **Search & Filter**: Advanced recipe search and filtering
- **Newsletter**: Email subscription with Netlify Forms
- **Security**: HTTPS, security headers, input sanitization

## 📁 Project Structure

```
neera-food-lab/
├── admin/                    # NetlifyCMS admin interface
│   ├── config.yml           # CMS configuration
│   └── index.html           # Admin login page
├── app/                     # Next.js app directory
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── sitemap.ts           # Dynamic sitemap
│   ├── robots.ts            # Robots.txt
│   ├── recipes/             # Recipe pages
│   │   ├── page.tsx         # Recipe listing
│   │   └── [slug]/          # Individual recipe pages
│   ├── about/               # About page
│   └── contact/             # Contact page
├── components/              # React components
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Site footer
│   ├── Hero.tsx             # Homepage hero section
│   ├── FeaturedRecipes.tsx  # Featured recipes section
│   ├── Categories.tsx       # Recipe categories
│   ├── Newsletter.tsx       # Email subscription
│   ├── RecipeList.tsx       # Recipe listing component
│   └── SearchAndFilter.tsx  # Search and filter UI
├── content/                 # Content files
│   └── recipes/             # Recipe markdown files
├── lib/                     # Utility functions
│   └── recipes.ts           # Recipe data handling
├── types/                   # TypeScript type definitions
│   └── recipe.ts            # Recipe types
├── public/                  # Static assets
│   ├── images/              # Images and media
│   └── site.webmanifest     # PWA manifest
├── netlify.toml             # Netlify configuration
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd neera-food-lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 📝 Content Management

### Adding New Recipes

1. **Via NetlifyCMS** (Recommended)
   - Visit `/admin` on your deployed site
   - Login with your Netlify account
   - Click "New Recipe" and fill in the form
   - Publish to automatically deploy

2. **Via Markdown Files**
   - Create a new `.md` file in `content/recipes/`
   - Use the frontmatter template from existing recipes
   - Follow the recipe structure and naming conventions

### Recipe Frontmatter Template

```yaml
---
title: "Recipe Title"
description: "Brief description of the recipe"
coverImage: "/images/recipes/recipe-name.jpg"
category: "Indian" # or Snacks, Desserts, etc.
tags: ["tag1", "tag2", "tag3"]
prepTime: "15 mins"
cookTime: "30 mins"
totalTime: "45 mins"
servings: 4
difficulty: "Easy" # Easy, Medium, Hard
rating: 4.5
featured: false
publishedAt: "2024-01-15T10:00:00Z"
updatedAt: "2024-01-15T10:00:00Z"
author:
  name: "Neera"
  bio: "Passionate home cook and recipe creator"
  avatar: "/images/author-avatar.jpg"
ingredients:
  - name: "ingredient name"
    amount: "1"
    unit: "cup"
instructions:
  - step: 1
    title: "Step title"
    description: "Step description"
nutrition:
  calories: 300
  protein: 15
  carbs: 40
  fat: 10
  fiber: 5
seo:
  metaTitle: "SEO optimized title"
  metaDescription: "SEO description"
  keywords: ["keyword1", "keyword2"]
---
```

## 🚀 Deployment

### Netlify Deployment

1. **Connect to GitHub**
   - Push your code to a GitHub repository
   - Connect the repository to Netlify

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: 18

3. **Domain Configuration**
   - Add your custom domain: `www.neerafoodlab.com`
   - Configure DNS settings as per Netlify instructions
   - Enable HTTPS (automatic with Netlify)

4. **Environment Variables**
   - No additional environment variables needed for basic setup

### Custom Domain Setup

1. **In Netlify Dashboard**
   - Go to Site settings > Domain management
   - Add custom domain: `www.neerafoodlab.com`
   - Configure DNS records as instructed

2. **DNS Configuration**
   - Point your domain to Netlify's servers
   - Add CNAME record: `www` → `your-site.netlify.app`

## 🎨 Customization

### Styling

- **Colors**: Edit `tailwind.config.js` to change the color scheme
- **Fonts**: Update font imports in `app/globals.css`
- **Components**: Modify component files in `/components`

### Content

- **Categories**: Update category options in `admin/config.yml`
- **Navigation**: Modify navigation items in `components/Header.tsx`
- **Footer**: Update footer links in `components/Footer.tsx`

### SEO

- **Meta Tags**: Update default meta tags in `app/layout.tsx`
- **Structured Data**: Add recipe schema in recipe pages
- **Sitemap**: Automatically generated, no changes needed

## 📊 Performance Optimization

### Images

- Use Next.js Image component for automatic optimization
- Compress images before uploading
- Use appropriate formats (WebP for modern browsers)

### Build Optimization

- Static site generation for all pages
- Incremental static regeneration for content updates
- Optimized bundle size with tree shaking

## 🔒 Security

### Implemented Security Measures

- HTTPS enforcement
- Security headers (XSS protection, content type options)
- Input sanitization in forms
- CSRF protection via Netlify Forms

### CMS Security

- Netlify Identity for authentication
- Git-based content management
- Role-based access control

## 📈 Analytics & Monitoring

### Recommended Tools

1. **Google Analytics 4**
   - Add tracking code to `app/layout.tsx`
   - Monitor user behavior and content performance

2. **Google Search Console**
   - Verify domain ownership
   - Monitor search performance and indexing

3. **Netlify Analytics**
   - Built-in analytics for basic metrics
   - Monitor site performance and uptime

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **CMS Not Loading**
   - Verify Netlify Identity is enabled
   - Check admin configuration
   - Ensure proper Git permissions

3. **Images Not Loading**
   - Check image paths and formats
   - Verify images are in the correct directory
   - Use Next.js Image component

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Tailwind CSS docs](https://tailwindcss.com/docs)
- Consult [Netlify CMS guide](https://www.netlifycms.org/docs)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: hello@neerafoodlab.com
- Website: [www.neerafoodlab.com](https://www.neerafoodlab.com)

---

**Happy Cooking! 🍽️**
# website
