'use client';

import { useState } from 'react';
import { COLOR_SYSTEM as C } from '@/lib/colors';
import { supabase } from '@/lib/supabase';

const quizQuestions = [
  { id: "gender", question: "What's your biological sex?", subtitle: "This helps us understand your hormonal profile", type: "choice",
    options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] },
  { id: "age", question: "How old are you?", subtitle: "Age affects metabolism and treatment options", type: "choice",
    options: [{ label: "18–25", value: "18-25" }, { label: "26–35", value: "26-35" }, { label: "36–45", value: "36-45" }, { label: "46–55", value: "46-55" }, { label: "55+", value: "55+" }] },
  { id: "height", question: "What's your height?", subtitle: "We'll use this to calculate your BMI", type: "input", placeholder: "e.g. 170", unit: "cm" },
  { id: "weight", question: "What's your current weight?", subtitle: "This helps us set realistic goals", type: "input", placeholder: "e.g. 85", unit: "kg" },
  { id: "target", question: "What's your target weight?", subtitle: "We'll build a plan to get you there safely", type: "input", placeholder: "e.g. 72", unit: "kg" },
  { id: "conditions", question: "Do you have any of these?", subtitle: "Select all that apply", type: "multi",
    options: [{ label: "Type 2 Diabetes", value: "diabetes" }, { label: "Thyroid disorder", value: "thyroid" }, { label: "PCOS / PCOD", value: "pcos" }, { label: "High BP", value: "bp" }, { label: "None of these", value: "none" }] },
  { id: "diet", question: "What's your diet preference?", subtitle: "We'll customize nutrition for you", type: "choice",
    options: [{ label: "Vegetarian", value: "veg" }, { label: "Non-vegetarian", value: "nonveg" }, { label: "Eggetarian", value: "egg" }, { label: "Vegan", value: "vegan" }] },
  { id: "commitment", question: "How ready are you?", subtitle: "Be honest — helps us match the right intensity", type: "choice",
    options: [{ label: "All in — ready now", value: "high" }, { label: "Motivated, need guidance", value: "medium" }, { label: "Just exploring", value: "low" }] },
];

interface QuizModalProps {
  onClose: () => void;
  user?: any;
}

const btnPrimary = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  textAlign: "center" as const,
  background: C.saffron,
  color: C.white,
  border: "none",
  padding: "16px 36px",
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "15px",
  cursor: "pointer",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  transition: "all 0.2s ease",
};

const optBtn = (selected: boolean) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  width: "100%",
  textAlign: "left" as const,
  background: selected ? C.saffronLight : C.cream,
  border: `1.5px solid ${selected ? C.saffron : C.borderLight}`,
  borderRadius: "14px",
  padding: "16px 20px",
  color: C.charcoal,
  fontSize: "15px",
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  transition: "all 0.2s ease",
});

