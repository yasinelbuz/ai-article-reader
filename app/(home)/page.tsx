import HomeContainer from '@/containers/home';
import { getPosts } from '@/services/articles';
import { ArticleTypes } from '@/types/articles';

export default async function Home({ searchParams }: { searchParams: { language: string } }) {
  const articles: ArticleTypes[] = await getPosts(searchParams.language);

  return <HomeContainer articles={articles} />;
}
