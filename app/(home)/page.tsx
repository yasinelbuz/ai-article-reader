import HomeContainer from '@/containers/home';
import { getPosts } from '@/services/articles';
import { ArticleTypes } from '@/types/articles';

export default async function Home({ params }: { params: Promise<{ language: string }> }) {
  const [language] = (await params).language || [];
  const articles: ArticleTypes[] = await getPosts(language);

  return <HomeContainer articles={articles} />;
}
