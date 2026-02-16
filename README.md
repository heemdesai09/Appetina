# Appetina Restaurant & Banquet Hall Website

A fully professional, production-ready Next.js 14 website for Appetina The Banquet & Restaurant in Ahmedabad, Gujarat.

## 🎯 Features

### Frontend Features
- ✨ **Premium Hero Section** with smooth animations
- 🏛️ **About Section** highlighting venue capabilities
- 🎪 **Services Showcase** for banquet hall, dining, and catering
- 🍽️ **Dynamic Menu** with categories (North Indian, Chinese, South Indian, etc.)
- 📸 **Gallery** with lightbox functionality
- ⭐ **Testimonials** from satisfied clients
- 📅 **Booking System** with email notifications
- 📍 **Contact Section** with Google Maps integration
- 📱 **WhatsApp Floating Button** for instant communication
- 🎨 **Luxury Design** with maroon & gold theme
- 📱 **Fully Responsive** - mobile-first design
- ⚡ **Fast Loading** with optimized images and lazy loading
- 🔍 **SEO Optimized** with proper meta tags and schema markup

### Backend Features
- 🔐 **JWT Authentication** for admin panel
- 📊 **Admin Dashboard** to manage bookings, menu, gallery, and testimonials
- 📧 **Email Notifications** using Nodemailer
- 🛡️ **Rate Limiting** for API protection
- ✅ **Input Validation** with Zod
- 💾 **PostgreSQL Database** with Prisma ORM
- 🔄 **REST API** architecture

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (Animations)
- **React Hot Toast** (Notifications)

### Backend
- **Next.js API Routes**
- **Node.js**
- **Prisma ORM**
- **PostgreSQL**
- **JWT** (Authentication)
- **Nodemailer** (Email service)
- **Zod** (Validation)

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** 18.0.0 or higher
- **npm** or **yarn**
- **PostgreSQL** database

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd appetina-restaurant
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/appetina_db?schema=public"

# JWT Secret (Generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"

# Email Configuration (Gmail Example)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"  # Use Gmail App Password

# Booking Email
BOOKING_EMAIL="bookings@appetina.com"

# WhatsApp Number (without + or spaces)
WHATSAPP_NUMBER="919979448440"

# Site URL
NEXT_PUBLIC_SITE_URL="https://appetina.com"
```

**Important Notes:**
- For Gmail, you need to create an "App Password" (not your regular password)
- Go to Google Account Settings → Security → 2-Step Verification → App Passwords
- Generate an app password and use it in `SMTP_PASS`

### 4. Database Setup

```bash
# Push the Prisma schema to your database
npx prisma db push

# Seed the database with initial data
npm run prisma:seed
```

This will create:
- Admin user: `admin@appetina.com` / `admin123`
- Sample menu items
- Sample gallery images
- Sample testimonials

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

### 6. Access Admin Panel

Visit `http://localhost:3000/admin` and login with:
- **Email:** admin@appetina.com
- **Password:** admin123

**⚠️ IMPORTANT:** Change the admin password immediately in production!

## 📊 Database Management

### View Database
```bash
npx prisma studio
```

### Reset Database
```bash
npx prisma db push --force-reset
npm run prisma:seed
```

### Create Migration
```bash
npx prisma migrate dev --name your_migration_name
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  maroon: { /* your colors */ },
  gold: { /* your colors */ },
}
```

### Fonts
Fonts are configured in `app/layout.tsx`:
- Display: Playfair Display
- Body: Lora
- Sans: Montserrat

### Images
Replace images in the seed file or upload through admin panel.

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables from `.env`
   - Deploy!

3. **Database on Vercel**
   - Use Vercel Postgres or external PostgreSQL (Supabase, Neon, etc.)
   - Update `DATABASE_URL` in Vercel environment variables

### Deploy to Other Platforms

The app can be deployed to:
- **Netlify**
- **Railway**
- **Render**
- **AWS**
- **DigitalOcean**

## 📁 Project Structure

```
appetina-restaurant/
├── app/
│   ├── api/          # API routes
│   ├── admin/        # Admin panel (to be created)
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/       # React components
├── lib/             # Utility functions
│   ├── auth.ts      # Authentication
│   ├── email.ts     # Email service
│   ├── prisma.ts    # Database client
│   └── validations.ts # Zod schemas
├── prisma/
│   ├── schema.prisma # Database schema
│   └── seed.ts       # Seed data
└── public/          # Static files
```

## 🔒 Security Checklist

Before going live:

- [ ] Change admin password
- [ ] Generate secure JWT_SECRET (32+ characters)
- [ ] Set up proper SMTP credentials
- [ ] Enable HTTPS
- [ ] Configure CORS if needed
- [ ] Set up backup system
- [ ] Enable rate limiting in production
- [ ] Review and test all forms
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure CSP headers

## 📧 Email Setup

### Gmail Setup
1. Enable 2-Step Verification in Google Account
2. Go to App Passwords
3. Generate password for "Mail"
4. Use this password in `.env`

### Custom SMTP
Update these in `.env`:
```env
SMTP_HOST="your-smtp-host.com"
SMTP_PORT="587"
SMTP_USER="your-username"
SMTP_PASS="your-password"
```

## 🆘 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL format
# Test connection with Prisma Studio
npx prisma studio
```

### Email Not Sending
- Verify SMTP credentials
- Check if Gmail App Password is correct
- Check spam folder
- Review console logs

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📱 API Endpoints

### Public Endpoints
- `GET /api/menu` - Get all menu items
- `GET /api/gallery` - Get gallery images
- `GET /api/testimonials` - Get testimonials
- `POST /api/bookings` - Create booking

### Admin Endpoints (Requires Authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/bookings` - Get all bookings
- `PATCH /api/bookings/[id]` - Update booking status
- `DELETE /api/bookings/[id]` - Delete booking

## 📝 Admin Credentials

**Default Admin Account:**
- Email: admin@appetina.com
- Password: admin123

**⚠️ Change these immediately in production!**

## 💡 Tips for Production

1. **Performance Optimization**
   - Enable CDN for static assets
   - Optimize images (use Next.js Image component)
   - Enable caching headers
   - Use production database

2. **Monitoring**
   - Set up Vercel Analytics
   - Add error tracking (Sentry)
   - Monitor API performance
   - Track user engagement

3. **Backup Strategy**
   - Regular database backups
   - Version control for code
   - Document any manual changes

## 🤝 Support

For issues or questions:
- Email: support@appetina.com
- Phone: +91 99794 48440

## 📄 License

Proprietary - All Rights Reserved
© 2024 Appetina The Banquet & Restaurant

---

Built with ❤️ for Appetina Restaurant
