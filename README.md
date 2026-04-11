# Halka: Doctor-Led Weight Loss Platform

A complete web application for telemedicine-based weight loss treatment in India.

## Status: Phase 2 Complete ✅

Fully functional authentication system with quiz integration and database persistence.

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free)

### Setup
```bash
# 1. Install dependencies
npm install

# 2. Create Supabase project at supabase.com

# 3. Apply database schema (database.sql)

# 4. Copy environment template
cp .env.local.example .env.local

# 5. Add Supabase credentials to .env.local
# (See QUICK_START.md for detailed steps)

# 6. Run dev server
npm run dev

# 7. Visit http://localhost:3000
```

Full setup guide: **[QUICK_START.md](QUICK_START.md)**

---

## ✨ Features (Phase 2)

### Landing Page ✅
- Hero section with gradient background
- Service categories (Weight Loss, Metabolic Health, Nutrition)
- How it works (4-step process)
- Customer testimonials
- Transparent pricing (₹2,499 - ₹9,999/month)
- Trust factors (licensed doctors, real medication, etc.)
- Final call-to-action

### Quiz Modal ✅
**8 interactive questions:**
1. Biological sex (Male/Female)
2. Age group (5 ranges)
3. Height (cm input)
4. Current weight (kg input)
5. Target weight (kg input)
6. Medical conditions (multiple select)
7. Diet preference (Veg/Non-veg/Egg/Vegan)
8. Commitment level (High/Medium/Low)

**Results calculation:**
- BMI from height + weight
- Weight to lose (current - target)
- Category (Underweight/Normal/Overweight/Obese)
- Program recommendation (Starter or GLP-1)

### Phone OTP Authentication ✅
- Phone number entry form
- SMS/WhatsApp OTP delivery (via Supabase or Twilio)
- 6-digit OTP verification with auto-focus
- User profile creation
- Secure session management

### User Dashboard ✅
- Welcome message
- BMI score display
- Weight loss goal
- Recommended program with pricing
- Logout option

### Database ✅
- User profiles
- Quiz responses
- Health metrics
- Doctor bookings (ready for Phase 3)
- Subscriptions (ready for Phase 4)
- Payment tracking (ready for Phase 4)
- Row-Level Security on all tables

---

## 🛠 Tech Stack

```
Frontend:     Next.js 14 (App Router)
UI Framework: React 18
Language:     TypeScript
Database:     Supabase (PostgreSQL)
Auth:         Phone OTP (Supabase Auth)
Styling:      Inline CSS + Tailwind
Deployment:   Vercel (ready)
```

---

## 📁 Project Structure

```
halka-web/
├── app/                          # Next.js pages & API routes
│   ├── page.tsx                 # Landing page
│   ├── auth/                    # Authentication pages
│   │   ├── phone/page.tsx
│   │   └── verify/page.tsx
│   ├── dashboard/page.tsx       # User dashboard
│   ├── api/auth/                # Auth endpoints
│   │   ├── send-otp/
│   │   ├── verify-otp/
│   │   ├── logout/
│   │   └── quiz/submit/
│   └── globals.css
├── components/                  # React components
│   ├── HalkaApp.tsx
│   ├── Nav.tsx, Hero.tsx, etc.
│   └── QuizModal.tsx
├── lib/
│   ├── colors.ts               # Design system
│   ├── supabase.ts             # Database client
│   └── auth.ts
├── types/
│   └── database.ts             # TypeScript types
├── middleware.ts               # Route protection
├── database.sql                # Database schema
├── package.json
├── tsconfig.json
└── .env.local.example          # Environment template
```

See **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** for complete overview.

---

## 🎯 User Flow

```
1. User visits halka.com
2. Browses landing page sections
3. Clicks "Start Free Assessment"
4. Completes 8-question quiz
5. Sees results (BMI, goal, recommendation)
6. Clicks "Book Doctor Consultation"
7. Enters phone number
8. Receives OTP via WhatsApp/SMS
9. Enters 6-digit OTP
10. Logged in → Dashboard with results
11. (Next: Book doctor, make payment, etc.)
```

---

## 🔐 Security

- ✅ Row-Level Security (RLS) on all tables
- ✅ Phone OTP (more secure than passwords)
- ✅ Session-based authentication
- ✅ Route middleware protection
- ✅ Input validation
- ✅ Environment variables for secrets
- ✅ HTTPS ready

---

## 📱 Responsive Design

- ✅ Mobile (375px)
- ✅ Tablet (768px)
- ✅ Desktop (1280px+)
- ✅ Smooth animations
- ✅ Touch-friendly buttons

