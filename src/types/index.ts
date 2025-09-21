// Type definitions for the interview practice application

// Interface for individual interview questions
export interface InterviewQuestion {
  id: number;
  text: string;
}

// Interface for AI-generated feedback response
export interface FeedbackResponse {
  summary: string;
  strengths: string[];
  areasToImprove: string[];
  nextStep: string;
  score: number;
  motivationalPhrase: string;
}

// Interface for storing user answers and feedback
export interface AnswerWithFeedback {
  questionId: number;
  question: string;
  answer: string;
  feedback: FeedbackResponse;
  timestamp: Date;
}

// Application state interface
export interface AppState {
  currentQuestionIndex: number;
  answers: AnswerWithFeedback[];
  isSubmitting: boolean;
  error: string | null;
  isCompleted: boolean;
  totalScore: number;
}

// Props interfaces for components
export interface QuestionDisplayProps {
  question: InterviewQuestion;
  questionNumber: number;
  totalQuestions: number;
}

export interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isSubmitting: boolean;
  error: string | null;
}

export interface FeedbackDisplayProps {
  feedback: FeedbackResponse;
  questionNumber: number;
  totalQuestions: number;
}

export interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
}

export interface FinalResultsProps {
  totalScore: number;
  answers: AnswerWithFeedback[];
  onRestart: () => void;
}
