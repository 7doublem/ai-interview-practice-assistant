import OpenAI from 'openai';
import { SYSTEM_MESSAGE, createUserPrompt } from './prompts';
import { parseFeedbackResponse } from './feedback-parser';
import { FeedbackResponse } from './types';

/**
 * Initialize OpenAI client with API key from environment variables
 */
export function createOpenAIClient(): OpenAI | null {
  return process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;
}

/**
 * Calls OpenAI API to generate feedback
 */
export async function generateFeedback(
  openai: OpenAI,
  question: string,
  answer: string,
  questionNumber: number,
  totalQuestions: number
): Promise<FeedbackResponse> {
  const model = 'gpt-4o-mini';
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Using model:', model);
  }

  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: SYSTEM_MESSAGE },
      { 
        role: 'user', 
        content: createUserPrompt(question, answer, questionNumber, totalQuestions) 
      },
    ],
    temperature: 0.6,
    max_tokens: 600,
  });

  const responseText = completion.choices[0]?.message?.content;
  if (!responseText) {
    throw new Error('No response from OpenAI');
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('Raw OpenAI response:', responseText);
  }

  return parseFeedbackResponse(responseText);
}
