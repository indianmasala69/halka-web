'use client';

import { useState } from 'react';
import { COLOR_SYSTEM as C } from '@/lib/colors';

interface HeroProps {
  onQuiz: () => void;
}

export default function Hero({ onQuiz }: HeroProps) {
  const [weight, setWeight] = useState(85);
  const projectedLoss = Math.round(weight * 0.15);
  const weeks = Math.ceil(projectedLoss / 0.75);

  return (
    <section className="hero-section" style={{
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
        .hero-calc-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(to right, ${C.saffron}22, ${C.borderLight});
          outline: none;
          cursor: pointer;
        }
        .hero-calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${C.saffron};
          box-shadow: 0 2px 10px rgba(255,107,44,0.4), 0 0 0 4px rgba(255,107,44,0.12);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .hero-calc-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .hero-calc-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${C.saffron};
          box-shadow: 0 2px 10px rgba(255,107,44,0.4), 0 0 0 4px rgba(255,107,44,0.12);
          border: none;
          cursor: pointer;
        }
        .hero-calc-link:hover {
          color: ${C.saffron} !important;
        }
        @media (max-width: 899px) {
          .hero-layout { flex-direction: column !important; text-align: center !important; }
          .hero-left { align-items: center !important; }
          .hero-headline { text-align: center !important; }
          .hero-subtitle { text-align: center !important; }
          .hero-trust-bar { justify-content: center !important; }
          .hero-cta { max-width: 100% !important; }
          .hero-right { min-height: 360px !important; }
          .hero-float-rating { bottom: -12px !important; left: 16px !important; right: auto !important; }
          .hero-float-patients { top: 16px !important; right: 16px !important; left: auto !important; }
          .hero-float-doctor { display: none !important; }
          .hero-calc-card { align-self: center !important; }
          .hero-usp-pills { justify-content: center !important; }
          .hero-whatsapp-wrap { text-align: center !important; }
        }
        @media (max-width: 767px) {
          .hero-section { padding: 80px 16px 40px !important; min-height: auto !important; }
          .hero-layout { gap: 32px !important; }
          .hero-right { min-height: 320px !important; min-width: 0 !important; flex: 1 1 100% !important; }
          .hero-right > div:first-child { min-height: 320px !important; }
          .hero-float-rating { bottom: -10px !important; left: 12px !important; right: auto !important; padding: 12px 14px !important; }
          .hero-float-patients { top: 12px !important; right: 12px !important; left: auto !important; padding: 12px 14px !important; }
          .hero-float-rating > div:first-child,
          .hero-float-patients > div:first-child { width: 36px !important; height: 36px !important; }
          .hero-calc-card { padding: 16px 18px !important; }
          .hero-left { min-width: 0 !important; }
        }
        @media (max-width: 480px) {
          .hero-section { padding: 74px 14px 32px !important; }
          .hero-right { min-height: 260px !important; }
          .hero-right > div:first-child { min-height: 260px !important; }
          .hero-float-rating, .hero-float-patients { transform: scale(0.9) !important; }
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
            flex: "1 1 520px",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "flex-start",
          }}
        >
          {/* Headline */}
          <h1
            className="hero-headline"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(44px, 6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-2.5px",
              color: C.textPrimary,
              marginBottom: "24px",
              textAlign: "left",
            }}
          >
            <span style={{ fontWeight: 400 }}>Feel </span>
            <span style={{ fontWeight: 800 }}>halka.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-subtitle"
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: C.textSecondary,
              maxWidth: "480px",
              marginBottom: "20px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              textAlign: "left",
            }}
          >
            Prescription GLP-1 medication. Doctor-supervised. Delivered to your door.
          </p>

          {/* USP pills */}
          <div
            className="hero-usp-pills"
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap" as const,
              marginBottom: "36px",
            }}
          >
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

          {/* CTA */}
          <div style={{ width: "100%", maxWidth: "460px", marginBottom: "16px" }}>
            <button
              className="hero-cta"
              onClick={onQuiz}
              style={{
                background: C.saffron,
                color: C.white,
                border: "none",
                padding: "17px 40px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "16px",
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.25s ease",
                minHeight: "56px",
                width: "100%",
                maxWidth: "320px",
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
          </div>

          {/* WhatsApp link */}
          <div className="hero-whatsapp-wrap" style={{ marginBottom: "32px", width: "100%", maxWidth: "460px", textAlign: "left" }}>
            <a
              href="https://wa.me/919876543210?text=Hi%20Halka%2C%20I%27m%20interested%20in%20your%20GLP-1%20weight%20loss%20program"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#25D366",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Or chat with us on WhatsApp
            </a>
          </div>

          {/* Weight Loss Calculator — premium card */}
          <div
            className="hero-calc-card"
            style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: "16px",
              padding: "20px 24px",
              maxWidth: "460px",
              width: "100%",
              boxShadow: `0 4px 20px rgba(0,0,0,0.06)`,
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.saffron} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v17M8 7l4-4 4 4" />
                <rect x="4" y="14" width="16" height="6" rx="2" />
              </svg>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: C.textPrimary,
                letterSpacing: "-0.3px",
              }}>
                Weight Loss Calculator
              </span>
            </div>

            {/* Slider row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "14px",
            }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                color: C.textPrimary,
                minWidth: "52px",
              }}>
                {weight} kg
              </span>
              <input
                className="hero-calc-slider"
                type="range"
                min={50}
                max={180}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                style={{ flex: 1 }}
              />
            </div>

            {/* Result */}
            <div style={{
              background: C.bgPrimary,
              borderRadius: "10px",
              padding: "14px 16px",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap" as const,
              gap: "8px",
            }}>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "14px",
                color: C.textSecondary,
                margin: 0,
                lineHeight: 1.5,
              }}>
                You could lose{" "}
                <span style={{ fontWeight: 700, color: C.saffron }}>{projectedLoss} kg</span>
                {" "}in{" "}
                <span style={{ fontWeight: 700, color: C.textPrimary }}>{weeks} weeks</span>
              </p>
              <button
                className="hero-calc-link"
                onClick={onQuiz}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: C.saffronDark,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "color 0.2s ease",
                  flexShrink: 0,
                }}
              >
                Start Free Assessment
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Clinical note + trust items */}
            <div style={{
              borderTop: `1px solid ${C.borderLight}`,
              paddingTop: "12px",
              display: "flex",
              flexWrap: "wrap" as const,
              alignItems: "center",
              gap: "6px 14px",
            }}>
              <span style={{
                fontSize: "11px",
                color: C.textMuted,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontStyle: "italic",
              }}>
                Based on clinical studies of GLP-1 medication
              </span>
              <span style={{
                width: "1px",
                height: "10px",
                background: C.border,
                flexShrink: 0,
              }} />
              {["Licensed Doctors", "FDA-approved", "Free Shipping", "Cancel Anytime"].map((item, i) => (
                <span key={i} style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "11px",
                  color: C.textMuted,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 500,
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right side — hero image with floating cards */}
        <div
          className="hero-right hero-img-wrap"
          style={{
            flex: "1 1 480px",
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
                4.8
              </div>
              <div style={{
                fontSize: "12px",
                color: C.textMuted,
                fontWeight: 500,
                marginTop: "2px",
              }}>
                Average rating
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
                2,847+
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
