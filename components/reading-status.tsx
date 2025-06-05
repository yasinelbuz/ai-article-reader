"use client";

import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useState, useEffect } from "react";

interface ReadingStatusProps {
  articleId: string;
  className?: string;
}

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="drop-shadow-md"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const CircleIcon = () => (
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
    className="drop-shadow-sm"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export default function ReadingStatus({
  articleId,
  className = "",
}: ReadingStatusProps) {
  const { isRead } = useReadingProgress();
  const [read, setRead] = useState(false);

  useEffect(() => {
    setRead(isRead(articleId));
  }, [articleId, isRead]);

  return (
    <div className="absolute top-3 right-3">
      {read ? (
        <span className={`text-violet-500 transition-colors ${className}`}>
          <CheckCircleIcon />
        </span>
      ) : (
        <span className={`text-gray-600/50 transition-colors ${className}`}>
          <CircleIcon />
        </span>
      )}
    </div>
  );
}
