'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

interface HeroProps {
  onQuiz: () => void;
}

export default function Hero({ onQuiz }: HeroProps) {
  return (
    <section style={{
      background: C.white,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "100px 24px 60px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle background accent */}
      <div style={{
        position: "absolute",
        top: "-20%",
        right: "-10%",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,44,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "1140px",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "60px",
        flexWrap: "wrap",
      } as any}>
        {/* Left content */}
        <div style={{ flex: "1 1 500px", minWidth: "300px" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: C.greenLight,
            padding: "8px 16px",
            borderRadius: "50px",
            marginBottom: "28px",
            fontSize: "13px",
            fontWeight: 600,
            color: C.green,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: C.green,
              animation: "pulse 2s ease infinite",
            }} />
            Trusted by 10,000+ Indians
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(36px, 5.5vw, 56px)",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            color: C.textPrimary,
            marginBottom: "20px",
          }}>
            Clinically-proven{" "}
            <br />
            weight loss.{" "}
            <span style={{ color: C.saffron }}>
              Doctor-prescribed.
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: C.textSecondary,
            maxWidth: "480px",
            marginBottom: "32px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            Licensed Indian doctors prescribe FDA-approved medications, delivered to your door. Lose 10-15% body weight in 6 months.
          </p>

          {/* Primary CTA */}
          <button
            onClick={onQuiz}
            style={{
              background: C.saffron,
              color: C.white,
              border: "none",
              padding: "16px 36px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "16px",
              cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: "all 0.2s ease",
              minHeight: "52px",
              width: "100%",
              maxWidth: "360px",
              boxShadow: "0 4px 14px rgba(255,107,44,0.3)",
            } as any}
          >
            Start Free Assessment →
          </button>

          {/* Trust bar */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "32px",
            fontSize: "13px",
            color: C.textSecondary,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
          } as any}>
            {["Licensed Doctors", "FDA-approved", "Free Shipping", "Cancel Anytime"].map((item, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ color: C.green, fontWeight: 700 }}>✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right side — clinical illustration placeholder */}
        <div style={{
          flex: "1 1 400px",
          minWidth: "300px",
          minHeight: "400px",
          borderRadius: "20px",
          background: `linear-gradient(135deg, ${C.saffronLight} 0%, ${C.greenLight} 100%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          border: `1px solid ${C.border}`,
          position: "relative",
          overflow: "hidden",
        } as any}>
          {/* Decorative medical icons */}
          <div style={{ fontSize: "48px", opacity: 0.6 }}>🩺</div>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "18px",
            color: C.textSecondary,
            opacity: 0.5,
          }}>
            Clinical Illustration
          </div>
          <div style={{
            display: "flex",
            gap: "20px",
            fontSize: "32px",
            opacity: 0.4,
          }}>
            <span>💊</span>
            <span>📋</span>
            <span>📊</span>
          </div>
          {/* Subtle grid pattern overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            pointerEvents: "none",
          }} />
        </div>
      </div>
    </section>
  );
}
