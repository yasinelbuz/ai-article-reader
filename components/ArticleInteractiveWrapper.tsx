"use client";

import { useState, useRef } from "react";
import BackButton from "@/components/BackButton";
import WordSelectionWrapper from "@/components/WordSelectionWrapper";
import ArticleReadingStatus from "@/components/ArticleReadingStatus";

interface ArticleInteractiveWrapperProps {
  children: React.ReactNode;
  params: {
    level: string;
    articleId: string;
  };
  data: {
    title: string;
  };
  levelTitle: string;
}

export default function ArticleInteractiveWrapper({
  children,
  params,
  data,
  levelTitle,
}: ArticleInteractiveWrapperProps) {
  const [savedWordsCount, setSavedWordsCount] = useState(0);
  const wrapperRef = useRef<{ highlightSavedWords: () => void }>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BackButton
                label="Home"
                className="text-violet-400 hover:text-violet-300"
              />
            </div>
            <div className="flex items-center gap-4">
              {savedWordsCount > 0 && (
                <button
                  onClick={() => wrapperRef.current?.highlightSavedWords()}
                  // Start of Selection
                  className="flex items-center gap-2 text-white bg-violet-600 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 rounded px-3 py-1 transition duration-200 ease-in-out"
                >
                  <span>Saved Words</span>
                  <span
                    className="flex items-center justify-center bg-violet-100 text-violet-400 w-5 h-5 rounded-full text-sm"
                    aria-label={`${savedWordsCount} saved words`}
                  >
                    {savedWordsCount}
                  </span>
                </button>
              )}

              <ArticleReadingStatus
                articleId={params.articleId}
                level={params.level}
                levelTitle={levelTitle}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <WordSelectionWrapper
        ref={wrapperRef}
        level={params.level}
        articleId={params.articleId}
        articleTitle={data.title}
        onSavedWordsChange={setSavedWordsCount}
      >
        {children}
      </WordSelectionWrapper>
    </div>
  );
}
