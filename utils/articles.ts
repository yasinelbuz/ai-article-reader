import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  tags?: string[];
  readingTime?: string;
}

interface Level {
  id: string;
  title: string;
  description: string;
  articles: Article[];
}

export function getAllArticles(): Level[] {
  const levels = [
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

      level.articles = files
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
          const filePath = path.join(levelPath, file);
          const fileContent = fs.readFileSync(filePath, "utf8");
          const { data } = matter(fileContent);

          return {
            id: file.replace(".md", ""),
            title: data.title,
            excerpt: data.excerpt,
            tags: data.tags,
            readingTime: data.readingTime,
          };
        });
    }
  });

  return levels;
}

export function getLevelArticles(levelId: string): Article[] {
  try {
    const levelPath = path.join(process.cwd(), "content", levelId);

    // Dizin var mı kontrol et
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
          title: data.title,
          excerpt: data.excerpt,
          difficulty: data.difficulty,
          readingTime: data.readingTime,
          tags: data.tags,
          order: data.order || 0,
        } as Article;
      })
      .sort((a, b) => a.order - b.order);

    return articles;
  } catch (error) {
    console.error(`Error reading level ${levelId}:`, error);
    return [];
  }
}
