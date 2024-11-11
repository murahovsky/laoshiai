import React from 'react';
import { Volume2, Mic } from 'lucide-react';

interface ActionButtonsProps {
  onListen: () => void;
  onTalk: () => void;
  isListening: boolean;
  isSpeaking: boolean;
  countdown: number;
}

export function ActionButtons({ onListen, onTalk, isListening, isSpeaking, countdown }: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={onListen}
        disabled={isSpeaking || isListening}
        className={`py-4 rounded-xl text-white font-semibold text-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
          isSpeaking || isListening
            ? 'bg-purple-400 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        <Volume2 className="w-5 h-5" />
        Listen
      </button>
      <button
        onClick={onTalk}
        disabled={isSpeaking || isListening}
        className={`py-4 rounded-xl text-white font-semibold text-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
          isListening
            ? 'bg-red-500'
            : isSpeaking
            ? 'bg-purple-400 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
        {isListening ? countdown : 'Talk'}
      </button>
    </div>
  );
}