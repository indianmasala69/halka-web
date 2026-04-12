'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

interface HeroProps {
  onQuiz: () => void;
}

export default function Hero({ onQuiz }: HeroProps) {
  return (
    <section style={{
      background: C.white,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "100px 24px 60px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-cta:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 28px rgba(255,107,44,0.45) !important;
        }
        .hero-img-wrap:hover .hero-img {
          transform: scale(1.03);
        }
        .hero-stat-card {
          animation: fadeUp 0.6s ease-out both;
        }
        .hero-stat-card:nth-child(1) { animation-delay: 0.3s; }
        .hero-stat-card:nth-child(2) { animation-delay: 0.5s; }
        .hero-stat-card:nth-child(3) { animation-delay: 0.7s; }
        @media (max-width: 899px) {
          .hero-layout { flex-direction: column !important; text-align: center !important; }
          .hero-left { align-items: center !important; }
          .hero-trust-bar { justify-content: center !important; }
          .hero-cta { max-width: 100% !important; }
          .hero-right { min-height: 360px !important; }
          .hero-float-rating { bottom: -12px !important; left: 16px !important; right: auto !important; }
          .hero-float-patients { top: 16px !important; right: 16px !important; left: auto !important; }
          .hero-float-doctor { display: none !important; }
        }
        @media (max-width: 599px) {
          .hero-right { min-height: 300px !important; }
        }
      `}</style>

      {/* Subtle background accents */}
      <div style={{
        position: "absolute",
        top: "-15%",
        right: "-8%",
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,44,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-20%",
        left: "-10%",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(11,122,75,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div
        className="hero-layout"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "48px",
        } as any}
      >
        {/* Left content */}
        <div
          className="hero-left"
          style={{
            flex: "1 1 480px",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "flex-start",
          }}
        >
          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: C.greenLight,
            padding: "8px 18px",
            borderRadius: "50px",
            marginBottom: "28px",
            fontSize: "13px",
            fontWeight: 600,
            color: C.green,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: C.green,
              boxShadow: `0 0 6px ${C.green}`,
              animation: "pulse 2s ease infinite",
            }} />
            Trusted by 10,000+ Indians
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(36px, 5vw, 56px)",
            lineHeight: 1.08,
            letterSpacing: "-2px",
            color: C.textPrimary,
            marginBottom: "20px",
          }}>
            Lose 10–15% weight with{" "}
            <span style={{ color: C.saffron }}>
              prescription medication.
            </span>
          </h1>

          {/* Subtitle — makes USP crystal clear */}
          <p style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: C.textSecondary,
            maxWidth: "480px",
            marginBottom: "16px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            Indian doctors prescribe GLP-1 medications (Semaglutide, Liraglutide) — clinically proven to reduce body weight. Delivered to your door with ongoing medical supervision.
          </p>

          {/* USP pills */}
          <div style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap" as const,
            marginBottom: "32px",
          }}>
            {["GLP-1 Medication", "Doctor-prescribed", "25-min consultation"].map((pill, i) => (
              <span key={i} style={{
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: i === 0 ? C.saffronLight : C.bgPrimary,
                color: i === 0 ? C.saffronDark : C.textSecondary,
                border: `1px solid ${i === 0 ? C.saffron + '30' : C.borderLight}`,
              }}>
                {pill}
              </span>
            ))}
          </div>

          {/* CTA row */}
          <div style={{ display: "flex", gap: "12px", width: "100%", maxWidth: "460px", marginBottom: "36px", flexWrap: "wrap" as const }}>
            <button
              className="hero-cta"
              onClick={onQuiz}
              style={{
                background: C.saffron,
                color: C.white,
                border: "none",
                padding: "17px 36px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "16px",
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.25s ease",
                minHeight: "56px",
                flex: "1 1 260px",
                boxShadow: "0 4px 18px rgba(255,107,44,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              } as any}
            >
              Start Free Assessment
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => {
                const el = document.querySelector('.doc-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              style={{
                background: "transparent",
                color: C.textPrimary,
                border: `1.5px solid ${C.border}`,
                padding: "17px 28px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "15px",
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.25s ease",
                minHeight: "56px",
                flex: "0 1 auto",
                whiteSpace: "nowrap" as const,
              }}
            >
              Meet Our Doctors
            </button>
          </div>

          {/* Trust bar */}
          <div
            className="hero-trust-bar"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              fontSize: "13px",
              color: C.textSecondary,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
            } as any}
          >
            {["Licensed Doctors", "FDA-approved", "Free Shipping", "Cancel Anytime"].map((item, i) => (
              <span key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right side — hero image with floating cards */}
        <div
          className="hero-right hero-img-wrap"
          style={{
            flex: "1 1 520px",
            minWidth: "320px",
            position: "relative" as const,
            minHeight: "520px",
          }}
        >
          {/* Main image container */}
          <div style={{
            borderRadius: "24px",
            overflow: "hidden",
            position: "relative" as const,
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            height: "100%",
            minHeight: "520px",
          }}>
            <img
              className="hero-img"
              src="/images/hero/hero-woman.jpg"
              alt="Woman achieving her health goals with Halka"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover" as const,
                objectPosition: "center top",
                display: "block",
                position: "absolute" as const,
                top: 0,
                left: 0,
                transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
            {/* Subtle gradient overlay at bottom */}
            <div style={{
              position: "absolute" as const,
              bottom: 0,
              left: 0,
              right: 0,
              height: "180px",
              background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)",
              pointerEvents: "none",
            }} />
            {/* Bottom text on image */}
            <div style={{
              position: "absolute" as const,
              bottom: "24px",
              left: "24px",
              right: "24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(12px)",
                borderRadius: "12px",
                padding: "10px 16px",
              }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#4ADE80",
                  boxShadow: "0 0 8px #4ADE80",
                }} />
                <span style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: C.textPrimary,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  3 doctors available today
                </span>
              </div>
            </div>
          </div>

          {/* Floating stat card — Rating */}
          <div
            className="hero-stat-card hero-float-rating"
            style={{
              position: "absolute" as const,
              bottom: "-20px",
              right: "24px",
              background: C.white,
              borderRadius: "16px",
              padding: "16px 20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: `1px solid ${C.borderLight}`,
              zIndex: 2,
              animation: "float 4s ease-in-out infinite",
            }}
          >
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: C.saffronLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill={C.saffron}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                color: C.textPrimary,
                lineHeight: 1,
              }}>
                4.8/5
              </div>
              <div style={{
                fontSize: "12px",
                color: C.textMuted,
                fontWeight: 500,
                marginTop: "2px",
              }}>
                725+ reviews
              </div>
            </div>
          </div>

          {/* Floating stat card — Patients */}
          <div
            className="hero-stat-card hero-float-patients"
            style={{
              position: "absolute" as const,
              top: "32px",
              left: "-20px",
              background: C.white,
              borderRadius: "16px",
              padding: "16px 20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: `1px solid ${C.borderLight}`,
              zIndex: 2,
              animation: "float 4.5s ease-in-out infinite",
              animationDelay: "0.5s",
            } as any}
          >
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: C.greenLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "20px",
                color: C.textPrimary,
                lineHeight: 1,
              }}>
                10,000+
              </div>
              <div style={{
                fontSize: "12px",
                color: C.textMuted,
                fontWeight: 500,
                marginTop: "2px",
              }}>
                Patients treated
              </div>
            </div>
          </div>

          {/* Floating stat card — Doctor */}
          <div
            className="hero-stat-card hero-float-doctor"
            style={{
              position: "absolute" as const,
              top: "55%",
              left: "-30px",
              background: C.white,
              borderRadius: "16px",
              padding: "14px 18px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              border: `1px solid ${C.borderLight}`,
              zIndex: 2,
              animation: "float 5s ease-in-out infinite",
              animationDelay: "1s",
            } as any}
          >
            <img
              src="/images/doctors/doctor-2.jpg"
              alt="Dr. Anand Sharma"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                objectFit: "cover" as const,
              }}
            />
            <div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                color: C.textPrimary,
                lineHeight: 1.2,
              }}>
                Dr. Anand Sharma
              </div>
              <div style={{
                fontSize: "11px",
                color: C.green,
                fontWeight: 600,
                marginTop: "2px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: "#4ADE80",
                  display: "inline-block",
                }} />
                Available now
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
