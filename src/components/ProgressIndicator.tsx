'use client';

import React from 'react';
import { ProgressIndicatorProps } from '@/types';

// Progress indicator component showing current question number
const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentQuestion, 
  totalQuestions 
}) => {
  // Calculate progress percentage for the progress bar
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Progress text */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-gray-600">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      
      {/* Progress bar with gradient styling */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
