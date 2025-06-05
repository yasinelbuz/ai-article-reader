import Link from "next/link";
import dayjs from "dayjs";
import { MoveRight } from "lucide-react";
import relativeTime from "dayjs/plugin/relativeTime";
import { generateSlug } from "@/utils/slug-generator";
import { ArticleTypes } from "@/types/articles";

dayjs.extend(relativeTime);

export default function ArticleCard({ article }: {article: ArticleTypes}) {
  return (
    <div className="h-[350px] text-black bg-white group relative block rounded-[20px] border border-gray-300 transition-all duration-300 hover:shadow-[0_0_50px_0_rgba(0,0,0,0.05)] overflow-hidden">
      <div
        className={`group-hover:bg-blue-500 group-hover:p-36 transition-all duration-300 absolute top-0 left-0 p-24 rounded-br-full z-[0] ${
          article.category
        }`}
      ></div>
      <div className="h-full relative z-1">
        {/* Title & Description */}
        <div className="p-8">
          <Link href={`/articles/${generateSlug(article.category)}/${generateSlug(article.title)}`}>
            <h1 className="text-[2.8rem] font-extrabold leading-tight tracking-tight">
              {article.title}
            </h1>
          </Link>

          {/* Date */}
          <p className="text-gray-400 text-xs mt-1">{dayjs(article.created_time).fromNow()}</p>

          {/* Description */}
          <p className="inline-block line-clamp-2 mt-4 text-sm">
            {article.content_summary}
          </p>

          {/* Reading Time & Difficulty Level */}
          <div className="flex items-center mt-4">
            <span
              className={`inline-flex items-center px-3 py-1 border text-xs font-semibold rounded-full capitalize
                ${article.category === "Beginner" ? "border-green-600" : ""}
                ${article.category === "Intermediate" ? "border-yellow-600" : ""}
                ${article.category === "Advanced" ? "border-red-600" : ""}`}
              aria-label="Difficulty Level"
            >
              {article.category}
            </span>
          </div>
        </div>

        {/* Footer */}
        <Link
          href={`/articles/${generateSlug(article.category)}/${generateSlug(article.title)}`}
          className="border-t border-gray-900 block bg-black absolute left-0 right-0 bottom-0"
        >
          <div className="p-4 sticky bottom-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-3 text-sm font-semibold text-gray-100 transition-colors">
              <span>Start Reading</span>
              <MoveRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
