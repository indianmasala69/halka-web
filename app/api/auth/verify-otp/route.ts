import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    // Validate inputs
    if (!email || !code) {
      return NextResponse.json(
        { error: 'Invalid email or code' },
        { status: 400 }
      );
    }

    // Verify email OTP/magic link with Supabase Auth
    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token: code,
      type: 'email',
    });

    if (error || !data.user) {
      console.error('Supabase email OTP verification error:', error);
      return NextResponse.json(
        { error: error?.message || 'Invalid or expired code' },
        { status: 400 }
      );
    }

    const userId = data.user.id;

    // Check if user profile exists
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', userId)
      .single();

    // If profile doesn't exist, create it
    if (!existingProfile) {
      const { error: createError } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          phone: '', // Empty for email-only auth
          created_at: new Date(),
          updated_at: new Date(),
        } as any);

      if (createError) {
        console.error('Error creating user profile:', createError);
        // Don't fail the whole request if profile creation fails
      }
    }

    // Return session data
    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      session: data.session,
    });
  } catch (error) {
    console.error('Verify email OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
