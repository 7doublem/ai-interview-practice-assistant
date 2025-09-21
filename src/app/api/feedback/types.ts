/**
 * Interface for the feedback response structure
 */
export interface FeedbackResponse {
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

/**
 * Interface for the request body
 */
export interface FeedbackRequest {
  question: string;
  answer: string;
  questionNumber: number;
  totalQuestions: number;
}
