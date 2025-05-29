# Integrations Setup Guide

This document provides step-by-step instructions for setting up all the integrations used in the portfolio.

## 🔧 Required Integrations

### 1. EmailJS (Contact Form) - **REQUIRED**

EmailJS allows the contact form to send emails without a backend server.

**Setup Steps:**
1. Go to [EmailJS](https://www.emailjs.com/)
2. Create a free account
3. Create a new service:
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
4. Create an email template:
   - Use variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
5. Get your credentials:
   - Service ID
   - Template ID
   - Public Key

**Environment Variables:**
\`\`\`env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
\`\`\`

**Cost:** Free (up to 200 emails/month)

### 2. Admin Authentication - **REQUIRED**

Secure the admin dashboard with proper authentication.

**Setup Steps:**
1. Generate a strong password hash:
   \`\`\`bash
   npm install bcryptjs
   node -e "console.log(require('bcryptjs').hashSync('your_admin_password', 10))"
   \`\`\`
2. Generate a JWT secret:
   \`\`\`bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   \`\`\`

**Environment Variables:**
\`\`\`env
ADMIN_PASSWORD_HASH=$2b$10$your_hashed_password
JWT_SECRET=your_32_character_secret_key
\`\`\`

## 📊 Optional Integrations

### 3. Google Analytics (Website Analytics)

Track website visitors and behavior.

**Setup Steps:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property
3. Get your Measurement ID (GA4)

**Environment Variables:**
\`\`\`env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
\`\`\`

**Cost:** Free

### 4. GitHub Integration (Community Contributions)

Display your GitHub activity and contributions.

**Setup Steps:**
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with `public_repo` scope
3. Add your GitHub username

**Environment Variables:**
\`\`\`env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
GITHUB_USERNAME=your_github_username
\`\`\`

**Cost:** Free

### 5. Database (Message Storage)

Store contact messages and analytics data.

**Options:**
- **Vercel Postgres** (Recommended)
- **Supabase** (Free tier available)
- **PlanetScale** (MySQL)
- **MongoDB Atlas**

**Setup Steps (Vercel Postgres):**
1. Go to your Vercel dashboard
2. Add Vercel Postgres to your project
3. Copy the connection string

**Environment Variables:**
\`\`\`env
DATABASE_URL=postgres://username:password@host:port/database
\`\`\`

### 6. Resend (Alternative Email Service)

Professional email service as an alternative to EmailJS.

**Setup Steps:**
1. Go to [Resend](https://resend.com/)
2. Create an account
3. Generate an API key
4. Verify your domain (optional)

**Environment Variables:**
\`\`\`env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
\`\`\`

**Cost:** Free (100 emails/day), Paid plans available

### 7. Upstash Redis (Rate Limiting)

Implement rate limiting for API protection.

**Setup Steps:**
1. Go to [Upstash](https://upstash.com/)
2. Create a Redis database
3. Get the REST URL and token

**Environment Variables:**
\`\`\`env
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token
\`\`\`

**Cost:** Free tier available

### 8. Sentry (Error Monitoring)

Monitor and track errors in production.

**Setup Steps:**
1. Go to [Sentry](https://sentry.io/)
2. Create a new project
3. Get your DSN

**Environment Variables:**
\`\`\`env
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
NEXT_PUBLIC_SENTRY_DSN=https://your-public-sentry-dsn@sentry.io/project-id
\`\`\`

**Cost:** Free tier available

## 🚀 Deployment Integrations

### Vercel (Recommended)

**Setup Steps:**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Alternative Platforms
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 🔒 Security Considerations

1. **Never commit `.env` files** to version control
2. **Use strong passwords** for admin access
3. **Implement rate limiting** for API routes
4. **Validate all inputs** on both client and server
5. **Use HTTPS** in production
6. **Regularly update dependencies**

## 📋 Integration Checklist

- [ ] EmailJS setup and tested
- [ ] Admin authentication configured
- [ ] Google Analytics (optional)
- [ ] GitHub integration (optional)
- [ ] Database setup (optional)
- [ ] Error monitoring (optional)
- [ ] Rate limiting (optional)
- [ ] Domain and SSL configured
- [ ] Environment variables added to deployment platform

## 🆘 Troubleshooting

### EmailJS Issues
- Check service and template IDs
- Verify email template variables
- Test with EmailJS dashboard

### Admin Access Issues
- Verify password hash generation
- Check JWT secret length (minimum 32 characters)
- Clear browser cookies and try again

### GitHub API Issues
- Check token permissions
- Verify rate limits (5000 requests/hour)
- Ensure username is correct

For more help, check the main README.md or create an issue in the repository.
\`\`\`

Now let's create a security guide:
