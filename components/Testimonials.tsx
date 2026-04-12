'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const testimonials = [
  {
    name: "Meera R.",
    age: 34,
    city: "Hyderabad",
    initials: "MR",
    color: C.saffron,
    text: "I tried everything — gym, keto, intermittent fasting. Nothing stuck. With Halka, my doctor prescribed the right medication and my coach kept me accountable. I've lost 16 kg in 4 months and my blood sugar is normal for the first time in years.",
    result: "Lost 16 kg",
    program: "GLP-1 Program",
  },
  {
    name: "Arjun P.",
    age: 42,
    city: "Pune",
    initials: "AP",
    color: C.green,
    text: "As a software engineer, I sit 10+ hours a day. My doctor at Halka understood my lifestyle and created a plan that actually works with my schedule. The WhatsApp check-ins make it so easy.",
    result: "Lost 12 kg",
    program: "Starter Program",
  },
  {
    name: "Kavitha S.",
    age: 29,
    city: "Chennai",
    initials: "KS",
    color: C.navy,
    text: "I have PCOS and was told weight loss would be impossible. My Halka doctor prescribed medication that targets insulin resistance. 14 kg down and my periods are regular now.",
    result: "Lost 14 kg",
    program: "GLP-1 Program",
  },
];

export default function Testimonials() {
  return (
    <section style={{ background: C.white, padding: "80px 24px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
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

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: "16px",
              padding: "28px 24px",
              boxShadow: C.shadowSm,
            }}>
              {/* Stars */}
              <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                {"★★★★★".split("").map((s, j) => (
                  <span key={j} style={{ color: "#F59E0B", fontSize: "16px" }}>{s}</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontSize: "15px",
                color: C.textSecondary,
                lineHeight: 1.7,
                marginBottom: "20px",
              }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Result badge */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                <span style={{
                  background: C.greenLight,
                  color: C.green,
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "4px 12px",
                  borderRadius: "20px",
                }}>
                  {t.result}
                </span>
                <span style={{
                  background: C.saffronLight,
                  color: C.saffron,
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "4px 12px",
                  borderRadius: "20px",
                }}>
                  {t.program}
                </span>
              </div>

              {/* Patient info */}
              <div style={{
                borderTop: `1px solid ${C.borderLight}`,
                paddingTop: "16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}>
                {/* Avatar */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: t.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.white,
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "'Outfit', sans-serif",
                  flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontWeight: 600, fontSize: "14px", color: C.textPrimary }}>{t.name}</span>
                    <span style={{
                      background: C.greenLight,
                      color: C.green,
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}>
                      VERIFIED
                    </span>
                  </div>
                  <span style={{ fontSize: "13px", color: C.textMuted }}>
                    {t.age}, {t.city}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
