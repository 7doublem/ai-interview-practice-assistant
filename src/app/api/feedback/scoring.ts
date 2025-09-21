import { FeedbackResponse } from './types';

/**
 * Computes the final score based on quality and relevance
 */
export function computeFinalScore(feedback: FeedbackResponse): number {
  const finalScore = Math.round(
    0.6 * (feedback.quality ?? 0) + 0.4 * (feedback.relevance ?? 0)
  );

  // Award perfect score for exceptional answers
  if (
    feedback.quality >= 95 &&
    feedback.relevance >= 95 &&
    feedback.addressed
  ) {
    return 100;
  }
  
  return finalScore;
}

/**
 * Clamps all scores to valid 0-100 range
 */
export function clampScores(feedback: FeedbackResponse): FeedbackResponse {
  return {
    ...feedback,
    quality: Math.max(0, Math.min(100, feedback.quality)),
    relevance: Math.max(0, Math.min(100, feedback.relevance)),
    score: Math.max(0, Math.min(100, feedback.score)),
  };
}
