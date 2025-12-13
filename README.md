# LV Logic Media Website

A modern, professional website for drone services featuring aerial photography, videography, and inspections.

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

### 2. Contact Form Setup (Formspree)

The contact form is configured to send emails to `denis@lvlogicmedia.com` using Formspree. Follow these steps to activate it:

1. **Create a Formspree Account**
   - Go to [https://formspree.io](https://formspree.io)
   - Sign up for a free account

2. **Create a New Form**
   - Click "New Form" in your Formspree dashboard
   - Name your form (e.g., "Drone Website Contact")
   - Set the email address to: `denis@lvlogicmedia.com`

3. **Get Your Form ID**
   - After creating the form, Formspree will give you a Form ID
   - It will look like: `YOUR_FORM_ID` (a random string of characters)

4. **Update the Contact Form**
   - Open `contact.html` in a text editor
   - Find this line (around line 53):
     ```html
     <form id="contactForm" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
     ```
   - Replace `YOUR_FORM_ID` with your actual Formspree Form ID
   - Example:
     ```html
     <form id="contactForm" class="contact-form" action="https://formspree.io/f/xabcdefg" method="POST">
     ```

5. **Save and Test**
   - Save the file
   - Upload your website to your hosting provider
   - Test the contact form by submitting a message
   - You should receive an email at denis@lvlogicmedia.com

### 3. Deploying to GitHub Pages

To host your website for free on GitHub Pages:

1. **Enable GitHub Pages**
   ```bash
   gh repo edit --enable-pages --pages-branch main
   ```

2. **Access Your Site**
   - Your website will be available at: `https://dennybrah.github.io/drone-website/`
   - It may take a few minutes for the site to become available

### 4. Custom Domain (Optional)

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
- **Formspree**: Contact form email delivery service

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

For issues or questions about the website, contact denis@lvlogicmedia.com

## License

Copyright © 2025 LV Logic Media. All rights reserved.
