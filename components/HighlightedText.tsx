"use client";

import { useEffect, useState } from "react";

interface HighlightedTextProps {
  text: string;
}

export default function HighlightedText({ text }: HighlightedTextProps) {
  const [savedWords, setSavedWords] = useState<string[]>([]);

  useEffect(() => {
    // Sayfa yüklendiğinde kaydedilmiş kelimeleri al
    const saved = localStorage.getItem("savedWords");
    if (saved) {
      setSavedWords(JSON.parse(saved));
    }
  }, []);

  const handleWordClick = (word: string) => {
    const newSavedWords = savedWords.includes(word)
      ? savedWords.filter((w) => w !== word)
      : [...savedWords, word];

    setSavedWords(newSavedWords);
    localStorage.setItem("savedWords", JSON.stringify(newSavedWords));
  };

  const words = text.split(" ");

  return (
    <p className="text-gray-300 leading-relaxed">
      {words.map((word, index) => {
        const isHighlighted = savedWords.includes(word);
        return (
          <span
            key={index}
            onClick={() => handleWordClick(word)}
            className={`cursor-pointer transition-colors ${
              isHighlighted
                ? "bg-yellow-500/20 hover:bg-yellow-500/30"
                : "hover:text-violet-400"
            }`}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}
