import React from 'react';
import { ChevronRight, Mic, Users, Brain, MessageSquare } from 'lucide-react';

interface OnboardingProps {
  currentStep: number;
  onNext: () => void;
  onComplete: () => void;
  requestMicPermission: () => void;
}

const steps = [
  {
    icon: Users,
    text: "YYYou're on your way to start talking with 1.5 billion people that know Chinese!",
    buttonText: 'Continue',
  },
  {
    icon: MessageSquare,
    text: 'On a daily basis people use only 100 words',
    buttonText: 'Okay',
  },
  {
    icon: Brain,
    text: 'We analyzed speaking patterns with AI and created this course where you can learn the most popular Chinese words.',
    buttonText: "Let's do it",
  },
  {
    icon: Mic,
    text: 'We need microphone access to check your pronunciation with AI',
    buttonText: 'Grant access',
    isMicPermission: true,
  },
];

export function Onboarding({
  currentStep,
  onNext,
  onComplete,
  requestMicPermission,
}: OnboardingProps) {
  const step = steps[currentStep];
  const Icon = step.icon;

  const handleClick = () => {
    if (step.isMicPermission) {
      requestMicPermission();
      onComplete();
    } else if (currentStep < steps.length - 1) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="bg-purple-100 rounded-full p-6">
              <Icon className="w-12 h-12 text-purple-600" />
            </div>
          </div>

          <div className="space-y-6 text-center">
            <p className="text-xl font-medium text-gray-800 leading-relaxed">
              {step.text}
            </p>

            <div className="flex justify-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-8 bg-purple-600'
                      : 'w-2 bg-purple-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleClick}
              className="w-full py-4 px-6 bg-purple-600 text-white rounded-xl font-semibold 
                       text-lg transition-all transform hover:scale-[1.02] hover:bg-purple-700 
                       flex items-center justify-center gap-2"
            >
              {step.buttonText}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
