"use client";

import { useLocalStorage } from "./useLocalStorage";

export function useReadingProgress() {
  const [readArticles, setReadArticles] = useLocalStorage<string[]>(
    "read_articles",
    []
  );

  const markAsRead = (articleId: string) => {
    if (!readArticles.includes(articleId)) {
      setReadArticles([...readArticles, articleId]);
    }
  };

  const markAsUnread = (articleId: string) => {
    setReadArticles(readArticles.filter((id) => id !== articleId));
  };

  const isRead = (articleId: string) => {
    return readArticles.includes(articleId);
  };

  return { markAsRead, markAsUnread, isRead };
}
