import Link from "next/link";
import { getAllArticles } from "../utils/articles";
import ReadingStatus from "@/components/ReadingStatus";

const PREVIEW_COUNT = 3; // Kaç makale gösterileceği

export default function HomePage() {
  const levels = getAllArticles();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-violet-950/50 to-[#0A0A0B]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-6xl font-bold text-center mb-6 bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text">
            ReadNow
          </h1>
          <p className="text-xl text-center text-gray-400 max-w-2xl mx-auto">
            Explore a variety of interesting articles written in English.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {levels.map((level) => (
            <div key={level.id} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl blur-sm group-hover:blur opacity-25 group-hover:opacity-50 transition-all"></div>
              <div className="relative bg-[#1A1A1B] rounded-2xl p-6 h-full border border-gray-800 hover:border-violet-500/50 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        level.id === "beginner"
                          ? "bg-emerald-500"
                          : level.id === "intermediate"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <h2 className="text-2xl font-bold text-white">
                      {level.title}
                    </h2>
                  </div>
                  {level.articles.length > PREVIEW_COUNT && (
                    <Link
                      href={`/articles/${level.id}`}
                      className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      View All ({level.articles.length})
                    </Link>
                  )}
                </div>
                <p className="text-gray-400 mb-8">{level.description}</p>

                <div className="space-y-4">
                  {level.articles.slice(0, PREVIEW_COUNT).map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${level.id}/${article.id}`}
                      className="group block p-6 rounded-xl bg-[#141415] hover:bg-[#1E1E1F] border border-gray-800/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5"
                    >
                      <div className="flex items-start gap-4">
                        <ReadingStatus
                          articleId={article.id}
                          className="mt-1.5 shrink-0"
                        />
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white leading-relaxed group-hover:text-violet-400 transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed mt-2">
                              {article.excerpt}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                                {article.readingTime}
                              </span>
                              <div className="flex items-center gap-2 text-violet-400 text-sm">
                                <span>Start Reading</span>
                                <svg
                                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
