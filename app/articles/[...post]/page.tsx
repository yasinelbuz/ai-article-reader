import { notFound } from "next/navigation";
import BackButton from "@/components/back-button";
import { getPostByID } from "@/services/articles";
import ShortUniqueId from 'short-uuid'
import { Metadata } from "next";

const translator = ShortUniqueId() // veya: require('short-uuid')()

export async function generateMetadata({ params }: { params: Promise<{ post: string }> }): Promise<Metadata> {
  const [id] = (await params).post;
  const article = await getPostByID(translator.toUUID(id));

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

  const article = await getPostByID(translator.toUUID(id));

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
      <span className="uppercase text-sm tracking-widest text-gray-400">
        {category}
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
