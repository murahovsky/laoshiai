import React from 'react';
import { VolumeX, Volume2, Mic } from 'lucide-react';

interface AvatarProps {
  isActive: boolean;
  type: 'speaking' | 'listening';
}

export function Avatar({ isActive, type }: AvatarProps) {
  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400"
        alt="Avatar"
        className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-purple-100"
      />
      <div className="absolute bottom-0 right-1/3 transform translate-x-1/2">
        {isActive ? (
          <div className="bg-purple-600 rounded-full p-3">
            {type === 'speaking' ? (
              <Volume2 className="w-6 h-6 text-white animate-pulse" />
            ) : (
              <Mic className="w-6 h-6 text-white animate-pulse" />
            )}
          </div>
        ) : (
          <div className="bg-gray-200 rounded-full p-3">
            <VolumeX className="w-6 h-6 text-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
}