export default function QuizModal({ onClose, user }: QuizModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputVal, setInputVal] = useState("");
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const total = quizQuestions.length;
  const q = quizQuestions[step];

  const advance = async () => {
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      // Submit quiz to API
      setLoading(true);
      try {
        const response = await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('Error saving quiz:', data.error);
        }
        setShowResult(true);
      } catch (error) {
        console.error('Error submitting quiz:', error);
        setShowResult(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChoice = (v: string) => {
    setAnswers(p => ({ ...p, [q.id]: v }));
    setTimeout(advance, 250);
  };

  const handleInput = () => {
    if (!inputVal.trim()) return;
    setAnswers(p => ({ ...p, [q.id]: parseFloat(inputVal) }));
    setInputVal("");
    advance();
  };

  const toggleMulti = (v: string) => {
    if (v === "none") {
      setMultiSelect(["none"]);
    } else {
      setMultiSelect(p => {
        const f = p.filter(x => x !== "none");
        return f.includes(v) ? f.filter(x => x !== v) : [...f, v];
      });
    }
  };

  const handleMulti = () => {
    if (!multiSelect.length) return;
    setAnswers(p => ({ ...p, [q.id]: multiSelect }));
    setMultiSelect([]);
    advance();
  };

  const bmi = () => {
    const h = parseFloat(answers.height as any) / 100;
    const w = parseFloat(answers.weight as any);
    return h && w ? (w / (h * h)).toFixed(1) : null;
  };

  const toLose = () => {
    const c = parseFloat(answers.weight as any);
    const t = parseFloat(answers.target as any);
    return c && t ? (c - t).toFixed(0) : null;
  };

  const modalBg = {
    position: "fixed" as const,
    inset: 0,
    zIndex: 200,
    background: "rgba(26,26,26,0.6)",
    backdropFilter: "blur(12px)",
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    padding: "20px",
  };

  const modalCard = {
    background: C.white,
    borderRadius: "28px",
    padding: "44px 36px",
    maxWidth: "520px",
    width: "100%",
    position: "relative" as const,
    maxHeight: "90vh",
    overflowY: "auto" as const,
  };

  if (showResult) {
    const b = bmi();
    const tl = toLose();
    const cat = b && parseFloat(b) > 30 ? "Obese" : b && parseFloat(b) > 25 ? "Overweight" : b && parseFloat(b) > 18.5 ? "Normal" : "Underweight";
    const rec = b && parseFloat(b) > 27 ? "GLP-1 Program" : "Starter Program";

    return (
      <div style={modalBg}>
        <div style={{ ...modalCard, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "28px" }}>✓</div>
          <h2 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: "26px", color: C.charcoal, marginBottom: "6px" }}>Your Halka Profile</h2>
          <p style={{ fontSize: "14px", color: C.textMuted, marginBottom: "28px" }}>Here's what we recommend based on your responses</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            {[
              { label: "BMI", value: b || "—", sub: cat },
              { label: "To lose", value: `${tl || "—"} kg`, sub: "to reach goal" },
            ].map((item, i) => (
              <div key={i} style={{ background: C.cream, borderRadius: "14px", padding: "18px", border: `1px solid ${C.borderLight}`, textAlign: "left" }}>
                <div style={{ fontSize: "11px", color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>{item.label}</div>
                <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: "24px", color: C.saffron, marginTop: "4px" }}>{item.value}</div>
                {item.sub && <div style={{ fontSize: "11px", color: C.textMuted }}>{item.sub}</div>}
              </div>
            ))}
          </div>
          <div style={{ background: C.saffronLight, border: `1px solid rgba(232,145,58,0.3)`, borderRadius: "16px", padding: "20px", marginBottom: "24px" }}>
            <div style={{ fontSize: "11px", color: C.saffron, fontWeight: 800, letterSpacing: "1px" }}>RECOMMENDED</div>
            <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: "22px", color: C.charcoal, marginTop: "4px" }}>{rec}</div>
            <div style={{ fontSize: "13px", color: C.textMuted, marginTop: "4px" }}>{rec === "GLP-1 Program" ? "₹4,999/mo" : "₹2,499/mo"} — doctor + medication + coach</div>
          </div>
          <button style={{ ...btnPrimary, marginBottom: "10px", opacity: loading ? 0.6 : 1 }} disabled={loading}>
            {loading ? "Saving..." : "Book Doctor Consultation — Free"}
          </button>
          <button onClick={onClose} style={{ ...btnPrimary, background: "transparent", color: C.textMuted, border: "none" }}>I'll decide later</button>
        </div>
      </div>
    );
  }

  return (
    <div style={modalBg}>
      <div style={modalCard}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: C.textMuted, fontSize: "24px", cursor: "pointer" }}>×</button>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
          <div style={{ flex: 1, height: 4, background: C.cream, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 4, background: C.saffron, width: `${((step + 1) / total) * 100}%`, transition: "width 0.4s ease" }} />
          </div>
          <span style={{ fontSize: "12px", color: C.textMuted, fontWeight: 600 }}>{step + 1}/{total}</span>
        </div>

        <div key={step}>
          <h3 style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "22px", color: C.charcoal, marginBottom: "6px", lineHeight: 1.3 }}>{q.question}</h3>
          <p style={{ fontSize: "14px", color: C.textMuted, marginBottom: "24px" }}>{q.subtitle}</p>

          {q.type === "choice" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {q.options?.map((o, i) => (
                <button key={i} onClick={() => handleChoice(o.value)} style={optBtn(answers[q.id] === o.value) as any}>
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {q.type === "input" && (
            <div>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="number"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleInput()}
                  placeholder={q.placeholder}
                  autoFocus
                  style={{
                    flex: 1,
                    background: C.cream,
                    border: `1.5px solid ${C.borderLight}`,
                    borderRadius: "14px",
                    padding: "16px 20px",
                    color: C.charcoal,
                    fontSize: "18px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    outline: "none",
                  }}
                />
                <span style={{ display: "flex", alignItems: "center", padding: "0 16px", background: C.cream, borderRadius: "14px", border: `1.5px solid ${C.borderLight}`, color: C.textMuted, fontSize: "14px", fontWeight: 600 }}>
                  {q.unit}
                </span>
              </div>
              <button onClick={handleInput} style={{ ...btnPrimary as any, marginTop: "14px", opacity: inputVal.trim() ? 1 : 0.4 }}>
                Continue →
              </button>
            </div>
          )}

          {q.type === "multi" && (
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {q.options?.map((o, i) => {
                  const sel = multiSelect.includes(o.value);
                  return (
                    <button key={i} onClick={() => toggleMulti(o.value)} style={optBtn(sel) as any}>
                      <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        border: `2px solid ${sel ? C.saffron : C.textMuted}`,
                        background: sel ? C.saffron : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        color: C.white,
                        flexShrink: 0,
                      }}>
                        {sel && "✓"}
                      </div>
                      {o.label}
                    </button>
                  );
                })}
              </div>
              <button onClick={handleMulti} style={{ ...btnPrimary as any, marginTop: "14px", opacity: multiSelect.length ? 1 : 0.4 }}>
                Continue →
              </button>
            </div>
          )}
        </div>

        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{ marginTop: "16px", background: "none", border: "none", color: C.textMuted, fontSize: "13px", cursor: "pointer", fontFamily: "'Plus Jakarta Sans'", fontWeight: 600 }}
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
