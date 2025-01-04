import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/utils/articles";
import ReadingStatus from "@/components/ReadingStatus";
import { Article, Level } from "@/types/articles";

export const metadata: Metadata = {
  title: "All Articles",
  description: "Browse all available articles by difficulty level",
};

export default function ArticlesPage() {
  const levels: Level[] = getAllArticles();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12">All Articles</h1>

        <div className="space-y-16">
          {levels.map((level) => (
            <section key={level.id}>
              <div className="flex items-center gap-4 mb-6">
                <span
                  className={`w-3 h-3 rounded-full ${
                    level.id === "beginner"
                      ? "bg-emerald-500"
                      : level.id === "intermediate"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />
                <h2 className="text-2xl font-bold">{level.title}</h2>
              </div>

              <div className="grid gap-6">
                {level.articles.map((article: Article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${level.id}/${article.id}`}
                    className="group block p-6 rounded-xl bg-[#1A1A1B] hover:bg-[#1E1E1F] border border-gray-800 hover:border-violet-500/30 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <ReadingStatus
                        articleId={article.id}
                        className="mt-1.5 shrink-0"
                      />
                      <div>
                        <h3 className="text-xl font-medium text-white group-hover:text-violet-400 transition-colors mb-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-400">{article.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
