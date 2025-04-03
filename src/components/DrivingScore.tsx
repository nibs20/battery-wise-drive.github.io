
import React from 'react';
import { Sparkles } from 'lucide-react';

interface DrivingScoreProps {
  score: number;
}

const DrivingScore = ({ score }: DrivingScoreProps) => {
  // Calculate color based on score
  const getColor = () => {
    if (score >= 8) return 'battery-green';
    if (score >= 5) return 'battery-teal';
    if (score >= 3) return 'battery-warning';
    return 'battery-danger';
  };
  
  const percentage = `${score * 10}%`;
  const color = getColor();
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className="score-ring" 
        style={{ 
          '--percentage': percentage, 
          '--color-end': `var(--tw-colors-${color})` 
        } as React.CSSProperties}
      >
        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center flex-col">
          <div className="text-4xl font-bold">{score}</div>
          <div className="text-xs text-gray-500">out of 10</div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="font-medium text-gray-800">Your Driving Score</p>
        {score >= 8 && (
          <p className="text-battery-green text-sm mt-1 flex items-center justify-center">
            <Sparkles className="h-4 w-4 mr-1" />
            Excellent Driving Habits
          </p>
        )}
        {score >= 5 && score < 8 && (
          <p className="text-battery-teal text-sm mt-1">Good Driving Habits</p>
        )}
        {score >= 3 && score < 5 && (
          <p className="text-battery-warning text-sm mt-1">Room for Improvement</p>
        )}
        {score < 3 && (
          <p className="text-battery-danger text-sm mt-1">Needs Attention</p>
        )}
      </div>
    </div>
  );
};

export default DrivingScore;
