'use client';

import React from 'react';

// Header component displaying the AVA app name with gradient styling
const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main app title with purple-to-blue gradient */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
          AVA
        </h1>
        {/* Subtitle with subtle styling */}
        <p className="text-gray-600 text-lg">
          Interview Practice Assistant
        </p>
      </div>
    </header>
  );
};

export default Header;
