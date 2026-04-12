'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { COLOR_SYSTEM as C } from '@/lib/colors';

/* ───────── Meet Link & Calendar Helpers ───────── */
function generateMeetLink(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const rand3 = () =>
    Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * 26)]).join('');
  return `https://meet.google.com/halka-${rand3()}-${rand3()}`;
}

function generateGoogleCalendarUrl(
  doctorName: string,
  dateStr: string,
  timeSlot: string,
  meetLink: string,
): string {
  // Parse the date and time into a start Date object
  const [year, month, day] = dateStr.split('-').map(Number);
  const timeMatch = timeSlot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!timeMatch) return '';
  let hours = parseInt(timeMatch[1], 10);
  const minutes = parseInt(timeMatch[2], 10);
  const ampm = timeMatch[3].toUpperCase();
  if (ampm === 'PM' && hours !== 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;

  const start = new Date(year, month - 1, day, hours, minutes, 0);
  const end = new Date(start.getTime() + 25 * 60 * 1000);

  const fmt = (d: Date) =>
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0') +
    'T' +
    String(d.getHours()).padStart(2, '0') +
    String(d.getMinutes()).padStart(2, '0') +
    String(d.getSeconds()).padStart(2, '0');

  const title = encodeURIComponent(`Halka Consultation with ${doctorName}`);
  const details = encodeURIComponent(
    `Your 25-minute video consultation with ${doctorName}.\n\nJoin via Google Meet: ${meetLink}`,
  );
  const location = encodeURIComponent(meetLink);
  const dates = `${fmt(start)}/${fmt(end)}`;

  return `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

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
  const [meetLink, setMeetLink] = useState<string>('');
  const [copied, setCopied] = useState(false);
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

  const handleConfirm = () => {
    setMeetLink(generateMeetLink());
    setConfirmed(true);
  };

  const handleCopyMeetLink = useCallback(() => {
    if (!meetLink) return;
    navigator.clipboard.writeText(meetLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [meetLink]);

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
      const calendarUrl =
        selectedDoctor && selectedDate && selectedTime && meetLink
          ? generateGoogleCalendarUrl(selectedDoctor.name, selectedDate, selectedTime, meetLink)
          : '';

      return (
        <div style={{ padding: '20px 0 40px' }}>
          {/* Success header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: C.greenLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: `0 0 0 8px ${C.greenLight}40`,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 26,
                fontWeight: 800,
                color: C.green,
                margin: '0 0 8px',
              }}
            >
              Your consultation is confirmed!
            </h2>
            <p
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 15,
                color: C.textSecondary,
                margin: 0,
                maxWidth: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              We have scheduled your video consultation. Details are below.
            </p>
          </div>

          {/* Appointment details card */}
          <div
            style={{
              background: C.white,
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: 24,
              boxShadow: C.shadowMd,
              marginBottom: 20,
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

            <div style={{ height: 1, background: C.borderLight, margin: '0 -24px 20px' }} />

            {/* Details rows */}
            {[
              { label: 'Date', value: selectedDate ? formatDate(selectedDate) : '' },
              { label: 'Time', value: selectedTime || '' },
              { label: 'Duration', value: '25 minutes' },
              { label: 'Type', value: 'Video consultation' },
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
          </div>

          {/* Google Meet link card */}
          <div
            style={{
              background: C.white,
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: 24,
              boxShadow: C.shadowMd,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 14,
              }}
            >
              {/* Video camera icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 16,
                  fontWeight: 700,
                  color: C.textPrimary,
                }}
              >
                Google Meet Link
              </span>
            </div>

            {/* Copyable link box */}
            <div
              onClick={handleCopyMeetLink}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                padding: '14px 16px',
                borderRadius: 12,
                background: C.greenLight,
                border: `1px solid ${C.green}30`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <a
                href={meetLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  color: C.green,
                  textDecoration: 'none',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1,
                }}
              >
                {meetLink}
              </a>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  flexShrink: 0,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: 12,
                  fontWeight: 600,
                  color: copied ? C.green : C.textMuted,
                  transition: 'color 0.2s ease',
                }}
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    {/* Clipboard icon */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </div>
            </div>

            <p
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 12,
                color: C.textMuted,
                margin: '10px 0 0',
              }}
            >
              Click the link to open in a new tab, or click the box to copy.
            </p>
          </div>

          {/* Add to Calendar button */}
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              width: '100%',
              padding: '16px 24px',
              borderRadius: 14,
              border: `2px solid ${C.border}`,
              background: C.white,
              color: C.textPrimary,
              fontFamily: 'Outfit, sans-serif',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'none',
              boxSizing: 'border-box',
              marginBottom: 20,
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            {/* Calendar icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Add to Google Calendar
          </a>

          {/* Notification note */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '16px 18px',
              borderRadius: 14,
              background: C.saffronLight,
              marginBottom: 20,
            }}
          >
            {/* Bell icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.saffronDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <p
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 14,
                fontWeight: 500,
                color: C.saffronDark,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              You&apos;ll receive a WhatsApp message and email with the meeting link 30 minutes before your consultation.
            </p>
          </div>

          {/* What to prepare card */}
          <div
            style={{
              background: C.white,
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: 24,
              boxShadow: C.shadowSm,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 16,
              }}
            >
              {/* Clipboard/list icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 16,
                  fontWeight: 700,
                  color: C.textPrimary,
                }}
              >
                What to Prepare
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  ),
                  text: 'Recent blood work results (if available)',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="9" y1="3" x2="9" y2="21" />
                    </svg>
                  ),
                  text: 'List of current medications and supplements',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="M12 8v8" />
                      <path d="M8 12h8" />
                    </svg>
                  ),
                  text: 'Your current weight and height measurements',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: C.bgPrimary,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: C.greenLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontSize: 14,
                      fontWeight: 500,
                      color: C.textPrimary,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Back to Dashboard button */}
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: 14,
              border: 'none',
              background: C.saffron,
              color: C.white,
              fontFamily: 'Outfit, sans-serif',
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(255, 107, 44, 0.3)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseDown={(e) => ((e.currentTarget.style.transform = 'scale(0.98)'))}
            onMouseUp={(e) => ((e.currentTarget.style.transform = 'scale(1)'))}
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
