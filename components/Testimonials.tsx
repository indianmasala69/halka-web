'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

export default function Testimonials() {
  const reviews = [
    { name: "Sneha M.", age: 29, city: "Bangalore", lost: "12kg in 3 months", text: "The doctor actually listened to me. And the WhatsApp coaching kept me honest." },
    { name: "Amit K.", age: 38, city: "Delhi", lost: "18kg in 5 months", text: "I was skeptical about online weight loss. But real doctors, real medication, real results." },
    { name: "Divya R.", age: 45, city: "Mumbai", lost: "9kg in 2 months", text: "Finally a program with Indian food plans. No one asked me to eat quinoa bowls." },
  ];

  return (
    <section style={{ background: C.warmWhite, padding: "100px 24px" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: C.saffron, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "12px" }}>Real Results</div>
          <h2 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", color: C.charcoal, letterSpacing: "-1.5px", lineHeight: 1.1 }}>People are feeling halka</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: C.white, border: `1px solid ${C.borderLight}`, borderRadius: "20px", padding: "32px 28px" }}>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontWeight: 700, fontSize: "15px", color: C.charcoal }}>{r.name}</div>
                <div style={{ fontSize: "12px", color: C.textMuted }}>{r.age}, {r.city}</div>
              </div>
              <p style={{ fontSize: "15px", color: C.textSecondary, lineHeight: 1.7, fontStyle: "italic" }}>"{r.text}"</p>
              <div style={{ display: "flex", gap: "2px", marginTop: "16px" }}>
                {"★★★★★".split("").map((s, j) => <span key={j} style={{ color: C.saffron, fontSize: "14px" }}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
