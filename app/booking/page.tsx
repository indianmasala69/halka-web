'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { COLOR_SYSTEM as C } from '@/lib/colors';

/* ───────── Doctor Data ───────── */
interface Doctor {
  id: string;
  name: string;
  initials: string;
  credential: string;
  hospital: string;
  experience: number;
  rating: number;
  reviews: number;
  specialties: string[];
  nextAvailable: string;
  gradientFrom: string;
  gradientTo: string;
}

const DOCTORS: Doctor[] = [
  {
    id: 'dr-sharma',
    name: 'Dr. Anand Sharma',
    initials: 'AS',
    credential: 'MD Internal Medicine',
    hospital: 'Apollo Hospital, Delhi',
    experience: 15,
    rating: 4.9,
    reviews: 230,
    specialties: ['GLP-1 therapy', 'Metabolic syndrome'],
    nextAvailable: 'Tomorrow, 10:00 AM',
    gradientFrom: '#1B2B4B',
    gradientTo: '#2D3F5E',
  },
  {
    id: 'dr-nair',
    name: 'Dr. Priya Nair',
    initials: 'PN',
    credential: 'MD Endocrinology',
    hospital: 'Manipal Hospital, Bangalore',
    experience: 12,
    rating: 4.8,
    reviews: 185,
    specialties: ['PCOS', 'Thyroid', 'Insulin resistance'],
    nextAvailable: 'Today, 4:30 PM',
    gradientFrom: '#0B7A4B',
    gradientTo: '#065C38',
  },
  {
    id: 'dr-patel',
    name: 'Dr. Meenakshi Iyer',
    initials: 'VP',
    credential: 'DNB Medicine',
    hospital: 'Kokilaben Hospital, Mumbai',
    experience: 18,
    rating: 4.9,
    reviews: 310,
    specialties: ['Obesity management', 'Diabetes'],
    nextAvailable: 'Tomorrow, 11:00 AM',
    gradientFrom: '#E55A1F',
    gradientTo: '#FF6B2C',
  },
];

/* ───────── Time Slots ───────── */
const ALL_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];

// Deterministic "unavailable" slots based on date
function getUnavailableSlots(dateStr: string): Set<string> {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) | 0;
  }
  const set = new Set<string>();
  ALL_SLOTS.forEach((slot, idx) => {
    if ((hash + idx * 7) % 5 === 0) set.add(slot);
  });
  return set;
}

/* ───────── Calendar Helpers ───────── */
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}
function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

/* ───────── Step Labels ───────── */
const STEP_LABELS = ['Choose Doctor', 'Select Date', 'Select Time', 'Confirm'];

