'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

export default function Trust() {
  const items = [
    { icon: "🏥", title: "Licensed Indian Doctors", desc: "Every consultation with registered MBBS/MD doctors." },
    { icon: "💊", title: "Real Prescription Medication", desc: "GLP-1 and clinically-proven treatments." },
    { icon: "📱", title: "WhatsApp-Native Coaching", desc: "Your coach meets you on WhatsApp with weekly check-ins." },
    { icon: "🇮🇳", title: "Built for Indian Bodies", desc: "Diet plans around dal-chawal, roti-sabzi, dosa." },
    { icon: "🔒", title: "100% Confidential", desc: "Discreet packaging, encrypted data, private consultations." },
    { icon: "💰", title: "No Hidden Fees", desc: "Medication included. Cancel anytime. Full transparency." },
  ];

  return (
    <section style={{ background: C.cream, padding: "100px 24px" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: C.saffron, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "12px" }}>Why Halka</div>
          <h2 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", color: C.charcoal, letterSpacing: "-1.5px", lineHeight: 1.1 }}>We're creating a better healthcare experience</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "16px",
                padding: "28px 24px",
                background: C.white,
                border: `1px solid ${C.borderLight}`,
                borderRadius: "16px",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                background: C.saffronLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <h4 style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "15px", color: C.charcoal, marginBottom: "4px" }}>{item.title}</h4>
                <p style={{ fontSize: "13px", color: C.textMuted, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
