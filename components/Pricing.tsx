'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

interface PricingProps {
  onQuiz: () => void;
}

const btnPrimary = {
  background: C.saffron,
  color: C.white,
  border: "none",
  padding: "16px 36px",
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "15px",
  cursor: "pointer",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

const btnSecondary = {
  background: "transparent",
  color: C.charcoal,
  border: `1.5px solid ${C.border}`,
  padding: "14px 32px",
  borderRadius: "14px",
  fontWeight: 600,
  fontSize: "15px",
  cursor: "pointer",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

export default function Pricing({ onQuiz }: PricingProps) {
  const plans = [
    { name: "Starter", price: "₹2,499", tag: "Lifestyle + Rx", popular: false,
      features: ["Doctor consultation", "Non-GLP-1 medication", "Personalized diet plan", "Bi-weekly coach check-ins", "Monthly doctor follow-up"] },
    { name: "GLP-1 Program", price: "₹4,999", tag: "Most Popular", popular: true,
      features: ["Everything in Starter", "GLP-1 medication included", "Weekly coach check-ins", "Indian meal plans", "Progress dashboard", "Priority support"] },
    { name: "Premium", price: "₹9,999", tag: "All-Inclusive", popular: false,
      features: ["Everything in GLP-1", "Daily coaching", "Supplement stack", "Priority doctor access", "Lab work coordination", "Quarterly assessment"] },
  ];

  return (
    <section style={{ background: C.warmWhite, padding: "100px 24px" }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: C.saffron, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "12px" }}>Programs</div>
          <h2 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", color: C.charcoal, letterSpacing: "-1.5px", lineHeight: 1.1 }}>Transparent pricing, real care</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {plans.map((plan, i) => (
            <div
              key={i}
              style={{
                background: C.white,
                borderRadius: "24px",
                padding: "36px 28px",
                border: plan.popular ? `2px solid ${C.saffron}` : `1px solid ${C.borderLight}`,
                position: "relative",
                boxShadow: plan.popular ? `0 8px 40px rgba(232,145,58,0.12)` : "none",
              }}
            >
              {plan.popular && (
                <div style={{
                  position: "absolute",
                  top: "-1px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: C.saffron,
                  color: C.white,
                  fontSize: "10px",
                  fontWeight: 800,
                  padding: "5px 16px",
                  borderRadius: "0 0 10px 10px",
                  letterSpacing: "1px",
                }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ fontSize: "12px", fontWeight: 700, color: C.saffron, marginBottom: "8px", marginTop: plan.popular ? "12px" : 0 }}>{plan.tag}</div>
              <h3 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: "24px", color: C.charcoal, marginBottom: "4px" }}>{plan.name}</h3>
              <div style={{ marginBottom: "24px" }}>
                <span style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: "40px", color: C.charcoal }}>{plan.price}</span>
                <span style={{ fontSize: "14px", color: C.textMuted }}>/month</span>
              </div>
              <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: "20px", marginBottom: "24px" }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: C.green, fontSize: "11px", fontWeight: 700 }}>✓</span>
                    </div>
                    <span style={{ fontSize: "14px", color: C.textSecondary }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={onQuiz} style={{ ...btnPrimary as any, width: "100%", textAlign: "center" }}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
