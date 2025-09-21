'use client';

import React, { useState, useCallback } from 'react';
import Header from '@/components/Header';
import ProgressIndicator from '@/components/ProgressIndicator';
import QuestionDisplay from '@/components/QuestionDisplay';
import AnswerInput from '@/components/AnswerInput';
import FeedbackDisplay from '@/components/FeedbackDisplay';
import FinalResults from '@/components/FinalResults';
import { INTERVIEW_QUESTIONS, TOTAL_QUESTIONS } from '@/data/questions';
import { AppState, AnswerWithFeedback, FeedbackResponse } from '@/types';

// Main application component managing the interview practice flow
export default function HomePage() {
  // Application state management
  const [appState, setAppState] = useState<AppState>({
    currentQuestionIndex: 0,
    answers: [],
    isSubmitting: false,
    error: null,
    isCompleted: false,
    totalScore: 0,
  });

  // Get current question
  const currentQuestion = INTERVIEW_QUESTIONS[appState.currentQuestionIndex];

  // Handle answer submission and API call
  const handleAnswerSubmit = useCallback(async (answer: string) => {
    setAppState(prev => ({ ...prev, isSubmitting: true, error: null }));

    try {
      // Prepare request data for the API
      const requestData = {
        question: currentQuestion.text,
        answer: answer,
        questionNumber: appState.currentQuestionIndex + 1,
        totalQuestions: TOTAL_QUESTIONS,
      };

      // Call the feedback API
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the feedback response
      const feedback: FeedbackResponse = await response.json();

      // Create answer with feedback object
      const answerWithFeedback: AnswerWithFeedback = {
        questionId: currentQuestion.id,
        question: currentQuestion.text,
        answer: answer,
        feedback: feedback,
        timestamp: new Date(),
      };

      // Update application state with new answer
      setAppState(prev => ({
        ...prev,
        answers: [...prev.answers, answerWithFeedback],
        totalScore: prev.totalScore + feedback.score,
        isSubmitting: false,
        error: null,
      }));

    } catch (error) {
      console.error('Error submitting answer:', error);
      
      // Set user-friendly error message
      const errorMessage = error instanceof Error 
        ? 'Sorry, there was an issue getting your feedback. Please try again.'
        : 'An unexpected error occurred. Please try again.';
      
      setAppState(prev => ({
        ...prev,
        isSubmitting: false,
        error: errorMessage,
      }));
    }
  }, [currentQuestion, appState.currentQuestionIndex]);

  // Handle moving to next question
  const handleNextQuestion = useCallback(() => {
    const nextIndex = appState.currentQuestionIndex + 1;
    
    if (nextIndex >= TOTAL_QUESTIONS) {
      // Mark session as completed
      setAppState(prev => ({ ...prev, isCompleted: true }));
    } else {
      // Move to next question
      setAppState(prev => ({ ...prev, currentQuestionIndex: nextIndex }));
    }
  }, [appState.currentQuestionIndex]);

  // Handle restarting the practice session
  const handleRestart = useCallback(() => {
    setAppState({
      currentQuestionIndex: 0,
      answers: [],
      isSubmitting: false,
      error: null,
      isCompleted: false,
      totalScore: 0,
    });
  }, []);

  // Render different views based on application state
  if (appState.isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <FinalResults
            totalScore={appState.totalScore}
            answers={appState.answers}
            onRestart={handleRestart}
          />
        </main>
      </div>
    );
  }

  // Check if we're showing feedback for the current question
  const currentAnswer = appState.answers.find(
    answer => answer.questionId === currentQuestion.id
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Progress indicator */}
        <ProgressIndicator
          currentQuestion={appState.currentQuestionIndex + 1}
          totalQuestions={TOTAL_QUESTIONS}
        />

        {/* Question display */}
        <QuestionDisplay
          question={currentQuestion}
          questionNumber={appState.currentQuestionIndex + 1}
          totalQuestions={TOTAL_QUESTIONS}
        />

        {/* Conditional rendering based on whether feedback is available */}
        {currentAnswer ? (
          // Show feedback if available
          <div className="space-y-6">
            <FeedbackDisplay
              feedback={currentAnswer.feedback}
              questionNumber={appState.currentQuestionIndex + 1}
              totalQuestions={TOTAL_QUESTIONS}
            />
            
            {/* Continue button */}
            <div className="flex justify-center">
              <button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {appState.currentQuestionIndex + 1 >= TOTAL_QUESTIONS 
                  ? 'View Results' 
                  : 'Continue to Next Question'
                }
              </button>
            </div>
          </div>
        ) : (
          // Show answer input if no feedback yet
          <AnswerInput
            onSubmit={handleAnswerSubmit}
            isSubmitting={appState.isSubmitting}
            error={appState.error}
          />
        )}
      </main>
    </div>
  );
}