# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- A Supabase account (free at supabase.com)
- A Twilio account OR use Supabase's SMS provider

---

## Step 1: Clone & Install

```bash
cd halka-web
npm install
```

---

## Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Wait ~2 minutes for initialization

---

## Step 3: Apply Database Schema

1. Go to your Supabase dashboard → **SQL Editor**
2. Create **New Query**
3. Copy entire `database.sql` file from this project
4. Paste into editor and click **Run**
5. Tables created ✅

---

## Step 4: Get Credentials

1. Supabase dashboard → **Settings** → **API**
2. Copy:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 5: Configure Environment

1. Copy `.env.local.example` → `.env.local`
2. Paste your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Leave Twilio/Razorpay/WhatsApp for later (optional for testing)

---

## Step 6: Enable Phone Auth in Supabase

1. Supabase dashboard → **Authentication** → **Providers**
2. Click **Phone**
3. Toggle **Enable Phone Provider**
4. Choose: **Supabase** (built-in SMS) or **Twilio** (external)
5. If Twilio: Paste your credentials
6. **Save** ✅

---

## Step 7: Run Dev Server

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## Step 8: Test Authentication

1. Click **"Start Free Assessment"** button
2. Complete the 8-question quiz
3. Click **"Book Doctor Consultation"**
4. Enter phone number (e.g., `9876543210` or `+919876543210`)
5. Click **"Send OTP via WhatsApp"**
6. Check WhatsApp for OTP code
7. Enter 6-digit code
8. You should be redirected to `/dashboard` ✅

---

## Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
```

---

## Project Structure (Quick Reference)

```
app/                    # Pages & API routes
├── page.tsx           # Landing page
├── auth/              # Authentication pages
├── dashboard/         # User dashboard
└── api/               # API endpoints

components/           # React components
├── QuizModal.tsx     # 8-question form
├── Pricing.tsx       # Pricing section
└── ...

lib/                  # Utilities
├── colors.ts        # Design system
└── supabase.ts      # Database client

types/
└── database.ts      # TypeScript types
```

---

## Common Issues & Fixes

### "Phone provider not enabled"
```
→ Supabase → Auth → Providers → Phone → Enable toggle
```

### "OTP not arriving"
```
→ Check Supabase Auth logs (SQL Editor)
→ Verify phone format: +91 for India
→ Twilio: Check Twilio console for failed messages
```

### "Cannot find module 'supabase'"
```
→ npm install
→ Restart dev server
```

### "Middleware not protecting routes"
```
→ Clear browser cookies (Ctrl+Shift+Delete)
→ Restart: npm run dev
→ Check that middleware.ts exists in project root
```

### "Permission denied on quiz submission"
```
→ Database → RLS Policies are not set up
→ Re-run database.sql (make sure RLS CREATE POLICY statements executed)
```

---

## Next: Deploy to Vercel

Once everything works locally:

```bash
# 1. Initialize git
git init
git add .
git commit -m "Initial: Halka auth setup"

# 2. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/halka-web
git push -u origin main

# 3. Go to vercel.com → New Project → Select your repo → Deploy

# 4. In Vercel, add environment variables:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

# 5. Update Supabase Auth Callback
Supabase → Auth → URL Configuration → Add:
https://your-vercel-domain.vercel.app/auth/verify
```

---

## What's Working Now

✅ Landing page with all original sections  
✅ Quiz modal (8 questions)  
✅ Phone OTP authentication  
✅ User dashboard with quiz results  
✅ Database persistence  
✅ Protected routes  

---

## What's Next

🔄 Doctor booking system  
🔄 Razorpay payment integration  
🔄 React Native mobile app  

See `SETUP.md` for detailed setup instructions.  
See `PROJECT_STRUCTURE.md` for full project overview.

---

## Support

Stuck? Check SETUP.md or create an issue on GitHub.

Happy building! 🚀
