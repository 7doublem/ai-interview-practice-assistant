import React from 'react';

interface QuestionCardProps {
  questionNumber: number;
  question: string;
}

/**
 * Question display card with professional styling and visual hierarchy
 * Features gradient badge, clean typography, and subtle shadows
 */
export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  question
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center relative overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 pointer-events-none"></div>
        
        {/* Question Number Badge */}
        <div className="relative z-10 flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">{questionNumber}</span>
          </div>
        </div>

        {/* Question Text */}
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed mb-4">
            {question}
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            Take your time to think about your answer. There's no rush!
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-purple-200 rounded-full opacity-60"></div>
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-blue-200 rounded-full opacity-40"></div>
      </div>
    </div>
  );
};
