import { MDXRemote } from "next-mdx-remote/rsc";
import ArticleQuiz from "./ArticleQuiz";
import ReadingStatusBadge from "./ReadingStatusBadge";
import ArticleInteractiveWrapper from "./ArticleInteractiveWrapper";

interface ArticleContentProps {
  content: string;
  data: {
    title: string;
    tags?: string[];
    excerpt?: string;
    quiz?: {
      title: string;
      questions: {
        id: string;
        question: string;
        options: string[];
        correctAnswer: number;
      }[];
    };
  };
  params: {
    level: string;
    articleId: string;
  };
  levelTitle: string;
}

export default async function ArticleContent({
  content,
  data,
  params,
  levelTitle,
}: ArticleContentProps) {
  return (
    <ArticleInteractiveWrapper
      params={params}
      data={data}
      levelTitle={levelTitle}
    >
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <header className="article-header mb-12">
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
            <ReadingStatusBadge articleId={String(params.articleId)} />
          </h1>
          <p className="text-gray-400">{data.excerpt}</p>
        </header>

        <div className="prose prose-lg dark:prose-invert">
          <div className="article-content">
            <MDXRemote source={content} />
          </div>
        </div>
      </article>
    </ArticleInteractiveWrapper>
  );
}
