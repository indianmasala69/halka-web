'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { COLOR_SYSTEM as C } from '@/lib/colors';
import { supabase } from '@/lib/supabase';
import { doctors } from '@/lib/doctors';

interface UserProfile {
  id: string;
  phone: string;
  name?: string;
}

interface QuizResponse {
  id: string;
  gender: string;
  age_group: string;
  height_cm: number;
  weight_kg: number;
  target_weight_kg: number;
  conditions: string[];
  diet_preference: string;
  commitment_level: string;
  created_at: string;
}

interface HealthProfile {
  bmi: number;
  bmiCategory: string;
  bmiColor: string;
  weight_to_lose_kg: number;
  recommended_program: string;
  progressPercent: number;
}

function getBmiInfo(bmi: number): { category: string; color: string } {
  if (bmi < 18.5) return { category: 'Underweight', color: C.info };
  if (bmi < 25) return { category: 'Normal', color: C.green };
  if (bmi < 30) return { category: 'Overweight', color: C.saffron };
  return { category: 'Obese', color: C.error };
}

// Mock data for dashboard features
const MOCK_WEIGHT_DATA = [
  { week: 'Start', weight: 92.0 },
  { week: 'Week 1', weight: 91.2 },
  { week: 'Week 2', weight: 90.1 },
  { week: 'Week 3', weight: 89.4 },
  { week: 'Week 4', weight: 88.6 },
];
const MOCK_GOAL_WEIGHT = 78;

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [quiz, setQuiz] = useState<QuizResponse | null>(null);
  const [health, setHealth] = useState<HealthProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);

  // New interactive states
  const [doseChecked, setDoseChecked] = useState<boolean[]>([true, false, true, false, false, false, false]);
  const [dailyChecklist, setDailyChecklist] = useState<boolean[]>([true, false, true, false]);
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [weightInputValue, setWeightInputValue] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          // Fallback to mock data instead of redirecting
          setUseMockData(true);
          setUser({ id: 'mock', phone: '+91 98765 43210', name: 'Guest' });
          const mockQuiz: QuizResponse = {
            id: 'mock',
            gender: 'male',
            age_group: '30-40',
            height_cm: 175,
            weight_kg: 92,
            target_weight_kg: 78,
            conditions: [],
            diet_preference: 'mixed',
            commitment_level: 'high',
            created_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
          };
          setQuiz(mockQuiz);
          const h = mockQuiz.height_cm / 100;
          const w = mockQuiz.weight_kg;
          const bmi = w / (h * h);
          const bmiRounded = parseFloat(bmi.toFixed(1));
          const toLose = w - mockQuiz.target_weight_kg;
          const { category, color } = getBmiInfo(bmiRounded);
          const lost = w - 88.6;
          const progressPercent = toLose > 0 ? Math.min(Math.round((lost / toLose) * 100), 100) : 0;
          setHealth({
            bmi: bmiRounded,
            bmiCategory: category,
            bmiColor: color,
            weight_to_lose_kg: parseFloat(toLose.toFixed(1)),
            recommended_program: 'Medication Plan',
            progressPercent,
          });
          setLoading(false);
          return;
        }

        const userId = session.user?.id;

        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', userId)
          .single() as any;

        if (profileData) {
          setUser(profileData);
        }

        const { data: quizData } = await supabase
          .from('quiz_responses')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single() as any;

        if (quizData) {
          setQuiz(quizData);

          const h = quizData.height_cm / 100;
          const w = quizData.weight_kg;
          const bmi = h && w ? w / (h * h) : 0;
          const bmiRounded = parseFloat(bmi.toFixed(1));
          const toLose = w && quizData.target_weight_kg ? w - quizData.target_weight_kg : 0;
          const program = bmi > 27 ? 'Medication Plan' : 'Starter Program';
          const { category, color } = getBmiInfo(bmiRounded);
          const progressPercent = toLose > 0 ? Math.min(Math.max(0, 0), 100) : 0;

          setHealth({
            bmi: bmiRounded,
            bmiCategory: category,
            bmiColor: color,
            weight_to_lose_kg: parseFloat(toLose.toFixed(1)),
            recommended_program: program,
            progressPercent,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Fallback to mock on error
        setUseMockData(true);
        setUser({ id: 'mock', phone: '+91 98765 43210', name: 'Guest' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    if (useMockData) {
      router.push('/auth/phone');
      return;
    }
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDose = (index: number) => {
    setDoseChecked(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const toggleDailyItem = (index: number) => {
    setDailyChecklist(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const dailyItems = [
    'Take medication',
    'Log your meals',
    'Drink 2L water',
    '30 min walk',
  ];

  const dailyCompleted = dailyChecklist.filter(Boolean).length;
  const dosesThisMonth = 3;
  const dosesTotal = 4;
  const compliancePercent = Math.round((dosesThisMonth / dosesTotal) * 100);

  const appointmentDoctor = doctors[0]; // Dr. Anand Sharma

  // Shared styles
  const cardStyle: React.CSSProperties = {
    background: C.white,
    borderRadius: 14,
    padding: '24px 20px',
    border: `1px solid ${C.borderLight}`,
    boxShadow: C.shadowSm,
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 700,
    fontSize: 17,
    color: C.textPrimary,
    marginBottom: 18,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    color: C.textMuted,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.8px',
    marginBottom: 10,
  };

  const bodyFont: React.CSSProperties = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  };

  // Loading skeleton
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: C.bgPrimary }}>
        <style>{`
          @keyframes shimmer {
            0% { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
          .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 800px 100%;
            animation: shimmer 1.5s infinite linear;
            border-radius: 12px;
          }
        `}</style>
        <div style={{
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div className="skeleton" style={{ width: 80, height: 28 }} />
          <div className="skeleton" style={{ width: 120, height: 20 }} />
        </div>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
            marginBottom: 24,
          }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="skeleton" style={{ height: 120 }} />
            ))}
          </div>
          <div className="skeleton" style={{ height: 140, marginBottom: 24 }} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
            marginBottom: 24,
          }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="skeleton" style={{ height: 100 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const greeting = user?.name ? `Hello, ${user.name}` : 'Hello there';
  const quizDate = quiz?.created_at
    ? new Date(quiz.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  // Weight chart calculations
  const weights = MOCK_WEIGHT_DATA.map(d => d.weight);
  const chartMin = Math.min(...weights, MOCK_GOAL_WEIGHT) - 2;
  const chartMax = Math.max(...weights) + 2;
  const chartRange = chartMax - chartMin;
  const chartW = 100; // percentage width
  const chartH = 140;

  const weightToY = (w: number) => {
    return chartH - ((w - chartMin) / chartRange) * chartH;
  };

  const svgPoints = MOCK_WEIGHT_DATA.map((d, i) => {
    const x = (i / (MOCK_WEIGHT_DATA.length - 1)) * 100;
    const y = weightToY(d.weight);
    return { x: x * 2.8 + 30, y: y + 10, weight: d.weight, label: d.week };
  });

  const svgWidth = 310;
  const svgHeight = 170;
  const goalY = weightToY(MOCK_GOAL_WEIGHT) + 10;

  const pathD = svgPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  return (
    <div style={{ minHeight: '100vh', background: C.bgPrimary }}>
      {/* Top Navigation Bar */}
      <nav style={{
        background: C.white,
        borderBottom: `1px solid ${C.border}`,
        padding: '14px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: C.shadowSm,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: 22,
            color: C.textPrimary,
            letterSpacing: '-0.5px',
          }}>
            halka
          </span>
          <span style={{
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: 11,
            color: C.saffron,
            marginTop: 2,
          }}>
            हल्का
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{
            ...bodyFont,
            fontSize: 14,
            fontWeight: 500,
            color: C.textSecondary,
          }}>
            {greeting}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: `1px solid ${C.border}`,
              padding: '7px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              color: C.textSecondary,
              cursor: 'pointer',
              ...bodyFont,
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.borderColor = C.saffron;
              (e.target as HTMLButtonElement).style.color = C.saffron;
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.borderColor = C.border;
              (e.target as HTMLButtonElement).style.color = C.textSecondary;
            }}
          >
            {useMockData ? 'Sign In' : 'Logout'}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px 60px' }}>

        {/* No Quiz CTA */}
        {!quiz && (
          <div style={{
            background: `linear-gradient(135deg, ${C.saffron} 0%, ${C.saffronDark} 100%)`,
            borderRadius: 16,
            padding: '36px 24px',
            textAlign: 'center',
            marginBottom: 28,
            boxShadow: C.shadowMd,
          }}>
            <div style={{
              width: 56,
              height: 56,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: 28,
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </div>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: C.white,
              marginBottom: 8,
            }}>
              Complete your health assessment
            </h2>
            <p style={{
              ...bodyFont,
              fontSize: 15,
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 24,
              maxWidth: 360,
              margin: '0 auto 24px',
              lineHeight: 1.5,
            }}>
              Take a 2-minute quiz so our doctors can build your personalised weight loss plan.
            </p>
            <button
              onClick={() => router.push('/')}
              style={{
                background: C.white,
                color: C.saffron,
                border: 'none',
                padding: '13px 32px',
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 15,
                cursor: 'pointer',
                ...bodyFont,
                boxShadow: C.shadowSm,
              }}
            >
              Start Assessment
            </button>
          </div>
        )}

        {/* Health Overview Cards */}
        {quiz && health && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12,
              marginBottom: 20,
            }}>
              {/* BMI Card */}
              <div style={cardStyle}>
                <div style={labelStyle}>BMI Score</div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 36,
                  color: health.bmiColor,
                  lineHeight: 1,
                  marginBottom: 6,
                }}>
                  {health.bmi}
                </div>
                <span style={{
                  display: 'inline-block',
                  ...bodyFont,
                  fontSize: 11,
                  fontWeight: 600,
                  color: health.bmiColor,
                  background: health.bmiColor === C.green ? C.greenLight
                    : health.bmiColor === C.saffron ? C.saffronLight
                    : health.bmiColor === C.error ? '#FEE2E2'
                    : '#DBEAFE',
                  padding: '3px 10px',
                  borderRadius: 20,
                }}>
                  {health.bmiCategory}
                </span>
              </div>

              {/* Weight to Lose Card */}
              <div style={cardStyle}>
                <div style={labelStyle}>Weight to Lose</div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 36,
                  color: C.textPrimary,
                  lineHeight: 1,
                  marginBottom: 6,
                }}>
                  {health.weight_to_lose_kg}<span style={{ fontSize: 18, fontWeight: 600, color: C.textMuted }}> kg</span>
                </div>
                <span style={{ ...bodyFont, fontSize: 12, color: C.textMuted }}>
                  to reach your goal
                </span>
              </div>

              {/* Current Program Card */}
              <div style={cardStyle}>
                <div style={labelStyle}>Current Program</div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 17,
                  color: C.textPrimary,
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}>
                  {health.recommended_program}
                </div>
                <span style={{
                  display: 'inline-block',
                  ...bodyFont,
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.green,
                  background: C.greenLight,
                  padding: '3px 10px',
                  borderRadius: 20,
                }}>
                  Active
                </span>
              </div>

              {/* Quick Stats Card */}
              <div style={cardStyle}>
                <div style={labelStyle}>This Month</div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 36,
                  color: C.green,
                  lineHeight: 1,
                  marginBottom: 6,
                }}>
                  3.4<span style={{ fontSize: 18, fontWeight: 600, color: C.textMuted }}> kg</span>
                </div>
                <span style={{
                  display: 'inline-block',
                  ...bodyFont,
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.green,
                  background: C.greenLight,
                  padding: '3px 10px',
                  borderRadius: 20,
                }}>
                  Lost so far
                </span>
              </div>
            </div>

            {/* ============================== */}
            {/* MEDICATION TRACKER CARD        */}
            {/* ============================== */}
            <div style={{ ...cardStyle, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                <div style={headingStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 0 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: C.saffronLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.saffron} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
                        <line x1="9" y1="10" x2="15" y2="10" />
                        <line x1="12" y1="7" x2="12" y2="13" />
                      </svg>
                    </div>
                    <span>Medication Tracker</span>
                  </div>
                </div>
              </div>

              {/* Medication name */}
              <div style={{
                background: C.bgPrimary,
                borderRadius: 10,
                padding: '14px 16px',
                marginBottom: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: C.textPrimary,
                    marginBottom: 2,
                  }}>
                    Semaglutide 0.25mg
                  </div>
                  <div style={{ ...bodyFont, fontSize: 12, color: C.textMuted }}>
                    Weekly subcutaneous injection
                  </div>
                </div>
                <div style={{
                  ...bodyFont,
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.saffron,
                  background: C.saffronLight,
                  padding: '4px 10px',
                  borderRadius: 20,
                }}>
                  Week 4
                </div>
              </div>

              {/* Weekly dose schedule */}
              <div style={{ ...bodyFont, fontSize: 12, fontWeight: 600, color: C.textMuted, marginBottom: 10, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
                Weekly Dose Schedule
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' as const }}>
                {DAYS_OF_WEEK.map((day, i) => (
                  <button
                    key={day}
                    onClick={() => toggleDose(i)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column' as const,
                      alignItems: 'center',
                      gap: 6,
                      padding: '10px 0',
                      width: 42,
                      border: `1.5px solid ${doseChecked[i] ? C.green : C.border}`,
                      borderRadius: 10,
                      background: doseChecked[i] ? C.greenLight : C.white,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span style={{ ...bodyFont, fontSize: 10, fontWeight: 600, color: C.textMuted }}>{day}</span>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      border: `2px solid ${doseChecked[i] ? C.green : C.border}`,
                      background: doseChecked[i] ? C.green : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {doseChecked[i] && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Next dose info */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.saffron} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span style={{ ...bodyFont, fontSize: 14, fontWeight: 600, color: C.textPrimary }}>
                    Next dose: Wednesday, 9:00 AM
                  </span>
                </div>
              </div>

              {/* Dose history + compliance */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
                <span style={{ ...bodyFont, fontSize: 13, color: C.textSecondary }}>
                  {dosesThisMonth} of {dosesTotal} doses taken this month
                </span>
                <span style={{ ...bodyFont, fontSize: 13, fontWeight: 700, color: C.green }}>
                  {compliancePercent}%
                </span>
              </div>

              {/* Compliance progress bar */}
              <div style={{
                background: C.borderLight,
                borderRadius: 8,
                height: 8,
                overflow: 'hidden',
                marginBottom: 16,
              }}>
                <div style={{
                  background: `linear-gradient(90deg, ${C.green}, ${C.greenDark})`,
                  height: '100%',
                  borderRadius: 8,
                  width: `${compliancePercent}%`,
                  transition: 'width 0.5s ease',
                }} />
              </div>

              {/* Set Reminder button */}
              <button
                onClick={() => alert('Reminder set! You will be notified before your next dose.')}
                style={{
                  background: C.saffronLight,
                  color: C.saffron,
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  ...bodyFont,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => { (e.currentTarget).style.background = C.saffron; (e.currentTarget).style.color = C.white; }}
                onMouseLeave={e => { (e.currentTarget).style.background = C.saffronLight; (e.currentTarget).style.color = C.saffron; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
                Set Reminder
              </button>
            </div>

            {/* ============================== */}
            {/* TWO-COLUMN GRID                */}
            {/* ============================== */}
            <div className="dashboard-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
              marginBottom: 20,
            }}>

              {/* ============================== */}
              {/* WEIGHT PROGRESS CHART          */}
              {/* ============================== */}
              <div style={cardStyle}>
                <div style={headingStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: C.greenLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <span>Weight Progress</span>
                  </div>
                </div>

                {/* Weight labels */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 12,
                }}>
                  <div>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 24, color: C.textPrimary }}>
                      {MOCK_WEIGHT_DATA[MOCK_WEIGHT_DATA.length - 1].weight}
                    </span>
                    <span style={{ ...bodyFont, fontSize: 13, color: C.textMuted, marginLeft: 4 }}>kg now</span>
                  </div>
                  <div style={{ textAlign: 'right' as const }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 24, color: C.green }}>
                      {MOCK_GOAL_WEIGHT}
                    </span>
                    <span style={{ ...bodyFont, fontSize: 13, color: C.textMuted, marginLeft: 4 }}>kg goal</span>
                  </div>
                </div>

                {/* SVG Chart */}
                <div style={{ width: '100%', overflow: 'hidden', marginBottom: 12 }}>
                  <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" height="auto" style={{ display: 'block' }}>
                    {/* Goal line (dashed) */}
                    <line
                      x1="30" y1={goalY} x2={svgWidth - 10} y2={goalY}
                      stroke={C.green}
                      strokeWidth="1"
                      strokeDasharray="4,4"
                      opacity="0.5"
                    />
                    <text x={svgWidth - 8} y={goalY - 4} fill={C.green} fontSize="9" fontFamily="Plus Jakarta Sans" textAnchor="end" fontWeight="600">
                      Goal
                    </text>

                    {/* Gradient fill under curve */}
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={C.saffron} stopOpacity="0.15" />
                        <stop offset="100%" stopColor={C.saffron} stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`${pathD} L${svgPoints[svgPoints.length - 1].x},${svgHeight - 10} L${svgPoints[0].x},${svgHeight - 10} Z`}
                      fill="url(#chartGrad)"
                    />

                    {/* Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={C.saffron}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {svgPoints.map((p, i) => (
                      <g key={i}>
                        <circle cx={p.x} cy={p.y} r="5" fill={C.white} stroke={C.saffron} strokeWidth="2.5" />
                        <text x={p.x} y={p.y - 10} fill={C.textSecondary} fontSize="9" fontFamily="Plus Jakarta Sans" textAnchor="middle" fontWeight="600">
                          {p.weight}
                        </text>
                        <text x={p.x} y={svgHeight - 0} fill={C.textMuted} fontSize="8" fontFamily="Plus Jakarta Sans" textAnchor="middle">
                          {p.label}
                        </text>
                      </g>
                    ))}

                    {/* Start marker */}
                    <circle cx={svgPoints[0].x} cy={svgPoints[0].y} r="3" fill={C.saffron} />
                  </svg>
                </div>

                {/* Log weight */}
                {showWeightInput ? (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 88.2"
                      value={weightInputValue}
                      onChange={e => setWeightInputValue(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: `1.5px solid ${C.borderFocus}`,
                        ...bodyFont,
                        fontSize: 14,
                        outline: 'none',
                        color: C.textPrimary,
                      }}
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        if (weightInputValue) {
                          alert(`Weight logged: ${weightInputValue} kg`);
                          setWeightInputValue('');
                          setShowWeightInput(false);
                        }
                      }}
                      style={{
                        background: C.green,
                        color: C.white,
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: 10,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        ...bodyFont,
                        whiteSpace: 'nowrap' as const,
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => { setShowWeightInput(false); setWeightInputValue(''); }}
                      style={{
                        background: 'none',
                        border: `1px solid ${C.border}`,
                        padding: '10px 14px',
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        color: C.textMuted,
                        cursor: 'pointer',
                        ...bodyFont,
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowWeightInput(true)}
                    style={{
                      background: C.greenLight,
                      color: C.green,
                      border: 'none',
                      padding: '10px 18px',
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: 'pointer',
                      ...bodyFont,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      width: '100%',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget).style.background = C.green; (e.currentTarget).style.color = C.white; }}
                    onMouseLeave={e => { (e.currentTarget).style.background = C.greenLight; (e.currentTarget).style.color = C.green; }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Log Today&apos;s Weight
                  </button>
                )}
              </div>

              {/* ============================== */}
              {/* DAILY CHECKLIST                */}
              {/* ============================== */}
              <div style={cardStyle}>
                <div style={headingStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: '#EDE9FE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                      </svg>
                    </div>
                    <span>Today&apos;s Tasks</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
                  {dailyItems.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => toggleDailyItem(i)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '14px 0',
                        borderBottom: i < dailyItems.length - 1 ? `1px solid ${C.borderLight}` : 'none',
                        background: 'none',
                        border: 'none',
                        borderBottomStyle: i < dailyItems.length - 1 ? 'solid' : 'none',
                        borderBottomWidth: i < dailyItems.length - 1 ? 1 : 0,
                        borderBottomColor: C.borderLight,
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left' as const,
                      }}
                    >
                      <div style={{
                        width: 22,
                        height: 22,
                        borderRadius: 7,
                        border: `2px solid ${dailyChecklist[i] ? C.green : C.border}`,
                        background: dailyChecklist[i] ? C.green : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.15s ease',
                      }}>
                        {dailyChecklist[i] && (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span style={{
                        ...bodyFont,
                        fontSize: 14,
                        fontWeight: 500,
                        color: dailyChecklist[i] ? C.textMuted : C.textPrimary,
                        textDecoration: dailyChecklist[i] ? 'line-through' : 'none',
                        transition: 'all 0.15s ease',
                      }}>
                        {item}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Progress summary */}
                <div style={{
                  marginTop: 16,
                  padding: '12px 16px',
                  background: dailyCompleted === dailyItems.length ? C.greenLight : C.bgPrimary,
                  borderRadius: 10,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                }}>
                  <span style={{
                    ...bodyFont,
                    fontSize: 13,
                    fontWeight: 600,
                    color: dailyCompleted === dailyItems.length ? C.green : C.textSecondary,
                  }}>
                    {dailyCompleted === dailyItems.length ? 'All tasks completed!' : `${dailyCompleted} of ${dailyItems.length} completed today`}
                  </span>
                  <span style={{
                    ...bodyFont,
                    fontSize: 13,
                    fontWeight: 700,
                    color: dailyCompleted === dailyItems.length ? C.green : C.textPrimary,
                  }}>
                    {Math.round((dailyCompleted / dailyItems.length) * 100)}%
                  </span>
                </div>
              </div>

              {/* ============================== */}
              {/* NEXT APPOINTMENT CARD          */}
              {/* ============================== */}
              <div style={cardStyle}>
                <div style={headingStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: '#DBEAFE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.info} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <span>Next Appointment</span>
                  </div>
                </div>

                {/* Doctor info */}
                <div style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'center',
                  marginBottom: 16,
                }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}>
                    <img
                      src={appointmentDoctor.photo}
                      alt={appointmentDoctor.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: 15,
                      color: C.textPrimary,
                      marginBottom: 2,
                    }}>
                      {appointmentDoctor.name}
                    </div>
                    <div style={{ ...bodyFont, fontSize: 12, color: C.textMuted }}>
                      {appointmentDoctor.credentials}
                    </div>
                  </div>
                </div>

                {/* Date and time */}
                <div style={{
                  background: C.bgPrimary,
                  borderRadius: 10,
                  padding: '14px 16px',
                  marginBottom: 14,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span style={{ ...bodyFont, fontSize: 14, fontWeight: 600, color: C.textPrimary }}>
                      Wednesday, 16 April 2026
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span style={{ ...bodyFont, fontSize: 14, fontWeight: 600, color: C.textPrimary }}>
                      10:00 AM IST
                    </span>
                  </div>
                </div>

                {/* Google Meet link */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 16,
                  padding: '8px 12px',
                  background: '#F0FDF4',
                  borderRadius: 8,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15.6 11.6L22 7v10l-6.4-4.6" />
                    <rect x="2" y="6" width="14" height="12" rx="2" />
                  </svg>
                  <span style={{ ...bodyFont, fontSize: 12, color: C.green, fontWeight: 500 }}>
                    meet.google.com/abc-defg-hij
                  </span>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => router.push('/booking')}
                    style={{
                      flex: 1,
                      background: 'none',
                      border: `1.5px solid ${C.border}`,
                      padding: '11px 16px',
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 13,
                      color: C.textSecondary,
                      cursor: 'pointer',
                      ...bodyFont,
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget).style.borderColor = C.saffron; (e.currentTarget).style.color = C.saffron; }}
                    onMouseLeave={e => { (e.currentTarget).style.borderColor = C.border; (e.currentTarget).style.color = C.textSecondary; }}
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => window.open('https://meet.google.com/abc-defg-hij', '_blank')}
                    style={{
                      flex: 1.5,
                      background: C.green,
                      color: C.white,
                      border: 'none',
                      padding: '11px 16px',
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: 'pointer',
                      ...bodyFont,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      boxShadow: `0 2px 8px ${C.green}40`,
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget).style.background = C.greenDark; }}
                    onMouseLeave={e => { (e.currentTarget).style.background = C.green; }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15.6 11.6L22 7v10l-6.4-4.6" />
                      <rect x="2" y="6" width="14" height="12" rx="2" />
                    </svg>
                    Join Call
                  </button>
                </div>
              </div>

              {/* ============================== */}
              {/* AI COACH QUICK ACCESS          */}
              {/* ============================== */}
              <div style={{
                ...cardStyle,
                background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
                border: 'none',
                display: 'flex',
                flexDirection: 'column' as const,
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                      </svg>
                    </div>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: 17,
                      color: C.white,
                    }}>
                      AI Health Coach
                    </div>
                  </div>

                  <div style={{
                    ...bodyFont,
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: 8,
                  }}>
                    Last message:
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    padding: '12px 14px',
                    marginBottom: 18,
                  }}>
                    <p style={{
                      ...bodyFont,
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.5,
                      margin: 0,
                    }}>
                      &quot;Great job on your 3.4kg loss this month! Try adding a 10-min morning walk to boost your metabolism further.&quot;
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/coach')}
                  style={{
                    background: C.saffron,
                    color: C.white,
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    ...bodyFont,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    width: '100%',
                    boxShadow: `0 2px 8px ${C.saffron}40`,
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget).style.background = C.saffronDark; }}
                  onMouseLeave={e => { (e.currentTarget).style.background = C.saffron; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                  Chat with your AI Coach
                </button>
              </div>
            </div>

            {/* ============================== */}
            {/* QUICK ACTIONS                  */}
            {/* ============================== */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12,
              marginBottom: 20,
            }}>
              {/* Book Consultation */}
              <button
                onClick={() => router.push('/booking')}
                style={{
                  ...cardStyle,
                  cursor: 'pointer',
                  textAlign: 'left' as const,
                  transition: 'box-shadow 0.15s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = C.shadowMd; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = C.shadowSm; }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  background: C.saffronLight,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.saffron} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: C.textPrimary,
                  marginBottom: 4,
                }}>
                  Book Consultation
                </div>
                <div style={{ ...bodyFont, fontSize: 12, color: C.textMuted, lineHeight: 1.4 }}>
                  Speak with a licensed doctor
                </div>
              </button>

              {/* Retake Assessment */}
              <button
                onClick={() => router.push('/')}
                style={{
                  ...cardStyle,
                  cursor: 'pointer',
                  textAlign: 'left' as const,
                  transition: 'box-shadow 0.15s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = C.shadowMd; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = C.shadowSm; }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  background: C.greenLight,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                  </svg>
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: C.textPrimary,
                  marginBottom: 4,
                }}>
                  Retake Assessment
                </div>
                <div style={{ ...bodyFont, fontSize: 12, color: C.textMuted, lineHeight: 1.4 }}>
                  Update your health profile
                </div>
              </button>
            </div>

            {/* Subscription Status */}
            <div style={{
              background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
              borderRadius: 14,
              padding: '24px 20px',
              boxShadow: C.shadowMd,
              marginBottom: 20,
            }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: 17,
                color: C.white,
                marginBottom: 6,
              }}>
                Subscription
              </div>
              <div style={{
                ...bodyFont,
                fontSize: 14,
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 20,
                lineHeight: 1.5,
              }}>
                You haven&apos;t subscribed to a plan yet. Choose a plan to start your doctor-led weight loss journey.
              </div>
              <button
                onClick={() => router.push('/pricing')}
                style={{
                  background: C.saffron,
                  color: C.white,
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  ...bodyFont,
                  boxShadow: C.shadowSm,
                }}
              >
                Choose a Plan
              </button>
            </div>
          </>
        )}

        {/* Footer for no-quiz state */}
        {!quiz && (
          <div style={{
            ...cardStyle,
          }}>
            <div style={headingStyle}>
              How it works
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
              {[
                { step: '1', title: 'Take the Assessment', desc: 'A quick 2-minute health quiz to understand your needs' },
                { step: '2', title: 'Meet Your Doctor', desc: 'Get matched with a licensed weight loss physician' },
                { step: '3', title: 'Start Your Program', desc: 'Receive your personalised treatment and diet plan' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: C.saffronLight,
                    color: C.saffron,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: 14,
                    flexShrink: 0,
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: 15,
                      color: C.textPrimary,
                      marginBottom: 3,
                    }}>
                      {item.title}
                    </div>
                    <div style={{
                      ...bodyFont,
                      fontSize: 13,
                      color: C.textMuted,
                      lineHeight: 1.4,
                    }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 640px) {
          main > div:first-of-type {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 639px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
