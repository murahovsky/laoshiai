import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FinalScreenProps {
  score: number;
  totalWords: number;
}

export function FinalScreen({ score, totalWords }: FinalScreenProps) {
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await supabase
        .from('course_feedback')
        .insert([
          {
            email,
            rating,
            score: Math.round((score / totalWords) * 100),
          },
        ]);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg">
        <h3 className="text-2xl font-bold text-green-600 mb-4">Thank You! 🎉</h3>
        <p className="text-gray-600">Your feedback has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Congratulations! 🎉
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          You've completed the course with a score of{' '}
          <span className="font-bold text-purple-600">
            {Math.round((score / totalWords) * 100)}%
          </span>
        </p>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600 mb-3">How would you rate this course?</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Your email (optional)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="We'll ping you once full course is available!"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg 
                     transition-all transform hover:scale-[1.02] 
                     flex items-center justify-center gap-2
                     ${
                       isSubmitting || rating === 0
                         ? 'bg-gray-300 cursor-not-allowed'
                         : 'bg-purple-600 hover:bg-purple-700 text-white'
                     }`}
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
