'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const featured = {
  name: "Rahul K.",
  location: "Delhi",
  weightLost: "22 kg",
  duration: "5 months",
  program: "Lose 10-20 kg",
  quote: "The medication combined with the diet plan changed my life. I feel like a new person.",
  beforeImg: "/images/before-after/pair2-before.jpg",
  afterImg: "/images/before-after/pair2-after.jpg",
};

const testimonials = [
  {
    name: "Priya S.",
    age: 31,
    city: "Mumbai",
    weightLost: "18",
    quote: "I finally found something that works. My doctor was with me every step of the way.",
    gradient: "linear-gradient(135deg, #FF6B2C 0%, #FF8F5E 50%, #FFB088 100%)",
    accentDark: "#CC4A10",
    initial: "P",
  },
  {
    name: "Meera R.",
    age: 34,
    city: "Hyderabad",
    weightLost: "16",
    quote: "I tried everything. With Halka, my doctor prescribed the right medication and my coach kept me accountable.",
    gradient: "linear-gradient(135deg, #0B7A4B 0%, #10A366 50%, #34D399 100%)",
    accentDark: "#065C38",
    initial: "M",
  },
  {
    name: "Kavitha S.",
    age: 29,
    city: "Chennai",
    weightLost: "14",
    quote: "I have PCOS and was told weight loss was impossible. 14 kg down and my periods are regular now.",
    gradient: "linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #818CF8 100%)",
    accentDark: "#3730A3",
    initial: "K",
  },
];

export default function SocialProof() {
  return (
    <section className="halka-sp-section" style={{ background: C.bgWarm, padding: '80px 24px' }}>
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
          min-height: 420px;
        }
        .halka-sp-featured-images img {
          width: 50%;
          height: 100%;
          object-fit: cover;
        }
        .halka-sp-featured-content {
          padding: 48px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .halka-sp-t-card {
          position: relative;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .halka-sp-t-card:hover {
          transform: translateY(-8px) scale(1.01);
        }
        @media (max-width: 960px) {
          .halka-sp-featured { grid-template-columns: 1fr !important; }
          .halka-sp-featured-images { min-height: 280px !important; }
        }
        @media (max-width: 767px) {
          .halka-sp-section { padding: 60px 16px !important; }
          .halka-sp-cards { grid-template-columns: 1fr !important; max-width: 400px !important; margin: 0 auto !important; }
          .halka-sp-featured-content { padding: 28px 24px !important; }
          .halka-sp-featured-images { min-height: 220px !important; }
        }
        @media (max-width: 480px) {
          .halka-sp-section { padding: 48px 12px !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        {/* ── Header ── */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 42px)',
            color: C.textPrimary,
            letterSpacing: '-1px',
            lineHeight: 1.15,
            marginBottom: '10px',
          }}>
            Real results from real Indians
          </h2>
          <p style={{
            fontSize: '16px',
            color: C.textSecondary,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 1.6,
            maxWidth: '440px',
            margin: 0,
          }}>
            Our patients share their transformation journeys.
          </p>
        </div>

        {/* ── Featured transformation ── */}
        <div
          className="halka-sp-featured"
          style={{
            background: C.white,
            borderRadius: '20px',
            border: `1px solid ${C.borderLight}`,
            boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
            marginBottom: '24px',
          }}
        >
          <div className="halka-sp-featured-images">
            <div style={{ flex: 1, position: 'relative' }}>
              <img src={featured.beforeImg} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' as const, display: 'block' }} />
              <span style={{ position: 'absolute', bottom: 12, left: 12, padding: '5px 14px', background: 'rgba(0,0,0,0.65)', color: '#fff', borderRadius: 8, fontSize: 11, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.5px', textTransform: 'uppercase' as const, backdropFilter: 'blur(4px)' } as any}>Before</span>
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <img src={featured.afterImg} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' as const, display: 'block' }} />
              <span style={{ position: 'absolute', bottom: 12, right: 12, padding: '5px 14px', background: 'rgba(0,0,0,0.65)', color: '#fff', borderRadius: 8, fontSize: 11, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.5px', textTransform: 'uppercase' as const, backdropFilter: 'blur(4px)' } as any}>After</span>
            </div>
          </div>
          <div className="halka-sp-featured-content">
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: C.green, background: C.greenLight, padding: '5px 12px', borderRadius: 6, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: 18, fontFamily: "'Plus Jakarta Sans', sans-serif", alignSelf: 'flex-start' }}>
              {featured.program}
            </span>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 22, color: C.textPrimary, marginBottom: 4 }}>{featured.name}</div>
            <div style={{ fontSize: 14, color: C.textMuted, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 20 }}>{featured.location}</div>
            <div style={{ display: 'flex', gap: 28, marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 32, color: C.saffron, lineHeight: 1 }}>{featured.weightLost}</div>
                <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: 4 }}>weight lost</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 32, color: C.saffron, lineHeight: 1 }}>{featured.duration}</div>
                <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: 4 }}>duration</div>
              </div>
            </div>
            <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: 'italic', margin: 0, borderLeft: `3px solid ${C.saffron}`, paddingLeft: 16 }}>
              &ldquo;{featured.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* ── Testimonial Cards — bold gradient style ── */}
        <div className="halka-sp-cards" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="halka-sp-t-card"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                background: t.gradient,
                boxShadow: `0 12px 40px ${t.accentDark}30`,
                position: 'relative',
              }}
            >
              {/* Subtle noise/texture overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.15) 100%)',
                pointerEvents: 'none',
              }} />

              <div style={{ padding: '32px 28px 28px', position: 'relative', zIndex: 1 }}>
                {/* Big weight number — hero element */}
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: '72px',
                  color: 'rgba(255,255,255,0.95)',
                  lineHeight: 0.85,
                  letterSpacing: '-4px',
                  marginBottom: '4px',
                }}>
                  -{t.weightLost}
                </div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase' as const,
                  marginBottom: '24px',
                }}>
                  kg lost
                </div>

                {/* Quote */}
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.65,
                  margin: '0 0 24px 0',
                  minHeight: '72px',
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Divider */}
                <div style={{
                  height: '1px',
                  background: 'rgba(255,255,255,0.2)',
                  marginBottom: '16px',
                }} />

                {/* Author row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  {/* Initial circle */}
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: '16px',
                    color: '#fff',
                    flexShrink: 0,
                    border: '1.5px solid rgba(255,255,255,0.3)',
                  } as any}>
                    {t.initial}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: '15px',
                      color: '#fff',
                      lineHeight: 1.2,
                    }}>
                      {t.name}
                    </div>
                    <div style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.65)',
                    }}>
                      {t.age} · {t.city}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p style={{
          fontSize: '12px',
          color: C.textMuted,
          marginTop: '32px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          * Results may vary. All transformations achieved under medical supervision.
        </p>
      </div>
    </section>
  );
}
