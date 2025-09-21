/**
 * Hardcoded interview questions for the practice session
 * These questions are designed to test various aspects of medical school preparation
 */
export const INTERVIEW_QUESTIONS = [
  "Why do you want to study medicine?",
  "Tell me about a time you overcame a challenge.",
  "What qualities make a good doctor?",
  "How would you explain a complex idea to someone with no background knowledge?",
  "What motivates you to pursue your chosen field?"
] as const;

export type Question = typeof INTERVIEW_QUESTIONS[number];