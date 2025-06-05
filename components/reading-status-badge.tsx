"use client";

import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useEffect, useState } from "react";

interface ReadingStatusBadgeProps {
  articleId: string;
}

export default function ReadingStatusBadge({
  articleId,
}: ReadingStatusBadgeProps) {
  const { isRead } = useReadingProgress();
  const [isArticleRead, setIsArticleRead] = useState(false);

  useEffect(() => {
    setIsArticleRead(isRead(articleId));
  }, [isRead, articleId]);

  if (!isArticleRead) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 text-sm">
      <span>Read</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
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
    </div>
  );
}
