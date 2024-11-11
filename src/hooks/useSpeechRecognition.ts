import { useState, useEffect, useCallback } from 'react';

export function useSpeechRecognition(onRecognitionEnd: () => void) {
  const [isListening, setIsListening] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'zh-CN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onend = () => {
          setIsListening(false);
          onRecognitionEnd();
        };

        setRecognition(recognition);
      }
    }
  }, [onRecognitionEnd]);

  const startListening = useCallback(() => {
    if (recognition) {
      setCountdown(3);
      setIsListening(true);
      recognition.start();

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            recognition.stop();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      setCountdown(3);
    }
  }, [recognition]);

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  return { startListening, stopListening, isListening, countdown };
}