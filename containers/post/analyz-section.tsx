import { analyzeText } from '@/utils/analayz-text';

interface AnalyzSectionProps {
  article: string;
}

export default function AnalyzSection({ article }: AnalyzSectionProps) {
  const analyzeTextResult = analyzeText(article);

  return (
    <div className="mt-12">
      <span className="flex items-center font-medium text-gray-900 dark:text-white me-3">
        <span className="flex w-2.5 h-2.5 bg-blue-600 rounded-full me-1.5 shrink-0"></span>Total
        Words {analyzeTextResult.totalWords}
      </span>
      <span className="flex items-center font-medium text-gray-900 dark:text-white me-3">
        <span className="flex w-2.5 h-2.5 bg-purple-500 rounded-full me-1.5 shrink-0"></span>
        Unique Words {analyzeTextResult.uniqueWordCount}
      </span>
      <span className="flex items-center font-medium text-gray-900 dark:text-white me-3">
        <span className="flex w-2.5 h-2.5 bg-indigo-500 rounded-full me-1.5 shrink-0"></span>
        Sentences Count {analyzeTextResult.sentenceCount}
      </span>
    </div>
  );
}
