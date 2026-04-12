'use client';

import { useState } from 'react';
import { COLOR_SYSTEM as C } from '@/lib/colors';
import { packages } from '@/lib/packages';

const quizQuestions = [
  { id: "gender", question: "What's your biological sex?", subtitle: "This helps us understand your hormonal profile", type: "choice",
    options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] },
  { id: "age", question: "How old are you?", subtitle: "Age affects metabolism and treatment options", type: "choice",
    options: [{ label: "18-25", value: "18-25" }, { label: "26-35", value: "26-35" }, { label: "36-45", value: "36-45" }, { label: "46-55", value: "46-55" }, { label: "55+", value: "55+" }] },
  { id: "height", question: "What's your height?", subtitle: "We'll use this to calculate your BMI", type: "input", placeholder: "e.g. 170", unit: "cm" },
  { id: "weight", question: "What's your current weight?", subtitle: "This helps us set realistic goals", type: "input", placeholder: "e.g. 85", unit: "kg" },
  { id: "target", question: "What's your target weight?", subtitle: "We'll build a plan to get you there safely", type: "input", placeholder: "e.g. 72", unit: "kg" },
  { id: "conditions", question: "Do you have any of these?", subtitle: "Select all that apply", type: "multi",
    options: [{ label: "Type 2 Diabetes", value: "diabetes" }, { label: "Thyroid disorder", value: "thyroid" }, { label: "PCOS / PCOD", value: "pcos" }, { label: "High BP", value: "bp" }, { label: "None of these", value: "none" }] },
  { id: "diet", question: "What's your diet preference?", subtitle: "We'll customize nutrition for you", type: "choice",
    options: [{ label: "Vegetarian", value: "veg" }, { label: "Non-vegetarian", value: "nonveg" }, { label: "Eggetarian", value: "egg" }, { label: "Vegan", value: "vegan" }] },
  { id: "commitment", question: "How ready are you?", subtitle: "Be honest -- helps us match the right intensity", type: "choice",
    options: [{ label: "All in -- ready now", value: "high" }, { label: "Motivated, need guidance", value: "medium" }, { label: "Just exploring", value: "low" }] },
];

interface QuizModalProps {
  onClose: () => void;
  user?: any;
}

/* ---------- SVG icons (no emojis) ---------- */

const CheckIcon = ({ size = 20, color = C.white }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CheckCircleIcon = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill={C.greenLight} stroke={C.green} strokeWidth="2" />
    <polyline points="20,33 28,41 44,25" fill="none" stroke={C.green} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);

const ScaleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18" /><path d="M3 12h18" /><path d="M6 6l12 12" /><path d="M18 6L6 18" />
  </svg>
);

/* ---------- Shared styles ---------- */

const btnPrimary: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  width: "100%",
  textAlign: "center",
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

const btnSecondary: React.CSSProperties = {
  ...btnPrimary,
  background: "transparent",
  color: C.charcoal,
  border: `1.5px solid ${C.borderLight}`,
};

const optBtn = (selected: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  width: "100%",
  textAlign: "left",
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

const inputStyle: React.CSSProperties = {
  flex: 1,
  background: C.cream,
  border: `1.5px solid ${C.borderLight}`,
  borderRadius: "14px",
  padding: "16px 20px",
  color: C.charcoal,
  fontSize: "16px",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  outline: "none",
  width: "100%",
};

const modalBg: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 200,
  background: "rgba(26,26,26,0.6)",
  backdropFilter: "blur(12px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const modalCard: React.CSSProperties = {
  background: C.white,
  borderRadius: "28px",
  padding: "44px 36px",
  maxWidth: "520px",
  width: "100%",
  position: "relative",
  maxHeight: "90vh",
  overflowY: "auto",
};

/* ---------- Helper: get recommended package ---------- */

function getRecommendedPackage(weightToLose: number) {
  if (weightToLose <= 10) {
    return packages.find(p => p.id === "lose-5-10-kg") || packages[0];
  }
  return packages.find(p => p.id === "lose-10-20-kg") || packages[1];
}

function projectedWeeks(weightToLose: number): number {
  // ~0.5-0.75 kg per week is realistic; use 0.6 as a middle estimate
  return Math.ceil(weightToLose / 0.6);
}

/* ---------- Component ---------- */

