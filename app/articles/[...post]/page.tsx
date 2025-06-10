import { notFound } from 'next/navigation';
import { getPostByID } from '@/services/articles';
import { Metadata } from 'next';
import ContainerPost from '@/containers/post';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ post: string }>;
}): Promise<Metadata> {
  const id = (await params).post[2];
  const article = await getPostByID(id);

  return {
    title: article.title,
    description: article.content_summary,
  };
}

export default async function ArticlesByLevel({ params }: { params: Promise<{ post: string }> }) {
  const [category, title, id] = (await params).post;

  if (!id || !category || !title) {
    notFound();
  }

  const article = await getPostByID(id);

  if (!article) {
    notFound();
  }

  return <ContainerPost article={article} category={category} />;
}
