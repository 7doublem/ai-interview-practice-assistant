'use client';

import React from 'react';
import { CheckCircle, Edit3, ArrowRight, Star } from 'lucide-react';
import { FeedbackDisplayProps } from '@/types';

// Component for displaying AI-generated feedback in structured sections
const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ 
  feedback, 
  questionNumber, 
  totalQuestions 
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Feedback header with score */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg">
          <Star className="w-5 h-5" />
          <span className="font-semibold">Score: {feedback.score}/100</span>
        </div>
        <p className="text-lg text-gray-600 mt-2 font-medium">
          {feedback.motivationalPhrase}
        </p>
      </div>

      {/* Summary section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">📝</span>
          </div>
          Summary
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {feedback.summary}
        </p>
      </div>

      {/* Strengths section with green/teal styling */}
      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-lg border border-green-100 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          Strengths
        </h3>
        <ul className="space-y-3">
          {feedback.strengths.map((strength, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700 leading-relaxed">{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Areas to Improve section with orange/yellow styling */}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-lg border border-orange-100 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mr-3">
            <Edit3 className="w-5 h-5 text-white" />
          </div>
          Areas to Improve
        </h3>
        <ul className="space-y-3">
          {feedback.areasToImprove.map((area, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700 leading-relaxed">{area}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next Step section with cyan accent */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl shadow-lg border border-cyan-100 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
          Next Step
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {feedback.nextStep}
        </p>
      </div>

      {/* Progress indicator for next question */}
      {questionNumber < totalQuestions && (
        <div className="text-center pt-4">
          <p className="text-gray-500 text-sm">
            Ready for the next question? Click &quot;Continue&quot; when you&apos;re ready.
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackDisplay;
