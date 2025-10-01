#!/bin/bash

# Recipe Generator Script for Neera Food Lab
# This script helps create new recipe files with proper formatting

echo "🍳 Neera Food Lab Recipe Generator"
echo "=================================="

# Get recipe name
read -p "Enter recipe name (e.g., chicken-biryani): " RECIPE_NAME

if [ -z "$RECIPE_NAME" ]; then
    echo "❌ Recipe name is required!"
    exit 1
fi

# Create filename
FILENAME="${RECIPE_NAME}.md"
FILEPATH="content/recipes/${FILENAME}"

# Check if file already exists
if [ -f "$FILEPATH" ]; then
    echo "⚠️  Recipe file already exists: $FILEPATH"
    read -p "Overwrite? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Operation cancelled."
        exit 1
    fi
fi

# Get recipe details
echo ""
echo "📝 Recipe Details:"
echo "=================="
read -p "Recipe Title: " TITLE
read -p "Description: " DESCRIPTION
read -p "Category (Main Course/Desserts/Snacks/Healthy/Indian/Festive Recipes/Lunchbox Ideas): " CATEGORY
read -p "Prep Time (e.g., 30 mins): " PREP_TIME
read -p "Cook Time (e.g., 45 mins): " COOK_TIME
read -p "Servings: " SERVINGS
read -p "Difficulty (Easy/Medium/Hard): " DIFFICULTY
read -p "Rating (e.g., 4.5): " RATING
read -p "Featured? (true/false): " FEATURED
read -p "YouTube Video ID (optional): " YOUTUBE_ID

# Get current date
CURRENT_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Create the markdown file
cat > "$FILEPATH" << EOF
---
title: "$TITLE"
description: "$DESCRIPTION"
coverImage: "/images/recipes/$RECIPE_NAME.jpg"
category: "$CATEGORY"
tags: ["$RECIPE_NAME", "recipe", "indian", "food"]
prepTime: "$PREP_TIME"
cookTime: "$COOK_TIME"
totalTime: "$(( $(echo $PREP_TIME | sed 's/[^0-9]//g') + $(echo $COOK_TIME | sed 's/[^0-9]//g') )) mins"
servings: $SERVINGS
difficulty: "$DIFFICULTY"
rating: $RATING
featured: $FEATURED
status: "draft"
youtubeVideoId: "$YOUTUBE_ID"
publishedAt: "$CURRENT_DATE"
updatedAt: "$CURRENT_DATE"
author:
  name: "Neera"
  bio: "Passionate home cook and recipe creator"
  avatar: "/brand/neerafoodlab_favicon.png"
ingredients: []
instructions: []
nutrition:
  calories: 0
  protein: 0
  carbs: 0
  fat: 0
  fiber: 0
seo:
  metaTitle: "$TITLE"
  metaDescription: "$DESCRIPTION"
  keywords: ["$RECIPE_NAME", "recipe", "indian"]
introduction: "# $TITLE

Add your recipe introduction here..."
whyThisWorks: []
proTips: []
faqs: []
conclusion: "Add your recipe conclusion here..."
---

# $TITLE

## Recipe Introduction
Add your detailed recipe content here...

## Ingredients
Add your ingredients list here...

## Instructions
Add your step-by-step instructions here...

## Tips & Notes
Add any special tips or notes here...
EOF

echo ""
echo "✅ Recipe file created: $FILEPATH"
echo ""
echo "📝 Next Steps:"
echo "1. Edit the file with your actual recipe content"
echo "2. Add recipe image to: public/images/recipes/$RECIPE_NAME.jpg"
echo "3. Update the recipe in the admin dashboard"
echo "4. Change status from 'draft' to 'published' when ready"
echo ""
echo "🎯 File is ready for editing at: $FILEPATH"
