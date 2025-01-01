import Link from "next/link";
import { getLevelArticles } from "@/utils/articles";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import type { Metadata } from "next";
import ReadingStatus from "@/components/ReadingStatus";

type Props = {
  params: {
    level: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const levelTitle =
    params.level.charAt(0).toUpperCase() + params.level.slice(1);

  return {
    title: `${levelTitle} Level English Articles - LinguaFlow`,
    description: `Improve your English with our ${levelTitle.toLowerCase()} level articles. Perfect for ${
      params.level
    } English learners.`,
    keywords: `${params.level} english, english learning, ${params.level} level articles, english practice, reading comprehension`,
    openGraph: {
      title: `${levelTitle} Level English Articles - LinguaFlow`,
      description: `Improve your English with our ${levelTitle.toLowerCase()} level articles`,
    },
  };
}

export default function ArticlesByLevel({ params }: Props) {
  const articles = getLevelArticles(params.level);

  if (articles.length === 0) {
    notFound();
  }

  const levelTitle =
    params.level.charAt(0).toUpperCase() + params.level.slice(1);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <BackButton className="text-violet-400 hover:text-violet-300 mb-6" />
          <div className="flex items-center gap-4 mb-4">
            <span
              className={`w-3 h-3 rounded-full ${
                params.level === "beginner"
                  ? "bg-emerald-500"
                  : params.level === "intermediate"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            ></span>
            <h1 className="text-4xl font-bold text-white">
              {levelTitle} Level
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            {`All available articles for ${levelTitle.toLowerCase()} level English learners`}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${params.level}/${article.id}`}
              className="group block p-6 rounded-xl bg-[#1A1A1B] hover:bg-[#1E1E1F] border border-gray-800 hover:border-violet-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <ReadingStatus
                  articleId={article.id}
                  className="mt-1 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-xl font-medium text-white group-hover:text-violet-400 transition-colors flex-1">
                      {article.title}
                    </h3>
                  </div>
                  <p className="text-gray-400">{article.excerpt}</p>
                  {article.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No articles found for this level.</p>
          </div>
        )}
      </div>
    </div>
  );
}
