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
);

const CircleIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export default function ReadingStatus({
  articleId,
  className = "",
}: ReadingStatusProps) {
  const { isRead } = useReadingProgress();
  const [mounted, setMounted] = useState(false);
  const [read, setRead] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRead(isRead(articleId));
  }, [articleId, isRead]);

  // İlk render sırasında default görünümü döndür
  if (!mounted) {
    return (
      <span className={`text-gray-600 ${className}`}>
        <CircleIcon />
      </span>
    );
  }

  return read ? (
    <span className={`text-[#ff3131] ${className}`}>
      <CheckCircleIcon />
    </span>
  ) : (
    <span className={`text-gray-600 ${className}`}>
      <CircleIcon />
    </span>
  );
}
