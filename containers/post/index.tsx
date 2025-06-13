'use client';

import SpeechText from '@/components/speech-text';
import { ArticleTypes } from '@/types/articles';
import Button from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AnalyzSection from './analyz-section';
import ShareButtons from './share-buttons';
import { useRouter } from 'next/navigation';
import InfoTranslate from './info-translate';
import { useReadLocalStorage } from 'usehooks-ts';
import { storage } from '@/config/local-storage-naming';
import TranslationPopup from './translate';
import { isMobile, isTablet } from 'react-device-detect';

interface ContainerPostProps {
  article: ArticleTypes;
  category: string;
}

export default function ContainerPost({ article, category }: ContainerPostProps) {
  const navigate = useRouter();
  const isOpenAlertLocalStorage = useReadLocalStorage<boolean>(storage.isOpenAlert);

  return (
    <>
      {(isMobile || isTablet) && <TranslationPopup />}
      {Boolean(isOpenAlertLocalStorage) || (!isOpenAlertLocalStorage && <InfoTranslate />)}
      <div className="md:p-16 p-6">
        <div className="flex items-center gap-2 mb-2">
          <Button
            className="flex items-center gap-2"
            variant="gradientTealLime"
            onClick={() => navigate.back()}
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>

          <Button className="flex items-center gap-2" variant="gradientRedYellow">
            <span className="first-letter:uppercase">{category}</span>
          </Button>
        </div>

        <div>
          <h1 className="text-3xl md:text-7xl/[6rem] font-extrabold mb-6 bg-gradient-to-r dark:selection:bg-blue-600 dark:selection:text-white from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {article?.title}
          </h1>

          <p className="text-lg md:text-4xl/[3.5rem] whitespace-pre-line">
            <SpeechText article={article?.content} />
          </p>
        </div>

        <AnalyzSection article={article?.content} />

        <ShareButtons title={article?.title} />
      </div>
    </>
  );
}
