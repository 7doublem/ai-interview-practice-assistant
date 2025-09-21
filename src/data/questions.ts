// Hardcoded interview questions for the practice session
import { InterviewQuestion } from '@/types';

// Array of five interview questions for medical school preparation
export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 1,
    text: "Why do you want to study medicine?"
  },
  {
    id: 2,
    text: "Tell me about a time you overcame a challenge."
  },
  {
    id: 3,
    text: "What qualities make a good doctor?"
  },
  {
    id: 4,
    text: "How would you explain a complex idea to someone with no background knowledge?"
  },
  {
    id: 5,
    text: "What motivates you to pursue your chosen field?"
  }
];

// Total number of questions in the practice session
export const TOTAL_QUESTIONS = INTERVIEW_QUESTIONS.length;
