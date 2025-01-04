import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Article, Level } from "@/types/articles";



export function getAllArticles(): Level[] {
  const levels: Level[] = [
    {
      id: "beginner",
      title: "Beginner",
      description: "Simple articles for beginners",
      articles: [],
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description: "Articles for intermediate learners",
      articles: [],
    },
    {
      id: "advanced",
      title: "Advanced",
      description: "Challenging articles for advanced learners",
      articles: [],
    },
  ];

  // Her seviye için makaleleri oku
  levels.forEach((level) => {
    const levelPath = path.join(process.cwd(), "content", level.id);

    if (fs.existsSync(levelPath)) {
      const files = fs.readdirSync(levelPath);

      const articles: Article[] = files
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
          const filePath = path.join(levelPath, file);
          const fileContent = fs.readFileSync(filePath, "utf8");
          const { data } = matter(fileContent);

          return {
            id: file.replace(".md", ""),
            title: data.title || "",
            excerpt: data.excerpt || "",
            tags: data.tags || [],
            readingTime: data.readingTime || "",
          };
        });

      level.articles = articles;
    }
  });

  return levels;
}

export function getLevelArticles(levelId: string): Article[] {
  try {
    const levelPath = path.join(process.cwd(), "content", levelId);

    if (!fs.existsSync(levelPath)) {
      return [];
    }

    const articles = fs
      .readdirSync(levelPath)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const fullPath = path.join(levelPath, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          id: file.replace(/\.md$/, ""),
          title: data.title || "",
          excerpt: data.excerpt || "",
          tags: data.tags || [],
          readingTime: data.readingTime || "",
          difficulty: data.difficulty,
          order: data.order || 0,
        };
      })
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    return articles;
  } catch (error) {
    console.error(`Error reading level ${levelId}:`, error);
    return [];
  }
}
