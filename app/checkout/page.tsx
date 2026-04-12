'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { COLOR_SYSTEM as C } from '@/lib/colors';
import { packages } from '@/lib/packages';

/* ───────── Indian States ───────── */
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

const CONDITIONS = ['Diabetes', 'Thyroid', 'PCOS', 'Heart disease', 'None'];

/* ───────── SVG Icons ───────── */
function CheckIcon({ size = 18, color = C.green }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.saffron} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

/* ───────── Shared Styles ───────── */
const labelStyle: React.CSSProperties = {
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  fontSize: 13,
  fontWeight: 600,
  color: C.textPrimary,
  marginBottom: 6,
  display: 'block',
};

const inputStyle: React.CSSProperties = {
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  fontSize: 15,
  color: C.textPrimary,
  border: `1.5px solid ${C.border}`,
  borderRadius: 10,
  padding: '12px 14px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  background: C.white,
};

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: 18,
  fontWeight: 700,
  color: C.textPrimary,
  margin: '0 0 20px 0',
  paddingBottom: 12,
  borderBottom: `1px solid ${C.borderLight}`,
};

/* ═══════════════════════════════════════════ */
/*            CHECKOUT CONTENT                */
/* ═══════════════════════════════════════════ */
function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const packageId = searchParams.get('package');

  const selectedPackage = useMemo(
    () => packages.find((p) => p.id === packageId) ?? null,
    [packageId],
  );

  /* ─── Form State ─── */
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
    currentWeight: '',
    targetWeight: '',
    conditions: [] as string[],
    medications: '',
    address1: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleCondition = (condition: string) => {
    setForm((prev) => {
      if (condition === 'None') {
        return { ...prev, conditions: prev.conditions.includes('None') ? [] : ['None'] };
      }
      const without = prev.conditions.filter((c) => c !== 'None');
      return {
        ...prev,
        conditions: without.includes(condition)
          ? without.filter((c) => c !== condition)
          : [...without, condition],
      };
    });
  };

  const emiPerMonth = selectedPackage ? Math.ceil(selectedPackage.price / 3) : 0;

  /* ─── Handle Submit ─── */
  const handleSubmit = async () => {
    if (!selectedPackage) return;

    // Basic validation
    if (!form.fullName || !form.phone || !form.age || !form.gender) {
      alert('Please fill in all required personal information fields.');
      return;
    }
    if (!form.address1 || !form.city || !form.state || !form.pincode) {
      alert('Please fill in all required delivery address fields.');
      return;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      alert('Please enter a valid 6-digit PIN code.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/checkout/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package_id: selectedPackage.id,
          full_name: form.fullName,
          phone: '+91' + form.phone.replace(/^(\+91|91)/, ''),
          email: form.email || null,
          age: parseInt(form.age, 10),
          gender: form.gender,
          current_weight: form.currentWeight ? parseFloat(form.currentWeight) : null,
          target_weight: form.targetWeight ? parseFloat(form.targetWeight) : null,
          conditions: form.conditions,
          medications: form.medications || null,
          address_line1: form.address1,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          package_name: selectedPackage.name,
          package_price: selectedPackage.price,
        }),
      });
      await res.json();
      alert('Razorpay integration coming soon! Our team will contact you to complete your order.');
    } catch {
      alert('Razorpay integration coming soon! Our team will contact you to complete your order.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── Package Not Found ─── */
  if (!selectedPackage) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: C.bgPrimary,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 420, padding: 32 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: C.saffronLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.saffron} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 24,
              fontWeight: 800,
              color: C.textPrimary,
              margin: '0 0 8px',
            }}
          >
            Package not found
          </h2>
          <p style={{ fontSize: 15, color: C.textSecondary, margin: '0 0 24px', lineHeight: 1.6 }}>
            The package you are looking for does not exist or the link may be incorrect.
          </p>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 28px',
              background: C.saffron,
              color: C.white,
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  /* ─── Focused input style helper ─── */
  const getInputStyle = (field: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focusedField === field ? C.saffron : C.border,
    boxShadow: focusedField === field ? `0 0 0 3px ${C.saffronLight}` : 'none',
  });

  /* ═══════════════════════════════════════════ */
  /*                   RENDER                   */
  /* ═══════════════════════════════════════════ */
  return (
    <div
      style={{
        minHeight: '100vh',
        background: C.bgPrimary,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}
    >
      {/* ─── Sticky Nav ─── */}
      <div
        style={{
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          padding: '16px 20px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              color: C.saffron,
            }}
          >
            <ArrowLeftIcon />
            Back
          </button>
          <span
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 22,
              fontWeight: 800,
              color: C.textPrimary,
              letterSpacing: '-0.02em',
            }}
          >
            halka
          </span>
          <div style={{ width: 60 }} /> {/* spacer for centering */}
        </div>
      </div>

      {/* ─── Page Title ─── */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 20px 0' }}>
        <h1
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 28,
            fontWeight: 800,
            color: C.textPrimary,
            margin: '0 0 4px',
          }}
        >
          Checkout
        </h1>
        <p style={{ fontSize: 15, color: C.textSecondary, margin: '0 0 32px' }}>
          Complete your details to start your weight loss journey
        </p>
      </div>

      {/* ─── Two Column Layout ─── */}
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '0 20px 60px',
          display: 'flex',
          gap: 32,
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* ═══ LEFT COLUMN: FORM ═══ */}
        <div style={{ flex: '1 1 580px', minWidth: 0 }}>

          {/* Section 1: Personal Info */}
          <div
            style={{
              background: C.white,
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: 28,
              marginBottom: 20,
              boxShadow: C.shadowSm,
            }}
          >
            <h3 style={sectionHeadingStyle}>Personal Information</h3>

            {/* Full Name */}
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>
                Full Name <span style={{ color: C.error }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                onFocus={() => setFocusedField('fullName')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('fullName')}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>
                Phone Number <span style={{ color: C.error }}>*</span>
              </label>
              <div style={{ display: 'flex', gap: 0 }}>
                <div
                  style={{
                    ...inputStyle,
                    width: 64,
                    borderRadius: '10px 0 0 10px',
                    borderRight: 'none',
                    background: C.bgPrimary,
                    color: C.textSecondary,
                    fontWeight: 600,
                    textAlign: 'center',
                    flexShrink: 0,
                    padding: '12px 8px',
                  }}
                >
                  +91
                </div>
                <input
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...getInputStyle('phone'),
                    borderRadius: '0 10px 10px 0',
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Email (optional)</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('email')}
              />
            </div>

            {/* Age + Gender row */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 120px', marginBottom: 18 }}>
                <label style={labelStyle}>
                  Age <span style={{ color: C.error }}>*</span>
                </label>
                <input
                  type="number"
                  placeholder="Age"
                  min={12}
                  max={100}
                  value={form.age}
                  onChange={(e) => update('age', e.target.value)}
                  onFocus={() => setFocusedField('age')}
                  onBlur={() => setFocusedField(null)}
                  style={getInputStyle('age')}
                />
              </div>
              <div style={{ flex: '1 1 180px', marginBottom: 18 }}>
                <label style={labelStyle}>
                  Gender <span style={{ color: C.error }}>*</span>
                </label>
                <select
                  value={form.gender}
                  onChange={(e) => update('gender', e.target.value)}
                  onFocus={() => setFocusedField('gender')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...getInputStyle('gender'),
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234A5568' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    paddingRight: 36,
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Health Info */}
          <div
            style={{
              background: C.white,
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: 28,
              marginBottom: 20,
              boxShadow: C.shadowSm,
            }}
          >
            <h3 style={sectionHeadingStyle}>Health Information</h3>

            {/* Weight row */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 160px', marginBottom: 18 }}>
                <label style={labelStyle}>Current Weight (kg)</label>
                <input
                  type="number"
                  placeholder="e.g. 85"
                  min={30}
                  max={250}
                  value={form.currentWeight}
                  onChange={(e) => update('currentWeight', e.target.value)}
                  onFocus={() => setFocusedField('currentWeight')}
                  onBlur={() => setFocusedField(null)}
                  style={getInputStyle('currentWeight')}
                />
              </div>
              <div style={{ flex: '1 1 160px', marginBottom: 18 }}>
                <label style={labelStyle}>Target Weight (kg)</label>
                <input
                  type="number"
                  placeholder="e.g. 70"
                  min={30}
                  max={200}
                  value={form.targetWeight}
                  onChange={(e) => update('targetWeight', e.target.value)}
                  onFocus={() => setFocusedField('targetWeight')}
                  onBlur={() => setFocusedField(null)}
                  style={getInputStyle('targetWeight')}
                />
              </div>
            </div>

            {/* Conditions */}
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Any Existing Conditions</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {CONDITIONS.map((cond) => {
                  const checked = form.conditions.includes(cond);
                  return (
                    <label
                      key={cond}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 16px',
                        borderRadius: 10,
                        border: `1.5px solid ${checked ? C.saffron : C.border}`,
                        background: checked ? C.saffronLight : C.white,
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: checked ? 600 : 400,
                        color: checked ? C.saffronDark : C.textSecondary,
                        transition: 'all 0.2s ease',
                        userSelect: 'none',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCondition(cond)}
                        style={{ display: 'none' }}
                      />
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 4,
                          border: `2px solid ${checked ? C.saffron : C.border}`,
                          background: checked ? C.saffron : C.white,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          flexShrink: 0,
                        }}
                      >
                        {checked && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      {cond}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Medications */}
            <div>
              <label style={labelStyle}>Current Medications (optional)</label>
              <textarea
                placeholder="List any medications you are currently taking..."
                value={form.medications}
                onChange={(e) => update('medications', e.target.value)}
                onFocus={() => setFocusedField('medications')}
                onBlur={() => setFocusedField(null)}
                rows={3}
                style={{
                  ...getInputStyle('medications'),
                  resize: 'vertical',
                  minHeight: 80,
                }}
              />
            </div>
          </div>

          {/* Section 3: Delivery Address */}
          <div
            style={{
              background: C.white,
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: 28,
              marginBottom: 28,
              boxShadow: C.shadowSm,
            }}
          >
            <h3 style={sectionHeadingStyle}>Delivery Address</h3>

            {/* Address Line 1 */}
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>
                Address Line 1 <span style={{ color: C.error }}>*</span>
              </label>
              <input
                type="text"
                placeholder="House/Flat No., Street, Locality"
                value={form.address1}
                onChange={(e) => update('address1', e.target.value)}
                onFocus={() => setFocusedField('address1')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('address1')}
              />
            </div>

            {/* City + State row */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 180px', marginBottom: 18 }}>
                <label style={labelStyle}>
                  City <span style={{ color: C.error }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter city"
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  onFocus={() => setFocusedField('city')}
                  onBlur={() => setFocusedField(null)}
                  style={getInputStyle('city')}
                />
              </div>
              <div style={{ flex: '1 1 200px', marginBottom: 18 }}>
                <label style={labelStyle}>
                  State <span style={{ color: C.error }}>*</span>
                </label>
                <select
                  value={form.state}
                  onChange={(e) => update('state', e.target.value)}
                  onFocus={() => setFocusedField('state')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...getInputStyle('state'),
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234A5568' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    paddingRight: 36,
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* PIN Code */}
            <div style={{ maxWidth: 200 }}>
              <label style={labelStyle}>
                PIN Code <span style={{ color: C.error }}>*</span>
              </label>
              <input
                type="text"
                placeholder="6-digit PIN"
                maxLength={6}
                value={form.pincode}
                onChange={(e) => update('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                onFocus={() => setFocusedField('pincode')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('pincode')}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              width: '100%',
              padding: '16px 32px',
              background: submitting ? C.textMuted : C.saffron,
              color: C.white,
              border: 'none',
              borderRadius: 12,
              fontFamily: 'Outfit, sans-serif',
              fontSize: 17,
              fontWeight: 700,
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: submitting ? 'none' : `0 4px 16px rgba(255, 107, 44, 0.3)`,
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              if (!submitting) (e.currentTarget.style.background = C.saffronHover);
            }}
            onMouseLeave={(e) => {
              if (!submitting) (e.currentTarget.style.background = C.saffron);
            }}
          >
            {submitting ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>

        {/* ═══ RIGHT COLUMN: ORDER SUMMARY ═══ */}
        <div style={{ flex: '0 0 380px', minWidth: 0, maxWidth: '100%' }}>
          <div
            style={{
              position: 'sticky',
              top: 80,
              background: C.white,
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: 28,
              boxShadow: C.shadowMd,
            }}
          >
            {/* Package Header */}
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: 6,
                  background: C.saffronLight,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: 12,
                  fontWeight: 700,
                  color: C.saffron,
                  marginBottom: 10,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Order Summary
              </div>
              <h3
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 22,
                  fontWeight: 800,
                  color: C.textPrimary,
                  margin: '0 0 6px',
                }}
              >
                {selectedPackage.name}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: C.textSecondary,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {selectedPackage.description}
              </p>
            </div>

            {/* Duration */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 14px',
                background: C.bgPrimary,
                borderRadius: 10,
                marginBottom: 20,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.textSecondary }}>
                Duration: {selectedPackage.duration}
              </span>
            </div>

            {/* Features */}
            <div style={{ marginBottom: 20 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.textPrimary,
                  margin: '0 0 12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                What&apos;s Included
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {selectedPackage.features.map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ flexShrink: 0, marginTop: 1 }}>
                      <CheckIcon size={16} />
                    </div>
                    <span style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.4 }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: C.border, margin: '20px 0' }} />

            {/* Pricing */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: C.textSecondary }}>Subtotal</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>
                  {selectedPackage.priceDisplay}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: C.textSecondary }}>Delivery</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.green }}>FREE</span>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: C.border, margin: '16px 0' }} />

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary }}>Total</span>
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 26,
                  fontWeight: 800,
                  color: C.textPrimary,
                }}
              >
                {selectedPackage.priceDisplay}
              </span>
            </div>

            {/* EMI */}
            <div
              style={{
                padding: '10px 14px',
                background: C.greenLight,
                borderRadius: 8,
                marginBottom: 24,
              }}
            >
              <p style={{ fontSize: 13, color: C.greenDark, fontWeight: 600, margin: 0 }}>
                EMI available from{' '}
                <span style={{ fontWeight: 800 }}>
                  &#8377;{emiPerMonth.toLocaleString('en-IN')}/month
                </span>
              </p>
            </div>

            {/* Trust Signals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <LockIcon />
                <span style={{ fontSize: 13, color: C.textSecondary, fontWeight: 500 }}>
                  Secure checkout
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ShieldIcon />
                <span style={{ fontSize: 13, color: C.textSecondary, fontWeight: 500 }}>
                  Money-back guarantee
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <StarIcon />
                <span style={{ fontSize: 13, color: C.textSecondary, fontWeight: 500 }}>
                  Doctor-reviewed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*              DEFAULT EXPORT                */
/* ═══════════════════════════════════════════ */
export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#FAFAFA',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 600, color: '#1A1A2E' }}>
            Loading checkout...
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
