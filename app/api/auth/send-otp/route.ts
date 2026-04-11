import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    // Validate phone
    if (!phone || phone.length < 10) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Format phone number (ensure it starts with +91 for India)
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    // Call Supabase Auth to send OTP
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    });

    if (error) {
      console.error('Supabase OTP error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to send OTP' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      sessionId: data?.session?.id,
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
