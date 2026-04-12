'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const testimonials = [
  {
    name: "Meera R.",
    age: 34,
    city: "Hyderabad",
    photo: "/images/testimonials/meera.jpg",
    text: "I tried everything — gym, keto, intermittent fasting. Nothing stuck. With Halka, my doctor prescribed the right medication and my coach kept me accountable. I've lost 16 kg in 4 months and my blood sugar is normal for the first time in years.",
    result: "Lost 16 kg",
    program: "GLP-1 Program",
    rating: 5,
    duration: "4 months",
  },
  {
    name: "Arjun P.",
    age: 42,
    city: "Pune",
    photo: "/images/testimonials/arjun.jpg",
    text: "As a software engineer, I sit 10+ hours a day. My doctor at Halka understood my lifestyle and created a plan that actually works with my schedule. The WhatsApp check-ins make it so easy.",
    result: "Lost 12 kg",
    program: "Starter Program",
    rating: 5,
    duration: "3 months",
  },
  {
    name: "Kavitha S.",
    age: 29,
    city: "Chennai",
    photo: "/images/testimonials/kavitha.jpg",
    text: "I have PCOS and was told weight loss would be impossible. My Halka doctor prescribed medication that targets insulin resistance. 14 kg down and my periods are regular now.",
    result: "Lost 14 kg",
    program: "GLP-1 Program",
    rating: 5,
    duration: "5 months",
  },
];

export default function Testimonials() {
  return (
    <section style={{ background: C.bgPrimary, padding: "80px 24px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
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
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Patient Stories
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 40px)",
            color: C.textPrimary,
            letterSpacing: "-0.5px",
            marginBottom: "12px",
          }}>
            What our patients say
          </h2>
          <p style={{ fontSize: "16px", color: C.textSecondary, maxWidth: "440px", margin: "0 auto", lineHeight: 1.6 }}>
            Real reviews from verified patients across India
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          alignItems: "stretch",
        }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: "16px",
              padding: "0",
              boxShadow: C.shadowSm,
              display: "flex",
              flexDirection: "column" as const,
              overflow: "hidden",
            }}>
              {/* Top section: Patient info + rating */}
              <div style={{
                padding: "20px 24px 16px",
                borderBottom: `1px solid ${C.borderLight}`,
              }}>
                {/* Stars row */}
                <div style={{ display: "flex", gap: "2px", marginBottom: "14px" }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                {/* Patient row */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img
                    src={t.photo}
                    alt={t.name}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      objectFit: "cover" as const,
                      flexShrink: 0,
                      border: `2px solid ${C.borderLight}`,
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        fontSize: "15px",
                        color: C.textPrimary,
                        whiteSpace: "nowrap" as const,
                      }}>
                        {t.name}
                      </span>
                      <span style={{
                        background: C.green,
                        color: C.white,
                        fontSize: "9px",
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: "3px",
                        textTransform: "uppercase" as const,
                        letterSpacing: "0.5px",
                        flexShrink: 0,
                      }}>
                        Verified
                      </span>
                    </div>
                    <span style={{ fontSize: "13px", color: C.textMuted }}>
                      {t.age}, {t.city}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div style={{ padding: "20px 24px", flex: 1 }}>
                <p style={{
                  fontSize: "14.5px",
                  color: C.textSecondary,
                  lineHeight: 1.75,
                  margin: 0,
                }}>
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Bottom: Result badges */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 24px",
                borderTop: `1px solid ${C.borderLight}`,
                background: C.bgPrimary,
              }}>
                <span style={{
                  background: C.greenLight,
                  color: C.green,
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "5px 14px",
                  borderRadius: "6px",
                }}>
                  {t.result}
                </span>
                <span style={{
                  background: C.saffronLight,
                  color: C.saffronDark,
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "5px 14px",
                  borderRadius: "6px",
                }}>
                  {t.program}
                </span>
                <span style={{
                  fontSize: "12px",
                  color: C.textMuted,
                  marginLeft: "auto",
                  fontWeight: 500,
                }}>
                  {t.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
