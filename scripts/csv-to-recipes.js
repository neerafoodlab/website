#!/usr/bin/env node

/**
 * CSV to Recipes Converter for Neera Food Lab
 * 
 * This script converts CSV data to recipe markdown files.
 * Perfect for converting spreadsheet data to website recipes.
 * 
 * CSV Format Expected:
 * title,description,category,tags,prepTime,cookTime,servings,difficulty,rating,featured,ingredients,instructions,calories,protein,carbs,fat,fiber
 * 
 * Usage:
 * 1. Export your recipes to CSV format
 * 2. Place CSV file as 'recipes.csv' in scripts folder
 * 3. Run: node scripts/csv-to-recipes.js
 */

const fs = require('fs');
const path = require('path');

function parseCSV(csvContent) {
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length < 2) {
    throw new Error('CSV must have at least a header row and one data row');
  }

  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const recipes = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length !== headers.length) {
      console.log(`⚠️  Skipping row ${i + 1}: Column count mismatch`);
      continue;
    }

    const recipe = {};
    headers.forEach((header, index) => {
      recipe[header] = values[index];
    });

    // Process specific fields
    try {
      recipe.tags = recipe.tags ? recipe.tags.split(';').map(t => t.trim()) : [];
      recipe.servings = parseInt(recipe.servings) || 4;
      recipe.rating = parseFloat(recipe.rating) || 4.0;
      recipe.featured = recipe.featured === 'true' || recipe.featured === '1';
      
      // Parse ingredients (format: "ingredient1:amount:unit;ingredient2:amount:unit")
      recipe.ingredients = parseIngredients(recipe.ingredients || '');
      
      // Parse instructions (format: "title1:description1;title2:description2")
      recipe.instructions = parseInstructions(recipe.instructions || '');
      
      // Parse nutrition
      recipe.nutrition = {
        calories: parseInt(recipe.calories) || 0,
        protein: parseInt(recipe.protein) || 0,
        carbs: parseInt(recipe.carbs) || 0,
        fat: parseInt(recipe.fat) || 0,
        fiber: parseInt(recipe.fiber) || 0
      };

      recipes.push(recipe);
    } catch (error) {
      console.log(`⚠️  Error processing row ${i + 1}: ${error.message}`);
    }
  }

  return recipes;
}

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current.trim());
  return values.map(v => v.replace(/^"|"$/g, ''));
}

function parseIngredients(ingredientsStr) {
  if (!ingredientsStr) return [];
  
  return ingredientsStr.split(';').map((item, index) => {
    const parts = item.split(':');
    return {
      name: parts[0] || `Ingredient ${index + 1}`,
      amount: parts[1] || "1",
      unit: parts[2] || "piece"
    };
  });
}

function parseInstructions(instructionsStr) {
  if (!instructionsStr) return [];
  
  return instructionsStr.split(';').map((item, index) => {
    const parts = item.split(':');
    return {
      step: index + 1,
      title: parts[0] || `Step ${index + 1}`,
      description: parts[1] || parts[0] || `Complete step ${index + 1}`
    };
  });
}

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generateMarkdown(recipe) {
  const slug = createSlug(recipe.title);
  const currentDate = new Date().toISOString();
  
  return `---
title: "${recipe.title}"
description: "${recipe.description}"
coverImage: "/images/recipes/${slug}.jpg"
category: "${recipe.category}"
tags: [${recipe.tags.map(tag => `"${tag}"`).join(', ')}]
prepTime: "${recipe.prepTime}"
cookTime: "${recipe.cookTime}"
totalTime: "${recipe.prepTime}" # Update if you have total time
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
3. **Timing**: Allow adequate time for preparation and cooking

## Serving Suggestions

- Serve with complementary sides
- Pair with your favorite beverages
- Garnish with fresh herbs for extra flavor

## Storage Instructions

- Store leftovers in refrigerator for up to 3 days
- Reheat gently to preserve flavors
- Freeze for up to 2 months for longer storage`;
}

function createSampleCSV() {
  const sampleCSV = `title,description,category,tags,prepTime,cookTime,servings,difficulty,rating,featured,ingredients,instructions,calories,protein,carbs,fat,fiber
"Butter Chicken","Creamy and flavorful butter chicken curry","Indian","chicken;curry;indian;main-course","20 mins","30 mins",4,"Medium",4.8,true,"chicken breast:1.5:lbs;yogurt:0.5:cup;butter:4:tbsp;tomato puree:1:can","Marinate chicken:Cut chicken and marinate in yogurt for 30 minutes;Cook chicken:Pan fry chicken until golden;Make sauce:Prepare creamy tomato sauce","420",35,12,28,2
"Vegetable Biryani","Aromatic rice dish with mixed vegetables","Vegetarian","rice;vegetables;biryani;indian","30 mins","45 mins",6,"Medium",4.5,true,"basmati rice:2:cups;mixed vegetables:3:cups;onions:2:large;spices:1:tbsp","Prepare rice:Wash and soak basmati rice;Cook vegetables:Sauté vegetables with spices;Layer and cook:Layer rice and vegetables, cook until done","380",8,65,12,4`;

  return sampleCSV;
}

// Main execution
if (require.main === module) {
  console.log('🍽️  CSV to Recipes Converter for Neera Food Lab\n');
  
  const csvFile = path.join(__dirname, 'recipes.csv');
  const outputDir = path.join(__dirname, '../content/recipes');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  if (fs.existsSync(csvFile)) {
    try {
      console.log('📁 Reading CSV file...');
      const csvContent = fs.readFileSync(csvFile, 'utf8');
      const recipes = parseCSV(csvContent);
      
      console.log(`📊 Found ${recipes.length} recipes in CSV\n`);
      
      let successCount = 0;
      let errors = [];
      
      recipes.forEach((recipe, index) => {
        try {
          const slug = createSlug(recipe.title);
          const filename = `${slug}.md`;
          const filepath = path.join(outputDir, filename);
          
          if (fs.existsSync(filepath)) {
            console.log(`⚠️  File exists: ${filename} - Skipping`);
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
      
      console.log(`\n🎉 Recipe files created in: content/recipes/`);
      console.log(`📝 Don't forget to add images to: public/images/recipes/`);
      
    } catch (error) {
      console.log(`❌ Error processing CSV: ${error.message}`);
    }
  } else {
    console.log('📝 No recipes.csv found. Creating sample file...');
    fs.writeFileSync(csvFile, createSampleCSV());
    console.log(`✅ Created sample CSV: ${csvFile}`);
    console.log('\n📋 CSV Format Required:');
    console.log('   title,description,category,tags,prepTime,cookTime,servings,difficulty,rating,featured,ingredients,instructions,calories,protein,carbs,fat,fiber');
    console.log('\n📝 Special formatting:');
    console.log('   - tags: separated by semicolons (;)');
    console.log('   - ingredients: "name:amount:unit" separated by semicolons');
    console.log('   - instructions: "title:description" separated by semicolons');
    console.log('   - featured: true/false or 1/0');
    console.log('\n🔄 Edit the CSV file with your recipe data, then run this script again.');
  }
}


