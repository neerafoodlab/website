# Deployment Guide - Neera Food Lab

This guide will walk you through deploying your Neera Food Lab website to Netlify with your custom domain.

## 🚀 Quick Deployment Steps

### 1. Prepare Your Repository

1. **Initialize Git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Neera Food Lab website"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/neera-food-lab.git
   git branch -M main
   git push -u origin main
   ```

### 2. Deploy to Netlify

1. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with your GitHub account
   - Click "New site from Git"
   - Choose your repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: 18

3. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete
   - Your site will be available at `https://your-site-name.netlify.app`

### 3. Set Up Custom Domain

1. **In Netlify Dashboard**
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Enter: `www.neerafoodlab.com`

2. **Configure DNS** (in your domain provider)
   - Add CNAME record: `www` → `your-site-name.netlify.app`
   - Add A record: `@` → `75.2.60.5` (Netlify's IP)

3. **Enable HTTPS**
   - Netlify will automatically provision SSL certificate
   - Force HTTPS redirect (already configured in netlify.toml)

### 4. Configure NetlifyCMS

1. **Enable Identity**
   - Go to Site settings > Identity
   - Click "Enable Identity"
   - Configure registration preferences

2. **Enable Git Gateway**
   - Go to Site settings > Identity > Services
   - Click "Enable Git Gateway"

3. **Test CMS Access**
   - Visit `https://www.neerafoodlab.com/admin`
   - Sign up/Login with your email
   - Start creating content!

## 🔧 Advanced Configuration

### Environment Variables

No additional environment variables are required for basic functionality.

### Build Optimization

The project is already optimized for Netlify:
- Static site generation (SSG)
- Optimized images with Next.js Image component
- Automatic code splitting
- Tree shaking for smaller bundles

### Performance Monitoring

1. **Enable Netlify Analytics**
   - Go to Site settings > Analytics
   - Enable "Netlify Analytics"

2. **Google Analytics** (Optional)
   - Add your GA4 tracking ID to `app/layout.tsx`
   - Replace `your-google-verification-code` with actual code

## 📝 Content Management

### Adding Your First Recipe

1. **Via NetlifyCMS**
   - Go to `/admin` on your live site
   - Login with your Netlify account
   - Click "New Recipe"
   - Fill in the form and publish

2. **Via Git** (Advanced)
   - Create new `.md` file in `content/recipes/`
   - Follow the frontmatter template
   - Commit and push to trigger rebuild

### Managing Images

1. **Upload via CMS**
   - Use the image uploader in NetlifyCMS
   - Images are automatically optimized

2. **Manual Upload**
   - Add images to `public/images/`
   - Reference them in your content

## 🛠️ Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version (must be 18+)
   - Verify all dependencies are in package.json
   - Check for TypeScript errors

2. **CMS Not Loading**
   - Ensure Identity and Git Gateway are enabled
   - Check admin/config.yml syntax
   - Verify Git permissions

3. **Images Not Displaying**
   - Check image paths (should start with `/images/`)
   - Verify images are in `public/images/`
   - Use Next.js Image component

4. **Domain Not Working**
   - Verify DNS settings
   - Check domain propagation (can take 24-48 hours)
   - Ensure HTTPS is enabled

### Getting Help

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Project Issues**: Check the README.md troubleshooting section

## 📊 Post-Deployment Checklist

- [ ] Site loads correctly at custom domain
- [ ] HTTPS is working (green lock icon)
- [ ] CMS is accessible at `/admin`
- [ ] Can create and publish new recipes
- [ ] Images are loading properly
- [ ] Search and filter functionality works
- [ ] Mobile responsiveness is good
- [ ] Contact form is working (if using Netlify Forms)
- [ ] Newsletter signup is working
- [ ] SEO meta tags are present
- [ ] Sitemap is accessible at `/sitemap.xml`

## 🎉 Success!

Your Neera Food Lab website is now live and ready to share with the world!

**Next Steps:**
1. Add your first few recipes
2. Customize the design to match your brand
3. Set up Google Analytics for tracking
4. Share your site on social media
5. Start building your food blogging community!

---

**Need help?** Check the main README.md or reach out for support.
