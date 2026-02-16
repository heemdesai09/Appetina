# 🚀 Deployment Guide for Appetina Restaurant Website

## Quick Start Checklist

Before deploying, ensure you have:
- [ ] PostgreSQL database ready
- [ ] Email SMTP credentials
- [ ] Domain name (optional but recommended)
- [ ] Vercel/Netlify account

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Step 1: Prepare Database

**Option A: Vercel Postgres (Easiest)**
1. Go to your Vercel dashboard
2. Create new Postgres database
3. Copy the `DATABASE_URL` connection string

**Option B: External PostgreSQL (Supabase, Neon, Railway)**
1. Create a PostgreSQL database on your preferred platform
2. Get the connection string
3. Format: `postgresql://username:password@host:port/database`

### Step 2: Push Code to GitHub
```bash
cd appetina-restaurant
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables (see below)
5. Click "Deploy"

### Step 4: Environment Variables in Vercel
Add these in Vercel Dashboard → Project → Settings → Environment Variables:

```
DATABASE_URL=postgresql://your-connection-string
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
BOOKING_EMAIL=bookings@appetina.com
WHATSAPP_NUMBER=919979448440
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### Step 5: Run Database Migrations
After first deployment:
1. Go to Vercel Dashboard → Project → Deployments
2. Open the latest deployment
3. Go to "Functions" tab
4. You can run Prisma commands via Vercel CLI or manually seed data

**Alternative: Use Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel env pull .env.local
npx prisma db push
npx prisma db seed
```

### Step 6: Verify Deployment
1. Visit your Vercel URL
2. Test booking form
3. Login to admin panel: `your-domain.vercel.app/admin`
4. Credentials: `admin@appetina.com` / `admin123`

---

## Option 2: Deploy to Netlify

### Step 1: Build Configuration
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 2: Deploy
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy

**Note:** For database, use external PostgreSQL (Netlify doesn't provide it)

---

## Option 3: Deploy to Railway

### Step 1: Database Setup
1. Create new project on Railway
2. Add PostgreSQL service
3. Get connection string

### Step 2: Deploy Application
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

### Step 3: Add Environment Variables
```bash
railway variables set DATABASE_URL=your-connection-string
railway variables set JWT_SECRET=your-secret
# ... add all other variables
```

---

## Email Configuration

### Gmail Setup (Most Common)
1. Enable 2-Step Verification in Google Account
2. Go to: Google Account → Security → 2-Step Verification → App Passwords
3. Select "Mail" and "Other"
4. Generate password
5. Use this password in `SMTP_PASS` environment variable

### Alternative Email Providers

**SendGrid**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Mailgun**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-username
SMTP_PASS=your-mailgun-password
```

---

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL`

### Cloudflare (Optional - for CDN)
1. Add site to Cloudflare
2. Update nameservers
3. Enable proxy for better performance

---

## Post-Deployment Checklist

### Security
- [ ] Change admin password from default
- [ ] Verify HTTPS is enabled
- [ ] Test all forms and submissions
- [ ] Check email notifications work
- [ ] Verify WhatsApp button works
- [ ] Test booking system end-to-end

### Performance
- [ ] Test page load speed
- [ ] Verify images load properly
- [ ] Check mobile responsiveness
- [ ] Test all animations

### SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta tags
- [ ] Check structured data
- [ ] Test social media sharing

### Analytics (Optional)
- [ ] Add Google Analytics
- [ ] Enable Vercel Analytics
- [ ] Set up error monitoring (Sentry)

---

## Maintenance

### Regular Tasks
1. **Backup Database** (Weekly)
   - Export database regularly
   - Store backups securely

2. **Update Dependencies** (Monthly)
```bash
npm update
npm audit fix
```

3. **Monitor Performance**
   - Check error logs
   - Monitor API response times
   - Track user feedback

### Troubleshooting

**Issue: Database Connection Failed**
- Verify `DATABASE_URL` is correct
- Check database is running
- Verify network connectivity

**Issue: Emails Not Sending**
- Check SMTP credentials
- Verify Gmail App Password
- Check spam folder
- Review email service logs

**Issue: Build Failed**
- Check build logs in Vercel
- Verify all dependencies installed
- Check for TypeScript errors

---

## Database Backup

### Manual Backup
```bash
# Export database
pg_dump DATABASE_URL > backup.sql

# Restore from backup
psql DATABASE_URL < backup.sql
```

### Automated Backups
Set up automated backups on your database provider:
- Vercel Postgres: Automatic daily backups
- Supabase: Point-in-time recovery
- Railway: Automated backups available

---

## Scaling Considerations

### When Traffic Grows
1. **Database**
   - Upgrade to larger instance
   - Add read replicas
   - Implement caching (Redis)

2. **CDN**
   - Use Cloudflare for static assets
   - Enable Vercel Edge caching

3. **Monitoring**
   - Add application monitoring
   - Set up alerts
   - Track performance metrics

---

## Support & Contact

For deployment assistance:
- Documentation: README.md
- Technical Support: Create GitHub issue
- Emergency: +91 99794 48440

---

## Cost Estimates

### Free Tier (Recommended for Starting)
- **Vercel**: Free (Hobby plan)
- **Vercel Postgres**: $0-10/month
- **Domain**: $10-15/year
- **Total**: ~$10-15/month

### Production Tier
- **Vercel Pro**: $20/month
- **Database**: $20-50/month
- **Email Service**: $10-25/month (if not using Gmail)
- **Total**: $50-100/month

---

Built with ❤️ for Appetina Restaurant
Deployment made simple!
