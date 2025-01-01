"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import Link from "next/link";

interface SavedWord {
  word: string;
  context: string;
  articleId: string;
  articleTitle: string;
  level: string;
  timestamp: number;
  savedAt: string;
}

export default function VocabularyPage() {
  const [savedWords] = useLocalStorage<SavedWord[]>("saved_words", []);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">My Vocabulary</h1>

        {savedWords.length === 0 ? (
          <p className="text-gray-400">
            No saved words yet. Select words while reading articles and press
            Enter to save them.
          </p>
        ) : (
          <div className="grid gap-6">
            {savedWords
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((word, index) => (
                <div
                  key={index}
                  className="bg-[#1A1A1B] rounded-xl p-6 border border-gray-800"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="text-2xl font-medium text-white">
                      {word.word}
                    </h2>
                    <Link
                      href={`/articles/${word.level}/${word.articleId}`}
                      className="text-sm text-violet-400 hover:text-violet-300"
                    >
                      View Article
                    </Link>
                  </div>
                  <p className="text-gray-400 mb-2">
                    <span className="text-gray-500">Context:</span> ...
                    {word.context}...
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">
                      From article: {word.articleTitle}
                    </p>
                    <p className="text-sm text-gray-500">
                      Saved: {word.savedAt}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
