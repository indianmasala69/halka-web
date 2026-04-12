'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const items = [
  {
    title: "Licensed Indian Doctors",
    desc: "MBBS/MD physicians registered with the Medical Council of India",
  },
  {
    title: "FDA-Approved Medication",
    desc: "Only clinically-proven, safe medications prescribed after assessment",
  },
  {
    title: "WhatsApp-Native Support",
    desc: "Your coach is just a message away. Real humans, real responses",
  },
  {
    title: "Built for Indian Bodies",
    desc: "Plans designed around Indian diets, lifestyles, and metabolic profiles",
  },
  {
    title: "100% Confidential",
    desc: "Your health data is encrypted and never shared. HIPAA-equivalent standards",
  },
  {
    title: "No Hidden Costs",
    desc: "Medication, consultations, and coaching included in your plan price",
  },
];

export default function Trust() {
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
            Why patients trust halka
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "14px",
                padding: "24px 20px",
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: "12px",
                boxShadow: C.shadowSm,
              }}
            >
              <div style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: C.greenLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ color: C.green, fontSize: "16px", fontWeight: 700 }}>✓</span>
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
                <p style={{ fontSize: "13px", color: C.textMuted, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
