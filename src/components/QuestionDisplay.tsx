'use client';

import React from 'react';
import { QuestionDisplayProps } from '@/types';

// Component for displaying the current interview question
const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ 
  question, 
  questionNumber
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      {/* Question container with subtle background and border */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        {/* Question number indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
            {questionNumber}
          </div>
        </div>
        
        {/* Question text with proper typography */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center leading-relaxed">
          {question.text}
        </h2>
        
        {/* Subtle instruction text */}
        <p className="text-center text-gray-500 mt-4 text-sm">
          Take your time to think about your answer. There&apos;s no rush!
        </p>
      </div>
    </div>
  );
};

export default QuestionDisplay;
