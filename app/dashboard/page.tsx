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
  weight_to_lose_kg: number;
  recommended_program: string;
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
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          router.push('/auth/phone');
          return;
        }

        const userId = session.user?.id;

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', userId)
          .single() as any;

        if (profileData) {
          setUser(profileData);
        }

        // Fetch latest quiz response
        const { data: quizData, error: quizError } = await supabase
          .from('quiz_responses')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single() as any;

        if (quizData) {
          setQuiz(quizData);

          // Calculate health metrics
          const h = quizData.height_cm / 100;
          const w = quizData.weight_kg;
          const bmi = h && w ? w / (h * h) : 0;
          const toLose = w && quizData.target_weight_kg ? w - quizData.target_weight_kg : 0;
          const program = bmi > 27 ? 'GLP-1 Program' : 'Starter Program';

          setHealth({
            bmi: parseFloat(bmi.toFixed(1)),
            weight_to_lose_kg: parseFloat(toLose.toFixed(1)),
            recommended_program: program,
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
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth/phone');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: C.cream,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          fontSize: '16px',
          color: C.textMuted,
        }}>
          Loading your profile...
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: C.cream, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: C.white,
        borderBottom: `1px solid ${C.borderLight}`,
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{
            fontFamily: "'Outfit'",
            fontWeight: 900,
            fontSize: '20px',
            color: C.charcoal,
          }}>
            halka
          </span>
          <span style={{
            fontFamily: "'Noto Sans Devanagari'",
            fontSize: '11px',
            color: C.saffron,
          }}>
            हल्का
          </span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: `1px solid ${C.borderLight}`,
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            color: C.charcoal,
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontFamily: "'Outfit'",
            fontWeight: 800,
            fontSize: '32px',
            color: C.charcoal,
            marginBottom: '8px',
          }}>
            Welcome back{user?.name ? `, ${user.name}` : ''}!
          </h1>
          <p style={{ fontSize: '16px', color: C.textMuted }}>
            Your personal health dashboard
          </p>
        </div>

        {/* Quiz Status */}
        {quiz && health ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}>
            {/* BMI Card */}
            <div style={{
              background: C.white,
              borderRadius: '16px',
              padding: '28px 24px',
              border: `1px solid ${C.borderLight}`,
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: C.saffron,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px',
              }}>
                BMI Score
              </div>
              <div style={{
                fontFamily: "'Outfit'",
                fontWeight: 800,
                fontSize: '32px',
                color: C.charcoal,
                marginBottom: '4px',
              }}>
                {health.bmi}
              </div>
              <p style={{ fontSize: '13px', color: C.textMuted }}>
                Your current BMI category
              </p>
            </div>

            {/* Weight Loss Goal */}
            <div style={{
              background: C.white,
              borderRadius: '16px',
              padding: '28px 24px',
              border: `1px solid ${C.borderLight}`,
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: C.saffron,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px',
              }}>
                Goal Weight
              </div>
              <div style={{
                fontFamily: "'Outfit'",
                fontWeight: 800,
                fontSize: '32px',
                color: C.charcoal,
                marginBottom: '4px',
              }}>
                {health.weight_to_lose_kg} kg
              </div>
              <p style={{ fontSize: '13px', color: C.textMuted }}>
                Weight to reach your target
              </p>
            </div>

            {/* Recommended Plan */}
            <div style={{
              background: C.saffronLight,
              border: `1px solid rgba(232, 145, 58, 0.3)`,
              borderRadius: '16px',
              padding: '28px 24px',
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: C.saffron,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px',
              }}>
                Recommended Plan
              </div>
              <div style={{
                fontFamily: "'Outfit'",
                fontWeight: 800,
                fontSize: '18px',
                color: C.charcoal,
                marginBottom: '4px',
              }}>
                {health.recommended_program}
              </div>
              <p style={{ fontSize: '13px', color: C.textMuted }}>
                Tailored to your goals
              </p>
            </div>
          </div>
        ) : (
          <div style={{
            background: C.white,
            borderRadius: '16px',
            padding: '40px 24px',
            textAlign: 'center',
            marginBottom: '40px',
          }}>
            <p style={{
              fontSize: '16px',
              color: C.charcoal,
              marginBottom: '20px',
            }}>
              You haven't completed the assessment yet.
            </p>
            <button
              onClick={() => router.push('/')}
              style={{
                background: C.saffron,
                color: C.white,
                border: 'none',
                padding: '12px 28px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Start Assessment
            </button>
          </div>
        )}

        {/* Next Steps */}
        <div style={{
          background: C.white,
          borderRadius: '16px',
          padding: '32px 24px',
          border: `1px solid ${C.borderLight}`,
        }}>
          <h2 style={{
            fontFamily: "'Outfit'",
            fontWeight: 700,
            fontSize: '18px',
            color: C.charcoal,
            marginBottom: '20px',
          }}>
            Next Steps
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: '📅', title: 'Book Doctor Consultation', desc: 'Get matched with a licensed doctor' },
              { icon: '💊', title: 'Start Your Program', desc: 'Begin your personalized treatment plan' },
              { icon: '📊', title: 'Track Progress', desc: 'Monitor your results with our dashboard' },
            ].map((step, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                background: C.cream,
                borderRadius: '12px',
              }}>
                <span style={{ fontSize: '24px' }}>{step.icon}</span>
                <div>
                  <div style={{
                    fontWeight: 600,
                    color: C.charcoal,
                    marginBottom: '4px',
                  }}>
                    {step.title}
                  </div>
                  <p style={{ fontSize: '13px', color: C.textMuted }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
