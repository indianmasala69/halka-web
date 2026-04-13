'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';
import { doctors } from '@/lib/doctors';
import Link from 'next/link';

// ─── SVG Icons ──────────────────────────────────────────────
function PillIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 1.5l-8 8a4.95 4.95 0 007 7l8-8a4.95 4.95 0 00-7-7z" />
      <path d="M6.5 10.5L13.5 3.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function ForkKnifeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CheckCircleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

// ─── Mock Data ──────────────────────────────────────────────
const prescribingDoctor = doctors[0]; // Dr. Anand Sharma
const prescriptionDate = 'April 10, 2026';
const followUpDate = 'May 8, 2026';

const doseSchedule = [
  { weeks: 'Weeks 1-4', dose: '0.25mg', label: 'Starting dose' },
  { weeks: 'Weeks 5-8', dose: '0.5mg', label: '' },
  { weeks: 'Weeks 9-12', dose: '1.0mg', label: '' },
  { weeks: 'Weeks 13-16', dose: '1.7mg', label: 'Maintenance' },
];

const mealPlan = [
  { meal: 'Breakfast', items: 'Moong dal chilla (2 pcs) with mint chutney + 1 boiled egg + green tea', kcal: '310 kcal' },
  { meal: 'Lunch', items: '1 roti + lauki sabzi + dal tadka + cucumber raita + small salad', kcal: '450 kcal' },
  { meal: 'Snack', items: 'Roasted makhana (1 cup) + buttermilk (chaas)', kcal: '140 kcal' },
  { meal: 'Dinner', items: 'Curd rice + palak dal + sauteed mixed vegetables', kcal: '400 kcal' },
];

const nextSteps = [
  { text: 'Receive medication delivery', detail: '3-5 business days', done: false },
  { text: 'Start medication', detail: 'Follow dose escalation schedule', done: false },
  { text: 'First check-in with coach', detail: 'Week 1', done: false },
  { text: 'Follow-up with doctor', detail: 'Week 4', done: false },
  { text: 'Blood work panel', detail: 'Week 8', done: false },
];

// ─── Styles ─────────────────────────────────────────────────
const sCard: React.CSSProperties = {
  background: C.white,
  borderRadius: 14,
  border: `1px solid ${C.borderLight}`,
  boxShadow: C.shadowSm,
  padding: '28px 24px',
  marginBottom: 20,
};

const sCardTitle: React.CSSProperties = {
  fontFamily: "'Outfit'",
  fontWeight: 700,
  fontSize: 19,
  color: C.textPrimary,
  marginBottom: 18,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
};

const sLabel: React.CSSProperties = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 12,
  fontWeight: 600,
  color: C.textMuted,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  marginBottom: 4,
};

const sValue: React.CSSProperties = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 15,
  fontWeight: 600,
  color: C.textPrimary,
  marginBottom: 14,
};

const sBtnPrimary: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '13px 24px',
  background: C.saffron,
  color: C.textInverse,
  fontFamily: "'Outfit'",
  fontWeight: 600,
  fontSize: 15,
  borderRadius: 10,
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background 0.2s',
};

const sBtnOutline: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '13px 24px',
  background: 'transparent',
  color: C.textPrimary,
  fontFamily: "'Outfit'",
  fontWeight: 600,
  fontSize: 15,
  borderRadius: 10,
  border: `1.5px solid ${C.border}`,
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all 0.2s',
};

const sBtnGreen: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '13px 24px',
  background: C.green,
  color: C.textInverse,
  fontFamily: "'Outfit'",
  fontWeight: 600,
  fontSize: 15,
  borderRadius: 10,
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background 0.2s',
};

