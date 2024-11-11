import { useState, useCallback } from 'react';
import type { ChineseWord } from '../data/words';

export function useSpeech(word: ChineseWord) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.chinese);
      utterance.lang = 'zh-CN';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  }, [word.chinese]);

  return { speak, isSpeaking };
}