import StudyWordsContainer from '@/containers/study-words/page';
import { getPostByID } from '@/services/articles';
import { notFound } from 'next/navigation';

export default async function StudyWordsPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const article = await getPostByID(id);

  if (!article) {
    notFound();
  }
  return <StudyWordsContainer article={article} />;
}
