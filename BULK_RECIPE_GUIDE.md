# 🍽️ Bulk Recipe Addition Guide for Neera Food Lab

## 🎯 **Best Methods for Adding 100 Recipes**

### **Method 1: Spreadsheet → CSV → Bulk Creation (FASTEST)**
**⏱️ Time:** 2-4 hours for 100 recipes
**💪 Difficulty:** Easy
**🎯 Best for:** Large batches, organized data

#### Steps:
1. **Organize your recipes in a spreadsheet** (Excel, Google Sheets)
2. **Export as CSV** with the required format
3. **Run the conversion script** to create all markdown files
4. **Upload images** to the images folder
5. **Deploy** your updated site

### **Method 2: Direct Markdown Creation (MOST CONTROL)**
**⏱️ Time:** 1-2 minutes per recipe
**💪 Difficulty:** Medium
**🎯 Best for:** Detailed customization, gradual addition

#### Steps:
1. **Use the template** (`RECIPE_TEMPLATE.md`)
2. **Create files** in `content/recipes/` folder
3. **Follow naming convention**: `recipe-name.md`
4. **Add images** to `public/images/recipes/`

### **Method 3: CMS Interface (MOST USER-FRIENDLY)**
**⏱️ Time:** 3-5 minutes per recipe
**💪 Difficulty:** Easy
**🎯 Best for:** Non-technical users, gradual addition

#### Steps:
1. **Visit** your website's `/admin` page
2. **Login** with your credentials
3. **Use the recipe form** to add each recipe
4. **Upload images** through the interface

---

## 📊 **Spreadsheet Template for Method 1**

### Required Columns:
| Column | Example | Notes |
|--------|---------|-------|
| title | "Butter Chicken" | Recipe name |
| description | "Creamy curry..." | Brief description |
| category | "Indian" | Main category |
| tags | "chicken;curry;indian" | Separated by semicolons |
| prepTime | "20 mins" | Preparation time |
| cookTime | "30 mins" | Cooking time |
| servings | 4 | Number of servings |
| difficulty | "Medium" | Easy/Medium/Hard |
| rating | 4.8 | 1-5 scale |
| featured | true | true/false for homepage |
| ingredients | "chicken:1.5:lbs;yogurt:0.5:cup" | name:amount:unit format |
| instructions | "Marinate:Mix ingredients;Cook:Heat and serve" | title:description format |
| calories | 420 | Nutritional info |
| protein | 35 | Grams |
| carbs | 12 | Grams |
| fat | 28 | Grams |
| fiber | 2 | Grams |

### Sample Spreadsheet Row:
```
Butter Chicken | Creamy and flavorful butter chicken curry | Indian | chicken;curry;indian;main-course | 20 mins | 30 mins | 4 | Medium | 4.8 | true | chicken breast:1.5:lbs;yogurt:0.5:cup;butter:4:tbsp | Marinate chicken:Cut chicken and marinate in yogurt;Cook chicken:Pan fry until golden;Make sauce:Prepare creamy sauce | 420 | 35 | 12 | 28 | 2
```

---

## 🚀 **Quick Start Instructions**

### **For CSV Method (Recommended for 100 recipes):**

1. **Create your spreadsheet** with recipe data
2. **Export as CSV** and name it `recipes.csv`
3. **Place CSV file** in the `scripts/` folder
4. **Run the script:**
   ```bash
   cd "Website 3"
   node scripts/csv-to-recipes.js
   ```
5. **Add images** to `public/images/recipes/` folder
6. **Test locally:**
   ```bash
   npm run dev
   ```
7. **Deploy** when ready

### **For Individual Files:**

1. **Copy the template** from `RECIPE_TEMPLATE.md`
2. **Create new file** in `content/recipes/recipe-name.md`
3. **Fill in your recipe data**
4. **Add corresponding image** to `public/images/recipes/`
5. **Repeat** for each recipe

---

## 📸 **Image Management**

### **Image Requirements:**
- **Format:** JPG, PNG, or WebP
- **Size:** 800x400px recommended
- **File size:** Under 500KB for fast loading
- **Naming:** Match your recipe slug (e.g., `butter-chicken.jpg`)

