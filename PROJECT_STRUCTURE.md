# Halka Web Project Structure

## Current State: Phase 2 Complete ✅

This document maps the entire project structure for the Halka landing page upgraded to a full production platform.

---

## Directory Tree

```
halka-web/
├── app/                              # Next.js App Router
│   ├── auth/
│   │   ├── phone/
│   │   │   └── page.tsx             # ✅ Phone entry page
│   │   └── verify/
│   │       └── page.tsx             # ✅ OTP verification page
│   ├── api/
│   │   └── auth/
│   │       ├── send-otp/
│   │       │   └── route.ts         # ✅ Send OTP endpoint
│   │       ├── verify-otp/
│   │       │   └── route.ts         # ✅ Verify OTP endpoint
│   │       ├── logout/
│   │       │   └── route.ts         # ✅ Logout endpoint
│   │       ├── quiz/
│   │       │   └── submit/
│   │       │       └── route.ts     # ✅ Submit quiz endpoint
│   │       ├── doctors/             # 🔄 Phase 4 (Pending)
│   │       │   ├── availability/
│   │       │   │   └── route.ts
│   │       │   └── book/
│   │       │       └── route.ts
│   │       └── payments/            # 🔄 Phase 5 (Pending)
│   │           ├── create-order/
│   │           │   └── route.ts
│   │           └── webhook/
│   │               └── route.ts
│   ├── dashboard/
│   │   └── page.tsx                 # ✅ User dashboard
│   ├── layout.tsx                   # ✅ Root layout with SEO
│   ├── page.tsx                     # ✅ Landing page
│   └── globals.css                  # ✅ Global styles
│
├── components/
│   ├── HalkaApp.tsx                 # ✅ Main app wrapper
│   ├── Nav.tsx                      # ✅ Fixed navigation
│   ├── Hero.tsx                     # ✅ Hero section
│   ├── Categories.tsx               # ✅ Service categories
│   ├── HowItWorks.tsx               # ✅ 4-step process
│   ├── Testimonials.tsx             # ✅ User testimonials
│   ├── Pricing.tsx                  # ✅ 3 pricing tiers
│   ├── Trust.tsx                    # ✅ Trust factors grid
│   ├── FinalCTA.tsx                 # ✅ Final call-to-action
│   ├── Footer.tsx                   # ✅ Footer with links
│   ├── QuizModal.tsx                # ✅ 8-question quiz form
│   ├── BookingForm.tsx              # 🔄 Phase 4 (Pending)
│   └── PaymentForm.tsx              # 🔄 Phase 5 (Pending)
│
├── lib/
│   ├── colors.ts                    # ✅ Color system constants
│   ├── supabase.ts                  # ✅ Supabase client & helpers
│   ├── auth.ts                      # 🔄 Phase 2 (Partial)
│   ├── api.ts                       # 🔄 Phase 3 (Pending)
│   └── razorpay.ts                  # 🔄 Phase 5 (Pending)
│
├── types/
│   └── database.ts                  # ✅ TypeScript database types
│
├── middleware.ts                    # ✅ Route protection middleware
├── database.sql                     # ✅ Supabase schema migrations
├── package.json                     # ✅ Dependencies & scripts
├── tsconfig.json                    # ✅ TypeScript config
├── next.config.js                   # ✅ Next.js config
├── postcss.config.js                # ✅ PostCSS config (Tailwind)
├── .env.local.example               # ✅ Environment template
├── SETUP.md                         # ✅ Setup instructions
├── PROJECT_STRUCTURE.md             # ✅ This file
└── README.md                        # 🔄 Pending
```

---

## File Status Legend

| Status | Meaning |
|--------|---------|
| ✅ | Created and working |
| 🔄 | Placeholder/In progress |
| ❌ | Not yet created |

---

## Phase Breakdown

### Phase 1: Project Setup ✅ COMPLETE

**Files Created:**
- `package.json` — Dependencies (next, react, supabase, etc.)
- `tsconfig.json` — TypeScript strict mode enabled
- `next.config.js` — Image optimization, env variables
- `.env.local.example` — Credential template
- `app/layout.tsx` — Root layout with fonts
- `app/globals.css` — Reset, animations, scrollbar
- `app/page.tsx` — Main landing page
- `lib/colors.ts` — Design system (19 colors + variations)
- `lib/supabase.ts` — Supabase client initialization
- `types/database.ts` — TypeScript interfaces for all tables
- Components: HalkaApp, Nav, Hero, Categories, HowItWorks, Testimonials, Pricing, Trust, FinalCTA, Footer, QuizModal

**What It Does:**
- Renders complete landing page with all original sections
- Provides Supabase client configured and ready
- Has TypeScript types for database integration
- Color system ensures visual consistency

---

### Phase 2: Phone OTP Authentication ✅ COMPLETE

**Files Created:**
- `app/auth/phone/page.tsx` — Phone number entry form
- `app/auth/verify/page.tsx` — 6-digit OTP input form
- `app/api/auth/send-otp/route.ts` — Send OTP via SMS
- `app/api/auth/verify-otp/route.ts` — Verify OTP + create user
- `app/api/auth/logout/route.ts` — Sign out endpoint
- `app/dashboard/page.tsx` — Post-login dashboard
- `middleware.ts` — Route protection & redirects
- `database.sql` — All table schemas + RLS policies
- `SETUP.md` — Complete setup guide
- `PROJECT_STRUCTURE.md` — This file

