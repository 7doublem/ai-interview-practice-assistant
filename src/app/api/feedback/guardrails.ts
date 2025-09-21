import { FeedbackResponse } from './types';

/**
 * Stopwords for keyword extraction
 */
const STOPWORDS = [
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
  'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has',
  'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may',
  'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she',
  'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
];

/**
 * Extracts keywords from a question for relevance checking
 */
function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOPWORDS.includes(word));
}

/**
 * Applies length-based quality penalties for short answers
 */
function applyLengthPenalties(feedback: FeedbackResponse, answer: string): FeedbackResponse {
  const trimmed = answer.trim();
  
  if (trimmed.length < 10) {
    feedback.quality = Math.min(feedback.quality, 5);
  } else if (trimmed.length < 30) {
    feedback.quality = Math.min(feedback.quality, 20);
  } else if (trimmed.length < 60) {
    feedback.quality = Math.min(feedback.quality, 40);
  }
  
  return feedback;
}

/**
 * Applies relevance penalties for answers that don't address the question
 */
function applyRelevancePenalties(
  feedback: FeedbackResponse, 
  question: string, 
  answer: string
): FeedbackResponse {
  const trimmed = answer.trim();
  const questionKeywords = extractKeywords(question);
  const answerLower = trimmed.toLowerCase();
  
  const hasRelevantKeywords = questionKeywords.some(keyword =>
    answerLower.includes(keyword)
  );

  if (!hasRelevantKeywords && trimmed.length < 60) {
    feedback.quality = Math.min(feedback.quality, 15);
    feedback.relevance = Math.min(feedback.relevance, 15);
    feedback.addressed = false;
  }
  
  return feedback;
}

/**
 * Applies all guardrails to ensure fair scoring
 */
export function applyGuardrails(
  feedback: FeedbackResponse,
  question: string,
  answer: string
): FeedbackResponse {
  let result = { ...feedback };
  
  result = applyLengthPenalties(result, answer);
  result = applyRelevancePenalties(result, question, answer);
  
  return result;
}
