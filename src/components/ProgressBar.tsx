import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Progress</span>
        <span>{current} of {total} words</span>
      </div>
      <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-purple-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}