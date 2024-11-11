import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface FeedbackProps {
  show: boolean;
  type: 'success' | 'warning';
}

const successMessages = [
  "Great job! Your pronunciation is perfect!",
  "Excellent work! Keep it up!",
  "Amazing! You're a natural!",
  "Perfect! You're making great progress!",
  "Fantastic! You've got this!"
];

const warningMessages = [
  "Almost there! Try to emphasize the tone more.",
  "Close! Focus on the pitch of your voice."
];

export function Feedback({ show, type }: FeedbackProps) {
  const messages = type === 'success' ? successMessages : warningMessages;
  const randomMessage = React.useMemo(() => 
    messages[Math.floor(Math.random() * messages.length)],
    [messages]
  );

  if (!show) return null;

  return (
    <div className={`flex items-center justify-center gap-2 animate-fade-in p-4 rounded-lg ${
      type === 'success' 
        ? 'text-green-600 bg-green-50' 
        : 'text-yellow-600 bg-yellow-50'
    }`}>
      {type === 'success' ? (
        <CheckCircle className="w-6 h-6" />
      ) : (
        <AlertCircle className="w-6 h-6" />
      )}
      <p className="font-medium text-lg">{randomMessage}</p>
    </div>
  );
}