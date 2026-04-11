# Halka: Setup Guide

## Phase 1 ✅ Complete

Project structure, TypeScript setup, component refactoring, and database types have been created.

---

## Phase 2: Phone OTP Authentication (Current)

### What's been created:
- ✅ Authentication API routes: `/api/auth/send-otp`, `/api/auth/verify-otp`, `/api/auth/logout`
- ✅ Phone entry page: `/app/auth/phone`
- ✅ OTP verification page: `/app/auth/verify`
- ✅ Route middleware for protection
- ✅ Dashboard page: `/app/dashboard`
- ✅ Database schema: `database.sql`
- ✅ Quiz submission API: `/api/quiz/submit`

### Setup Instructions:

#### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project (name it "halka")
3. Choose the region closest to India (Singapore or Mumbai)
4. Wait for project to initialize

#### 2. Apply Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `database.sql` from this project
4. Paste into the SQL editor
5. Click **Run**
6. Verify tables were created (check **Table Editor** section)

#### 3. Configure Supabase Auth for Phone OTP

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Click **Phone**
3. Toggle **Enable Phone Provider**
4. Select **Twilio** as SMS provider (or use Supabase's built-in SMS if available in your region)
5. If using Twilio:
   - Create a Twilio account at [twilio.com](https://twilio.com)
   - Get your Account SID, Auth Token, and a Twilio phone number
   - Enter these credentials in Supabase
6. Save and enable

#### 4. Get Your Supabase Credentials

1. Go to **Settings** → **API**
2. Copy:
   - `NEXT_PUBLIC_SUPABASE_URL` (Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon public key)
   - `SUPABASE_SERVICE_ROLE_KEY` (service role secret key)

#### 5. Set Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in the values:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Twilio (if using external SMS)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Razorpay (can be filled later)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret

# WhatsApp (can be filled later)
WHATSAPP_BUSINESS_ACCOUNT_ID=your-account-id
WHATSAPP_PHONE_NUMBER_ID=your-phone-id
WHATSAPP_ACCESS_TOKEN=your-token
```

#### 6. Install Dependencies

```bash
npm install
```

#### 7. Run Local Development

```bash
npm run dev
```

Visit `http://localhost:3000`

#### 8. Test Authentication Flow

1. Click "Start Free Assessment" → Opens quiz modal
2. After quiz → Click "Book Doctor Consultation"
3. Should redirect to `/auth/phone`
4. Enter your phone number (e.g., +919876543210)
5. Click "Send OTP via WhatsApp"
6. Check your WhatsApp for the OTP
7. Enter the 6-digit code
8. Should redirect to `/dashboard` with your quiz results

---

## Deployment to Vercel

### Prerequisites:
- Supabase project fully set up with schema applied
- Environment variables configured in `.env.local`
- All tests passing locally

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Halka auth setup"
   git remote add origin https://github.com/YOUR_USERNAME/halka-web.git
   git push -u origin main
   ```

2. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

3. **Deploy to Vercel**
   - Click "New Project"
   - Select your `halka-web` repository
   - Framework: **Next.js**
   - Click "Deploy"

4. **Add Environment Variables**
   - In Vercel project settings → **Environment Variables**
   - Add all variables from `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `TWILIO_ACCOUNT_SID`
     - `TWILIO_AUTH_TOKEN`
     - `TWILIO_PHONE_NUMBER`
   - Redeploy after adding variables

5. **Update Supabase Auth Callback URL**
   - Go to Supabase → **Authentication** → **URL Configuration**
   - Add your Vercel domain:
     ```
     https://your-project.vercel.app/auth/verify
     ```

6. **Test in Production**
   - Visit your Vercel domain
   - Test full auth flow again

---

## What's Working Now

✅ **Landing Page** — All sections render with quiz modal  
✅ **Phone Authentication** — Send OTP via WhatsApp/SMS  
✅ **OTP Verification** — Verify code and create user  
✅ **Dashboard** — Show user profile and quiz results  
✅ **Quiz Submission** — Save answers to database  
✅ **Protected Routes** — Redirect unauthenticated users  

---

## What's Next (Phase 3+)

### Phase 3: Doctor Booking
- Create `/app/doctors/page.tsx` — List available doctors
- Create `/app/api/doctors/availability` — Get available slots
- Create `/app/api/doctors/book` — Book consultation
- Implement calendar/scheduling UI
- Send WhatsApp notification to user

### Phase 4: Razorpay Payments
- Integrate Razorpay SDK
- Create payment order endpoints
- Implement webhook handling for payment status
- Subscription tracking

### Phase 5: React Native Mobile App
- Create Expo app
- Share code from `/lib` and `/types`
- Native screens for auth, quiz, dashboard
- Push notifications

---

## Troubleshooting

### "Phone provider not enabled"
→ Go to Supabase → Authentication → Providers → Enable Phone

### "OTP not arriving"
→ Check Twilio console logs in Supabase dashboard  
→ Verify phone number format (+91 for India)  
→ Check WhatsApp Business API settings

### "User created but profile not in database"
→ Check that RLS policies are created (see `database.sql`)  
→ Verify that `user_profiles` table exists and has correct schema

### "Middleware not redirecting"
→ Clear browser cookies  
→ Check that `middleware.ts` is in project root (not in `/app`)  
→ Restart dev server

---

## Database Schema Reference

| Table | Purpose |
|-------|---------|
| `user_profiles` | User info (phone, name, etc.) |
| `quiz_responses` | Quiz answers from users |
| `user_health_profiles` | Calculated BMI, goals, recommendations |
| `doctor_bookings` | Consultation bookings |
| `subscriptions` | Active subscription plans |
| `payments` | Transaction history |

All tables have Row-Level Security enabled for data privacy.

---

## Security Notes

- **Never** commit `.env.local` to version control
- Use `.env.local.example` as template
- Supabase service role key should only be used server-side
- All API routes validate user session before processing
- Database RLS policies ensure users see only their own data
