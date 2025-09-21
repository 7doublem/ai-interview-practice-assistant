import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client with API key from environment variables
// Only initialize if API key is available (prevents build-time errors)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// Interface for the feedback response structure
interface FeedbackResponse {
  summary: string;
  strengths: string[];
  areasToImprove: string[];
  nextStep: string;
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
    // Parse the request body
    const body: FeedbackRequest = await request.json();
    const { question, answer, questionNumber, totalQuestions } = body;

    // Validate required fields
    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || !openai) {
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
  "summary": "A brief 2-3 sentence summary of their answer",
  "strengths": ["List 2-3 specific strengths from their answer"],
  "areasToImprove": ["List 2-3 specific areas for improvement with constructive suggestions"],
  "nextStep": "One specific actionable next step for improvement",
  "score": 85,
  "motivationalPhrase": "An encouraging 2-4 word phrase like 'Great progress!' or 'Keep it up!'"
}

Guidelines:
- Be supportive and encouraging, never harsh or critical
- Focus on specific, actionable feedback
- Use positive language even when suggesting improvements
- Score should be between 60-100 (most students should get 70+)
- Keep all text concise and student-friendly
- Ensure the JSON is valid and properly formatted
`;

    // Call OpenAI API for feedback generation
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a supportive interview coach. Always respond with valid JSON in the exact format requested.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Extract and parse the response
    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    let feedback: FeedbackResponse;
    try {
      feedback = JSON.parse(responseText);
    } catch {
      // If JSON parsing fails, create a fallback response
      feedback = {
        summary: "Thank you for your thoughtful answer. You're making great progress in your interview preparation!",
        strengths: ["You provided a structured response", "You showed genuine interest in the field"],
        areasToImprove: ["Consider adding more specific examples", "Try to be more concise in your delivery"],
        nextStep: "Practice incorporating specific examples into your answers",
        score: 75,
        motivationalPhrase: "Keep practicing!"
      };
    }

    // Validate the response structure
    if (!feedback.summary || !feedback.strengths || !feedback.areasToImprove || !feedback.nextStep) {
      throw new Error('Invalid feedback structure received');
    }

    // Ensure score is within valid range
    if (feedback.score < 60) feedback.score = 60;
    if (feedback.score > 100) feedback.score = 100;

    return NextResponse.json(feedback);

  } catch (error) {
    console.error('Error generating feedback:', error);
    
    // Return a fallback response in case of errors
    const fallbackFeedback: FeedbackResponse = {
      summary: "Thank you for your answer! You're doing great with your interview preparation.",
      strengths: ["You took the time to provide a thoughtful response", "You're actively practicing which shows dedication"],
      areasToImprove: ["Continue practicing to build confidence", "Try to include more specific examples"],
      nextStep: "Keep practicing with different questions to build your skills",
      score: 70,
      motivationalPhrase: "You're doing great!"
    };

    return NextResponse.json(fallbackFeedback);
  }
}
