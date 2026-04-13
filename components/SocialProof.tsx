'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

/* ── Featured transformation (from BeforeAfter data) ── */
const featured = {
  name: "Rahul K.",
  location: "Delhi",
  stats: "Lost 22 kg in 5 months",
  weightLost: "22 kg",
  duration: "5 months",
  program: "Medication Plan",
  quote: "The medication combined with the diet plan changed my life. I feel like a new person.",
  beforeImg: "/images/before-after/pair2-before.jpg",
  afterImg: "/images/before-after/pair2-after.jpg",
};

/* ── Compact testimonial cards (merged from both components) ── */
const testimonials = [
  {
    name: "Priya S.",
    age: 31,
    city: "Mumbai",
    weightLost: "18 kg",
    duration: "4 months",
    rating: 5,
    quote: "I finally found something that works. My doctor was with me every step of the way.",
  },
  {
    name: "Meera R.",
    age: 34,
    city: "Hyderabad",
    photo: "/images/testimonials/meera.jpg",
    weightLost: "16 kg",
    duration: "4 months",
    rating: 5,
    quote: "I tried everything -- gym, keto, intermittent fasting. Nothing stuck. With Halka, my doctor prescribed the right medication and my coach kept me accountable.",
  },
  {
    name: "Kavitha S.",
    age: 29,
    city: "Chennai",
    photo: "/images/testimonials/kavitha.jpg",
    weightLost: "14 kg",
    duration: "5 months",
    rating: 5,
    quote: "I have PCOS and was told weight loss would be impossible. My Halka doctor prescribed medication that targets insulin resistance. 14 kg down and my periods are regular now.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="halka-sp-section" style={{ background: C.bgWarm, padding: "80px 24px" }}>
      <style>{`
        .halka-sp-featured {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          overflow: hidden;
        }
        .halka-sp-featured-images {
          position: relative;
          display: flex;
          min-height: 380px;
        }
        .halka-sp-featured-images img {
          width: 50%;
          height: 100%;
          object-fit: cover;
        }
        .halka-sp-featured-content {
          padding: 40px 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .halka-sp-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 960px) {
          .halka-sp-featured {
            grid-template-columns: 1fr !important;
          }
          .halka-sp-featured-images {
            min-height: 260px !important;
          }
        }
        @media (max-width: 767px) {
          .halka-sp-section { padding: 60px 16px !important; }
          .halka-sp-cards {
            grid-template-columns: 1fr !important;
            max-width: 420px !important;
            margin: 0 auto !important;
          }
          .halka-sp-featured-content {
            padding: 28px 24px !important;
          }
          .halka-sp-featured-images {
            min-height: 220px !important;
          }
        }
        @media (max-width: 480px) {
          .halka-sp-section { padding: 48px 12px !important; }
          .halka-sp-featured-content {
            padding: 24px 18px !important;
          }
          .halka-sp-featured-images {
            min-height: 180px !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* ── Section header (LEFT-ALIGNED, no pill badge) ── */}
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(28px, 4vw, 42px)",
            color: C.textPrimary,
            letterSpacing: "-1px",
            lineHeight: 1.15,
            marginBottom: "10px",
          }}>
            Real results from real Indians
          </h2>
          <p style={{
            fontSize: "16px",
            color: C.textSecondary,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 1.6,
            maxWidth: "440px",
            margin: 0,
          }}>
            Our patients share their transformation journeys.
          </p>
        </div>

        {/* ── Featured transformation (horizontal magazine card) ── */}
        <div
          className="halka-sp-featured"
          style={{
            background: C.white,
            borderRadius: "20px",
            border: `1px solid ${C.borderLight}`,
            boxShadow: C.shadowMd,
            marginBottom: "28px",
          }}
        >
          {/* Left: before/after images stacked side-by-side */}
          <div className="halka-sp-featured-images">
            <div style={{ flex: 1, position: "relative" }}>
              <img
                src={featured.beforeImg}
                alt={`${featured.name} before`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover" as const,
                  display: "block",
                  borderRadius: "20px 0 0 0",
                }}
              />
              <span style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
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
                src={featured.afterImg}
                alt={`${featured.name} after`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover" as const,
                  display: "block",
                  borderRadius: "0 0 0 0",
                }}
              />
              <span style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
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

          {/* Right: content */}
          <div className="halka-sp-featured-content">
            {/* Program badge */}
            <span style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 700,
              color: C.green,
              background: C.greenLight,
              padding: "5px 12px",
              borderRadius: "6px",
              textTransform: "uppercase" as const,
              letterSpacing: "0.5px",
              marginBottom: "16px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              alignSelf: "flex-start",
            }}>
              {featured.program}
            </span>

            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "22px",
              color: C.textPrimary,
              marginBottom: "4px",
            }}>
              {featured.name}
            </div>
            <div style={{
              fontSize: "14px",
              color: C.textMuted,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: "16px",
            }}>
              {featured.location}
            </div>

            {/* Stats row */}
            <div style={{
              display: "flex",
              gap: "24px",
              marginBottom: "20px",
            }}>
              <div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "28px",
                  color: C.saffron,
                  lineHeight: 1.1,
                }}>
                  {featured.weightLost}
                </div>
                <div style={{
                  fontSize: "12px",
                  color: C.textMuted,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  marginTop: "2px",
                }}>
                  weight lost
                </div>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "28px",
                  color: C.saffron,
                  lineHeight: 1.1,
                }}>
                  {featured.duration}
                </div>
                <div style={{
                  fontSize: "12px",
                  color: C.textMuted,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  marginTop: "2px",
                }}>
                  duration
                </div>
              </div>
            </div>

            {/* Quote */}
            <p style={{
              fontSize: "16px",
              color: C.textSecondary,
              lineHeight: 1.7,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontStyle: "italic",
              margin: 0,
              borderLeft: `3px solid ${C.saffron}`,
              paddingLeft: "16px",
            }}>
              &ldquo;{featured.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* ── Compact testimonial cards ── */}
        <div className="halka-sp-cards">
          {testimonials.map((t, i) => (
            <div key={i} style={{
              background: C.white,
              borderRadius: "16px",
              border: `1px solid ${C.borderLight}`,
              boxShadow: C.shadowSm,
              padding: "24px",
              display: "flex",
              flexDirection: "column" as const,
            }}>
              {/* Quote mark */}
              <div style={{
                fontFamily: "Georgia, serif",
                fontSize: "48px",
                lineHeight: "32px",
                color: C.saffronLight,
                marginBottom: "8px",
                userSelect: "none" as const,
              }}>
                &ldquo;
              </div>

              {/* Quote text */}
              <p style={{
                fontSize: "14px",
                color: C.textSecondary,
                lineHeight: 1.7,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                margin: "0 0 20px 0",
                flex: 1,
              }}>
                {t.quote}
              </p>

              {/* Stars */}
              <div style={{ marginBottom: "14px" }}>
                <Stars count={t.rating} />
              </div>

              {/* Patient info + result */}
              <div style={{
                borderTop: `1px solid ${C.borderLight}`,
                paddingTop: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                flexWrap: "wrap" as const,
              }}>
                <div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: C.textPrimary,
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: C.textMuted,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    {t.age}, {t.city}
                  </div>
                </div>
                <span style={{
                  background: C.greenLight,
                  color: C.green,
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: "6px",
                  whiteSpace: "nowrap" as const,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  -{t.weightLost}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p style={{
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
