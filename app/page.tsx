import { getAllArticles } from "@/utils/articles";
import { Level } from "@/types/articles";
import Content from "@/containers/home/Content";

export default function HomePage() {
  const levels: Level[] = getAllArticles();

  return (
    <div className="bg-[#0A0A0B] text-white">
      <Content levels={levels} />
    </div>
  );
}
