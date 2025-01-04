/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/ArticleContent";

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
      <ArticleContent
        content={content}
        data={data}
        params={params}
        levelTitle={levelTitle}
      />
    );
  } catch (error) {
    console.error("Error loading article:", error);
    notFound();
  }
}
