/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/ArticleContent";

export default async function ArticlePage({ params }: any) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const level = String(resolvedParams.level);
    const articleId = String(resolvedParams.articleId);

    const filePath = path.join(
      process.cwd(),
      "content",
      level,
      `${articleId}.md`
    );
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContent);

    const levelTitle = level.charAt(0).toUpperCase() + level.slice(1);

    return (
      <ArticleContent
        content={content}
        data={data as any}
        params={{ level, articleId }}
        levelTitle={levelTitle}
      />
    );
  } catch (error) {
    console.error("Error loading article:", error);
    notFound();
  }
}
