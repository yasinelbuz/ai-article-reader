import Hero from "@/containers/home/Hero";
import Content from "@/containers/home/Content";
import { getAllArticles } from "@/utils/articles";
import { Level } from "@/types/articles";

export default function HomePage() {
  const levels: Level[] = getAllArticles();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <Hero />
      <Content levels={levels} />
    </div>
  );
}
