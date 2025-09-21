'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { QuestionCard } from '@/components/QuestionCard';
import { AnswerCard } from '@/components/AnswerCard';
import { INTERVIEW_QUESTIONS } from '@/data/questions';

/**
 * Main application page that orchestrates the interview practice session
 * Features a clean, above-the-fold layout with modular components
 */
export default function HomePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Single boolean to control review state
  const [isReviewing, setIsReviewing] = useState(false);

  const currentQuestion = INTERVIEW_QUESTIONS[currentQuestionIndex];
  const totalQuestions = INTERVIEW_QUESTIONS.length;

  /**
   * Handles answer submission and transitions to State B (reviewing)
   * @param answer - The user's submitted answer
   */
  const handleAnswerSubmit = async (answer: string) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('Sending request to /api/feedback');
      
      // Call the AI feedback API
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentQuestion,
          answer: answer,
          questionNumber: currentQuestionIndex + 1,
          totalQuestions: totalQuestions,
        }),
      });

      console.log('Received response:', response.status, response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get feedback');
      }

      const feedback = await response.json();
      console.log('Parsed feedback:', feedback);
      
      // Store the feedback and transition to review state
      setCurrentFeedback(feedback);
      setIsReviewing(true);
      console.log('AI Feedback received:', feedback);
      
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      
      // Increment completed count only on successful submission
      setCompletedCount(prev => prev + 1);
      
    } catch (error) {
      console.error('Error submitting answer:', error);
      setError(error instanceof Error ? error.message : 'Failed to get AI feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles advancing to the next question and transitioning back to answering state
   */
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSessionComplete(true);
    }
    
    // Clear feedback and transition back to answering state
    setCurrentFeedback(null);
    setError(null);
    setIsReviewing(false);
  };

  /**
   * Resets the session to start over from the first question
   */
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsSessionComplete(false);
    setIsSubmitting(false);
    setCompletedCount(0);
    setCurrentFeedback(null);
    setError(null);
    setIsReviewing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex flex-col">
      
      {/* Header with Robot Mascot */}
      <Header />

      {/* Main Content - Optimized for above-the-fold viewing */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-2 space-y-4 max-w-6xl mx-auto w-full">
        
                {/* Progress Indicator */}
                <ProgressIndicator 
                  currentQuestion={currentQuestionIndex + 1}
                  totalQuestions={totalQuestions}
                  completedCount={completedCount}
                />

        {/* Question Card */}
        <QuestionCard 
          questionNumber={currentQuestionIndex + 1}
          question={currentQuestion}
        />

        {/* Answer Card - only show when not reviewing */}
        {!isSessionComplete && !isReviewing && (
          <AnswerCard 
            placeholder={`Share your thoughts about: ${currentQuestion.toLowerCase()}...`}
            onSubmit={handleAnswerSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        {/* AI Feedback Display - only show when reviewing */}
        {!isSessionComplete && isReviewing && currentFeedback && (
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">AVA Feedback</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Summary</h4>
                  <p className="text-gray-600">{currentFeedback.summary}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Strengths</h4>
                  <ul className="space-y-1">
                    {currentFeedback.strengths?.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✅</span>
                        <span className="text-gray-600">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Areas to Improve</h4>
                  <ul className="space-y-1">
                    {currentFeedback.areasToImprove?.map((area: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">✏️</span>
                        <span className="text-gray-600">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Next Step</h4>
                  <p className="text-gray-600">{currentFeedback.nextStep}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-sm text-gray-500">Score: </span>
                    <span className="font-semibold text-gray-800">{currentFeedback.score}/100</span>
                  </div>
                  <div className="text-sm font-medium text-purple-600">
                    {currentFeedback.motivationalPhrase}
                  </div>
                </div>
              </div>
            </div>

            {/* Go to Next Question Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleNextQuestion}
                className="px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 transform bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 hover:from-purple-700 hover:to-blue-700"
              >
                Go to Next Question
              </button>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Session Complete State */}
        {isSessionComplete && (
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Great job! Session Complete
              </h2>
              <p className="text-gray-600 mb-6">
                You've completed all {totalQuestions} interview questions. 
                Your responses have been recorded for review.
              </p>
              <button
                onClick={handleRestart}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                Start New Session
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>© 2024 AVA - AI Interview Practice Assistant</p>
      </footer>
    </div>
  );
}