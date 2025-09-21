import { NextRequest, NextResponse } from 'next/server';
import { FeedbackRequest, FeedbackResponse } from './types';
import { createOpenAIClient, generateFeedback } from './openai-client';
import { normalizeNumericFields } from './feedback-parser';
import { applyGuardrails } from './guardrails';
import { computeFinalScore, clampScores } from './scoring';
import { PARSE_ERROR_FALLBACK, API_ERROR_FALLBACK } from './fallback-responses';

export async function POST(request: NextRequest) {
  try {
    // Log API key status in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API key loaded:', !!process.env.OPENAI_API_KEY);
    }

    // Parse and validate request body
    const body: FeedbackRequest = await request.json();
    const { question, answer, questionNumber, totalQuestions } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    // Initialize OpenAI client
    const openai = createOpenAIClient();
    if (!openai) {
      console.log('OpenAI API key not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Generate feedback from OpenAI
    let feedback: FeedbackResponse;
    try {
      feedback = await generateFeedback(openai, question, answer, questionNumber, totalQuestions);
    } catch (parseError) {
      console.error('Failed to generate feedback:', parseError);
      feedback = PARSE_ERROR_FALLBACK;
    }

    // Process and score the feedback
    feedback = normalizeNumericFields(feedback);
    feedback = applyGuardrails(feedback, question, answer);
    feedback.score = computeFinalScore(feedback);
    feedback = clampScores(feedback);

    // Log scoring details in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('Scoring details:', {
        quality: feedback.quality,
        relevance: feedback.relevance,
        addressed: feedback.addressed,
        finalScore: feedback.score,
      });
    }

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error generating feedback:', error);
    return NextResponse.json(API_ERROR_FALLBACK);
  }
}

