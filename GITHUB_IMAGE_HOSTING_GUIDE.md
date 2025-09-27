# 📸 GitHub Image Hosting Setup Guide

## 🚀 Quick Setup Steps

### 1. Create GitHub Repository
```bash
# If you haven't already, create a new repository on GitHub
# Repository name suggestion: "neera-food-lab-website"
```

### 2. Add Your Project to GitHub
```bash
# Initialize git (already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Neera Food Lab website"

# Add GitHub repository (replace with your actual repo URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git push -u origin main
```

### 3. Upload Recipe Images

**Option A: Through GitHub Web Interface**
1. Go to your GitHub repository
2. Navigate to `public/images/recipes/`
3. Click "Add file" → "Upload files"
4. Drag and drop your recipe images
5. Commit changes

**Option B: Through Command Line**
```bash
# Add your recipe images to public/images/recipes/
cp ~/Desktop/my-recipe-photo.jpg public/images/recipes/butter-chicken.jpg

# Commit and push
git add public/images/recipes/
git commit -m "Add recipe images"
git push
```

## 🔗 GitHub Raw URL Format

Once your images are on GitHub, use this URL format in your admin form:

```
https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO-NAME/main/public/images/recipes/IMAGE-NAME.jpg
```

### Example URLs:
```
https://raw.githubusercontent.com/johndoe/neera-food-lab/main/public/images/recipes/butter-chicken.jpg
https://raw.githubusercontent.com/johndoe/neera-food-lab/main/public/images/recipes/samosa.jpg
https://raw.githubusercontent.com/johndoe/neera-food-lab/main/public/images/recipes/biryani.jpg
```

## 📱 Image Guidelines

### Recommended Specifications:
- **Aspect Ratio:** 16:9 (for hero images)
- **Resolution:** 1200x675px minimum
- **File Size:** Under 500KB
- **Format:** JPG or PNG
- **Naming:** Use lowercase, hyphens for spaces
  - ✅ `butter-chicken.jpg`
  - ✅ `vegetable-biryani.jpg` 
  - ❌ `Butter Chicken.JPG`

### Quick Image Optimization:
1. **Resize** to 1200px width
2. **Compress** using online tools like TinyPNG
3. **Rename** to match recipe slug

## 🎯 Workflow for Adding New Recipe

1. **Create/Edit recipe photo**
2. **Upload to** `public/images/recipes/recipe-name.jpg`
3. **Commit and push** to GitHub
4. **Copy GitHub raw URL**
5. **Paste URL** in admin form
6. **Generate recipe** with image link

## 💡 Pro Tips

- **Batch upload** multiple images at once via GitHub web interface
- **Use consistent naming** matching your recipe slugs
- **Keep images under 500KB** for fast loading
- **Always use HTTPS** URLs from GitHub
- **Images are publicly accessible** (perfect for website use)

## 🔧 Alternative: Local Path Method

If you prefer not to use URLs, you can:
1. Upload image to `public/images/recipes/recipe-name.jpg`
2. Leave hero image URL field **empty** in admin form
3. System will auto-generate local path

---

**Ready to upload your first recipe image? Follow the steps above!** 🚀
