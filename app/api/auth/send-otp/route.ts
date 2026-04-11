import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Call Supabase Auth to send email OTP/magic link
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      console.error('Supabase email OTP error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to send email' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Check your email for the login link',
    });
  } catch (error) {
    console.error('Send email OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