### **Image Locations:**
- **Recipe images:** `public/images/recipes/recipe-name.jpg`
- **Other images:** `public/images/` for general use

### **Quick Image Tips:**
- Use descriptive filenames
- Optimize images before uploading
- Maintain consistent aspect ratios
- Consider using Canva or similar tools for consistency

---

## 🏷️ **Categories and Tags**

### **Suggested Categories:**
- Indian
- Vegetarian
- Vegan
- Desserts
- Appetizers
- Main Course
- Beverages
- Snacks
- Breakfast
- Healthy

### **Popular Tags:**
- chicken, beef, pork, fish
- vegetarian, vegan, gluten-free
- spicy, mild, sweet
- quick, easy, advanced
- traditional, modern, fusion
- curry, rice, bread, soup

---

## ⚡ **Automation Scripts Available**

### **1. CSV to Recipes Converter**
- **File:** `scripts/csv-to-recipes.js`
- **Purpose:** Convert CSV data to markdown files
- **Usage:** `node scripts/csv-to-recipes.js`

### **2. JSON Bulk Creator**
- **File:** `scripts/bulk-recipe-creator.js`
- **Purpose:** Create recipes from JSON data
- **Usage:** `node scripts/bulk-recipe-creator.js`

### **3. Recipe Template**
- **File:** `RECIPE_TEMPLATE.md`
- **Purpose:** Standard template for manual creation
- **Usage:** Copy and customize for each recipe

---

## 🔍 **Quality Checklist**

### **Before Adding Recipes:**
- [ ] Recipe title is clear and descriptive
- [ ] Description explains what makes the recipe special
- [ ] Ingredients are complete with amounts and units
- [ ] Instructions are step-by-step and clear
- [ ] Category and tags are relevant
- [ ] Images are high-quality and properly sized
- [ ] SEO information is complete

### **After Adding Recipes:**
- [ ] Test locally with `npm run dev`
- [ ] Check recipe pages load correctly
- [ ] Verify images display properly
- [ ] Confirm search and filtering work
- [ ] Test mobile responsiveness
- [ ] Deploy to production

---

## 🚨 **Common Issues and Solutions**

### **Images Not Showing:**
- Check file paths match exactly
- Ensure images are in `public/images/recipes/`
- Verify image file names have correct extensions

### **Recipe Not Appearing:**
- Check markdown file is in `content/recipes/`
- Verify frontmatter YAML is properly formatted
- Ensure no syntax errors in the file

### **Script Errors:**
- Check CSV format matches expected columns
- Verify special characters are properly escaped
- Ensure all required fields have data

### **Site Not Updating:**
- Restart development server (`npm run dev`)
- Clear browser cache
- Check for JavaScript console errors

---

## 📞 **Getting Help**

### **Technical Issues:**
1. Check the browser console for errors
2. Review the terminal output for script errors
3. Verify file paths and naming conventions
4. Test with a single recipe first

### **Content Questions:**
1. Use the provided templates as guides
2. Check existing recipes for formatting examples
3. Refer to the recipe structure documentation

---

## 🎉 **Success Tips for 100 Recipes**

### **Planning:**
1. **Organize first** - categorize your recipes
2. **Standardize** - use consistent formatting
3. **Batch process** - group similar recipes
4. **Quality over quantity** - better to have fewer great recipes

### **Execution:**
1. **Start small** - test with 5-10 recipes first
2. **Use automation** - leverage the provided scripts
3. **Be consistent** - follow naming conventions
4. **Test frequently** - check your work regularly

### **Maintenance:**
1. **Regular backups** - save your content
2. **Update regularly** - keep recipes current
3. **Monitor performance** - ensure site stays fast
4. **User feedback** - listen to your audience

---

## ✅ **Final Checklist**

When you've added all 100 recipes:

- [ ] All recipe files are in `content/recipes/`
- [ ] All images are in `public/images/recipes/`
- [ ] Site builds without errors locally
- [ ] Search functionality works
- [ ] Categories are properly populated
- [ ] Featured recipes are set correctly
- [ ] Mobile version looks good
- [ ] Site is deployed to production
- [ ] Social media links to recipes work
- [ ] SEO metadata is complete

**🎊 Congratulations! Your Neera Food Lab is now fully stocked with 100 amazing recipes!**


