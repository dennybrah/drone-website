# LV Logic Media Website

A modern, professional website for drone services in Las Vegas featuring aerial photography, videography, and inspections.

## Features

- **Responsive Design**: Mobile-friendly and works seamlessly across all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Portfolio Section**: YouTube video showcase of drone footage
- **Contact Form**: Integrated contact form with email delivery
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility
- **Services Pages**: Detailed information about drone services offered

## Pages

- **Home** (`index.html`): Main landing page with hero section, features, portfolio video showcasing aerial cinematography, and services preview
- **Services** (`services.html`): Detailed breakdown of aerial photography, videography, and inspection services
- **Contact** (`contact.html`): Contact form and business information

## Setup Instructions

### 1. Basic Setup

Simply open `index.html` in your web browser to view the website locally.

### 2. Contact Form Setup (Netlify Forms)

The contact form is configured to use Netlify Forms, which automatically handles form submissions when deployed to Netlify.

**How it works:**
- The form has `data-netlify="true"` attribute which tells Netlify to handle submissions
- Netlify will automatically detect the form when you deploy
- Form submissions will appear in your Netlify dashboard under "Forms"
- You can configure email notifications in the Netlify dashboard

**Setup Steps:**

1. **Deploy to Netlify** (see Deploying to Netlify section below)

2. **Configure Email Notifications**
   - Log in to your Netlify dashboard
   - Go to your site's settings
   - Navigate to Forms → Form notifications
   - Add an email notification to send submissions to `denny@lvlogicmedia.com`
   - You can also set up Slack notifications, webhooks, or other integrations

3. **Test the Form**
   - Submit a test message through the contact form on your live site
   - Check your Netlify dashboard under "Forms" to see the submission
   - Verify you receive the email notification

**Features:**
- Spam filtering included automatically
- 100 free submissions per month on the free plan
- All submissions stored in Netlify dashboard
- Can export submissions as CSV

### 3. Deploying to Netlify

The easiest way to deploy this website with full contact form functionality:

1. **Push your code to GitHub** (already done)

2. **Connect to Netlify**
   - Go to [https://www.netlify.com](https://www.netlify.com)
   - Sign up or log in
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and authorize Netlify
   - Select your `drone-website` repository

3. **Configure Build Settings**
   - Build command: (leave empty - this is a static site)
   - Publish directory: `/` (root directory)
   - Click "Deploy site"

4. **Your Site is Live!**
   - Netlify will provide a URL like `https://yoursite.netlify.app`
   - The contact form will work automatically
   - You can add a custom domain in Site settings

### 4. Deploying to GitHub Pages (Alternative)

To host your website for free on GitHub Pages:

1. **Enable GitHub Pages**
   ```bash
   gh repo edit --enable-pages --pages-branch main
   ```

2. **Access Your Site**
   - Your website will be available at: `https://dennybrah.github.io/drone-website/`
   - It may take a few minutes for the site to become available

**Note:** GitHub Pages does not support Netlify Forms. If you deploy to GitHub Pages, the contact form will not work. For full functionality including the contact form, deploy to Netlify instead.

### 5. Custom Domain (Optional)

To use a custom domain with GitHub Pages:

1. Add a file named `CNAME` to your repository with your domain name
2. Configure your domain's DNS settings to point to GitHub Pages
3. See [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for detailed instructions

## File Structure

```
drone-website/
├── index.html          # Homepage
├── services.html       # Services page
├── contact.html        # Contact page
├── styles.css          # All styles and responsive design
├── script.js           # JavaScript for interactivity and form validation
└── README.md           # This file
```

## Technologies Used

- **HTML5**: Semantic markup and SEO optimization
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Form validation and interactive features
- **Netlify Forms**: Contact form submission handling with built-in spam protection

## Customization

### Updating Content

- **Company Name**: LV Logic Media
- **Colors**: Edit CSS variables in `styles.css` (lines 10-25) to change the color scheme
- **Services**: Modify the services sections in `index.html` and `services.html`
- **Portfolio Video**: Replace the YouTube video ID in `index.html` (line 91)

### Adding More Portfolio Videos

To add more videos to the portfolio section, duplicate the video showcase structure in `index.html` and update the YouTube embed URLs.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support

For issues or questions about the website, contact denny@lvlogicmedia.com

## License

Copyright © 2025 LV Logic Media. All rights reserved.
