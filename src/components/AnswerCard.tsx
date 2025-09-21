import React, { useState, useRef } from 'react';

interface AnswerCardProps {
  placeholder: string;
  onSubmit: (answer: string) => void;
  isSubmitting?: boolean; // Show submitting state
}

/**
 * Answer input card for answering questions
 * Shows textarea, helper text, and submit button with Enter-to-submit behavior
 */
export const AnswerCard: React.FC<AnswerCardProps> = ({
  placeholder,
  onSubmit,
  isSubmitting = false
}) => {
  const [answer, setAnswer] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (answer.trim() && !isSubmitting) {
      onSubmit(answer.trim());
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 pointer-events-none"></div>
        
        <div className="relative z-10">
          {/* Label */}
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            Your Answer
          </label>

          {/* Answer Input Form */}
          <form onSubmit={handleSubmit}>
            {/* Textarea Container */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={`w-full h-32 p-4 border-2 rounded-xl resize-none text-gray-700 placeholder-gray-400 transition-all duration-200 focus:outline-none ${
                  isFocused 
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20 bg-white' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              />
              
              {/* Character Counter */}
              <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/90 px-2 py-1 rounded">
                {answer.length} characters
              </div>
            </div>

            {/* Helper Text */}
            <div className="text-center mt-2 text-sm text-gray-500">
              Press Enter to submit • Shift+Enter for a new line
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={!answer.trim() || isSubmitting}
                className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                  answer.trim() && !isSubmitting
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 hover:from-purple-700 hover:to-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Answer'}
              </button>
            </div>
          </form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-200 rounded-full opacity-60"></div>
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-purple-200 rounded-full opacity-40"></div>
      </div>
    </div>
  );
};
