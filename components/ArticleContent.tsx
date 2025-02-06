import { MDXRemote } from "next-mdx-remote/rsc";
import ReadingStatusBadge from "./ReadingStatusBadge";
import ArticleInteractiveWrapper from "./ArticleInteractiveWrapper";
import dayjs from "dayjs";

interface ArticleContentProps {
  content: string;
  data: {
    title: string;
    tags?: string[];
    excerpt?: string;
    date?: string;
    readingTime?: string;
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
      <article className="container mx-auto px-4 py-12 max-w-3xl flex gap-4 items-start">
        <div className="font-bold text-2xl rounded-full bg-yellow-700 w-24 flex">
          1
        </div>
        <div>
          <header className="article-header mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 leading-tight flex items-center gap-4">
              {data.title}
              <ReadingStatusBadge articleId={String(params.articleId)} />
            </h1>

            <time className="text-gray-400 text-sm">
              {dayjs(data.date).format("DD MMM YYYY")}
            </time>

            <p className="text-gray-400">{data.excerpt}</p>
          </header>
          <div className="prose prose-lg dark:prose-invert">
            <div className="article-content">
              <MDXRemote source={content} />
            </div>
          </div>
        </div>
      </article>
    </ArticleInteractiveWrapper>
  );
}
