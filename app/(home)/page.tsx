import HomeContainer from "@/containers/home";
import { getPosts } from "@/services/articles";
import { ArticleTypes } from "@/types/articles";

export default async function Home() {
  const articles: ArticleTypes[] = await getPosts();

  return (
    <HomeContainer articles={articles} />
  );
}
