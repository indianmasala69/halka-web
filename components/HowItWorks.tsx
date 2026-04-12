'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const steps = [
  {
    num: "01",
    icon: "\uD83D\uDCCB",
    title: "Take the Assessment",
    desc: "5-minute health quiz to understand your body, metabolism, and goals",
  },
  {
    num: "02",
    icon: "\uD83D\uDC68\u200D\u2695\uFE0F",
    title: "Meet Your Doctor",
    desc: "15-min video consultation with a licensed physician who creates your plan",
  },
  {
    num: "03",
    icon: "\uD83D\uDCE6",
    title: "Receive Your Kit",
    desc: "FDA-approved medication + personalized diet plan delivered to your doorstep",
  },
  {
    num: "04",
    icon: "\uD83D\uDCCA",
    title: "Track & Transform",
    desc: "Weekly check-ins with your coach via WhatsApp. Real results, real support",
  },
];

export default function HowItWorks() {
  return (
    <section style={{ background: C.bgPrimary, padding: "80px 24px" }}>
      <style>{`
        @media (min-width: 768px) {
          .halka-hiw-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
          .halka-hiw-connector {
            display: block !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(28px, 4vw, 42px)",
            color: C.textPrimary,
            letterSpacing: "-1px",
            lineHeight: 1.15,
            marginBottom: "12px",
          }}>
            How halka works
          </h2>
          <p style={{
            fontSize: "16px",
            color: C.textSecondary,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Your journey to a healthier you, guided by doctors every step
          </p>
        </div>

        {/* Steps grid */}
        <div
          className="halka-hiw-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "24px",
            position: "relative",
          } as any}
        >
          {steps.map((step, i) => (
            <div key={i} style={{ position: "relative" }}>
              {/* Dotted connector line (desktop, between cards) */}
              {i < steps.length - 1 && (
                <div
                  className="halka-hiw-connector"
                  style={{
                    display: "none",
                    position: "absolute",
                    top: "40px",
                    right: "-12px",
                    width: "24px",
                    height: "2px",
                    borderTop: `2px dashed ${C.border}`,
                    zIndex: 1,
                  } as any}
                />
              )}

              {/* Card */}
              <div style={{
                background: C.white,
                border: `1px solid ${C.borderLight}`,
                borderRadius: "16px",
                padding: "32px 24px",
                boxShadow: C.shadowSm,
                transition: "all 0.3s ease",
                height: "100%",
              }}>
                {/* Number badge */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: C.saffronLight,
                  color: C.saffron,
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "14px",
                  marginBottom: "16px",
                }}>
                  {step.num}
                </div>

                {/* Icon */}
                <div style={{
                  fontSize: "28px",
                  marginBottom: "14px",
                }}>
                  {step.icon}
                </div>

                {/* Title */}
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

                {/* Description */}
                <p style={{
                  fontSize: "14px",
                  color: C.textMuted,
                  lineHeight: 1.7,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  {step.desc}
                </p>
              </div>

              {/* Mobile dotted connector */}
              {i < steps.length - 1 && (
                <div style={{
                  width: "2px",
                  height: "24px",
                  borderLeft: `2px dashed ${C.border}`,
                  margin: "0 auto",
                }} className="halka-hiw-mobile-connector" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