---

## 🚢 Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy (automatic on push)

See **[SETUP.md](SETUP.md)** for Vercel deployment guide.

---

## 📊 Progress

| Phase | Feature | Status |
|-------|---------|--------|
| 1 | Project Setup | ✅ Complete |
| 2 | Phone OTP Auth | ✅ Complete |
| 3 | Doctor Booking | 🔄 Next |
| 4 | Razorpay Payments | 🔄 Planned |
| 5 | Mobile App (React Native) | 🔄 Planned |

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| [QUICK_START.md](QUICK_START.md) | 5-minute quickstart |
| [SETUP.md](SETUP.md) | Detailed setup with troubleshooting |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Architecture & roadmap |
| [PHASE_2_SUMMARY.md](PHASE_2_SUMMARY.md) | What's built, next steps |
| [STATUS.md](STATUS.md) | Progress checklist |

**Start here:** [QUICK_START.md](QUICK_START.md)

---

## 🔧 Available Commands

```bash
npm install              # Install dependencies
npm run dev             # Start development server
npm run build           # Build for production
npm start               # Run production server
npm run lint            # Check code quality
npm run format          # Format code
```

---

## 🎨 Design System

### Colors
- **Primary:** Saffron (#E89130)
- **Background:** Cream (#FBF7F0)
- **Text:** Charcoal (#1A1A1A)
- **Accents:** Green, Red, Blue, etc.

See `lib/colors.ts` for complete color system.

### Typography
- **Headlines:** Outfit (Bold, 700-900)
- **Body:** Plus Jakarta Sans (Regular, 500-700)
- **Devanagari:** Noto Sans Devanagari (हल्का)

### Components
All components built with:
- Inline CSS (styled components pattern)
- No external CSS frameworks (ready for Tailwind)
- Responsive flexbox/grid layouts
- Smooth transitions (0.2s ease)

---

## 🧪 Testing the App

### Test Full Flow
1. Visit http://localhost:3000
2. Scroll through sections
3. Click "Start Assessment"
4. Answer all 8 quiz questions
5. See results screen
6. Click "Book Doctor Consultation"
7. Enter your phone number
8. Check WhatsApp/SMS for OTP
9. Enter the code
10. You should see the dashboard ✅

### Test Individual Routes
- Home: `http://localhost:3000`
- Phone auth: `http://localhost:3000/auth/phone`
- Dashboard: `http://localhost:3000/dashboard`

### Check Database
- Supabase Dashboard → Table Editor
- Look for your entry in `user_profiles` table
- Check `quiz_responses` table for quiz answers

---

## ⚠️ Before You Deploy

- [ ] Create Supabase project
- [ ] Apply database.sql
- [ ] Enable phone auth provider
- [ ] Set .env.local variables
- [ ] Test locally (npm run dev)
- [ ] Test full auth flow
- [ ] Build successfully (npm run build)
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Add env vars in Vercel
- [ ] Update Supabase auth callback URL

---

## 🐛 Troubleshooting

### Phone OTP not arriving?
→ Check Supabase auth logs  
→ Verify phone format: +91XXXXXXXXXX (for India)  
→ Check Twilio account if using external SMS

### Dashboard shows no data?
→ Make sure database.sql was executed completely  
→ Check RLS policies are created  
→ Clear browser cookies and retry

### Route not protected?
→ Restart dev server  
→ Clear cookies (Ctrl+Shift+Delete)  
→ Check middleware.ts exists in project root

See **[SETUP.md](SETUP.md)** for full troubleshooting.

---

## 📞 Support

- Check documentation files first
- See SETUP.md → Troubleshooting section
- Review Supabase logs in dashboard
- Check browser console (F12)

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks](https://react.dev/reference/react)

---

## 📈 What's Next

### Phase 3: Doctor Booking
- List available doctors
- Calendar with available slots
- Booking confirmation
- WhatsApp notifications

### Phase 4: Razorpay Payments
- Plan selection
- Payment processing
- Subscription management
- Payment history

### Phase 5: Mobile App
- iOS app (via Expo)
- Android app (via Expo)
- Shared code with web
- Push notifications

---

## 📄 License

Built for Halka Health. All rights reserved.

---

## 👋 Getting Started

**New here?** Start with [QUICK_START.md](QUICK_START.md)

**Detailed setup?** Read [SETUP.md](SETUP.md)

**Architecture?** Check [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

**Want to know what's built?** See [STATUS.md](STATUS.md)

---

**Ready to launch India's doctor-led weight loss platform!** 🚀