**What It Does:**
- User enters phone → Receives OTP via WhatsApp/SMS
- User enters OTP → Session created + user_profiles entry
- Unauthenticated users redirected to phone page
- Authenticated users see dashboard with quiz results
- Full database schema with security policies applied

**To Test:**
1. Complete setup instructions in SETUP.md
2. Apply database.sql to Supabase
3. Run `npm run dev`
4. Click "Start Assessment" → Quiz → Results → Redirects to `/auth/phone`
5. Enter phone number, receive OTP
6. Enter OTP, get redirected to dashboard

---

### Phase 3: Quiz + Data Persistence (Pending)

**Files Needed:**
- `app/api/quiz/submit/route.ts` ✅ Created
- `app/dashboard/results/page.tsx` — Full results display
- `lib/api.ts` — API helper functions
- Quiz modal integration with results screen

**What It Will Do:**
- Quiz answers saved to `quiz_responses` table
- BMI and goals calculated in `user_health_profiles` table
- Results displayed on dashboard with program recommendation
- Full quiz flow: landing → modal → verify → results → dashboard

---

### Phase 4: Doctor Booking System (Pending)

**Files Needed:**
- `app/doctors/page.tsx` — Doctor listing and slots
- `app/api/doctors/availability/route.ts` — Available time slots
- `app/api/doctors/book/route.ts` — Create booking
- `components/BookingForm.tsx` — Booking UI
- `lib/calendar.ts` — Calendar utilities
- Doctor notification system (WhatsApp API integration)

**What It Will Do:**
- Show list of available doctors
- Display available consultation slots
- Allow users to book a consultation
- Send WhatsApp confirmation to user
- Save booking to `doctor_bookings` table

---

### Phase 5: Razorpay Payments (Pending)

**Files Needed:**
- `app/api/payments/create-order/route.ts` — Create Razorpay order
- `app/api/payments/webhook/route.ts` — Handle payment status
- `components/PaymentForm.tsx` — Payment UI
- `lib/razorpay.ts` — Payment helper functions
- Subscription tracking in `subscriptions` and `payments` tables

**What It Will Do:**
- User selects plan (Starter ₹2,499, GLP-1 ₹4,999, Premium ₹9,999)
- Creates payment order with Razorpay
- After payment success → Creates subscription
- Webhook updates subscription status
- Access to selected plan features granted

---

### Phase 6: React Native App (Pending)

**Directory Structure:**
```
app/                          # React Native (Expo)
├── app/
│   ├── (auth)/
│   │   ├── phone.tsx
│   │   └── verify.tsx
│   └── (tabs)/
│       ├── quiz.tsx
│       ├── dashboard.tsx
│       └── booking.tsx
├── lib/                       # Shared with web
├── types/                     # Shared with web
└── package.json
```

**What It Will Do:**
- iOS + Android app built with React Native
- Share auth, types, and utilities with web app
- Native screens optimized for mobile
- Push notifications for coach messages
- Offline-first capability

---

## Environment Variables Reference

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# Twilio SMS (Optional)
TWILIO_ACCOUNT_SID=xxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+91xxxxxxxxx

# Razorpay (Phase 5)
NEXT_PUBLIC_RAZORPAY_KEY_ID=xxxxx
RAZORPAY_KEY_SECRET=xxxxx

# WhatsApp Business API (Phase 4)
WHATSAPP_BUSINESS_ACCOUNT_ID=xxxxx
WHATSAPP_PHONE_NUMBER_ID=xxxxx
WHATSAPP_ACCESS_TOKEN=xxxxx
```

---

## Database Tables

| Table | Columns | Purpose |
|-------|---------|---------|
| `user_profiles` | id, phone, name, profile_photo_url, created_at, updated_at | User identity |
| `quiz_responses` | id, user_id, gender, age_group, height_cm, weight_kg, target_weight_kg, conditions[], diet_preference, commitment_level, created_at | Quiz answers |
| `user_health_profiles` | id, user_id, bmi, weight_to_lose_kg, recommended_program, doctor_assigned_id, coach_assigned_id, created_at | Calculated health data |
| `doctor_bookings` | id, user_id, doctor_id, scheduled_at, status, meet_link, notes, created_at | Consultation bookings |
| `subscriptions` | id, user_id, plan_name, price_inr, status, started_at, expires_at, razorpay_subscription_id | Active plans |
| `payments` | id, subscription_id, amount_inr, status, razorpay_order_id, razorpay_payment_id, created_at | Transaction history |

All tables have Row-Level Security (RLS) policies restricting access to user's own data.

---

## Key Technologies

| Tech | Purpose | Version |
|------|---------|---------|
| **Next.js** | Web framework | 14.x |
| **React** | UI library | 18.x |
| **TypeScript** | Type safety | 5.x |
| **Supabase** | Database + Auth | Managed cloud |
| **Tailwind CSS** | Styling | 3.x |
| **Razorpay** | Payments | SDK |
| **Twilio** | SMS/WhatsApp | SDK |
| **Expo** | Mobile framework | Latest |

---

## Next Steps

1. **Complete Setup** (SETUP.md)
   - Create Supabase project
   - Apply database.sql
   - Set environment variables
   - Test locally

2. **Deploy to Vercel**
   - Push to GitHub
   - Connect to Vercel
   - Add production env variables

3. **Proceed to Phase 3**
   - Create doctor booking system
   - Implement payment processor
   - Build mobile app

---

## Support

See SETUP.md for troubleshooting and detailed instructions.
