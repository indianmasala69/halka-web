'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const items = [
  {
    title: "Licensed Indian Doctors",
    desc: "MBBS/MD physicians registered with the Medical Council of India",
    iconPath: "M22 12h-4l-3 9L9 3l-3 9H2",
  },
  {
    title: "FDA-Approved Medication",
    desc: "Only clinically-proven, safe medications prescribed after assessment",
    iconPath: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
  },
  {
    title: "WhatsApp-Native Support",
    desc: "Your coach is just a message away. Real humans, real responses",
    iconPath: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  },
  {
    title: "Built for Indian Bodies",
    desc: "Plans designed around Indian diets, lifestyles, and metabolic profiles",
    iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    title: "100% Confidential",
    desc: "Your health data is encrypted and never shared. HIPAA-equivalent standards",
    iconPath: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4",
  },
  {
    title: "No Hidden Costs",
    desc: "Medication, consultations, and coaching included in your plan price",
    iconPath: "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
];

export default function Trust() {
  return (
    <section className="halka-trust-section" style={{ background: C.white, padding: "80px 24px" }}>
      <style>{`
        @media (max-width: 767px) {
          .halka-trust-section { padding: 60px 16px !important; }
          .halka-trust-grid { grid-template-columns: 1fr !important; }
          .halka-trust-banner-overlay { padding: 0 20px !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Header with image integrated */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "40px",
          marginBottom: "52px",
          alignItems: "center",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: C.greenLight,
              padding: "6px 16px",
              borderRadius: "20px",
              marginBottom: "16px",
              fontSize: "13px",
              fontWeight: 600,
              color: C.green,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Trusted & Verified
            </div>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 40px)",
              color: C.textPrimary,
              letterSpacing: "-0.5px",
              marginBottom: "12px",
            }}>
              Why patients trust halka
            </h2>
            <p style={{ fontSize: "16px", color: C.textSecondary, maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
              Built on clinical evidence, delivered with care
            </p>
          </div>
        </div>

        {/* Trust grid */}
        <div className="halka-trust-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "16px",
                padding: "24px",
                background: C.bgPrimary,
                borderRadius: "14px",
                border: `1px solid ${C.borderLight}`,
                transition: "all 0.2s ease",
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                background: C.white,
                border: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "20px",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.iconPath} />
                </svg>
              </div>
              <div>
                <h4 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: C.textPrimary,
                  marginBottom: "4px",
                }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: "13px", color: C.textMuted, lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust image banner */}
        <div style={{
          marginTop: "48px",
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative" as const,
        }}>
          <img
            src="/images/trust/consultation.jpg"
            alt="Doctor consultation"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover" as const,
              display: "block",
            }}
          />
          <div className="halka-trust-banner-overlay" style={{
            position: "absolute" as const,
            inset: 0,
            background: "linear-gradient(to right, rgba(27,43,75,0.85), rgba(27,43,75,0.4))",
            display: "flex",
            alignItems: "center",
            padding: "0 40px",
          }}>
            <div>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(18px, 3vw, 24px)",
                color: C.white,
                marginBottom: "6px",
              }}>
                Your health is in safe hands
              </p>
              <p style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.8)",
                maxWidth: "400px",
                lineHeight: 1.5,
              }}>
                Every treatment plan is reviewed and approved by a licensed physician before any medication is prescribed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
