'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const transformations = [
  {
    name: "Priya S., Mumbai",
    stats: "Lost 18 kg in 4 months",
    program: "Medication Plan",
    quote: "I finally found something that works. My doctor was with me every step of the way.",
    beforeImg: "/images/before-after/pair1-before.jpg",
    afterImg: "/images/before-after/pair1-after.jpg",
  },
  {
    name: "Rahul K., Delhi",
    stats: "Lost 22 kg in 5 months",
    program: "Medication Plan",
    quote: "The medication combined with the diet plan changed my life. I feel like a new person.",
    beforeImg: "/images/before-after/pair2-before.jpg",
    afterImg: "/images/before-after/pair2-after.jpg",
  },
  {
    name: "Ananya M., Bangalore",
    stats: "Lost 14 kg in 3 months",
    program: "Starter Program",
    quote: "WhatsApp check-ins kept me accountable. The convenience of home delivery was a game-changer.",
    beforeImg: "/images/before-after/pair3-before.jpg",
    afterImg: "/images/before-after/pair3-after.jpg",
  },
];

export default function BeforeAfter() {
  return (
    <section style={{ background: C.white, padding: "80px 24px" }}>
      <style>{`
        @media (min-width: 768px) {
          .halka-ba-grid {
            grid-template-columns: repeat(3, 1fr) !important;
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
            Real transformations. Real Indians.
          </h2>
          <p style={{
            fontSize: "16px",
            color: C.textSecondary,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            See what's possible with the right medical support
          </p>
        </div>

        {/* Cards grid */}
        <div
          className="halka-ba-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "24px",
          } as any}
        >
          {transformations.map((t, i) => (
            <div key={i} style={{
              background: C.white,
              borderRadius: "16px",
              border: `1px solid ${C.borderLight}`,
              boxShadow: C.shadowMd,
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}>
              {/* Before/After images */}
              <div style={{
                display: "flex",
                position: "relative",
              }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <img
                    src={t.beforeImg}
                    alt={`${t.name} before`}
                    style={{
                      width: "100%",
                      height: "280px",
                      objectFit: "cover" as const,
                      borderRadius: "12px 0 0 0",
                      display: "block",
                    }}
                  />
                  <span style={{
                    position: "absolute",
                    bottom: "8px",
                    left: "8px",
                    padding: "4px 12px",
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>Before</span>
                </div>
                <div style={{ flex: 1, position: "relative" }}>
                  <img
                    src={t.afterImg}
                    alt={`${t.name} after`}
                    style={{
                      width: "100%",
                      height: "280px",
                      objectFit: "cover" as const,
                      borderRadius: "0 12px 0 0",
                      display: "block",
                    }}
                  />
                  <span style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    padding: "4px 12px",
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>After</span>
                </div>
              </div>

              {/* Card content */}
              <div style={{ padding: "24px" }}>
                {/* Program badge */}
                <span style={{
                  display: "inline-block",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: C.green,
                  background: C.greenLight,
                  padding: "4px 10px",
                  borderRadius: "6px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.5px",
                  marginBottom: "12px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  {t.program}
                </span>

                {/* Name */}
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  color: C.textPrimary,
                  marginBottom: "4px",
                }}>
                  {t.name}
                </div>

                {/* Stats */}
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: C.saffron,
                  marginBottom: "12px",
                }}>
                  {t.stats}
                </div>

                {/* Quote */}
                <p style={{
                  fontSize: "14px",
                  color: C.textSecondary,
                  lineHeight: 1.6,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: "italic",
                }}>
                  "{t.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p style={{
          textAlign: "center",
          fontSize: "12px",
          color: C.textMuted,
          marginTop: "32px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          * Results may vary. All transformations achieved under medical supervision.
        </p>
      </div>
    </section>
  );
}
