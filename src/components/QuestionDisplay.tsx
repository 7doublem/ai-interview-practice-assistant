'use client';

import React from 'react';
import { QuestionDisplayProps } from '@/types';

// Mobile-first responsive question display
const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ 
  question, 
  questionNumber
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
      {/* Question container with mobile-first responsive design */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8">
        {/* Question number indicator - mobile first */}
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center font-bold text-lg sm:text-xl md:text-2xl shadow-lg">
            {questionNumber}
          </div>
        </div>
        
        {/* Question text with responsive typography */}
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 text-center leading-relaxed">
          {question.text}
        </h2>
        
        {/* Supportive instruction text */}
        <p className="text-center text-gray-500 mt-3 sm:mt-4 text-xs sm:text-sm md:text-base">
          Take your time to think about your answer. There&apos;s no rush!
        </p>
      </div>
    </div>
  );
};

export default QuestionDisplay;