'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

interface PricingProps {
  onQuiz: () => void;
}

const plans = [
  {
    name: "Starter Plan",
    price: "₹2,499",
    subtitle: "For those beginning their weight loss journey",
    popular: false,
    cta: "Get Started",
    features: [
      "Licensed doctor consultation",
      "Personalized diet plan",
      "Weekly WhatsApp coaching",
      "Monthly progress review",
      "Community support",
    ],
  },
  {
    name: "Medication Plan",
    price: "₹4,999",
    subtitle: "Prescription weight loss medication included",
    popular: true,
    cta: "Start Medication Plan",
    features: [
      "Everything in Starter PLUS",
      "FDA-approved GLP-1 medication",
      "Bi-weekly doctor check-ins",
      "Priority WhatsApp support",
      "Free medication delivery",
      "Blood work monitoring",
    ],
  },
  {
    name: "Premium",
    price: "₹9,999",
    subtitle: "All-inclusive with dedicated care team",
    popular: false,
    cta: "Go Premium",
    features: [
      "Everything in Medication PLUS",
      "Dedicated health coach",
      "Weekly doctor consultations",
      "Nutritionist sessions",
      "Mental wellness support",
      "Priority medication delivery",
    ],
  },
];

export default function Pricing({ onQuiz }: PricingProps) {
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
            Transparent pricing
          </h2>
          <p style={{ fontSize: "16px", color: C.textSecondary, maxWidth: "440px", margin: "0 auto", lineHeight: 1.6 }}>
            No hidden fees. Cancel anytime. Medication included.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}>
          {plans.map((plan, i) => (
            <div
              key={i}
              style={{
                background: C.white,
                borderRadius: "16px",
                padding: "32px 24px",
                border: plan.popular ? `2px solid ${C.saffron}` : `1px solid ${C.border}`,
                position: "relative",
                boxShadow: plan.popular ? C.shadowMd : C.shadowSm,
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
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "4px 16px",
                  borderRadius: "0 0 8px 8px",
                  letterSpacing: "0.5px",
                }}>
                  MOST POPULAR
                </div>
              )}

              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: C.textPrimary,
                marginBottom: "4px",
                marginTop: plan.popular ? "12px" : 0,
              }}>
                {plan.name}
              </h3>

              <p style={{ fontSize: "13px", color: C.textMuted, marginBottom: "20px", lineHeight: 1.5 }}>
                {plan.subtitle}
              </p>

              <div style={{ marginBottom: "24px" }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "36px",
                  color: C.textPrimary,
                }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: "14px", color: C.textMuted }}>/mo</span>
              </div>

              <div style={{
                borderTop: `1px solid ${C.borderLight}`,
                paddingTop: "20px",
                marginBottom: "24px",
              }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: C.greenLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}>
                      <span style={{ color: C.green, fontSize: "11px", fontWeight: 700 }}>✓</span>
                    </div>
                    <span style={{ fontSize: "14px", color: C.textSecondary, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onQuiz}
                style={{
                  width: "100%",
                  background: plan.popular ? C.saffron : "transparent",
                  color: plan.popular ? C.white : C.textPrimary,
                  border: plan.popular ? "none" : `1.5px solid ${C.border}`,
                  padding: "14px 24px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "15px",
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  minHeight: "48px",
                  textAlign: "center",
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p style={{
          textAlign: "center",
          marginTop: "32px",
          fontSize: "14px",
          color: C.textMuted,
        }}>
          All plans include a 7-day money-back guarantee
        </p>
      </div>
    </section>
  );
}
