import React, { useState, useCallback } from 'react';
import { CHINESE_WORDS } from './data/words';
import { Avatar } from './components/Avatar';
import { WordDisplay } from './components/WordDisplay';
import { ActionButtons } from './components/ActionButtons';
import { Feedback } from './components/Feedback';
import { ProgressBar } from './components/ProgressBar';
import { Onboarding } from './components/Onboarding';
import { FinalScreen } from './components/FinalScreen';
import { useSpeech } from './hooks/useSpeech';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [feedbackType, setFeedbackType] = useState<'success' | 'warning'>('success');
  const [isFinished, setIsFinished] = useState(false);
  
  const currentWord = CHINESE_WORDS[currentIndex];
  const { speak, isSpeaking } = useSpeech(currentWord);
  
  const handleRecognitionEnd = useCallback(() => {
    // Randomly determine feedback type (70% success, 30% warning)
    const isSuccess = Math.random() > 0.3;
    setFeedbackType(isSuccess ? 'success' : 'warning');
    setShowFeedback(true);
    
    if (isSuccess) {
      setScore(prev => prev + 1);
    }
    
    // Check if this is the last word
    if (currentIndex === CHINESE_WORDS.length - 1) {
      setTimeout(() => {
        setIsFinished(true);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setCurrentIndex(prev => prev + 1);
      }, 2000);
    }
  }, [currentIndex]);

  const { startListening, isListening, countdown } = useSpeechRecognition(handleRecognitionEnd);

  const requestMicPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      console.error('Microphone permission denied:', error);
    }
  };

  if (!onboardingComplete) {
    return (
      <Onboarding
        currentStep={onboardingStep}
        onNext={() => setOnboardingStep(prev => prev + 1)}
        onComplete={() => setOnboardingComplete(true)}
        requestMicPermission={requestMicPermission}
      />
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4">
        <div className="container mx-auto max-w-md">
          <FinalScreen score={score} totalWords={CHINESE_WORDS.length} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <ProgressBar 
              current={currentIndex + 1} 
              total={CHINESE_WORDS.length} 
            />
            <Avatar 
              isActive={isSpeaking || isListening} 
              type={isListening ? 'listening' : 'speaking'} 
            />
            <WordDisplay word={currentWord} />
            <ActionButtons 
              onListen={speak}
              onTalk={startListening}
              isListening={isListening}
              isSpeaking={isSpeaking}
              countdown={countdown}
            />
            {showFeedback && (
              <Feedback 
                show={true}
                type={feedbackType}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;