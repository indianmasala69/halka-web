'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

export default function HowItWorks() {
  const steps = [
    { num: "01", title: "Take the free assessment", desc: "5-minute quiz about your body, lifestyle, medical history, and goals.", icon: "📋" },
    { num: "02", title: "Meet your doctor", desc: "15-minute video consultation with a licensed Indian doctor.", icon: "🩺" },
    { num: "03", title: "Receive your kit", desc: "Prescription medication, personalized diet plan, and welcome guide.", icon: "📦" },
    { num: "04", title: "Ongoing support", desc: "Weekly WhatsApp check-ins with your health coach.", icon: "💬" },
  ];

  return (
    <section style={{ background: C.cream, padding: "100px 24px" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: C.saffron, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "12px" }}>Your Journey</div>
          <h2 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", color: C.charcoal, letterSpacing: "-1.5px", lineHeight: 1.1 }}>With you from start to success</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                background: C.white,
                border: `1px solid ${C.borderLight}`,
                borderRadius: "20px",
                padding: "36px 28px",
                position: "relative",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: "14px", background: C.saffronLight,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "22px", marginBottom: "20px",
              }}>{step.icon}</div>
              <div style={{ fontSize: "11px", fontWeight: 800, color: C.saffron, letterSpacing: "2px", marginBottom: "10px" }}>STEP {step.num}</div>
              <h3 style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "20px", color: C.charcoal, marginBottom: "10px", lineHeight: 1.3 }}>{step.title}</h3>
              <p style={{ fontSize: "14px", color: C.textMuted, lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
