'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const steps = [
  {
    num: "01",
    title: "Take the Assessment",
    desc: "5-minute health quiz to understand your body, metabolism, and goals",
    image: "/images/how-it-works/step-1.jpg",
    accent: C.saffron,
  },
  {
    num: "02",
    title: "Meet Your Doctor",
    desc: "25-min video consultation with a licensed physician who creates your plan",
    image: "/images/how-it-works/step-2.jpg",
    accent: C.green,
  },
  {
    num: "03",
    title: "Receive Your Kit",
    desc: "FDA-approved medication + personalized diet plan delivered to your doorstep",
    image: "/images/how-it-works/step-3.jpg",
    accent: C.navy,
  },
  {
    num: "04",
    title: "Track & Transform",
    desc: "Weekly check-ins with your coach via WhatsApp. Real results, real support",
    image: "/images/how-it-works/step-4.jpg",
    accent: C.saffron,
  },
];

export default function HowItWorks() {
  return (
    <section style={{ background: C.white, padding: "100px 24px", overflow: "hidden" }}>
      <style>{`
        .hiw-step:hover .hiw-img {
          transform: scale(1.04);
        }
        .hiw-step:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.10) !important;
        }
        @media (max-width: 767px) {
          .hiw-grid { grid-template-columns: 1fr !important; max-width: 400px !important; margin: 0 auto !important; }
          .hiw-connector-line { display: none !important; }
          .hiw-mobile-line { display: block !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .hiw-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hiw-connector-line { display: none !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: C.saffronLight,
            padding: "8px 20px",
            borderRadius: "24px",
            marginBottom: "20px",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: C.saffron,
            }} />
            <span style={{
              fontSize: "13px", fontWeight: 700, color: C.saffron,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              textTransform: "uppercase" as const,
              letterSpacing: "1px",
            }}>
              How it works
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 48px)",
            color: C.textPrimary,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}>
            Four steps to a<br />healthier you
          </h2>
          <p style={{
            fontSize: "17px",
            color: C.textSecondary,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            maxWidth: "460px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Doctor-guided from start to finish. No guesswork.
          </p>
        </div>

        {/* Steps */}
        <div style={{ position: "relative" as const }}>
          {/* Horizontal connector line (desktop only) */}
          <div
            className="hiw-connector-line"
            style={{
              position: "absolute" as const,
              top: "140px",
              left: "12.5%",
              right: "12.5%",
              height: "2px",
              background: `repeating-linear-gradient(to right, ${C.border} 0, ${C.border} 8px, transparent 8px, transparent 16px)`,
              zIndex: 0,
            }}
          />

          <div
            className="hiw-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              position: "relative" as const,
              zIndex: 1,
            } as any}
          >
            {steps.map((step, i) => (
              <div key={i} style={{ position: "relative" as const }}>
                <div
                  className="hiw-step"
                  style={{
                    background: C.white,
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: `1px solid ${C.borderLight}`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "default",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column" as const,
                  }}
                >
                  {/* Image with overlay number */}
                  <div style={{
                    position: "relative" as const,
                    overflow: "hidden",
                    height: "200px",
                  }}>
                    <img
                      className="hiw-img"
                      src={step.image}
                      alt={step.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover" as const,
                        display: "block",
                        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
                    {/* Gradient overlay at bottom */}
                    <div style={{
                      position: "absolute" as const,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "60px",
                      background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
                    }} />
                    {/* Number badge on image */}
                    <div style={{
                      position: "absolute" as const,
                      bottom: "12px",
                      left: "16px",
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: step.accent,
                      color: C.white,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: "16px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}>
                      {step.num}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{
                    padding: "24px 22px 28px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column" as const,
                  }}>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: "18px",
                      color: C.textPrimary,
                      marginBottom: "8px",
                      lineHeight: 1.3,
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontSize: "14px",
                      color: C.textSecondary,
                      lineHeight: 1.7,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      margin: 0,
                      flex: 1,
                    }}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom accent bar */}
                  <div style={{
                    height: "3px",
                    background: step.accent,
                    opacity: 0.6,
                  }} />
                </div>

                {/* Mobile vertical connector */}
                {i < steps.length - 1 && (
                  <div
                    className="hiw-mobile-line"
                    style={{
                      display: "none",
                      width: "2px",
                      height: "32px",
                      margin: "0 auto",
                      background: `repeating-linear-gradient(to bottom, ${C.border} 0, ${C.border} 6px, transparent 6px, transparent 12px)`,
                    } as any}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
