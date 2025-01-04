"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

interface WordSelectionWrapperProps {
  articleId: string;
  articleTitle: string;
  level: string;
  children: React.ReactNode;
  onSavedWordsChange?: (count: number) => void;
}

interface SavedWord {
  word: string;
  context: string;
  articleId: string;
  articleTitle: string;
  level: string;
  timestamp: number;
  savedAt: string;
}

const WordSelectionWrapper = forwardRef<
  { highlightSavedWords: () => void },
  WordSelectionWrapperProps
>(({ children, articleId, articleTitle, level, onSavedWordsChange }, ref) => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [highlightedWords, setHighlightedWords] = useState<boolean>(false);

  // Update saved words count when mounted
  useEffect(() => {
    onSavedWordsChange?.(getSavedWordsCount());
  }, [articleId]);

  const highlightSavedWords = () => {
    const savedWords = JSON.parse(
      localStorage.getItem("saved_words") || "[]"
    ) as SavedWord[];
    const articleWords = savedWords.filter(
      (word) => word.articleId === articleId
    );

    if (articleWords.length === 0) return;

    // Remove existing highlights if hiding
    if (highlightedWords) {
      const highlights = document.querySelectorAll(".highlighted-word");
      highlights.forEach((highlight) => {
        const text = highlight.textContent;
        if (text) highlight.replaceWith(text);
      });
      setHighlightedWords(false);
      return;
    }

    // Get all text nodes in the article
    const walker = document.createTreeWalker(
      document.querySelector(".article-content") || document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    // Highlight each saved word
    textNodes.forEach((textNode) => {
      articleWords.forEach((savedWord) => {
        const text = textNode.textContent || "";
        if (text.includes(savedWord.word)) {
          const parts = text.split(savedWord.word);
          if (parts.length > 1) {
            const fragment = document.createDocumentFragment();
            parts.forEach((part, index) => {
              fragment.appendChild(document.createTextNode(part));
              if (index < parts.length - 1) {
                const span = document.createElement("span");
                span.className = "highlighted-word";
                span.textContent = savedWord.word;
                fragment.appendChild(span);
              }
            });
            textNode.parentNode?.replaceChild(fragment, textNode);
          }
        }
      });
    });
    setHighlightedWords(true);
  };

  useImperativeHandle(ref, () => ({
    highlightSavedWords,
  }));

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();
      setSelectedText(text || null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && selectedText) {
        saveWord(selectedText);
      }
    };

    document.addEventListener("selectionchange", handleSelection);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("selectionchange", handleSelection);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedText]);

  const saveWord = (text: string) => {
    if (text && text.length > 0) {
      const selection = window.getSelection();
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
      const newWord = {
        word: text,
        context: context || "",
        articleId,
        articleTitle,
        level,
        timestamp: now.getTime(),
        savedAt: now.toLocaleString(),
      };

      // Save to localStorage
      const savedWords = JSON.parse(
        localStorage.getItem("saved_words") || "[]"
      );
      if (!savedWords.some((w: SavedWord) => w.word === text)) {
        localStorage.setItem(
          "saved_words",
          JSON.stringify([...savedWords, newWord])
        );
        onSavedWordsChange?.(getSavedWordsCount());
      }

      // Add highlight
      const span = document.createElement("span");
      span.className = "highlighted-word";
      range?.surroundContents(span);
      selection?.removeAllRanges();
      setHighlightedWords(true);
    }
  };

  const getSavedWordsCount = () => {
    const savedWords = JSON.parse(
      localStorage.getItem("saved_words") || "[]"
    ) as SavedWord[];
    return savedWords.filter((word) => word.articleId === articleId).length;
  };

  return (
    <div className="relative">
      {children}
      {selectedText && (
        <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-gray-800/90 backdrop-blur-sm text-gray-300 px-4 py-2 rounded-lg text-sm">
          <button
            onClick={() => saveWord(selectedText)}
            className="flex items-center gap-2 text-violet-400 hover:text-violet-300"
          >
            Save Word
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Enter ↵</kbd>
          </button>
        </div>
      )}
    </div>
  );
});

WordSelectionWrapper.displayName = "WordSelectionWrapper";

export default WordSelectionWrapper;
