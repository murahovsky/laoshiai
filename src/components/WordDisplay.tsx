import React from 'react';
import type { ChineseWord } from '../data/words';

interface WordDisplayProps {
  word: ChineseWord;
}

export function WordDisplay({ word }: WordDisplayProps) {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-4xl font-bold text-gray-800">{word.chinese}</h2>
      <p className="text-lg text-purple-600 font-medium">{word.pinyin}</p>
      <p className="text-gray-500">{word.english}</p>
    </div>
  );
}