'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { COLOR_SYSTEM as C } from '@/lib/colors';
import { supabase } from '@/lib/supabase';

export default function VerifyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEmailCallback = async () => {
      try {
        // Get the session from the URL callback
        const { data, error: authError } = await supabase.auth.getSession();

        if (authError || !data.session) {
          setError('Authentication failed. Please try logging in again.');
          setLoading(false);
          return;
        }

        const userId = data.session.user?.id;
        const email = data.session.user?.email;

        // Create user profile if it doesn't exist
        const { data: existingProfile } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('id', userId)
          .single();

        if (!existingProfile) {
          const { error: createError } = await supabase
            .from('user_profiles')
            .insert({
              id: userId,
              phone: '',
              created_at: new Date(),
              updated_at: new Date(),
            } as any);

          if (createError) {
            console.error('Error creating user profile:', createError);
          }
        }

        // Clear sessionStorage
        sessionStorage.removeItem('halka_email');

        // Redirect to dashboard
        router.push('/dashboard');
      } catch (err) {
        console.error('Verification error:', err);
        setError('An error occurred during verification.');
        setLoading(false);
      }
    };

    handleEmailCallback();
  }, [router]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${C.cream} 0%, ${C.warmWhite} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <div style={{
          maxWidth: '420px',
          width: '100%',
          background: C.white,
          borderRadius: '28px',
          padding: '48px 32px',
          boxShadow: '0 12px 48px rgba(26,26,26,0.08)',
          textAlign: 'center',
        }}>
          <div style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            fontSize: '16px',
            color: C.textMuted,
          }}>
            Verifying your email...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${C.cream} 0%, ${C.warmWhite} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        maxWidth: '420px',
        width: '100%',
        background: C.white,
        borderRadius: '28px',
        padding: '48px 32px',
        boxShadow: '0 12px 48px rgba(26,26,26,0.08)',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '20px',
        }}>
          ⚠️
        </div>
        <h2 style={{
          fontFamily: "'Outfit'",
          fontWeight: 800,
          fontSize: '24px',
          color: C.charcoal,
          marginBottom: '12px',
        }}>
          Verification Error
        </h2>
        <p style={{
          fontSize: '14px',
          color: C.textMuted,
          lineHeight: 1.6,
          marginBottom: '24px',
        }}>
          {error}
        </p>
        <button
          onClick={() => router.push('/auth/phone')}
          style={{
            padding: '12px 28px',
            background: C.saffron,
            color: C.white,
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
