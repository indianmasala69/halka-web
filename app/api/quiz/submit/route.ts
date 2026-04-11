import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { answers } = await request.json();

    // Get current user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user?.id;

    // Save quiz response
    const { data: quizData, error: quizError } = await supabase
      .from('quiz_responses')
      .insert({
        user_id: userId,
        gender: answers.gender,
        age_group: answers.age,
        height_cm: parseFloat(answers.height),
        weight_kg: parseFloat(answers.weight),
        target_weight_kg: parseFloat(answers.target),
        conditions: answers.conditions,
        diet_preference: answers.diet,
        commitment_level: answers.commitment,
        created_at: new Date(),
      })
      .select()
      .single();

    if (quizError) {
      console.error('Error saving quiz response:', quizError);
      return NextResponse.json(
        { error: quizError.message || 'Failed to save quiz' },
        { status: 400 }
      );
    }

    // Calculate health metrics
    const height = parseFloat(answers.height) / 100;
    const weight = parseFloat(answers.weight);
    const target = parseFloat(answers.target);

    const bmi = height && weight ? weight / (height * height) : 0;
    const weightToLose = weight && target ? weight - target : 0;
    const recommendedProgram = bmi > 27 ? 'GLP-1 Program' : 'Starter Program';

    // Save or update health profile
    const { error: healthError } = await supabase
      .from('user_health_profiles')
      .upsert({
        user_id: userId,
        bmi: parseFloat(bmi.toFixed(1)),
        weight_to_lose_kg: parseFloat(weightToLose.toFixed(1)),
        recommended_program: recommendedProgram,
        created_at: new Date(),
        updated_at: new Date(),
      });

    if (healthError) {
      console.error('Error saving health profile:', healthError);
      // Don't fail the whole request if health profile save fails
    }

    return NextResponse.json({
      success: true,
      message: 'Quiz submitted successfully',
      quiz: quizData,
      health: {
        bmi: parseFloat(bmi.toFixed(1)),
        weight_to_lose_kg: parseFloat(weightToLose.toFixed(1)),
        recommended_program: recommendedProgram,
      },
    });
  } catch (error) {
    console.error('Quiz submit error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