export default function QuizModal({ onClose, user }: QuizModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [inputVal, setInputVal] = useState("");
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  // Contact info state
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [whatsappOptin, setWhatsappOptin] = useState(true);
  const [showContactStep, setShowContactStep] = useState(false);

  // Target weight edge case state
  const [weightWarning, setWeightWarning] = useState<"same_or_higher" | "close" | null>(null);

  const total = quizQuestions.length;
  const q = quizQuestions[step];
  // Total steps for progress bar: quiz questions + contact step
  const totalWithContact = total + 1;

  const bmi = () => {
    const h = parseFloat(answers.height as any) / 100;
    const w = parseFloat(answers.weight as any);
    return h && w ? (w / (h * h)).toFixed(1) : null;
  };

  const toLose = () => {
    const c = parseFloat(answers.weight as any);
    const t = parseFloat(answers.target as any);
    return c && t ? Math.max(0, c - t) : null;
  };

  const submitQuiz = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          name: contactName,
          phone: contactPhone,
          email: contactEmail || undefined,
          whatsapp_optin: whatsappOptin,
        }),
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
  };

  const advance = async () => {
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      // Last quiz question answered -- show contact step
      setShowContactStep(true);
    }
  };

  const handleChoice = (v: string) => {
    setAnswers(p => ({ ...p, [q.id]: v }));
    setTimeout(advance, 250);
  };

  const handleInput = () => {
    if (!inputVal.trim()) return;
    const val = parseFloat(inputVal);
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);

    // Check target weight edge case
    if (q.id === "target") {
      const currentWeight = parseFloat(newAnswers.weight as any);
      const targetWeight = val;

      if (!isNaN(currentWeight) && !isNaN(targetWeight)) {
        if (targetWeight >= currentWeight) {
          // Target is same or higher
          const diff = currentWeight - targetWeight;
          if (Math.abs(diff) < 1 && diff <= 0) {
            // Within 1 kg or equal
            setWeightWarning("close");
          } else {
            setWeightWarning("same_or_higher");
          }
          setInputVal("");
          return; // Don't advance
        }
      }
    }

    setInputVal("");
    setWeightWarning(null);
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

  const handleContactSubmit = () => {
    if (!contactName.trim() || !contactPhone.trim()) return;
    submitQuiz();
  };

  const goBackFromWarning = () => {
    setWeightWarning(null);
    setInputVal(String(answers.target || ""));
  };

  /* ---------- RENDER: Weight warning ---------- */
  if (weightWarning) {
    const isClose = weightWarning === "close";

    return (
      <div style={modalBg}>
        <div style={modalCard}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
            <CloseIcon />
          </button>

          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: isClose ? C.greenLight : C.saffronLight,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isClose ? C.green : C.saffron} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            {isClose ? (
              <>
                <h3 style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "20px", color: C.charcoal, marginBottom: "10px", lineHeight: 1.3 }}>
                  You're already close to your ideal weight!
                </h3>
                <p style={{ fontSize: "14px", color: C.textSecondary, lineHeight: 1.6, marginBottom: "28px" }}>
                  A consultation with our doctor can help with body composition and metabolic health.
                </p>
                <a
                  href="/booking"
                  style={{ ...btnPrimary, textDecoration: "none", marginBottom: "10px", background: C.green } as any}
                >
                  <CalendarIcon />
                  Book a Free Consultation
                </a>
                <button onClick={goBackFromWarning} style={{ ...btnSecondary, marginTop: "8px" } as any}>
                  <ArrowLeftIcon />
                  Adjust my goal
                </button>
              </>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "20px", color: C.charcoal, marginBottom: "10px", lineHeight: 1.3 }}>
                  Would you like to adjust your goal?
                </h3>
                <p style={{ fontSize: "14px", color: C.textSecondary, lineHeight: 1.6, marginBottom: "28px" }}>
                  It looks like your target weight is the same as or higher than your current weight. Our program is designed for weight loss -- would you like to adjust your goal?
                </p>
                <button onClick={goBackFromWarning} style={{ ...btnPrimary, marginBottom: "10px" } as any}>
                  <ArrowLeftIcon />
                  Go back and adjust
                </button>
                <a
                  href="/booking"
                  style={{ ...btnSecondary, textDecoration: "none", marginTop: "4px" } as any}
                >
                  <CalendarIcon />
                  Book a Free Consultation
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ---------- RENDER: Results page ---------- */
  if (showResult) {
    const b = bmi();
    const tl = toLose();
    const bmiNum = b ? parseFloat(b) : 0;
    const cat = bmiNum >= 30 ? "Obese" : bmiNum >= 25 ? "Overweight" : bmiNum >= 18.5 ? "Normal" : "Underweight";
    const tlNum = tl ? parseFloat(String(tl)) : 0;
    const rec = getRecommendedPackage(tlNum);
    const weeks = projectedWeeks(tlNum);
    const isExtended = tlNum > 20;

    return (
      <div style={modalBg}>
        <div style={{ ...modalCard, textAlign: "center" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
            <CloseIcon />
          </button>

          <div style={{ margin: "0 auto 20px" }}>
            <CheckCircleIcon />
          </div>
          <h2 style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: "26px", color: C.charcoal, marginBottom: "6px" }}>Your Halka Profile</h2>
          <p style={{ fontSize: "14px", color: C.textMuted, marginBottom: "28px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Here's what we recommend based on your responses
          </p>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
            <div style={{ background: C.cream, borderRadius: "14px", padding: "18px", border: `1px solid ${C.borderLight}`, textAlign: "left" }}>
              <div style={{ fontSize: "11px", color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>BMI</div>
              <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: "24px", color: C.saffron, marginTop: "4px" }}>{b || "--"}</div>
              <div style={{ fontSize: "11px", color: C.textMuted, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{cat}</div>
            </div>
            <div style={{ background: C.cream, borderRadius: "14px", padding: "18px", border: `1px solid ${C.borderLight}`, textAlign: "left" }}>
              <div style={{ fontSize: "11px", color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>To lose</div>
              <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: "24px", color: C.saffron, marginTop: "4px" }}>{tl ? `${tl} kg` : "--"}</div>
              <div style={{ fontSize: "11px", color: C.textMuted, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>to reach goal</div>
            </div>
          </div>

          {/* Projected timeline */}
          {tl && tlNum > 0 && (
            <div style={{
              background: C.greenLight, border: `1px solid ${C.green}20`, borderRadius: "14px",
              padding: "14px 18px", marginBottom: "12px", textAlign: "left",
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <CalendarIcon />
              <div>
                <div style={{ fontSize: "13px", color: C.charcoal, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Projected timeline
                </div>
                <div style={{ fontSize: "12px", color: C.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "2px" }}>
                  Based on clinical data, you could reach your goal in {weeks} weeks
                </div>
              </div>
            </div>
          )}

          {/* Recommended package */}
          <div style={{
            background: C.saffronLight, border: `1px solid rgba(232,145,58,0.3)`,
            borderRadius: "16px", padding: "20px", marginBottom: "8px", textAlign: "left",
          }}>
            <div style={{ fontSize: "11px", color: C.saffron, fontWeight: 800, letterSpacing: "1px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>RECOMMENDED</div>
            <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: "22px", color: C.charcoal, marginTop: "4px" }}>{rec.name}</div>
            <div style={{ fontSize: "13px", color: C.textSecondary, marginTop: "4px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {rec.priceDisplay} / {rec.duration}
            </div>
            <div style={{ fontSize: "12px", color: C.textMuted, marginTop: "6px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {rec.description}
            </div>
            {isExtended && (
              <div style={{
                marginTop: "10px", padding: "8px 12px", borderRadius: "8px",
                background: C.white, border: `1px solid ${C.borderLight}`,
                fontSize: "12px", color: C.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                For 20+ kg goals, we recommend an extended plan. Your doctor will tailor the duration during your consultation.
              </div>
            )}
          </div>

          {/* Package features */}
          <div style={{ textAlign: "left", marginBottom: "24px", padding: "0 4px" }}>
            {rec.features.slice(0, 4).map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0" }}>
                <div style={{ width: 16, height: 16, flexShrink: 0 }}>
                  <CheckIcon size={16} color={C.green} />
                </div>
                <span style={{ fontSize: "13px", color: C.textSecondary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{f}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <a
            href={`/checkout?package=${rec.id}`}
            style={{ ...btnPrimary, textDecoration: "none", marginBottom: "10px" } as any}
          >
            Get Your Package
            <ArrowRightIcon />
          </a>
          <a
            href="/booking"
            style={{ ...btnSecondary, textDecoration: "none" } as any}
          >
            <CalendarIcon />
            Book a Free Consultation First
          </a>
          <button
            onClick={onClose}
            style={{
              marginTop: "10px", background: "none", border: "none",
              color: C.textMuted, fontSize: "13px", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
              padding: "8px",
            }}
          >
            I'll decide later
          </button>
        </div>
      </div>
    );
  }

  /* ---------- RENDER: Contact info step ---------- */
  if (showContactStep) {
    const canSubmit = contactName.trim() && contactPhone.trim();

    return (
      <div style={modalBg}>
        <div style={modalCard}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
            <CloseIcon />
          </button>

          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ flex: 1, height: 4, background: C.cream, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 4, background: C.saffron, width: "100%", transition: "width 0.4s ease" }} />
            </div>
            <span style={{ fontSize: "12px", color: C.textMuted, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{totalWithContact}/{totalWithContact}</span>
          </div>

          <h3 style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "22px", color: C.charcoal, marginBottom: "6px", lineHeight: 1.3 }}>
            Almost there! How can we reach you?
          </h3>
          <p style={{ fontSize: "14px", color: C.textMuted, marginBottom: "24px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Your doctor will use this to share your personalised plan
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Full Name */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <UserIcon />
              </div>
              <input
                type="text"
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                placeholder="Full name"
                autoFocus
                style={{ ...inputStyle, paddingLeft: "44px" }}
              />
            </div>

            {/* Phone */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <PhoneIcon />
              </div>
              <input
                type="tel"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
                placeholder="+91 98765 43210"
                style={{ ...inputStyle, paddingLeft: "44px" }}
              />
            </div>

            {/* Email */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <MailIcon />
              </div>
              <input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                placeholder="Email (optional)"
                style={{ ...inputStyle, paddingLeft: "44px" }}
              />
            </div>

            {/* WhatsApp opt-in */}
            <label style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "14px 16px", borderRadius: "14px",
              background: whatsappOptin ? C.greenLight : C.cream,
              border: `1.5px solid ${whatsappOptin ? `${C.green}40` : C.borderLight}`,
              cursor: "pointer", transition: "all 0.2s ease",
            }}>
              <div
                onClick={(e) => { e.preventDefault(); setWhatsappOptin(!whatsappOptin); }}
                style={{
                  width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                  border: `2px solid ${whatsappOptin ? C.green : C.textMuted}`,
                  background: whatsappOptin ? C.green : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
              >
                {whatsappOptin && <CheckIcon size={14} color={C.white} />}
              </div>
              <span style={{ fontSize: "14px", color: C.charcoal, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}>
                Send me updates on WhatsApp
              </span>
            </label>
          </div>

          <button
            onClick={handleContactSubmit}
            disabled={!canSubmit || loading}
            style={{
              ...btnPrimary,
              marginTop: "20px",
              opacity: canSubmit && !loading ? 1 : 0.4,
              cursor: canSubmit && !loading ? "pointer" : "default",
            } as any}
          >
            {loading ? "Saving..." : "See My Results"}
            {!loading && <ArrowRightIcon />}
          </button>

          <button
            onClick={() => setShowContactStep(false)}
            style={{
              marginTop: "12px", background: "none", border: "none",
              color: C.textMuted, fontSize: "13px", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            <ArrowLeftIcon />
            Back
          </button>
        </div>
      </div>
    );
  }

  /* ---------- RENDER: Quiz questions ---------- */
  return (
    <div style={modalBg}>
      <div style={modalCard}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
          <CloseIcon />
        </button>

        {/* Progress bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
          <div style={{ flex: 1, height: 4, background: C.cream, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 4, background: C.saffron, width: `${((step + 1) / totalWithContact) * 100}%`, transition: "width 0.4s ease" }} />
          </div>
          <span style={{ fontSize: "12px", color: C.textMuted, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{step + 1}/{totalWithContact}</span>
        </div>

        <div key={step}>
          <h3 style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: "22px", color: C.charcoal, marginBottom: "6px", lineHeight: 1.3 }}>{q.question}</h3>
          <p style={{ fontSize: "14px", color: C.textMuted, marginBottom: "24px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{q.subtitle}</p>

          {q.type === "choice" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {q.options?.map((o, i) => (
                <button key={i} onClick={() => handleChoice(o.value)} style={optBtn((answers as any)[q.id] === o.value) as any}>
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
                    ...inputStyle,
                    fontSize: "18px",
                  }}
                />
                <span style={{
                  display: "flex", alignItems: "center", padding: "0 16px",
                  background: C.cream, borderRadius: "14px",
                  border: `1.5px solid ${C.borderLight}`, color: C.textMuted,
                  fontSize: "14px", fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  {q.unit}
                </span>
              </div>
              <button
                onClick={handleInput}
                style={{ ...btnPrimary, marginTop: "14px", opacity: inputVal.trim() ? 1 : 0.4 } as any}
              >
                Continue
                <ArrowRightIcon />
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
                        width: 20, height: 20, borderRadius: 6,
                        border: `2px solid ${sel ? C.saffron : C.textMuted}`,
                        background: sel ? C.saffron : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        {sel && <CheckIcon size={12} color={C.white} />}
                      </div>
                      {o.label}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={handleMulti}
                style={{ ...btnPrimary, marginTop: "14px", opacity: multiSelect.length ? 1 : 0.4 } as any}
              >
                Continue
                <ArrowRightIcon />
              </button>
            </div>
          )}
        </div>

        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{
              marginTop: "16px", background: "none", border: "none",
              color: C.textMuted, fontSize: "13px", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            <ArrowLeftIcon />
            Back
          </button>
        )}
      </div>
    </div>
  );
}
