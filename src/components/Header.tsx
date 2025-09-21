import React from 'react';
import { RobotMascot } from './RobotMascot';

/**
 * Header component that displays the AVA branding with the robot mascot
 * Positioned prominently at the top with inline layout
 */
export const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 max-w-6xl mx-auto w-full">
      {/* Title Section - Perfectly centered */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
          AVA
        </h1>
        
        {/* Robot Mascot - Positioned above subtitle */}
        <div className="flex justify-center mt-2 mb-1">
          <RobotMascot />
        </div>
        
        <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">
          Your AI Interview Practice Assistant
        </p>
      </div>
    </header>
  );
};