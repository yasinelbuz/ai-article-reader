import HomeContainer from '@/containers/home';
import { getPosts } from '@/services/articles';
import { ArticleTypes } from '@/types/articles';

export default async function Home({ searchParams }: { searchParams: Promise<{ language: string }> }) {
  const language = (await searchParams).language || 'english';
  const articles: ArticleTypes[] = await getPosts(language);

  return <HomeContainer articles={articles} />;
}
