import { FeedbackResponse } from './types';

/**
 * Fallback response when JSON parsing fails
 */
export const PARSE_ERROR_FALLBACK: FeedbackResponse = {
  summary: "Thank you for your thoughtful answer. You're making great progress in your interview preparation!",
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

/**
 * Fallback response when API call fails
 */
export const API_ERROR_FALLBACK: FeedbackResponse = {
  summary: "Thank you for your answer! You're doing great with your interview preparation.",
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
