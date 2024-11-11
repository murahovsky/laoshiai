import React from 'react';

interface TalkButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function TalkButton({ onClick, disabled }: TalkButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 rounded-xl text-white font-semibold text-lg transition-all transform hover:scale-[1.02] ${
        disabled
          ? 'bg-purple-400 cursor-not-allowed'
          : 'bg-purple-600 hover:bg-purple-700'
      }`}
    >
      {disabled ? 'Speaking...' : 'Talk'}
    </button>
  );
}