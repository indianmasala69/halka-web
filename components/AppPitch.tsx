'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';
import { useState } from 'react';

const features = [
  {
    title: "Medication Reminders",
    desc: "Never miss a dose with smart notifications",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2 2" />
        <path d="M5 3L2 6" />
        <path d="M22 6l-3-3" />
      </svg>
    ),
  },
  {
    title: "Meal Logging",
    desc: "Track your daily meals with Indian food database",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    title: "Progress Photos",
    desc: "Visual transformation tracking with side-by-side comparisons",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    title: "Doctor Chat",
    desc: "Message your doctor anytime, get responses within 24 hours",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01" />
        <path d="M12 10h.01" />
        <path d="M16 10h.01" />
      </svg>
    ),
  },
];

export default function AppPitch() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="halka-app-pitch" style={{
      background: `linear-gradient(180deg, ${C.bgWarm} 0%, ${C.white} 100%)`,
      padding: "100px 24px",
    }}>
      <style>{`
        @media (max-width: 899px) {
          .halka-app-pitch { padding: 60px 16px !important; }
          .halka-app-layout { flex-direction: column !important; }
          .halka-app-features-left,
          .halka-app-features-right {
            flex-direction: row !important;
            width: 100% !important;
            gap: 12px !important;
          }
          .halka-app-features-left > div,
          .halka-app-features-right > div {
            flex: 1 !important;
          }
          .halka-app-phone { margin: 24px auto !important; width: 200px !important; height: 380px !important; }
          .halka-app-badges { flex-direction: column !important; align-items: stretch !important; }
          .halka-app-waitlist-form { flex-direction: column !important; }
          .halka-app-waitlist-form input { min-width: unset !important; }
        }
        @media (max-width: 599px) {
          .halka-app-features-left,
          .halka-app-features-right {
            flex-direction: column !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: C.saffronLight,
            padding: "6px 16px",
            borderRadius: "20px",
            marginBottom: "16px",
            fontSize: "13px",
            fontWeight: 600,
            color: C.saffron,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            Coming Soon
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 42px)",
            color: C.textPrimary,
            letterSpacing: "-0.5px",
            marginBottom: "14px",
          }}>
            Your health companion
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "17px",
            color: C.textSecondary,
            maxWidth: "560px",
            margin: "0 auto",
            lineHeight: 1.65,
          }}>
            Track your progress, log meals, get medication reminders, and chat with your doctor — all in one app.
          </p>
        </div>

        {/* Features + Phone layout */}
        <div className="halka-app-layout" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          marginBottom: "64px",
        }}>
          {/* Left features */}
          <div className="halka-app-features-left" style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "280px",
          }}>
            {features.slice(0, 2).map((f, i) => (
              <div key={i} style={{
                background: C.white,
                borderRadius: "16px",
                padding: "24px 20px",
                border: `1px solid ${C.borderLight}`,
                boxShadow: C.shadowSm,
                transition: "all 0.2s ease",
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: C.saffronLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.saffron,
                  marginBottom: "14px",
                }}>
                  {f.icon}
                </div>
                <h4 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: C.textPrimary,
                  marginBottom: "6px",
                }}>
                  {f.title}
                </h4>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "13px",
                  color: C.textMuted,
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Phone mockup */}
          <div className="halka-app-phone" style={{
            width: "240px",
            height: "460px",
            borderRadius: "32px",
            background: `linear-gradient(160deg, ${C.navy} 0%, ${C.navyLight} 50%, ${C.saffronDark} 100%)`,
            boxShadow: C.shadowXl,
            padding: "16px",
            position: "relative",
            flexShrink: 0,
          }}>
            {/* Notch */}
            <div style={{
              width: "80px",
              height: "24px",
              background: "rgba(0,0,0,0.4)",
              borderRadius: "0 0 16px 16px",
              margin: "0 auto 20px",
            }} />
            {/* Screen content */}
            <div style={{ padding: "0 4px" }}>
              {/* Status bar */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 500,
                }}>
                  Good morning
                </span>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: C.saffron,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              {/* Weight card */}
              <div style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "14px",
                padding: "14px",
                marginBottom: "12px",
                backdropFilter: "blur(10px)",
              }}>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginBottom: "4px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Current Weight
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span style={{ fontSize: "28px", fontWeight: 700, color: C.white, fontFamily: "'Outfit', sans-serif" }}>78.2</span>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>kg</span>
                </div>
                <div style={{ fontSize: "10px", color: C.saffronHover, marginTop: "2px" }}>-4.8 kg this month</div>
              </div>
              {/* Reminder */}
              <div style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "12px",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: "rgba(255,107,44,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.saffronHover} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="13" r="8" />
                    <path d="M12 9v4l2 2" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: C.white, fontFamily: "'Outfit', sans-serif" }}>Evening Dose</div>
                  <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)" }}>Semaglutide 0.5mg at 8 PM</div>
                </div>
              </div>
              {/* Meals */}
              <div style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: "rgba(11,122,75,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                    <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: C.white, fontFamily: "'Outfit', sans-serif" }}>Today's Meals</div>
                  <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)" }}>1,420 cal logged - 2 meals</div>
                </div>
              </div>
            </div>
            {/* Home indicator */}
            <div style={{
              position: "absolute",
              bottom: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100px",
              height: "4px",
              borderRadius: "2px",
              background: "rgba(255,255,255,0.3)",
            }} />
          </div>

          {/* Right features */}
          <div className="halka-app-features-right" style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "280px",
          }}>
            {features.slice(2, 4).map((f, i) => (
              <div key={i} style={{
                background: C.white,
                borderRadius: "16px",
                padding: "24px 20px",
                border: `1px solid ${C.borderLight}`,
                boxShadow: C.shadowSm,
                transition: "all 0.2s ease",
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: C.greenLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.green,
                  marginBottom: "14px",
                }}>
                  {f.icon}
                </div>
                <h4 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: C.textPrimary,
                  marginBottom: "6px",
                }}>
                  {f.title}
                </h4>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "13px",
                  color: C.textMuted,
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: App store + waitlist */}
        <div style={{
          textAlign: "center",
          maxWidth: "520px",
          margin: "0 auto",
        }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: "18px",
            color: C.textPrimary,
            marginBottom: "20px",
          }}>
            Coming soon on iOS & Android
          </p>

          {/* App store badges */}
          <div className="halka-app-badges" style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "32px",
          }}>
            {/* App Store button */}
            <button style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: C.charcoal,
              color: C.white,
              border: "none",
              borderRadius: "12px",
              padding: "12px 24px",
              cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "9px", opacity: 0.7, lineHeight: 1 }}>Download on the</div>
                <div style={{ fontSize: "15px", fontWeight: 600, lineHeight: 1.2 }}>App Store</div>
              </div>
            </button>
            {/* Google Play button */}
            <button style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: C.charcoal,
              color: C.white,
              border: "none",
              borderRadius: "12px",
              padding: "12px 24px",
              cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302L15.396 12l2.302-2.302zM5.864 2.658L16.8 9.09l-2.302 2.302-8.634-8.734z" />
              </svg>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "9px", opacity: 0.7, lineHeight: 1 }}>GET IT ON</div>
                <div style={{ fontSize: "15px", fontWeight: 600, lineHeight: 1.2 }}>Google Play</div>
              </div>
            </button>
          </div>

          {/* Waitlist */}
          <div style={{
            background: C.white,
            borderRadius: "16px",
            padding: "28px 24px",
            border: `1px solid ${C.borderLight}`,
            boxShadow: C.shadowMd,
          }}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "15px",
              color: C.textSecondary,
              marginBottom: "16px",
            }}>
              Get notified when the app launches
            </p>
            {submitted ? (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                color: C.green,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                padding: "12px",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                We will notify you at launch!
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="halka-app-waitlist-form"
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    minWidth: "240px",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: `1px solid ${C.border}`,
                    fontSize: "14px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: C.textPrimary,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = C.saffron}
                  onBlur={(e) => e.currentTarget.style.borderColor = C.border}
                />
                <button
                  type="submit"
                  style={{
                    background: C.saffron,
                    color: C.white,
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 24px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = C.saffronHover}
                  onMouseLeave={(e) => e.currentTarget.style.background = C.saffron}
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
