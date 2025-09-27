# Neera Food Lab - Content Management System (CMS) Guide

## 🎯 **How to Update Content on Your Website**

Your website uses **NetlifyCMS** for easy content management. Here's everything you need to know:

---

## 📝 **1. Accessing the CMS**

### **Option A: Direct CMS Access**
1. Go to: `https://www.neerafoodlab.com/admin/`
2. Click **"Login with Netlify Identity"**
3. Use your Netlify account credentials

### **Option B: Through Netlify Dashboard**
1. Log into [Netlify](https://app.netlify.com)
2. Select your site: `neerafoodlab.com`
3. Go to **"Identity"** tab
4. Click **"Open admin panel"**

---

## 🍽️ **2. Managing Recipe Content**

### **Adding New Recipes**
1. **Login to CMS** → Go to **"Recipes"** section
2. Click **"+ New Recipe"**
3. Fill out the form:

```
Title: [Recipe Name]
Description: [Brief description]
Category: [Select from dropdown]
Prep Time: [e.g., "30 mins"]
Cook Time: [e.g., "45 mins"]
Servings: [e.g., "4 people"]
Rating: [e.g., "4.5"]
Cover Image: [Upload image]
Ingredients: [List ingredients]
Instructions: [Step-by-step instructions]
Tags: [comma-separated tags]
Featured: [Yes/No]
```

### **Editing Existing Recipes**
1. **Login to CMS** → Go to **"Recipes"** section
2. Click on any recipe to edit
3. Make your changes
4. Click **"Save"**

### **Deleting Recipes**
1. **Login to CMS** → Go to **"Recipes"** section
2. Click on recipe to open
3. Click **"Delete"** button
4. Confirm deletion

---

## 🏠 **3. Managing Homepage Content**

### **Hero Section**
- **Title**: "Discover the Magic of Indian Cooking"
- **Subtitle**: "From traditional family recipes to modern twists..."
- **CTA Buttons**: "Explore Recipes" and "Learn More"

### **Featured Recipes**
- Select which recipes appear on homepage
- Set `featured: true` in recipe settings
- Maximum 6 featured recipes recommended

### **Categories Section**
- Categories are automatically generated from recipe data
- No manual editing needed

### **Newsletter Section**
- **Title**: "Stay Updated with New Recipes"
- **Description**: Newsletter signup text
- **Form**: Automatically handled by Netlify Forms

---

## 📄 **4. Managing Static Pages**

### **About Page**
1. **Login to CMS** → Go to **"Pages"** section
2. Click **"About"** to edit
3. Update content:
   - **Title**: "About Neera Food Lab"
   - **Content**: Your story, mission, etc.
   - **Image**: Upload your photo

### **Contact Page**
1. **Login to CMS** → Go to **"Pages"** section
2. Click **"Contact"** to edit
3. Update:
   - **Email**: Your contact email
   - **Phone**: Your phone number
   - **Address**: Your location
   - **Social Media**: Links to your profiles

---

## 🖼️ **5. Managing Images**

### **Uploading Images**
1. **In any content editor** → Click **"Upload"** button
2. **Select files** from your computer
3. **Images are automatically optimized** for web
4. **Recommended sizes**:
   - Recipe images: 800x400px
   - Hero images: 1200x600px
   - Profile images: 400x400px

### **Image Best Practices**
- Use **high-quality images**
- **Optimize file sizes** (under 500KB)
- Use **descriptive filenames**
- Include **alt text** for accessibility

---

## ⚙️ **6. Site Settings**

### **Site Information**
1. **Login to CMS** → Go to **"Settings"** section
2. Update:
   - **Site Title**: "Neera Food Lab"
   - **Site Description**: SEO description
   - **Logo**: Upload your logo
   - **Favicon**: Upload favicon

### **SEO Settings**
- **Meta Title**: Page-specific titles
- **Meta Description**: Page descriptions
- **OpenGraph Image**: Social sharing image
- **Keywords**: Relevant keywords

---

## 🔧 **7. Advanced Content Management**

### **Bulk Operations**
- **Export content**: Download all content as JSON
- **Import content**: Upload content from JSON file
- **Backup**: Regular backups recommended

### **Content Workflow**
1. **Draft**: Create content in draft mode
2. **Review**: Check content before publishing
3. **Publish**: Make content live on website
4. **Update**: Modify published content as needed

---

## 📱 **8. Mobile CMS Access**

### **Mobile App**
- **Netlify CMS** works on mobile browsers
- **Responsive interface** for easy editing
- **Image upload** from mobile devices

### **Quick Edits**
- **Recipe updates** on the go
- **Content corrections** from anywhere
- **Image management** from mobile

---

## 🚀 **9. Publishing Changes**

### **Automatic Publishing**
- **Changes are live immediately** after saving
- **No manual deployment** required
- **Instant updates** on website

### **Version Control**
- **All changes are tracked** in Git
- **Rollback capability** if needed
- **Change history** available

---

## 🆘 **10. Troubleshooting**

### **Common Issues**

#### **"Can't Login to CMS"**
- Check Netlify Identity settings
- Verify email invitation
- Clear browser cache

#### **"Images Not Uploading"**
- Check file size (max 10MB)
- Verify file format (JPG, PNG, WebP)
- Try different browser

#### **"Changes Not Appearing"**
- Wait 2-3 minutes for deployment
- Clear browser cache
- Check if content is published

#### **"CMS Loading Slowly"**
- Check internet connection
- Try different browser
- Contact support if persistent

---

## 📞 **11. Getting Help**

### **Support Resources**
- **Netlify Documentation**: [docs.netlify.com](https://docs.netlify.com)
- **CMS Documentation**: [netlifycms.org](https://netlifycms.org)
- **Video Tutorials**: Available on YouTube

### **Contact Information**
- **Technical Issues**: Check Netlify support
- **Content Questions**: Use this guide
- **Custom Features**: Contact developer

---

## ✅ **12. Quick Start Checklist**

### **First Time Setup**
- [ ] Access CMS at `/admin/`
- [ ] Login with Netlify account
- [ ] Upload your logo and favicon
- [ ] Update site information
- [ ] Add your first recipe
- [ ] Test all functionality

### **Regular Maintenance**
- [ ] Add new recipes weekly
- [ ] Update featured recipes monthly
- [ ] Check for broken links
- [ ] Monitor site performance
- [ ] Backup content regularly

---

## 🎉 **You're All Set!**

Your Neera Food Lab website is now fully manageable through the CMS. You can:
- ✅ **Add new recipes** easily
- ✅ **Update existing content** quickly
- ✅ **Manage images** efficiently
- ✅ **Control site settings** from one place
- ✅ **Publish changes** instantly

**Happy cooking and content creating!** 🍽️✨
