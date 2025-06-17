# Jeff Mutugi - Developer Portfolio

A modern, interactive portfolio website showcasing cybersecurity expertise, full-stack development skills, and community contributions. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

### Core Features
- **Matrix-themed Cover Page** - Animated entry with auto-fade transition
- **Responsive Design** - Optimized for all devices and screen sizes
- **Dark/Light Mode** - Theme switching with system preference detection
- **Interactive Animations** - Smooth transitions and micro-interactions

### Technical Features
- **Email Integration** - Contact form with EmailJS
- **Analytics** - Google Analytics integration
- **SEO Optimized** - Meta tags, sitemap, and structured data
- **Performance** - Optimized images, lazy loading, and caching

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Email**: EmailJS
- **Analytics**: Google Analytics
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Debug-Jeff/My-Portfolio.git
   cd portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in the required environment variables:
   \`\`\`env
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)


## 📱 Pages & Sections

### Main Pages
- **Landing** (`/`) - Hero section with navigation
- **Home** (`/home`) - Main portfolio overview
- **About** (`/about`) - Personal story and achievements timeline
- **Skills** (`/skills`) - Technical skills and expertise
- **Projects** (`/projects`) - Portfolio projects showcase
- **Contact** (`/contact`) - Contact form and information

## 🔧 Configuration

### Email Setup (EmailJS)
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Add your credentials to environment variables
4. Test the contact form

### Analytics Setup (Google Analytics)
1. Create a GA4 property
2. Get your Measurement ID
3. Add it to `NEXT_PUBLIC_GA_ID`
4. Analytics will be automatically tracked

### PWA Configuration
The app is configured as a PWA with:
- Service worker for offline functionality
- Web app manifest for installation
- Optimized icons and splash screens

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: Optimized with code splitting
- **Images**: Next.js Image optimization
- **Fonts**: Self-hosted for performance

## 🔒 Security

- Rate limiting on API routes
- CAPTCHA protection on forms
- Security headers configured
- Input validation with Zod
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help with setup:

- **Email**: jeff.mutugi@example.com
- **GitHub**: [@jeffmutugi](https://github.com/jeffmutugi)
- **LinkedIn**: [Jeff Mutugi](https://linkedin.com/in/jeffmutugi)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for the icon library
- [Vercel](https://vercel.com/) for hosting and deployment

---

**Built with ❤️ by Jeff Mutugi**
\`\`\`

