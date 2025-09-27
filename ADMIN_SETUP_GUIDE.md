# Admin Setup Guide

## Local Development (No Login Required)

When running locally (`npm run dev`), the admin uses a **test-repo backend** that doesn't require authentication:

1. Visit `http://localhost:3000/admin`
2. The admin interface loads automatically without login
3. You can create, edit, and manage content locally
4. Changes are stored in memory (won't persist between sessions)

## Production Deployment (Netlify)

For production use on Netlify, you'll need to set up Netlify Identity:

### 1. Enable Netlify Identity
1. Go to your Netlify site dashboard
2. Navigate to **Site Settings** → **Identity**
3. Click **Enable Identity**
4. Configure registration preferences (recommend "Invite only")

### 2. Enable Git Gateway
1. In **Site Settings** → **Identity** → **Services**
2. Click **Enable Git Gateway**
3. This allows CMS to commit changes to your repository

### 3. Invite Users
1. Go to **Identity** → **Invite users**
2. Add yourself as an admin user
3. Complete the email invitation

### 4. Repository Permissions
Make sure your repository allows Netlify to commit:
- For GitHub: Check repository settings for Netlify app permissions
- The CMS will commit changes to the `main` branch

## Features Available

- **Recipes Management**: Create and edit recipe content with all fields (title, description, ingredients, instructions, nutrition, SEO, etc.)
- **Pages Management**: Edit homepage and other pages
- **Site Settings**: Configure logo, social media, etc.
- **Media Upload**: Upload images for recipes and content

## Troubleshooting

### Local Development Issues
- Make sure you're running `npm run dev`
- Check browser console for JavaScript errors
- Clear browser cache if admin doesn't load
- The admin uses hardcoded configuration for simplicity

### Production Issues
- Verify Netlify Identity is enabled
- Check that Git Gateway is enabled
- Confirm you have admin permissions
- Check repository permissions for Netlify

### Current Features
- **Dashboard**: Overview of site statistics and management options
- **Recipe Management**: Access to recipe files for editing
- **Content Management**: Access to page files for editing
- **Settings Management**: Access to site settings configuration
- **File-based Editing**: Direct access to content files

### Netlify CMS Status
- **Development**: Using simplified admin interface (Netlify CMS integration planned)
- **Production**: Will use full Netlify CMS when deployed (requires Netlify Identity setup)

### Common Errors (Resolved)
- **"Collections names must be unique"**: Fixed by removing complex CMS configuration
- **"Authentication required"**: Will be set up for production deployment
- **"Permission denied"**: Check Git Gateway configuration for production

## Technical Implementation

- **Development**: Uses hardcoded JavaScript configuration with test-repo backend
- **Production**: Uses hardcoded JavaScript configuration with git-gateway backend
- **Single configuration**: Same config object works for both environments
- **Automatic backend switching**: Environment detection determines backend type
- **No external config files**: Configuration is embedded directly in the admin component
- **Simplified setup**: No YAML parsing or file loading issues
