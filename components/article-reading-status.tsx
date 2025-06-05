"use client";

import { useState, useEffect } from "react";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import Link from "next/link";

interface ArticleReadingStatusProps {
  articleId: string;
  level: string;
  levelTitle: string;
}

export default function ArticleReadingStatus({
  articleId,
  level,
  levelTitle,
}: ArticleReadingStatusProps) {
  const { markAsRead, markAsUnread, isRead } = useReadingProgress();
  const [isArticleRead, setIsArticleRead] = useState(false);

  useEffect(() => {
    setIsArticleRead(isRead(articleId));
  }, [isRead, articleId]);

  const toggleReadStatus = () => {
    if (isArticleRead) {
      markAsUnread(articleId);
      setIsArticleRead(false);
    } else {
      markAsRead(articleId);
      setIsArticleRead(true);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggleReadStatus}
        className={`text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-2`}
      >
        {isArticleRead ? (
          <>
            <span>Mark as Unread</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </>
        ) : (
          "Mark as Read"
        )}
      </button>
      <Link
        href={`/articles/${level}`}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          level === "beginner"
            ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
            : level === "intermediate"
            ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
            : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
        }`}
      >
        {levelTitle} Level
      </Link>
    </div>
  );
}
