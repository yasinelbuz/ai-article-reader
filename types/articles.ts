export interface Level {
  id: string;
  title: string;
  description: string;
  articles: Article[];
}
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  tags?: string[];
  readingTime?: string;
  difficulty?: string;
  order?: number;
  date?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

export interface ArticleContent {
  title: string;
  excerpt: string;
  content: string;
  readingTime?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags?: string[];
  quiz?: Quiz;
  date?: string;
}
