"use client";

import BackButton from "@/components/BackButton";
import ArticleReadingStatus from "@/components/ArticleReadingStatus";

interface ArticleInteractiveWrapperProps {
  children: React.ReactNode;
  params: {
    level: string;
    articleId: string;
  };
  data: {
    title: string;
  };
  levelTitle: string;
}

export default function ArticleInteractiveWrapper({
  children,
  params,
  levelTitle,
}: ArticleInteractiveWrapperProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BackButton
                label="Home"
                className="text-violet-400 hover:text-violet-300"
              />
            </div>
            <div className="flex items-center gap-4">
              <ArticleReadingStatus
                articleId={params.articleId}
                level={params.level}
                levelTitle={levelTitle}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      {children}
    </div>
  );
}
