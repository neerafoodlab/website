#!/usr/bin/env node

/**
 * Bulk Recipe Creator for Neera Food Lab
 * 
 * This script helps you create multiple recipe markdown files from JSON data.
 * 
 * Usage:
 * 1. Prepare your recipes data in JSON format (see example below)
 * 2. Run: node scripts/bulk-recipe-creator.js
 * 3. Files will be created in content/recipes/
 */

const fs = require('fs');
const path = require('path');

// Example recipe data structure
const exampleRecipes = [
  {
    title: "Chicken Tikka Masala",
    description: "Creamy and flavorful chicken tikka masala with aromatic spices",
    category: "Indian",
    tags: ["chicken", "curry", "indian", "main-course"],
    prepTime: "30 mins",
    cookTime: "45 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    featured: false,
    ingredients: [
      { name: "chicken breast", amount: "2", unit: "lbs" },
      { name: "yogurt", amount: "1", unit: "cup" },
      { name: "garam masala", amount: "2", unit: "tsp" }
    ],
    instructions: [
      { step: 1, title: "Marinate Chicken", description: "Cut chicken and marinate in yogurt and spices for 30 minutes" },
      { step: 2, title: "Cook Chicken", description: "Grill or pan-fry chicken until cooked through" }
    ],
    nutrition: {
      calories: 380,
      protein: 32,
      carbs: 15,
      fat: 22,
      fiber: 3
    }
  }
  // Add more recipes here...
];

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

function generateMarkdown(recipe) {
  const slug = createSlug(recipe.title);
  const currentDate = new Date().toISOString();
  
  const frontMatter = `---
title: "${recipe.title}"
description: "${recipe.description}"
coverImage: "/images/recipes/${slug}.jpg"
category: "${recipe.category}"
tags: [${recipe.tags.map(tag => `"${tag}"`).join(', ')}]
prepTime: "${recipe.prepTime}"
cookTime: "${recipe.cookTime}"
totalTime: "${recipe.prepTime}" # Update this if you have total time
servings: ${recipe.servings}
difficulty: "${recipe.difficulty}"
rating: ${recipe.rating}
featured: ${recipe.featured}
publishedAt: "${currentDate}"
updatedAt: "${currentDate}"
author:
  name: "Neera"
  bio: "Passionate home cook and recipe creator"
  avatar: "/images/author-avatar.svg"
ingredients:${recipe.ingredients.map(ing => `
  - name: "${ing.name}"
    amount: "${ing.amount}"
    unit: "${ing.unit}"`).join('')}
instructions:${recipe.instructions.map(inst => `
  - step: ${inst.step}
    title: "${inst.title}"
    description: "${inst.description}"`).join('')}
nutrition:
  calories: ${recipe.nutrition.calories}
  protein: ${recipe.nutrition.protein}
  carbs: ${recipe.nutrition.carbs}
  fat: ${recipe.nutrition.fat}
  fiber: ${recipe.nutrition.fiber}
seo:
  metaTitle: "${recipe.title} - Neera Food Lab"
  metaDescription: "Learn how to make ${recipe.title.toLowerCase()} with this easy recipe. Perfect for any occasion."
  keywords: [${recipe.tags.map(tag => `"${tag}"`).join(', ')}]
---

# ${recipe.title}

${recipe.description}

## Why This Recipe Works

- **Authentic flavors**: Traditional ingredients and cooking methods
- **Easy to follow**: Step-by-step instructions for perfect results
- **Customizable**: Adjust spices to your taste preference

## Pro Tips

1. **Preparation**: Read through all steps before starting
2. **Quality ingredients**: Use fresh spices for best flavor
3. **Timing**: Allow adequate time for marination and cooking

## Serving Suggestions

- Serve with basmati rice or naan bread
- Pair with a fresh salad or raita
- Garnish with fresh herbs for extra flavor

## Storage Instructions

- Store leftovers in refrigerator for up to 3 days
- Reheat gently on stovetop or microwave
- Freeze for up to 2 months for longer storage`;

  return frontMatter;
}

function createRecipeFiles(recipes, outputDir = 'content/recipes') {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let successCount = 0;
  let errors = [];

  recipes.forEach((recipe, index) => {
    try {
      const slug = createSlug(recipe.title);
      const filename = `${slug}.md`;
      const filepath = path.join(outputDir, filename);
      
      // Check if file already exists
      if (fs.existsSync(filepath)) {
        console.log(`⚠️  File already exists: ${filename} - Skipping`);
        return;
      }

      const markdown = generateMarkdown(recipe);
      fs.writeFileSync(filepath, markdown, 'utf8');
      
      console.log(`✅ Created: ${filename}`);
      successCount++;
    } catch (error) {
      const errorMsg = `Error creating recipe ${index + 1}: ${error.message}`;
      errors.push(errorMsg);
      console.log(`❌ ${errorMsg}`);
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`✅ Successfully created: ${successCount} recipes`);
  console.log(`❌ Errors: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log(`\n⚠️  Error details:`);
    errors.forEach(error => console.log(`   ${error}`));
  }

  console.log(`\n🎉 Recipe files created in: ${outputDir}`);
  console.log(`📝 Don't forget to add images to: public/images/recipes/`);
}

// Check if running directly
if (require.main === module) {
  console.log('🍽️  Neera Food Lab - Bulk Recipe Creator\n');
  
  // Check if recipes data file exists
  const recipesDataFile = path.join(__dirname, 'recipes-data.json');
  
  if (fs.existsSync(recipesDataFile)) {
    console.log('📁 Found recipes-data.json, loading recipes...');
    try {
      const recipesData = JSON.parse(fs.readFileSync(recipesDataFile, 'utf8'));
      createRecipeFiles(recipesData);
    } catch (error) {
      console.log(`❌ Error reading recipes-data.json: ${error.message}`);
      console.log('📝 Please check the JSON format and try again.');
    }
  } else {
    console.log('📝 No recipes-data.json found. Creating example file...');
    
    // Create example data file
    fs.writeFileSync(recipesDataFile, JSON.stringify(exampleRecipes, null, 2));
    
    console.log(`✅ Created example file: ${recipesDataFile}`);
    console.log('📝 Edit this file with your recipe data, then run the script again.');
    console.log('\n📋 Expected JSON structure:');
    console.log('   - title: string');
    console.log('   - description: string');
    console.log('   - category: string');
    console.log('   - tags: array of strings');
    console.log('   - prepTime, cookTime: string (e.g., "30 mins")');
    console.log('   - servings: number');
    console.log('   - difficulty: "Easy", "Medium", or "Hard"');
    console.log('   - rating: number (1-5)');
    console.log('   - featured: boolean');
    console.log('   - ingredients: array of {name, amount, unit}');
    console.log('   - instructions: array of {step, title, description}');
    console.log('   - nutrition: {calories, protein, carbs, fat, fiber}');
  }
}

module.exports = { createRecipeFiles, generateMarkdown, createSlug };


