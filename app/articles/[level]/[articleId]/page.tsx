/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import WordSelectionWrapper from "@/components/WordSelectionWrapper";
import KeyboardShortcutHint from "@/components/KeyboardShortcutHint";
import ArticleQuiz from "@/components/ArticleQuiz";
import ArticleReadingStatus from "@/components/ArticleReadingStatus";
import ReadingStatusBadge from "@/components/ReadingStatusBadge";

export default async function ArticlePage({ params }: any) {
  try {
    const filePath = path.join(
      process.cwd(),
      "content",
      params.level,
      `${params.articleId}.md`
    );
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContent);

    const levelTitle =
      params.level.charAt(0).toUpperCase() + params.level.slice(1);

    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-10 bg-[#0A0A0B]/80 backdrop-blur-sm border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <BackButton
                label="Home"
                className="text-violet-400 hover:text-violet-300"
              />
              <ArticleReadingStatus
                articleId={params.articleId}
                level={params.level}
                levelTitle={levelTitle}
              />
            </div>
          </div>
        </nav>

        {/* Article Content */}
        <WordSelectionWrapper
          level={params.level}
          articleId={params.articleId}
          articleTitle={data.title}
        >
          <article className="container mx-auto px-4 py-12 max-w-4xl">
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                {data.tags && (
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight flex items-center gap-4">
                {data.title}
                <ReadingStatusBadge articleId={params.articleId} />
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                {data.excerpt}
              </p>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-sm text-gray-400 mb-4">
                Tip: Select any word and press Enter to save it
              </div>
              <div className="article-content">
                <MDXRemote source={content} />
              </div>
            </div>

            {/* Quiz Section */}
            {data.quiz && (
              <ArticleQuiz
                articleId={params.articleId}
                title={data.quiz.title}
                questions={data.quiz.questions}
              />
            )}
          </article>
        </WordSelectionWrapper>
        <KeyboardShortcutHint />
      </div>
    );
  } catch (error) {
    console.error("Error loading article:", error);
    notFound();
  }
}

