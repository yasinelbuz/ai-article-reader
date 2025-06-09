import { notFound } from "next/navigation";
import BackButton from "@/components/back-button";
import { getPostByID } from "@/services/articles";
import { Metadata } from "next";
import { calculateReadingTime } from "@/utils/calculate-reading-time";
import { siteText } from "@/config/site";

export async function generateMetadata({ params }: { params: Promise<{ post: string }> }): Promise<Metadata> {
  const id = (await params).post[2];
  const article = await getPostByID(id);

  return {
    title: article.title,
    description: article.content_summary,
  };
}

export default async function ArticlesByLevel({ params }: {
  params: Promise<{ post: string }>
}) {
  const [category, title, id] = (await params).post;

  if (!category || !title || !id) {
    notFound();
  }

  const article = await getPostByID(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen md:p-16 p-6">
      <div className="font-sans">
        <BackButton className="text-violet-400 hover:text-violet-300 mb-6" />

        <div className="flex items-center gap-2 mb-4">
          <span
        className={`w-3 h-3 rounded-full ${
          category === "beginner"
            ? "bg-emerald-500"
            : category === "intermediate"
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
      ></span>
      <span className="first-letter:uppercase text-sm tracking-widest text-gray-400">
        {category}
      </span>

      -

      <span className="text-sm text-gray-400">
        {siteText.post.readingTime} {calculateReadingTime(article?.content)}
      </span>
    </div>

    <div>
      <h1 className="text-3xl md:text-7xl font-bold mb-6 leading-snug">
        {article?.title}
      </h1>

      <p className="text-lg md:text-4xl/[3.5rem] whitespace-pre-line">
       {article?.content}
      </p>
    </div>
  </div>
</div>
  );
}
