#!/bin/bash

# Deploy script for Neera Food Lab Website
echo "🚀 Deploying Neera Food Lab Website to GitHub Pages..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Add all changes
echo "📝 Adding changes to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy website to GitHub Pages

- Static export configuration
- GitHub Actions workflow
- Recipe pages with static generation
- Ready for GitHub Pages deployment"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Your website will be available at:"
    echo "   https://neerafoodlab.github.io/website/"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to your repository settings on GitHub"
    echo "2. Navigate to 'Pages' section"
    echo "3. Set source to 'GitHub Actions'"
    echo "4. Wait for the deployment to complete (usually 2-3 minutes)"
else
    echo "❌ Failed to push to GitHub. Please check your repository URL and permissions."
    exit 1
fi