/* ═══════════════════════════════════════════ */
/*                 COMPONENT                  */
/* ═══════════════════════════════════════════ */
export default function BookingPage() {
  const router = useRouter();
  const today = new Date();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [confirmed, setConfirmed] = useState(false);
  const [hoverSlot, setHoverSlot] = useState<string | null>(null);
  const [hoverDoctor, setHoverDoctor] = useState<string | null>(null);

  const unavailableSlots = useMemo(
    () => (selectedDate ? getUnavailableSlots(selectedDate) : new Set<string>()),
    [selectedDate],
  );

  /* Calendar grid */
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const canGoNext = () => {
    if (currentStep === 0) return !!selectedDoctor;
    if (currentStep === 1) return !!selectedDate;
    if (currentStep === 2) return !!selectedTime;
    return false;
  };

  const handleConfirm = () => setConfirmed(true);

  /* ─── Shared styles ─── */
  const sectionTitle: React.CSSProperties = {
    fontFamily: 'Outfit, sans-serif',
    fontSize: 20,
    fontWeight: 700,
    color: C.textPrimary,
    marginBottom: 4,
  };
  const sectionSub: React.CSSProperties = {
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    fontSize: 14,
    color: C.textSecondary,
    marginBottom: 20,
  };

  /* ═══════════════════════════════════════════ */
  /*              RENDER SECTIONS               */
  /* ═══════════════════════════════════════════ */

  /* ───── Step Indicator ───── */
  const renderSteps = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32 }}>
      {STEP_LABELS.map((label, i) => {
        const isActive = i === currentStep;
        const isDone = i < currentStep;
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? 1 : undefined }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 36 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 14,
                  fontWeight: 700,
                  background: isDone ? C.green : isActive ? C.saffron : C.borderLight,
                  color: isDone || isActive ? C.white : C.textMuted,
                  transition: 'all 0.3s ease',
                }}
              >
                {isDone ? '✓' : i + 1}
              </div>
              <span
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: 11,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? C.saffron : isDone ? C.green : C.textMuted,
                  marginTop: 4,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s ease',
                }}
              >
                {label}
              </span>
            </div>
            {i < 3 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: isDone ? C.green : C.borderLight,
                  marginLeft: 6,
                  marginRight: 6,
                  marginBottom: 18,
                  borderRadius: 1,
                  transition: 'background 0.3s ease',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  /* ───── Step 0: Choose Doctor ───── */
  const renderDoctorSelection = () => (
    <div>
      <h2 style={sectionTitle}>Choose Your Doctor</h2>
      <p style={sectionSub}>All our physicians are licensed and specialize in medical weight management.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {DOCTORS.map((doc) => {
          const isSelected = selectedDoctor?.id === doc.id;
          const isHovered = hoverDoctor === doc.id;
          return (
            <div
              key={doc.id}
              onClick={() => setSelectedDoctor(doc)}
              onMouseEnter={() => setHoverDoctor(doc.id)}
              onMouseLeave={() => setHoverDoctor(null)}
              style={{
                border: `2px solid ${isSelected ? C.saffron : isHovered ? C.saffronLight : C.border}`,
                borderRadius: 16,
                padding: 20,
                cursor: 'pointer',
                background: isSelected ? C.saffronLight : C.white,
                boxShadow: isSelected ? `0 0 0 1px ${C.saffron}` : isHovered ? C.shadowMd : C.shadowSm,
                transition: 'all 0.25s ease',
                position: 'relative',
              }}
            >
              {/* Radio indicator */}
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? C.saffron : C.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: C.saffron,
                    }}
                  />
                )}
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                {/* Avatar */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${doc.gradientFrom}, ${doc.gradientTo})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 18,
                    fontWeight: 700,
                    color: C.white,
                    flexShrink: 0,
                  }}
                >
                  {doc.initials}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 17, fontWeight: 700, color: C.textPrimary }}>
                    {doc.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontSize: 13,
                      color: C.textSecondary,
                      marginTop: 2,
                    }}
                  >
                    {doc.credential} &middot; {doc.experience} yrs exp
                  </div>
                  <div
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontSize: 13,
                      color: C.textMuted,
                      marginTop: 1,
                    }}
                  >
                    {doc.hospital}
                  </div>

                  {/* Rating */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      marginTop: 8,
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontSize: 13,
                      color: C.textSecondary,
                    }}
                  >
                    <span style={{ color: '#F59E0B' }}>★</span>
                    <span style={{ fontWeight: 600 }}>{doc.rating}</span>
                    <span style={{ color: C.textMuted }}>({doc.reviews} reviews)</span>
                  </div>

                  {/* Specialty pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                    {doc.specialties.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                          fontSize: 12,
                          fontWeight: 500,
                          padding: '4px 10px',
                          borderRadius: 20,
                          background: C.greenLight,
                          color: C.green,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Next available */}
                  <div
                    style={{
                      marginTop: 12,
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontSize: 13,
                      fontWeight: 600,
                      color: C.saffronDark,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.saffronDark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Next available: {doc.nextAvailable}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ───── Step 1: Calendar ───── */
  const renderDateSelection = () => {
    const canPrev = calYear > today.getFullYear() || calMonth > today.getMonth();
    return (
      <div>
        <h2 style={sectionTitle}>Select a Date</h2>
        <p style={sectionSub}>Choose your preferred consultation date. Available Monday through Saturday.</p>
        <div
          style={{
            background: C.white,
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            padding: 20,
            boxShadow: C.shadowSm,
          }}
        >
          {/* Month nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <button
              onClick={() => {
                if (canPrev) {
                  if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
                  else setCalMonth(calMonth - 1);
                }
              }}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: 'none',
                background: canPrev ? C.borderLight : 'transparent',
                cursor: canPrev ? 'pointer' : 'default',
                fontSize: 18,
                color: canPrev ? C.textPrimary : C.textMuted,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ‹
            </button>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 700, color: C.textPrimary }}>
              {MONTHS[calMonth]} {calYear}
            </span>
            <button
              onClick={() => {
                if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
                else setCalMonth(calMonth + 1);
              }}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: 'none',
                background: C.borderLight,
                cursor: 'pointer',
                fontSize: 18,
                color: C.textPrimary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ›
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 8 }}>
            {DAYS.map((d) => (
              <div
                key={d}
                style={{
                  textAlign: 'center',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: 12,
                  fontWeight: 600,
                  color: d === 'Sun' ? C.error : C.textMuted,
                  paddingBottom: 8,
                }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {/* Empty cells before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = toDateStr(calYear, calMonth, day);
              const dayOfWeek = new Date(calYear, calMonth, day).getDay();
              const isSunday = dayOfWeek === 0;
              const isPast = dateStr < todayStr;
              const isDisabled = isSunday || isPast;
              const isSelected = selectedDate === dateStr;
              const isToday = dateStr === todayStr;

              return (
                <button
                  key={day}
                  disabled={isDisabled}
                  onClick={() => {
                    setSelectedDate(dateStr);
                    setSelectedTime(null); // reset time when date changes
                  }}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    border: isToday && !isSelected ? `2px solid ${C.saffron}` : 'none',
                    borderRadius: 10,
                    background: isSelected ? C.saffron : 'transparent',
                    color: isSelected ? C.white : isDisabled ? C.textMuted : C.textPrimary,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: 14,
                    fontWeight: isSelected || isToday ? 700 : 500,
                    cursor: isDisabled ? 'default' : 'pointer',
                    opacity: isDisabled ? 0.4 : 1,
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  /* ───── Step 2: Time Slots ───── */
  const renderTimeSelection = () => (
    <div>
      <h2 style={sectionTitle}>Select a Time Slot</h2>
      <p style={sectionSub}>
        Available slots for {selectedDate ? formatDate(selectedDate) : ''}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
        }}
      >
        <style>{`@media(min-width:640px){.time-grid{grid-template-columns:repeat(4,1fr)!important}}`}</style>
        {ALL_SLOTS.map((slot) => {
          const isUnavailable = unavailableSlots.has(slot);
          const isSelected = selectedTime === slot;
          const isHovered = hoverSlot === slot;
          return (
            <button
              key={slot}
              className="time-grid"
              disabled={isUnavailable}
              onClick={() => setSelectedTime(slot)}
              onMouseEnter={() => setHoverSlot(slot)}
              onMouseLeave={() => setHoverSlot(null)}
              style={{
                padding: '14px 8px',
                borderRadius: 12,
                border: `2px solid ${isSelected ? C.saffron : isHovered && !isUnavailable ? C.saffronLight : C.border}`,
                background: isSelected
                  ? C.saffron
                  : isUnavailable
                  ? C.borderLight
                  : isHovered
                  ? C.saffronLight
                  : C.white,
                color: isSelected ? C.white : isUnavailable ? C.textMuted : C.textPrimary,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                cursor: isUnavailable ? 'default' : 'pointer',
                opacity: isUnavailable ? 0.5 : 1,
                transition: 'all 0.15s ease',
                textDecoration: isUnavailable ? 'line-through' : 'none',
              }}
            >
              {slot}
            </button>
          );
        })}
      </div>
      {/* Duration note */}
      <div
        style={{
          marginTop: 20,
          padding: '14px 16px',
          borderRadius: 12,
          background: C.greenLight,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: 13,
          color: C.green,
          fontWeight: 500,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 10l-4 4l-2-2" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        25-minute video consultation via Google Meet
      </div>
    </div>
  );

  /* ───── Step 3: Confirmation ───── */
  const renderConfirmation = () => {
    if (confirmed) {
      return (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: C.greenLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 style={{ ...sectionTitle, fontSize: 24, marginBottom: 8 }}>Booking Confirmed!</h2>
          <p style={{ ...sectionSub, maxWidth: 360, margin: '0 auto 24px' }}>
            Your consultation has been scheduled. You will receive a Google Meet link via email and WhatsApp shortly.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              padding: '14px 32px',
              borderRadius: 12,
              border: 'none',
              background: C.saffron,
              color: C.white,
              fontFamily: 'Outfit, sans-serif',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Back to Dashboard
          </button>
        </div>
      );
    }

    return (
      <div>
        <h2 style={sectionTitle}>Confirm Your Booking</h2>
        <p style={sectionSub}>Review the details below before confirming.</p>
        <div
          style={{
            background: C.white,
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            padding: 24,
            boxShadow: C.shadowMd,
          }}
        >
          {/* Doctor row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${selectedDoctor!.gradientFrom}, ${selectedDoctor!.gradientTo})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Outfit, sans-serif',
                fontSize: 16,
                fontWeight: 700,
                color: C.white,
                flexShrink: 0,
              }}
            >
              {selectedDoctor!.initials}
            </div>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 700, color: C.textPrimary }}>
                {selectedDoctor!.name}
              </div>
              <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: C.textSecondary }}>
                {selectedDoctor!.credential}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: C.borderLight, margin: '0 -24px', marginBottom: 20 }} />

          {/* Details rows */}
          {[
            { label: 'Date', value: selectedDate ? formatDate(selectedDate) : '' },
            { label: 'Time', value: selectedTime || '' },
            { label: 'Duration', value: '25 minutes' },
            { label: 'Type', value: 'Video consultation (Google Meet)' },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 14,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 14,
              }}
            >
              <span style={{ color: C.textMuted, fontWeight: 500 }}>{label}</span>
              <span style={{ color: C.textPrimary, fontWeight: 600, textAlign: 'right' }}>{value}</span>
            </div>
          ))}

          {/* Cost */}
          <div
            style={{
              marginTop: 8,
              padding: '14px 16px',
              borderRadius: 12,
              background: C.greenLight,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: C.green }}>Cost</span>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.green }}>FREE with your plan</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>₹499 for non-subscribers</div>
            </div>
          </div>
        </div>

        {/* Confirm button */}
        <button
          onClick={handleConfirm}
          style={{
            width: '100%',
            marginTop: 24,
            padding: '16px 24px',
            borderRadius: 14,
            border: 'none',
            background: C.saffron,
            color: C.white,
            fontFamily: 'Outfit, sans-serif',
            fontSize: 17,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: `0 4px 16px rgba(255, 107, 44, 0.3)`,
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseDown={(e) => ((e.currentTarget.style.transform = 'scale(0.98)'))}
          onMouseUp={(e) => ((e.currentTarget.style.transform = 'scale(1)'))}
        >
          Confirm Booking
        </button>

        {/* Note */}
        <p
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 13,
            color: C.textMuted,
          }}
        >
          You&apos;ll receive a Google Meet link via email and WhatsApp
        </p>
      </div>
    );
  };

  /* ═══════════════════════════════════════════ */
  /*                  RENDER                    */
  /* ═══════════════════════════════════════════ */
  const stepContent = [renderDoctorSelection, renderDateSelection, renderTimeSelection, renderConfirmation];

  return (
    <>
      {/* Responsive grid override for time slots */}
      <style>{`
        @media(min-width:640px) {
          .time-slot-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          background: C.bgPrimary,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}
      >
        {/* ─── Header ─── */}
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
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <button
              onClick={() => router.push('/dashboard')}
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
                marginBottom: 12,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.saffron} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Dashboard
            </button>
            <h1
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 24,
                fontWeight: 800,
                color: C.textPrimary,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Book Your Consultation
            </h1>
            <p
              style={{
                fontSize: 14,
                color: C.textSecondary,
                margin: '4px 0 0',
              }}
            >
              Schedule a video consultation with one of our licensed physicians
            </p>
          </div>
        </div>

        {/* ─── Body ─── */}
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 20px 120px' }}>
          {renderSteps()}
          {stepContent[currentStep]()}
        </div>

        {/* ─── Bottom Nav (steps 0–2) ─── */}
        {currentStep < 3 && !confirmed && (
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              background: C.white,
              borderTop: `1px solid ${C.border}`,
              padding: '16px 20px',
              paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
              zIndex: 50,
            }}
          >
            <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', gap: 12 }}>
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    borderRadius: 12,
                    border: `2px solid ${C.border}`,
                    background: C.white,
                    color: C.textPrimary,
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease',
                  }}
                >
                  Back
                </button>
              )}
              <button
                disabled={!canGoNext()}
                onClick={() => setCurrentStep(currentStep + 1)}
                style={{
                  flex: currentStep > 0 ? 2 : 1,
                  padding: '14px 20px',
                  borderRadius: 12,
                  border: 'none',
                  background: canGoNext() ? C.saffron : C.borderLight,
                  color: canGoNext() ? C.white : C.textMuted,
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: canGoNext() ? 'pointer' : 'default',
                  boxShadow: canGoNext() ? '0 4px 16px rgba(255, 107, 44, 0.25)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
