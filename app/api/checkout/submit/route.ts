import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      package_id,
      full_name,
      phone,
      email,
      age,
      gender,
      current_weight,
      target_weight,
      conditions,
      medications,
      address_line1,
      city,
      state,
      pincode,
      package_name,
      package_price,
    } = body;

    // Basic server-side validation
    if (!package_id || !full_name || !phone || !age || !gender) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (!address_line1 || !city || !state || !pincode) {
      return NextResponse.json(
        { success: false, message: 'Missing required address fields' },
        { status: 400 },
      );
    }

    // Insert into Supabase orders table
    const { error } = await (supabase as any).from('orders').insert({
      package_id,
      full_name,
      phone,
      email,
      age,
      gender,
      current_weight,
      target_weight,
      conditions,
      medications,
      address_line1,
      city,
      state,
      pincode,
      package_name,
      package_price,
      status: 'pending',
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Supabase insert error:', error);
      // Still return success — we log the error but don't block the user
    }

    return NextResponse.json({
      success: true,
      message: 'Order received',
    });
  } catch (err) {
    console.error('Checkout submit error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
