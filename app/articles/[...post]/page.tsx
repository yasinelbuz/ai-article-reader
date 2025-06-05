import { notFound } from "next/navigation";
import BackButton from "@/components/back-button";
import { getPostByTitleAndCategory } from "@/services/articles";

export default async function ArticlesByLevel({ params }: {
  params: Promise<{ post: string }>
}) {
  const [category, title] = (await params).post;

  if (!category || !title) {
    notFound();
  }

  const article = await getPostByTitleAndCategory(title, category);

  if (!article) {
    notFound();
  }
  
  return (
    <div className="bg-[#1C1C1C] min-h-screen py-12 px-4 text-[#E0E0E0]">
  <div className="max-w-3xl mx-auto font-sans">
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

    <div className="bg-[#2A2A2A] rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-snug">
        {article?.title}
      </h1>

      <p className="text-gray-200 text-lg leading-relaxed tracking-wide whitespace-pre-line">
       {article?.content}
      </p>
    </div>
  </div>
</div>
  );
}
