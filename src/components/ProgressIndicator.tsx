import React from 'react';

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
  completedCount: number;
}

/**
 * Progress indicator showing current question and completion percentage based on submitted answers
 * Progress bar reflects only completed submissions, not current question position
 */
export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentQuestion,
  totalQuestions,
  completedCount
}) => {
  const progressPercentage = (completedCount / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Progress Labels */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm text-gray-500 font-medium">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-500 ease-out shadow-lg"
          style={{ width: `${progressPercentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};