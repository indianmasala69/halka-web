import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();

    // Validate inputs
    if (!phone || !otp || otp.length !== 6) {
      return NextResponse.json(
        { error: 'Invalid phone or OTP' },
        { status: 400 }
      );
    }

    // Format phone number
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    // Verify OTP with Supabase Auth
    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: 'sms',
    });

    if (error || !data.user) {
      console.error('Supabase OTP verification error:', error);
      return NextResponse.json(
        { error: error?.message || 'Invalid OTP' },
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
          phone: formattedPhone,
          created_at: new Date(),
          updated_at: new Date(),
        });

      if (createError) {
        console.error('Error creating user profile:', createError);
        return NextResponse.json(
          { error: 'Failed to create user profile' },
          { status: 500 }
        );
      }
    }

    // Return session data
    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
      user: {
        id: data.user.id,
        phone: data.user.phone,
      },
      session: data.session,
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
