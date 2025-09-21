'use client';

import React, { useState } from 'react';
import { AnswerInputProps } from '@/types';

// Mobile-first responsive answer input component
const AnswerInput: React.FC<AnswerInputProps> = ({ 
  onSubmit, 
  isSubmitting, 
  error 
}) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (answer.trim().length === 0) {
      return;
    }
    
    onSubmit(answer.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-0">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Text area with mobile-first responsive design */}
        <div className="relative">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here... Take your time to think about your response."
            className="w-full h-32 sm:h-40 md:h-48 p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl resize-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200 text-gray-800 placeholder-gray-400 text-sm sm:text-base"
            disabled={isSubmitting}
          />
          
          {/* Character count - mobile positioning */}
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 text-xs text-gray-400">
            {answer.length} characters
          </div>
        </div>

        {/* Error message display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
            <p className="text-red-600 text-xs sm:text-sm">{error}</p>
          </div>
        )}

        {/* Submit button with mobile-first responsive design */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting || answer.trim().length === 0}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Getting Feedback...</span>
              </div>
            ) : (
              'Submit Answer'
            )}
          </button>
        </div>

        {/* Helper text - mobile responsive */}
        <p className="text-center text-gray-500 text-xs sm:text-sm">
          Press Enter to submit, or Shift+Enter for a new line
        </p>
      </form>
    </div>
  );
};

export default AnswerInput;