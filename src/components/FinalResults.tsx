'use client';

import React from 'react';
import { RotateCcw, Star } from 'lucide-react';
import { FinalResultsProps } from '@/types';

// Component for displaying final results and session completion
const FinalResults: React.FC<FinalResultsProps> = ({ 
  totalScore, 
  answers, 
  onRestart 
}) => {
  // Calculate average score
  const averageScore = Math.round(totalScore / answers.length);
  
  // Generate score-based motivational message
  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Outstanding work! You're interview-ready!";
    if (score >= 80) return "Excellent performance! You're doing great!";
    if (score >= 70) return "Good job! Keep practicing to improve further!";
    return "Great effort! Practice makes perfect!";
  };

  // Generate score-based emoji
  const getScoreEmoji = (score: number) => {
    if (score >= 90) return "🏆";
    if (score >= 80) return "⭐";
    if (score >= 70) return "👍";
    return "💪";
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-center space-y-8 animate-fadeIn">
      {/* Final score display */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="mb-6">
          <div className="text-6xl mb-4">{getScoreEmoji(averageScore)}</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Practice Session Complete!
          </h2>
          <p className="text-lg text-gray-600">
            {getScoreMessage(averageScore)}
          </p>
        </div>

        {/* Score display with gradient styling */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-6 mb-6">
          <div className="text-4xl font-bold mb-2">{averageScore}/100</div>
          <div className="text-lg opacity-90">Overall Score</div>
        </div>

        {/* Session summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800">{answers.length}</div>
            <div className="text-sm text-gray-600">Questions Answered</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800">{averageScore}%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800">
              {Math.round((Date.now() - new Date(answers[0]?.timestamp).getTime()) / 60000)}m
            </div>
            <div className="text-sm text-gray-600">Time Spent</div>
          </div>
        </div>

        {/* Individual question scores */}
        <div className="text-left">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Question Breakdown</h3>
          <div className="space-y-3">
            {answers.map((answer, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <span className="text-sm text-gray-700">Question {index + 1}</span>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-gray-800">{answer.feedback.score}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Practice Again</span>
        </button>
        
        <button
          onClick={() => window.print()}
          className="bg-white border-2 border-gray-200 hover:border-cyan-400 text-gray-700 hover:text-cyan-600 font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Print Results
        </button>
      </div>

      {/* Encouraging message */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100">
        <p className="text-gray-700 leading-relaxed">
          <strong>Keep practicing!</strong> Each interview practice session helps you become more confident and prepared. 
          Remember, the key to success is consistent practice and learning from feedback.
        </p>
      </div>
    </div>
  );
};

export default FinalResults;
