'use client';

import { calculateReadingTime } from '@/utils/calculate-reading-time';
import { siteText } from '@/config/site';

import SpeechText from '@/components/speech-text';
import { ArticleTypes } from '@/types/articles';
import Button from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Divider } from '@/components/ui/divider';
import AnalyzSection from './analyz-section';
import ShareButtons from './share-buttons';
import { useRouter } from 'next/navigation';

interface ContainerPostProps {
  article: ArticleTypes;
  category: string;
}

export default function ContainerPost({ article, category }: ContainerPostProps) {
  const navigate = useRouter();
  return (
    <div className="md:p-16 p-6">
      <Button
        className="flex items-center gap-2 mb-2"
        variant="gradientTealLime"
        onClick={() => navigate.back()}
      >
        <ArrowLeft />
        <span>Back</span>
      </Button>

      <div>
        <h1 className="text-3xl md:text-7xl/[6rem] font-extrabold mb-6 text-purple-700">
          {article?.title}
        </h1>

        <p className="text-lg md:text-4xl/[3.5rem] whitespace-pre-line">
          <SpeechText article={article?.content} />
        </p>
      </div>

      <AnalyzSection article={article?.content} />

      <ShareButtons title={article?.title} />
    </div>
  );
}
