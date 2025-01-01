"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  articleId: string;
  title: string;
  questions: QuizQuestion[];
}

export default function ArticleQuiz({
  articleId,
  title,
  questions,
}: QuizProps) {
  const storageKey = `quiz_${articleId}`;
  const [userAnswers, setUserAnswers] = useLocalStorage<Record<string, number>>(
    storageKey,
    {}
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);
    setUserAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="mt-12 p-6 bg-[#1A1A1B] rounded-xl border border-gray-800">
        <h3 className="text-2xl font-bold text-white mb-4">
          {title} - Results
        </h3>
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-violet-400">
              {score.toFixed(0)}%
            </div>
            <div className="text-gray-400">
              ({Math.round((score / 100) * questions.length)} out of{" "}
              {questions.length} correct)
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setShowResults(false);
            setUserAnswers({});
            setShowFeedback(false);
            setSelectedAnswer(null);
          }}
          className="px-4 py-2 bg-violet-500/10 text-violet-400 rounded-lg hover:bg-violet-500/20 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQuestionData.correctAnswer;

  return (
    <div className="mt-12 p-6 bg-[#1A1A1B] rounded-xl border border-gray-800">
      <h3 className="text-2xl font-bold text-white mb-8">{title}</h3>
      <div className="space-y-8">
        <div className="text-sm text-gray-400 mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <p className="text-xl text-white mb-6">
          {currentQuestionData.question}
        </p>
        <div className="space-y-3">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && handleAnswer(index)}
              disabled={showFeedback}
              className={`w-full p-4 text-left rounded-lg transition-colors ${
                showFeedback
                  ? index === currentQuestionData.correctAnswer
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : selectedAnswer === index
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-[#141415] text-gray-500 border border-gray-800"
                  : selectedAnswer === index
                  ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                  : "bg-[#141415] text-gray-300 hover:bg-[#1E1E1F] border border-gray-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showFeedback && (
                  <span>
                    {index === currentQuestionData.correctAnswer ? (
                      <CheckIcon className="text-emerald-400" />
                    ) : selectedAnswer === index ? (
                      <XIcon className="text-red-400" />
                    ) : null}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className="mt-6">
            <div
              className={`mb-4 p-4 rounded-lg ${
                isCorrect
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "bg-red-500/10 text-red-400 border border-red-500/30"
              }`}
            >
              {isCorrect
                ? "Correct! Well done!"
                : "Incorrect. Try again next time!"}
            </div>
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-violet-500/10 text-violet-400 rounded-lg hover:bg-violet-500/20 transition-colors"
            >
              {currentQuestion < questions.length - 1
                ? "Next Question"
                : "See Results"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// İkon bileşenleri
function CheckIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
