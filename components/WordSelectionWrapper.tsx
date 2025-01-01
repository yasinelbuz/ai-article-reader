"use client";

import { useWordSelection } from "@/hooks/useWordSelection";
import { useState, useEffect } from "react";
import WordSaveNotification from "./WordSaveNotification";

interface WordSelectionWrapperProps {
  articleId: string;
  articleTitle: string;
  level: string;
  children: React.ReactNode;
}

export default function WordSelectionWrapper({
  articleId,
  articleTitle,
  level,
  children,
}: WordSelectionWrapperProps) {
  const { savedWords } = useWordSelection(articleId, articleTitle, level);
  const [lastSavedWord, setLastSavedWord] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        const selection = window.getSelection();
        const selectedText = selection?.toString().trim();

        if (selectedText && selectedText.length > 0) {
          setLastSavedWord(selectedText);
          setTimeout(() => setLastSavedWord(null), 2000);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {children}
      {lastSavedWord && <WordSaveNotification word={lastSavedWord} />}
    </>
  );
}
