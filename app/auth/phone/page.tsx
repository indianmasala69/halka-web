'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { COLOR_SYSTEM as C } from '@/lib/colors';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate email format
    if (!email || !email.includes('@')) {
      setError('Enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/verify`,
        },
      });

      if (signInError) {
        setError(signInError.message || 'Failed to send login link');
        return;
      }

      setSubmitted(true);
      sessionStorage.setItem('halka_email', email);
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
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
            ✓
          </div>
          <h2 style={{
            fontFamily: "'Outfit'",
            fontWeight: 800,
            fontSize: '24px',
            color: C.charcoal,
            marginBottom: '12px',
          }}>
            Check your email!
          </h2>
          <p style={{
            fontSize: '14px',
            color: C.textMuted,
            lineHeight: 1.6,
            marginBottom: '24px',
          }}>
            We've sent a login link to <strong>{email}</strong>
          </p>
          <p style={{
            fontSize: '13px',
            color: C.textMuted,
            lineHeight: 1.6,
          }}>
            Click the link in your email to sign in. If you don't see it, check your spam folder.
          </p>
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
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '16px' }}>
            <span style={{ fontFamily: "'Outfit'", fontWeight: 900, fontSize: '28px', color: C.charcoal }}>halka</span>
            <span style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '14px', color: C.saffron }}>हल्का</span>
          </div>
          <p style={{ fontSize: '13px', color: C.textMuted, lineHeight: 1.6 }}>Doctor-led weight loss for India</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSendLink} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: C.charcoal,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
              autoFocus
              style={{
                width: '100%',
                padding: '16px 16px',
                fontSize: '16px',
                border: `1.5px solid ${C.borderLight}`,
                borderRadius: '12px',
                background: C.cream,
                color: C.charcoal,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => e.target.style.borderColor = C.saffron}
              onBlur={(e) => e.target.style.borderColor = C.borderLight}
            />
          </div>

          {error && (
            <div style={{
              padding: '12px 16px',
              background: 'rgba(255, 59, 48, 0.1)',
              border: `1px solid rgba(255, 59, 48, 0.3)`,
              borderRadius: '8px',
              fontSize: '13px',
              color: '#FF3B30',
              lineHeight: 1.5,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email}
            style={{
              padding: '16px 24px',
              background: loading || !email ? 'rgba(232, 145, 58, 0.5)' : C.saffron,
              color: C.white,
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: loading || !email ? 'not-allowed' : 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: 'all 0.2s ease',
              marginTop: '8px',
            }}
          >
            {loading ? 'Sending...' : 'Send Login Link'}
          </button>
        </form>

        {/* Footer text */}
        <p style={{
          fontSize: '11px',
          color: C.textMuted,
          textAlign: 'center',
          marginTop: '24px',
          lineHeight: 1.6,
        }}>
          We'll send you a magic link to sign in securely.
        </p>
      </div>
    </div>
  );
}
