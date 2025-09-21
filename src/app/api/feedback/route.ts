import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client with API key from environment variables
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Interface for the feedback response structure
interface FeedbackResponse {
  summary: string;
  strengths: string[];
  areasToImprove: string[];
  nextStep: string;
  quality: number;
  relevance: number;
  addressed: boolean;
  score: number;
  motivationalPhrase: string;
}

// Interface for the request body
interface FeedbackRequest {
  question: string;
  answer: string;
  questionNumber: number;
  totalQuestions: number;
}

export async function POST(request: NextRequest) {
  try {
    // Log API key status in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API key loaded:', !!process.env.OPENAI_API_KEY);
    }

    // Parse the request body
    const body: FeedbackRequest = await request.json();
    const { question, answer, questionNumber, totalQuestions } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY || !openai) {
      console.log('OpenAI API key not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Create the prompt for structured feedback
    const prompt = `
You are an encouraging and supportive interview coach. Please provide structured feedback for this interview practice session.

Question: "${question}"
Student's Answer: "${answer}"
Progress: Question ${questionNumber} of ${totalQuestions}

Please provide feedback in the following JSON format:
{
  "summary": "A brief 2-3 sentence summary of your answer",
  "strengths": ["List 2-3 specific strengths from your answer"],
  "areasToImprove": ["List 2-3 specific areas for improvement with constructive suggestions"],
  "nextStep": "One specific actionable next step for improvement",
  "quality": 0,
  "relevance": 0,
  "addressed": true,
  "motivationalPhrase": "An encouraging 2-4 word phrase like 'Great progress!' or 'Keep it up!'"
}

Guidelines:
- Be supportive and encouraging, never harsh or critical
- Focus on specific, actionable feedback
- Use positive language even when suggesting improvements
- Write feedback directly to the student using “you/your” (second person), never third person
- Quality (0-100): clarity, structure, and evidence. Use the entire range, not just 80s–90s.
- Relevance (0-100): how directly the answer addresses the exact question. Use the entire range.
- Addressed (boolean): true if the question was actually answered, false otherwise.
- Do not hesitate to give 100 if the answer is exemplary (comprehensive, highly relevant, clearly structured).
- Ensure the JSON is valid and properly formatted, no markdown, no backticks.
`;

    // Call OpenAI API
    const model = 'gpt-4o-mini';
    console.log('Using model:', model);

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are a supportive interview coach. Respond ONLY with raw JSON in the exact format requested. ' +
            'Do not include markdown, backticks, code fencing, or extra commentary. ' +
            'Write all feedback directly to the student in second person (you/your). Never use third person. ' +
            'For numeric fields (quality, relevance), return integers only. Use the entire 0–100 range honestly. ' +
            'Weak answers should be low (<30). Average answers should be mid-range (50–69). ' +
            'Strong answers should be high (70–89). Excellent answers should be 90–99. ' +
            'Do not hesitate to give 100 when an answer is exemplary — comprehensive, highly relevant, and clearly structured. ' +
            'If the answer does not address the question, set addressed to false, set relevance very low (0–19), ' +
            'and explicitly tell the student how to refocus their answer. ' +
            'Scoring calibration: Weak irrelevant answers should score quality 20-30, relevance 10-20. ' +
            'Average partial answers should score quality 50-60, relevance 50-60. ' +
            'Strong clear answers should score quality 70-80, relevance 70-80. ' +
            'Perfect exemplary answers should score quality 90-100, relevance 90-100.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 600,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) throw new Error('No response from OpenAI');
    console.log('Raw OpenAI response:', responseText);

    // Parse the JSON response safely
    let feedback: FeedbackResponse;
    try {
      let cleanResponse = responseText.trim();

      if (cleanResponse.includes('```json')) {
        const jsonStart = cleanResponse.indexOf('```json') + 7;
        const jsonEnd = cleanResponse.indexOf('```', jsonStart);
        cleanResponse = cleanResponse.substring(jsonStart, jsonEnd).trim();
      } else if (cleanResponse.includes('```')) {
        const jsonStart = cleanResponse.indexOf('```') + 3;
        const jsonEnd = cleanResponse.indexOf('```', jsonStart);
        cleanResponse = cleanResponse.substring(jsonStart, jsonEnd).trim();
      }

      const jsonStart = cleanResponse.indexOf('{');
      const jsonEnd = cleanResponse.lastIndexOf('}') + 1;
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        cleanResponse = cleanResponse.substring(jsonStart, jsonEnd);
      }

      feedback = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      feedback = {
        summary:
          "Thank you for your thoughtful answer. You're making great progress in your interview preparation!",
        strengths: [
          'You provided a structured response',
          'You showed genuine interest in the field',
        ],
        areasToImprove: [
          'Consider adding more specific examples',
          'Try to be more concise in your delivery',
        ],
        nextStep: 'Practice incorporating specific examples into your answers',
        quality: 50,
        relevance: 50,
        addressed: true,
        score: 70,
        motivationalPhrase: 'Keep practicing!',
      };
    }

    // Normalize numeric fields
    const toInt = (n: any) =>
      Number.isFinite(+n) ? Math.round(+n) : 0;
    feedback.quality = Math.min(100, Math.max(0, toInt(feedback.quality)));
    feedback.relevance = Math.min(100, Math.max(0, toInt(feedback.relevance)));
    feedback.addressed = Boolean(feedback.addressed);

    // Guardrails: penalize short/irrelevant answers
    const trimmed = answer.trim();
    if (trimmed.length < 10) feedback.quality = Math.min(feedback.quality, 5);
    else if (trimmed.length < 30)
      feedback.quality = Math.min(feedback.quality, 20);
    else if (trimmed.length < 60)
      feedback.quality = Math.min(feedback.quality, 40);

    const stopwords = [
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
      'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has',
      'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may',
      'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she',
      'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
    ];
    const questionKeywords = question
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(
        (word) => word.length > 2 && !stopwords.includes(word)
      );

    const answerLower = trimmed.toLowerCase();
    const hasRelevantKeywords = questionKeywords.some((kw) =>
      answerLower.includes(kw)
    );

    if (!hasRelevantKeywords && trimmed.length < 60) {
      feedback.quality = Math.min(feedback.quality, 15);
      feedback.relevance = Math.min(feedback.relevance, 15);
      feedback.addressed = false;
    }

    // Compute final score
    const finalScore = Math.round(
      0.6 * (feedback.quality ?? 0) + 0.4 * (feedback.relevance ?? 0)
    );

    if (
      feedback.quality >= 95 &&
      feedback.relevance >= 95 &&
      feedback.addressed
    ) {
      feedback.score = 100;
    } else {
      feedback.score = finalScore;
    }

    // Clamp final scores
    feedback.quality = Math.max(0, Math.min(100, feedback.quality));
    feedback.relevance = Math.max(0, Math.min(100, feedback.relevance));
    feedback.score = Math.max(0, Math.min(100, feedback.score));

    if (process.env.NODE_ENV !== 'production') {
      console.log('Scoring details:', {
        quality: feedback.quality,
        relevance: feedback.relevance,
        addressed: feedback.addressed,
        finalScore,
      });
    }

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error generating feedback:', error);

    const fallbackFeedback: FeedbackResponse = {
      summary:
        "Thank you for your answer! You're doing great with your interview preparation.",
      strengths: [
        'You took the time to provide a thoughtful response',
        "You're actively practicing which shows dedication",
      ],
      areasToImprove: [
        'Continue practicing to build confidence',
        'Try to include more specific examples',
      ],
      nextStep: 'Keep practicing with different questions to build your skills',
      quality: 50,
      relevance: 50,
      addressed: false,
      score: 70,
      motivationalPhrase: "You're doing great!",
    };

    return NextResponse.json(fallbackFeedback);
  }
}

