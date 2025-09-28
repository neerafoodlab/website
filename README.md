# Neera Food Lab Website

A beautiful, modern recipe website built with Next.js, featuring a comprehensive recipe management system and stunning UI design.

## 🌟 Features

- **Modern Design**: Clean, responsive design with beautiful animations
- **Recipe Management**: Complete recipe system with ingredients, instructions, and nutrition info
- **Static Generation**: Fast, SEO-friendly static site generation
- **Category System**: Organized recipe categories and filtering
- **Search Functionality**: Find recipes by name, ingredients, or tags
- **Admin Dashboard**: Easy content management system
- **Mobile Responsive**: Perfect on all devices
- **GitHub Pages Ready**: Automatic deployment with GitHub Actions

## 🚀 Live Website

Visit the live website: [https://neerafoodlab.github.io/website/](https://neerafoodlab.github.io/website/)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Content**: Markdown-based recipe system
- **Deployment**: GitHub Pages
- **Build**: Static Export
- **Icons**: Lucide React

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── recipes/           # Recipe pages
│   ├── admin/             # Admin dashboard
│   └── globals.css        # Global styles
├── components/            # React components
├── content/               # Markdown content
│   └── recipes/           # Recipe markdown files
├── lib/                   # Utility functions
├── public/                # Static assets
└── .github/workflows/     # GitHub Actions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/neerafoodlab/website.git
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `out` directory, ready for static hosting.

## 📝 Adding Recipes

Recipes are stored as Markdown files in the `content/recipes/` directory. Each recipe file should follow this structure:

```markdown
---
title: "Recipe Name"
description: "Recipe description"
coverImage: "/images/recipes/recipe-image.jpg"
category: "Category Name"
prepTime: "30 minutes"
servings: 4
difficulty: "Easy"
rating: 4.5
featured: true
publishedAt: "2024-01-01"
youtubeVideoId: "VIDEO_ID"
tags: ["tag1", "tag2"]
ingredients:
  - amount: "2 cups"
    unit: "cups"
    name: "ingredient name"
instructions:
  - title: "Step 1"
    description: "Instruction description"
    step: 1
nutrition:
  calories: 250
  protein: 15
  carbs: 30
  fat: 8
  fiber: 5
---

Recipe content goes here...
```

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.js`
- Replace logo in `public/brand/`
- Update site metadata in `app/layout.tsx`

### Content
- Edit homepage content in `content/pages/homepage.md`
- Update site settings in `content/settings/site.json`

## 🚀 Deployment

This website is configured for automatic deployment to GitHub Pages:

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. The site will be available at `https://neerafoodlab.github.io/website/`

### Manual Deployment

Run the deployment script:
```bash
./deploy.sh
```

## 📱 Features Overview

### Homepage
- Hero section with featured recipes
- Recipe categories
- Newsletter signup
- About section

### Recipe Pages
- Detailed recipe information
- Step-by-step instructions
- Ingredient lists
- Nutrition information
- Related recipes
- Social sharing

### Admin Dashboard
- Recipe management
- Content editing
- Site settings
- Analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For support or questions, please open an issue on GitHub or contact us at [your-email@example.com](mailto:your-email@example.com).

---

Built with ❤️ for food lovers everywhere!