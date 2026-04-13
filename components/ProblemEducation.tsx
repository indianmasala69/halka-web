'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const cards = [
  {
    title: "Food Noise",
    desc: "Your brain sends constant hunger signals that are nearly impossible to ignore. GLP-1 medications quiet these signals, reducing cravings naturally.",
    bg: C.greenLight,
    accent: C.green,
    // Brain icon
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
        <path d="M9 21h6" />
        <path d="M10 17v4" />
        <path d="M14 17v4" />
        <path d="M12 2v4" />
        <path d="M8 6l2 2" />
        <path d="M16 6l-2 2" />
      </svg>
    ),
  },
  {
    title: "Metabolic Resistance",
    desc: "Years of dieting can slow your metabolism, making it harder to lose weight. GLP-1 works at the hormonal level to reset your body's set point.",
    bg: "#FFF5F0",
    accent: C.saffron,
    // Flame / metabolism icon
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c4-3.5 7-7.58 7-12a7 7 0 0 0-14 0c0 4.42 3 8.5 7 12z" />
        <path d="M12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
      </svg>
    ),
  },
  {
    title: "Hormonal Imbalance",
    desc: "Insulin resistance, cortisol, and leptin levels all affect weight. Medical treatment addresses the root cause, not just symptoms.",
    bg: "#F0F4FF",
    accent: C.info,
    // Balance / scale icon
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M6 7l-4 8h8L6 7z" />
        <path d="M18 7l-4 8h8l-4-8z" />
        <path d="M2 15h8" />
        <path d="M14 15h8" />
        <path d="M6 7h12" />
      </svg>
    ),
  },
  {
    title: "The Yo-Yo Cycle",
    desc: "80% of people regain weight after dieting. Prescription GLP-1 medication provides sustained results with medical supervision.",
    bg: "#FFF8EE",
    accent: C.warning,
    // Cycle / arrows icon
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2v6h-6" />
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M3 22v-6h6" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      </svg>
    ),
  },
];

export default function ProblemEducation() {
  return (
    <section className="pe-section" style={{ background: C.warmWhite, padding: "100px 24px" }}>
      <style>{`
        .pe-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pe-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.10) !important;
        }
        @media (max-width: 767px) {
          .pe-section { padding: 60px 16px !important; }
          .pe-grid { grid-template-columns: 1fr !important; max-width: 480px !important; margin: 0 auto !important; }
          .pe-bottom { font-size: 15px !important; padding: 24px 20px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .pe-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            textTransform: "uppercase" as const,
            letterSpacing: "1px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            The Science
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
            It's not about willpower
          </h2>
          <p style={{
            fontSize: "17px",
            color: C.textSecondary,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            maxWidth: "560px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Modern science shows weight gain is driven by biology — not discipline. GLP-1 medications work with your body, not against it.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="pe-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginBottom: "48px",
        }}>
          {cards.map((card, i) => (
            <div
              key={i}
              className="pe-card"
              style={{
                background: C.white,
                borderRadius: "20px",
                padding: "32px 28px",
                border: `1px solid ${C.borderLight}`,
                boxShadow: C.shadowSm,
                cursor: "default",
              }}
            >
              {/* Icon */}
              <div style={{
                width: 56,
                height: 56,
                borderRadius: "16px",
                background: card.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                color: card.accent,
              }}>
                {card.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "19px",
                color: C.textPrimary,
                marginBottom: "10px",
                lineHeight: 1.3,
              }}>
                {card.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: "15px",
                color: C.textSecondary,
                lineHeight: 1.7,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                margin: 0,
              }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="pe-bottom" style={{
          textAlign: "center",
          background: `linear-gradient(135deg, ${C.greenLight}, ${C.cream})`,
          borderRadius: "16px",
          padding: "32px 40px",
          border: `1px solid ${C.borderLight}`,
        }}>
          <p style={{
            fontSize: "17px",
            color: C.textPrimary,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 1.7,
            margin: 0,
            fontWeight: 500,
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            That's why Halka combines prescription medication with doctor supervision — treating the cause, not the symptom.
          </p>
        </div>
      </div>
    </section>
  );
}
