'use client';

import { useState, useEffect } from 'react';
import { ArticleTypes } from '@/types/articles';

export default function StudyWordsContainer({ article }: { article: ArticleTypes }) {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [knownWords, setKnownWords] = useState<Set<string>>(new Set());
  const [unknownWords, setUnknownWords] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);

  // Extract unique words from article content
  useEffect(() => {
    if (article?.content) {
      // Remove special characters and split into words
      const wordArray = article.content
        .replace(/[^\w\s]/g, ' ') // Replace non-word characters with space
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 3) // Filter out short words
        .filter((word, index, self) => self.indexOf(word) === index) // Get unique words
        .slice(0, 50); // Limit to 50 words

      setWords(wordArray);
    }
  }, [article]);

  const handleKnown = () => {
    const currentWord = words[currentWordIndex];
    setKnownWords(prev => new Set([...prev, currentWord]));
    moveToNextWord();
  };

  const handleUnknown = () => {
    const currentWord = words[currentWordIndex];
    setUnknownWords(prev => new Set([...prev, currentWord]));
    moveToNextWord();
  };

  const moveToNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentWordIndex(0);
    setKnownWords(new Set());
    setUnknownWords(new Set());
    setShowResults(false);
  };

  if (words.length === 0) {
    return <div>Loading words...</div>;
  }

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center p-16 relative">
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Article
        </button>
        <h1 className="text-2xl font-bold mb-6">Quiz Complete!</h1>
        <div className="mb-8 text-center">
          <p className="text-green-600 mb-2">Known words: {knownWords.size}</p>
          <p className="text-red-600 mb-4">Words to study: {unknownWords.size}</p>
          <div className="bg-gray-100 p-4 rounded-lg max-w-md mx-auto text-black">
            <h3 className="font-semibold mb-2">Words to study:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from(unknownWords).map((word, index) => (
                <span key={index} className="px-3 py-1 rounded-full shadow-md">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={resetQuiz}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-16 relative">
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Article
      </button>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Word Study</h1>
        <p className="text-gray-600">
          Word {currentWordIndex + 1} of {words.length}
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center mb-8 text-black">
        <div className="text-4xl font-bold mb-8 min-h-16 flex items-center justify-center">
          {words[currentWordIndex]}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleKnown}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          I Know This
        </button>
        <button
          onClick={handleUnknown}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          I Don&apos;t Know
        </button>
      </div>
    </div>
  );
}
