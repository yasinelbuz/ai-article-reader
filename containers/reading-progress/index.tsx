'use client';

import { useState, useEffect } from 'react';

type DayStatus = 'completed' | 'not-completed';

export default function ReadingProgressContainer() {
  const [days, setDays] = useState<DayStatus[]>(() => {
    // Load from localStorage or initialize with all days not completed
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('readingProgress');
      return saved ? JSON.parse(saved) : Array(100).fill('not-completed');
    }
    return Array(100).fill('not-completed');
  });

  // Save to localStorage whenever days change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('readingProgress', JSON.stringify(days));
    }
  }, [days]);

  const toggleDay = (index: number) => {
    const newDays = [...days];
    newDays[index] = newDays[index] === 'completed' ? 'not-completed' : 'completed';
    setDays(newDays);
  };

  const completedDays = days.filter(day => day === 'completed').length;
  const progressPercentage = (completedDays / 100) * 100;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">100 Day Reading Goal</h1>
        <p className="mb-8">
          Click the button when every day is read! {completedDays}/100 days completed.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-10 gap-2">
          {days.map((status, index) => (
            <button
              key={index}
              onClick={() => toggleDay(index)}
              className={`
                h-10 rounded-md transition-colors duration-200 flex items-center justify-center
                ${
                  status === 'completed'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-white hover:bg-gray-100 border text-black'
                }
              `}
              title={`Gün ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <div className="mt-8">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset your progress?')) {
                setDays(Array(100).fill('not-completed'));
              }
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
