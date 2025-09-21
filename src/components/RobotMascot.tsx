import React from 'react';
import Image from 'next/image';

/**
 * Friendly robot mascot using a custom SVG asset
 * Clean, cartoon-style design that's engaging and professional
 */
export const RobotMascot: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/images/ava-robot.svg"
        alt="AVA Robot Assistant"
        width={528}
        height={312}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-lg"
        priority
      />
    </div>
  );
};
