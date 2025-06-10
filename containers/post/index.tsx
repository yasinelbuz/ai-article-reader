/* eslint-disable react/no-unescaped-entities */
'use client';

import { calculateReadingTime } from '@/utils/calculate-reading-time';
import { siteText } from '@/config/site';

import SpeechText from '@/components/speech-text';
import { ArticleTypes } from '@/types/articles';
import Button from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Divider } from '@/components/ui/divider';
import { useNavigation } from '@/hooks/useBackNavigation';

interface ContainerPostProps {
  article: ArticleTypes;
  category: string;
}

export default function ContainerPost({ article, category }: ContainerPostProps) {
  const { goBack } = useNavigation();

  return (
    <div className="md:p-16 p-6">
      <Button className="flex items-center gap-2 mb-2" variant="alternative" onClick={goBack}>
        <ArrowLeft />
        <span>Back</span>
      </Button>

      <div className="flex items-center gap-2 mb-4 ">
        <span className="first-letter:uppercase text-sm tracking-widest text-gray-400">
          {category}
        </span>

        <span className="text-sm text-gray-400">
          {siteText.post.readingTime} {calculateReadingTime(article?.content)}
        </span>
      </div>

      <Divider className="mb-12" />

      <div>
        <h1 className="text-3xl md:text-7xl font-extrabold mb-6 leading-snug">{article?.title}</h1>

        <p className="text-lg md:text-4xl/[3.5rem] whitespace-pre-line">
          <SpeechText article={article?.content} />
        </p>
      </div>

      <div className="flex items-center gap-2 mt-12">
        <Button variant="gradientPurplePink" className="flex items-center gap-2">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              'ReadNow: ' + article?.title
            )}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter'da Paylaş
          </a>
        </Button>
        <Button variant="gradientRedYellow" className="flex items-center gap-2">
          <a
            href={`https://web.whatsapp.com/send/?text=${encodeURIComponent(
              'ReadNow: ' + article?.title + ' ' + window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp'ta Paylaş
          </a>
        </Button>
      </div>
    </div>
  );
}
