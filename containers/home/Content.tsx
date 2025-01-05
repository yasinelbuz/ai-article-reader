"use client";

import React, { useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Level as LevelType } from "@/types/articles";
import { useReadingProgress } from "@/hooks/useReadingProgress";

type Level = "all" | "beginner" | "intermediate" | "advanced";
type ReadStatus = "all" | "read" | "unread";

interface ContentProps {
  levels: LevelType[];
}

export default function Content({ levels }: ContentProps) {
  const [selectedLevel, setSelectedLevel] = useState<Level>("all");
  const [readStatus, setReadStatus] = useState<ReadStatus>("all");
  const { isRead } = useReadingProgress();

  // First get all articles with their levels
  const allArticlesWithLevels = levels.flatMap((level) =>
    level.articles.map((article) => ({
      ...article,
      level: level.id,
      isRead: isRead(article.id),
    }))
  );

  // Then apply both filters separately
  const filteredArticles = allArticlesWithLevels.filter((article) => {
    // Level check
    if (selectedLevel !== "all" && article.level !== selectedLevel) {
      return false;
    }

    // Read status check
    if (readStatus === "read") {
      return article.isRead;
    }
    if (readStatus === "unread") {
      return !article.isRead;
    }

    return true;
  });

  const filterButtons = [
    { id: "all", label: "All Articles" },
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
  ];

  const readStatusButtons = [
    { id: "all", label: "All" },
    { id: "read", label: "Read" },
    { id: "unread", label: "Unread" },
  ];

  return (
    <main className="container mx-auto px-4 py-16">
      {/* Filter Buttons */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {filterButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setSelectedLevel(button.id as Level)}
              className={`px-6 py-2.5 rounded-[15px] text-sm font-medium transition-all duration-300
                ${
                  selectedLevel === button.id
                    ? "bg-violet-800 text-white shadow-lg"
                    : "bg-[#1A1A1B] text-gray-400 hover:bg-[#242425] hover:text-violet-400"
                }
              `}
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* Read Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {readStatusButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setReadStatus(button.id as ReadStatus)}
              className={`px-6 py-2.5 rounded-[15px] text-sm font-medium transition-all duration-300
                ${
                  readStatus === button.id
                    ? "bg-violet-800 text-white shadow-lg"
                    : "bg-[#1A1A1B] text-gray-400 hover:bg-[#242425] hover:text-violet-400"
                }
              `}
            >
              {button.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          {filteredArticles.length} articles found
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