// ─── Page Component ─────────────────────────────────────────
export default function PrescriptionPage() {
  return (
    <div style={{ minHeight: '100vh', background: C.bgPrimary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @media (max-width: 640px) {
          .rx-actions-row { flex-direction: column !important; }
          .rx-actions-row > * { width: 100% !important; text-align: center; justify-content: center; }
          .rx-care-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{
        background: C.white,
        borderBottom: `1px solid ${C.borderLight}`,
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky' as const,
        top: 0,
        zIndex: 50,
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
          <span style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: 22, color: C.charcoal, letterSpacing: '-0.5px' }}>halka</span>
          <span style={{ fontFamily: "'Noto Sans Devanagari'", fontWeight: 600, fontSize: 12, color: C.saffron }}>हल्का</span>
        </a>
        <Link href="/dashboard" style={{ color: C.textSecondary, textDecoration: 'none', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
          <ChartIcon /> Dashboard
        </Link>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px 80px' }}>

        {/* Back link */}
        <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: C.textSecondary, textDecoration: 'none', fontSize: 14, fontWeight: 500, marginBottom: 24 }}>
          <ArrowLeftIcon /> Back to Dashboard
        </Link>

        {/* ───── Header ───── */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontFamily: "'Outfit'",
            fontWeight: 800,
            fontSize: 30,
            color: C.textPrimary,
            letterSpacing: '-0.5px',
            marginBottom: 6,
          }}>
            Your Treatment Plan
          </h1>
          <p style={{ fontSize: 15, color: C.textSecondary, margin: 0 }}>
            Prescribed by <span style={{ fontWeight: 700, color: C.textPrimary }}>{prescribingDoctor.name}</span> on {prescriptionDate}
          </p>
        </div>

        {/* ───── 1. Prescription Card ───── */}
        <div style={{ ...sCard, borderLeft: `4px solid ${C.green}` }}>
          <div style={sCardTitle}>
            <span style={{ color: C.green }}><PillIcon /></span>
            Prescription Details
          </div>

          <div style={sLabel}>Medication</div>
          <div style={{ ...sValue, fontSize: 17 }}>Semaglutide (GLP-1 Receptor Agonist)</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
            <div>
              <div style={sLabel}>Dosage</div>
              <div style={sValue}>0.25mg weekly injection</div>
            </div>
            <div>
              <div style={sLabel}>Duration</div>
              <div style={sValue}>16 weeks -- dose escalation</div>
            </div>
          </div>

          {/* Dose schedule table */}
          <div style={sLabel}>Dose Escalation Schedule</div>
          <div style={{
            borderRadius: 10,
            border: `1px solid ${C.borderLight}`,
            overflow: 'hidden',
            marginBottom: 20,
            marginTop: 6,
          }}>
            {doseSchedule.map((row, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                padding: '11px 16px',
                fontSize: 14,
                fontWeight: i === 0 ? 600 : 500,
                color: i === 0 ? C.textMuted : C.textPrimary,
                background: i === 0 ? C.bgPrimary : i % 2 === 0 ? C.white : C.bgPrimary,
                borderBottom: i < doseSchedule.length - 1 ? `1px solid ${C.borderLight}` : 'none',
                ...(i === 0 ? { textTransform: 'uppercase' as const, fontSize: 11, letterSpacing: '0.5px' } : {}),
              }}>
                {i === 0 ? (
                  <>
                    <span>Period</span>
                    <span>Dose</span>
                    <span>Note</span>
                  </>
                ) : (
                  <>
                    <span>{row.weeks}</span>
                    <span style={{ fontWeight: 700, color: C.green }}>{row.dose}</span>
                    <span style={{ color: row.label ? C.saffron : C.textMuted, fontWeight: row.label ? 600 : 400, fontSize: 13 }}>{row.label || '--'}</span>
                  </>
                )}
              </div>
            ))}
            {/* Header row rendered as first item in map above */}
          </div>

          {/* Delivery info */}
          <div style={{
            background: C.greenLight,
            borderRadius: 10,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <span style={{ color: C.green }}><TruckIcon /></span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.greenDark }}>
                Your medication will be delivered within 3-5 business days
              </div>
              <div style={{ fontSize: 13, color: C.green, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                <ClockIcon /> Preparing your order
              </div>
            </div>
          </div>
        </div>

        {/* ───── 2. Diet Plan Summary ───── */}
        <div style={sCard}>
          <div style={sCardTitle}>
            <span style={{ color: C.saffron }}><ForkKnifeIcon /></span>
            Your Personalized Diet Plan
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div style={{ background: C.saffronLight, borderRadius: 10, padding: '14px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: 4 }}>Daily Target</div>
              <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 22, color: C.saffron }}>1,600</div>
              <div style={{ fontSize: 12, color: C.textSecondary }}>kcal/day</div>
            </div>
            <div style={{ background: C.greenLight, borderRadius: 10, padding: '14px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: 4 }}>Protein</div>
              <div style={{ fontFamily: "'Outfit'", fontWeight: 800, fontSize: 22, color: C.green }}>30%</div>
              <div style={{ fontSize: 12, color: C.textSecondary }}>120g/day</div>
            </div>
            <div style={{ background: C.bgPrimary, borderRadius: 10, padding: '14px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: 4 }}>Macros</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, lineHeight: 1.6 }}>
                Carbs 45%<br />Fat 25%
              </div>
            </div>
          </div>

          {/* Sample meal plan */}
          <div style={sLabel}>Sample Day Meal Plan</div>
          <div style={{ marginTop: 6 }}>
            {mealPlan.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '12px 0',
                borderBottom: i < mealPlan.length - 1 ? `1px solid ${C.borderLight}` : 'none',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.saffron, marginBottom: 2 }}>{m.meal}</div>
                  <div style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.5 }}>{m.items}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, whiteSpace: 'nowrap', marginLeft: 16, paddingTop: 2 }}>{m.kcal}</div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', borderTop: `1.5px solid ${C.border}` }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary }}>Total</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.green }}>1,300 kcal</span>
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>Remaining 300 kcal for beverages, fruits, and flexibility</div>
          </div>

          <button
            onClick={() => alert('Full diet plan PDF will be available for download soon.')}
            style={{ ...sBtnOutline, marginTop: 20, width: '100%', justifyContent: 'center' }}
          >
            <DownloadIcon /> Download Full Diet Plan
          </button>
        </div>

        {/* ───── 3. Important Instructions ───── */}
        <div style={{ ...sCard, borderLeft: `4px solid ${C.warning}` }}>
          <div style={sCardTitle}>
            <span style={{ color: C.warning }}><AlertIcon /></span>
            Important Instructions
          </div>

          {/* When to take */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ ...sLabel, marginBottom: 8 }}>When to Take Your Medication</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: C.textSecondary, lineHeight: 1.8 }}>
              <li>Inject once weekly, on the same day each week</li>
              <li>Take in the morning on an empty stomach</li>
              <li>Rotate injection sites: abdomen, thigh, or upper arm</li>
              <li>Store in refrigerator at 2-8 degrees Celsius</li>
            </ul>
          </div>

          {/* Common side effects */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ ...sLabel, marginBottom: 8 }}>Common Side Effects (Normal)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Mild nausea', 'Reduced appetite', 'Bloating', 'Fatigue', 'Mild headache'].map((s) => (
                <span key={s} style={{
                  background: C.bgPrimary,
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: 13,
                  color: C.textSecondary,
                  fontWeight: 500,
                  border: `1px solid ${C.borderLight}`,
                }}>
                  {s}
                </span>
              ))}
            </div>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 8 }}>
              These usually resolve within 2-4 weeks as your body adjusts.
            </div>
          </div>

          {/* When to contact doctor */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ ...sLabel, marginBottom: 8, color: C.error }}>Contact Your Doctor Immediately If</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: C.textPrimary, lineHeight: 1.8, fontWeight: 500 }}>
              <li>Severe or persistent vomiting</li>
              <li>Sharp or worsening abdominal pain</li>
              <li>Signs of pancreatitis (intense stomach pain radiating to back)</li>
              <li>Allergic reaction (rash, swelling, difficulty breathing)</li>
              <li>Rapid heart rate or dizziness</li>
            </ul>
          </div>

          {/* Emergency contact */}
          <div style={{
            background: '#FEF2F2',
            borderRadius: 10,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <span style={{ color: C.error }}><PhoneIcon /></span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.error }}>Emergency Helpline</div>
              <div style={{ fontSize: 14, color: C.textSecondary }}>Call <span style={{ fontWeight: 700 }}>+91 800-HALKA-01</span> (24/7)</div>
            </div>
          </div>
        </div>

        {/* ───── 4. Your Care Team ───── */}
        <div style={sCard}>
          <div style={sCardTitle}>
            <span style={{ color: C.navy }}><UserIcon /></span>
            Your Care Team
          </div>

          <div className="rx-care-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Doctor card */}
            <div style={{
              border: `1px solid ${C.borderLight}`,
              borderRadius: 12,
              padding: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img
                  src={prescribingDoctor.photo}
                  alt={prescribingDoctor.name}
                  style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${C.greenLight}` }}
                />
                <div>
                  <div style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: 15, color: C.textPrimary }}>{prescribingDoctor.name}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{prescribingDoctor.credentials}</div>
                </div>
              </div>
              <div style={{
                background: C.bgPrimary,
                borderRadius: 8,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: C.textSecondary,
              }}>
                <span style={{ color: C.green }}><CalendarIcon /></span>
                Next follow-up: <span style={{ fontWeight: 700, color: C.textPrimary }}>{followUpDate}</span>
              </div>
            </div>

            {/* Coach card */}
            <div style={{
              border: `1px solid ${C.borderLight}`,
              borderRadius: 12,
              padding: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: C.saffronLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.saffron} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.8 2.3A.3.3 0 105.1 2H5a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-.1a.2.2 0 10.3.3" />
                    <path d="M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4" />
                    <circle cx="20" cy="10" r="2" />
                    <path d="M12 15v7" />
                    <path d="M9 22h6" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'Outfit'", fontWeight: 700, fontSize: 15, color: C.textPrimary }}>Your Health Coach</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>Assigned upon onboarding</div>
                </div>
              </div>
              <button
                onClick={() => alert('WhatsApp chat with your coach will open here.')}
                style={{
                  ...sBtnGreen,
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: 13,
                  padding: '10px 16px',
                }}
              >
                <MessageIcon /> WhatsApp Your Coach
              </button>
            </div>
          </div>
        </div>

        {/* ───── 5. Next Steps ───── */}
        <div style={sCard}>
          <div style={sCardTitle}>
            <span style={{ color: C.green }}><CheckCircleIcon size={22} /></span>
            Next Steps
          </div>

          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: 13,
              top: 8,
              bottom: 8,
              width: 2,
              background: C.borderLight,
              borderRadius: 1,
            }} />

            {nextSteps.map((step, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                padding: '12px 0',
                position: 'relative',
              }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: step.done ? C.green : C.white,
                  border: `2px solid ${step.done ? C.green : C.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  zIndex: 1,
                }}>
                  {step.done ? (
                    <span style={{ color: C.white }}><CheckCircleIcon size={14} /></span>
                  ) : (
                    <span style={{
                      fontFamily: "'Outfit'",
                      fontSize: 12,
                      fontWeight: 700,
                      color: C.textMuted,
                    }}>{i + 1}</span>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary, marginBottom: 2 }}>{step.text}</div>
                  <div style={{ fontSize: 13, color: C.textMuted }}>{step.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ───── 6. Action Buttons ───── */}
        <div className="rx-actions-row" style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          marginTop: 8,
        }}>
          <Link href="/dashboard" style={{ ...sBtnPrimary, flex: 1, justifyContent: 'center', textAlign: 'center' }}>
            <ChartIcon /> Track Your Medication
          </Link>
          <Link href="/coach" style={{ ...sBtnGreen, flex: 1, justifyContent: 'center', textAlign: 'center' }}>
            <MessageIcon /> Chat with AI Coach
          </Link>
          <button
            onClick={() => alert('Prescription PDF download will be available soon.')}
            style={{ ...sBtnOutline, flex: 1, justifyContent: 'center' }}
          >
            <DownloadIcon /> Download Prescription PDF
          </button>
        </div>

      </div>
    </div>
  );
}
