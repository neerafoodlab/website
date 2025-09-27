# 🚀 Quick CMS Setup Guide

## **Step 1: Access Your CMS**
1. Go to: `http://localhost:3000/admin/` (for local testing)
2. Or: `https://www.neerafoodlab.com/admin/` (when deployed)

## **Step 2: Enable Netlify Identity**
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **"Identity"** tab
4. Click **"Enable Identity"**
5. Go to **"Settings and usage"**
6. Enable **"Registration preferences"** → **"Invite only"**

## **Step 3: Create Admin User**
1. Go to **"Identity"** tab
2. Click **"Invite users"**
3. Enter your email address
4. Check your email and accept invitation
5. Set up your password

## **Step 4: Test CMS**
1. Go to `/admin/` on your site
2. Login with your credentials
3. Try adding a new recipe
4. Check if it appears on your website

## **Step 5: Configure Git Integration**
1. In Netlify, go to **"Site settings"**
2. Go to **"Identity"** → **"Services"**
3. Enable **"Git Gateway"**
4. This allows CMS to save changes to your Git repository

## **🎉 You're Ready!**
Your CMS is now fully functional. Use the detailed `CMS_GUIDE.md` for content management instructions.
