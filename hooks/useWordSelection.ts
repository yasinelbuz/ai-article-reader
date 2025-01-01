"use client";

import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

interface SavedWord {
  word: string;
  context: string;
  articleId: string;
  articleTitle: string;
  level: string;
  timestamp: number;
  savedAt: string;
}

export function useWordSelection(
  articleId: string,
  articleTitle: string,
  level: string
) {
  const [savedWords, setSavedWords] = useLocalStorage<SavedWord[]>(
    "saved_words",
    []
  );
  const [highlightedWords, setHighlightedWords] = useLocalStorage<string[]>(
    `highlighted_${articleId}`,
    []
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        const selection = window.getSelection();
        const selectedText = selection?.toString().trim();

        if (selectedText && selectedText.length > 0) {
          const range = selection?.getRangeAt(0);
          const container = range?.startContainer.parentElement;
          const context = container?.textContent?.slice(
            Math.max(0, (range?.startOffset || 0) - 20),
            Math.min(
              (range?.endOffset || 0) + 20,
              container?.textContent?.length || 0
            )
          );

          const now = new Date();
          const newWord: SavedWord = {
            word: selectedText,
            context: context || "",
            articleId,
            articleTitle,
            level,
            timestamp: now.getTime(),
            savedAt: now.toLocaleString(),
          };

          setSavedWords((prev) => {
            if (prev.some((w) => w.word === selectedText)) {
              return prev;
            }
            return [...prev, newWord];
          });

          setHighlightedWords((prev) => [...prev, selectedText]);

          const span = document.createElement("span");
          span.className = "highlighted-word";
          range?.surroundContents(span);

          selection?.removeAllRanges();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [articleId, articleTitle, level, setSavedWords, setHighlightedWords]);

  return { savedWords, setSavedWords, highlightedWords };
}
