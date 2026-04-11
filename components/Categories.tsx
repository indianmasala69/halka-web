'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

interface CategoriesProps {
  onQuiz: () => void;
}

const btnPrimary = {
  background: C.saffron,
  color: C.white,
  border: "none",
  padding: "16px 36px",
  borderRadius: "60px",
  fontWeight: 700,
  fontSize: "15px",
  cursor: "pointer",
};

export default function Categories({ onQuiz }: CategoriesProps) {
  const cats = [
    { title: "Weight Loss", desc: "GLP-1 & prescription treatments", tag: "MOST POPULAR", color: C.saffron },
    { title: "Metabolic Health", desc: "Thyroid, PCOS & hormone balance", tag: "COMING SOON", color: C.textMuted },
    { title: "Nutrition", desc: "Indian meal plans & coaching", tag: "INCLUDED", color: C.green },
  ];

  return (
    <section style={{ background: C.warmWhite, padding: "100px 24px" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: C.saffron, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "12px" }}>What we treat</div>
          <h2 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", color: C.charcoal, letterSpacing: "-1.5px", lineHeight: 1.1 }}>Healthcare, designed for real life.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {cats.map((cat, i) => (
            <div
              key={i}
              onClick={i === 0 ? onQuiz : undefined}
              style={{
                background: C.white,
                border: `1px solid ${C.borderLight}`,
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                overflow: "hidden" as any,
                cursor: i === 0 ? "pointer" : "default",
              }}
            >
              <div style={{ padding: "24px" }}>
                <h3 style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "22px", color: C.charcoal, marginBottom: "6px" }}>{cat.title}</h3>
                <p style={{ fontSize: "14px", color: C.textMuted }}>{cat.desc}</p>
                {i === 0 && (
                  <div style={{ marginTop: "16px", fontSize: "14px", fontWeight: 700, color: C.saffron, display: "flex", alignItems: "center", gap: "6px" }}>
                    Get Started <span>→</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
