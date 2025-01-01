"use client";

interface ReadingProgressButtonProps {
  articleId: string;
  className?: string;
  duration?: string;
}

export default function ReadingProgressButton({
  className = "",
  duration = "5 min",
}: ReadingProgressButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 transition-colors text-violet-400 hover:text-violet-300 ${className}`}
    >
      <span>{duration}</span>
      <span>Start Reading</span>
    </button>
  );
}
