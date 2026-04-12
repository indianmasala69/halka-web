'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { COLOR_SYSTEM as C } from '@/lib/colors';
import { supabase } from '@/lib/supabase';

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

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [quiz, setQuiz] = useState<QuizResponse | null>(null);
  const [health, setHealth] = useState<HealthProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          router.push('/auth/phone');
          return;
        }

        const userId = session.user?.id;

        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', userId)
          .single() as any;

        if (profileData) {
          setUser(profileData);
        }

        const { data: quizData, error: quizError } = await supabase
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
          const totalToLose = toLose;
          const progressPercent = totalToLose > 0 ? Math.min(Math.max(0, 0), 100) : 0;

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
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
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
        {/* Skeleton nav */}
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
          {/* Skeleton metric cards */}
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
          {/* Skeleton progress */}
          <div className="skeleton" style={{ height: 140, marginBottom: 24 }} />
          {/* Skeleton actions */}
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

  return (
    <div style={{ minHeight: '100vh', background: C.bgPrimary }}>
      {/* ── Top Navigation Bar ── */}
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
            fontFamily: "'Plus Jakarta Sans', sans-serif",
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
              fontFamily: "'Plus Jakarta Sans', sans-serif",
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
            Logout
          </button>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px 60px' }}>

        {/* ── No Quiz CTA ── */}
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
              fontFamily: "'Plus Jakarta Sans', sans-serif",
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
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: C.shadowSm,
              }}
            >
              Start Assessment
            </button>
          </div>
        )}

        {/* ── Health Overview Cards ── */}
        {quiz && health && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12,
              marginBottom: 20,
            }}>
              {/* BMI Card */}
              <div style={{
                background: C.white,
                borderRadius: 14,
                padding: '20px 16px',
                border: `1px solid ${C.borderLight}`,
                boxShadow: C.shadowSm,
              }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.textMuted,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.8px',
                  marginBottom: 10,
                }}>
                  BMI Score
                </div>
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
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
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
              <div style={{
                background: C.white,
                borderRadius: 14,
                padding: '20px 16px',
                border: `1px solid ${C.borderLight}`,
                boxShadow: C.shadowSm,
              }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.textMuted,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.8px',
                  marginBottom: 10,
                }}>
                  Weight to Lose
                </div>
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
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  color: C.textMuted,
                }}>
                  to reach your goal
                </span>
              </div>

              {/* Current Program Card */}
              <div style={{
                background: C.white,
                borderRadius: 14,
                padding: '20px 16px',
                border: `1px solid ${C.borderLight}`,
                boxShadow: C.shadowSm,
              }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.textMuted,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.8px',
                  marginBottom: 10,
                }}>
                  Current Program
                </div>
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
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.green,
                  background: C.greenLight,
                  padding: '3px 10px',
                  borderRadius: 20,
                }}>
                  Pending
                </span>
              </div>

              {/* Next Appointment Card */}
              <div style={{
                background: C.white,
                borderRadius: 14,
                padding: '20px 16px',
                border: `1px solid ${C.borderLight}`,
                boxShadow: C.shadowSm,
              }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.textMuted,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.8px',
                  marginBottom: 10,
                }}>
                  Next Appointment
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: C.textSecondary,
                  marginBottom: 10,
                  lineHeight: 1.3,
                }}>
                  No upcoming
                </div>
                <button
                  onClick={() => router.push('/booking')}
                  style={{
                    background: C.saffronLight,
                    color: C.saffron,
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Book now
                </button>
              </div>
            </div>

            {/* ── Progress Section ── */}
            <div style={{
              background: C.white,
              borderRadius: 14,
              padding: '24px 20px',
              border: `1px solid ${C.borderLight}`,
              boxShadow: C.shadowSm,
              marginBottom: 20,
            }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: 17,
                color: C.textPrimary,
                marginBottom: 18,
              }}>
                Weight Progress
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 12,
              }}>
                <div>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                    color: C.textPrimary,
                  }}>
                    {quiz.weight_kg}
                  </span>
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14,
                    color: C.textMuted,
                    marginLeft: 4,
                  }}>
                    kg now
                  </span>
                </div>
                <div style={{ textAlign: 'right' as const }}>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                    color: C.green,
                  }}>
                    {quiz.target_weight_kg}
                  </span>
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14,
                    color: C.textMuted,
                    marginLeft: 4,
                  }}>
                    kg goal
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{
                background: C.borderLight,
                borderRadius: 8,
                height: 10,
                overflow: 'hidden',
                marginBottom: 12,
              }}>
                <div style={{
                  background: `linear-gradient(90deg, ${C.saffron}, ${C.green})`,
                  height: '100%',
                  borderRadius: 8,
                  width: `${Math.max(health.progressPercent, 3)}%`,
                  transition: 'width 0.8s ease',
                }} />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 12,
                color: C.textMuted,
              }}>
                <span>Started: {quizDate || 'N/A'}</span>
                <span>{health.progressPercent}% complete</span>
              </div>
            </div>

            {/* ── Quick Actions ── */}
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
                  background: C.white,
                  borderRadius: 14,
                  padding: '20px 16px',
                  border: `1px solid ${C.borderLight}`,
                  boxShadow: C.shadowSm,
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
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  color: C.textMuted,
                  lineHeight: 1.4,
                }}>
                  Speak with a licensed doctor
                </div>
              </button>

              {/* Retake Assessment */}
              <button
                onClick={() => router.push('/')}
                style={{
                  background: C.white,
                  borderRadius: 14,
                  padding: '20px 16px',
                  border: `1px solid ${C.borderLight}`,
                  boxShadow: C.shadowSm,
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
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  color: C.textMuted,
                  lineHeight: 1.4,
                }}>
                  Update your health profile
                </div>
              </button>

              {/* Chat with Coach */}
              <button
                onClick={() => {}}
                style={{
                  background: C.white,
                  borderRadius: 14,
                  padding: '20px 16px',
                  border: `1px solid ${C.borderLight}`,
                  boxShadow: C.shadowSm,
                  cursor: 'pointer',
                  textAlign: 'left' as const,
                  transition: 'box-shadow 0.15s ease',
                  position: 'relative' as const,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = C.shadowMd; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = C.shadowSm; }}
              >
                <span style={{
                  position: 'absolute' as const,
                  top: 12,
                  right: 12,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.green,
                  background: C.greenLight,
                  padding: '2px 8px',
                  borderRadius: 12,
                }}>
                  WhatsApp
                </span>
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
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: C.textPrimary,
                  marginBottom: 4,
                }}>
                  Chat with Coach
                </div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  color: C.textMuted,
                  lineHeight: 1.4,
                }}>
                  Get daily support & guidance
                </div>
              </button>

              {/* View Diet Plan */}
              <button
                style={{
                  background: C.white,
                  borderRadius: 14,
                  padding: '20px 16px',
                  border: `1px solid ${C.borderLight}`,
                  boxShadow: C.shadowSm,
                  cursor: 'default',
                  textAlign: 'left' as const,
                  opacity: 0.75,
                  position: 'relative' as const,
                }}
              >
                <span style={{
                  position: 'absolute' as const,
                  top: 12,
                  right: 12,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.textMuted,
                  background: C.borderLight,
                  padding: '2px 8px',
                  borderRadius: 12,
                }}>
                  Coming Soon
                </span>
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
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: C.textPrimary,
                  marginBottom: 4,
                }}>
                  View Diet Plan
                </div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  color: C.textMuted,
                  lineHeight: 1.4,
                }}>
                  Personalised nutrition guide
                </div>
              </button>
            </div>

            {/* ── Your Care Team ── */}
            <div style={{
              background: C.white,
              borderRadius: 14,
              padding: '24px 20px',
              border: `1px solid ${C.borderLight}`,
              boxShadow: C.shadowSm,
              marginBottom: 20,
            }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: 17,
                color: C.textPrimary,
                marginBottom: 18,
              }}>
                Your Care Team
              </div>

              {/* Doctor card */}
              <div style={{
                display: 'flex',
                gap: 14,
                padding: 16,
                background: C.bgPrimary,
                borderRadius: 12,
                marginBottom: 12,
                alignItems: 'center',
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: C.textPrimary,
                    marginBottom: 2,
                  }}>
                    Your Doctor
                  </div>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 13,
                    color: C.textMuted,
                    lineHeight: 1.4,
                  }}>
                    Book your first consultation to get matched with a licensed physician
                  </div>
                </div>
              </div>

              {/* Coach card */}
              <div style={{
                display: 'flex',
                gap: 14,
                padding: 16,
                background: C.bgPrimary,
                borderRadius: 12,
                alignItems: 'center',
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: C.textPrimary,
                    marginBottom: 2,
                  }}>
                    WhatsApp Health Coach
                  </div>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 13,
                    color: C.textMuted,
                    lineHeight: 1.4,
                  }}>
                    Daily check-ins, diet tips & motivation via WhatsApp
                  </div>
                </div>
              </div>
            </div>

            {/* ── Recent Activity ── */}
            <div style={{
              background: C.white,
              borderRadius: 14,
              padding: '24px 20px',
              border: `1px solid ${C.borderLight}`,
              boxShadow: C.shadowSm,
              marginBottom: 20,
            }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: 17,
                color: C.textPrimary,
                marginBottom: 18,
              }}>
                Recent Activity
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
                {[
                  {
                    label: 'Assessment completed',
                    date: quizDate || 'Recently',
                    color: C.green,
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Program recommended',
                    date: quizDate || 'Recently',
                    color: C.saffron,
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.saffron} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Doctor consultation pending',
                    date: 'Awaiting booking',
                    color: C.textMuted,
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    ),
                  },
                ].map((item, i, arr) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: 14,
                    position: 'relative' as const,
                    paddingBottom: i < arr.length - 1 ? 20 : 0,
                    paddingLeft: 4,
                  }}>
                    {/* Timeline line */}
                    {i < arr.length - 1 && (
                      <div style={{
                        position: 'absolute' as const,
                        left: 11,
                        top: 24,
                        bottom: 0,
                        width: 2,
                        background: C.borderLight,
                      }} />
                    )}
                    {/* Dot */}
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: C.white,
                      border: `2px solid ${item.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 1,
                    }}>
                      {/* tiny inner dot */}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: 14,
                        color: C.textPrimary,
                        marginBottom: 2,
                      }}>
                        {item.label}
                      </div>
                      <div style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 12,
                        color: C.textMuted,
                      }}>
                        {item.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Subscription Status ── */}
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
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 20,
                lineHeight: 1.5,
              }}>
                You haven't subscribed to a plan yet. Choose a plan to start your doctor-led weight loss journey.
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
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: C.shadowSm,
                }}
              >
                Choose a Plan
              </button>
            </div>
          </>
        )}

        {/* ── Footer for no-quiz state quick actions ── */}
        {!quiz && (
          <div style={{
            background: C.white,
            borderRadius: 14,
            padding: '28px 20px',
            border: `1px solid ${C.borderLight}`,
            boxShadow: C.shadowSm,
          }}>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 17,
              color: C.textPrimary,
              marginBottom: 18,
            }}>
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
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
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

      {/* ── Responsive media query via style tag ── */}
      <style>{`
        @media (min-width: 640px) {
          main > div:first-of-type {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
