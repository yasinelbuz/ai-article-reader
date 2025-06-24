'use client';

import { ArticleTypes } from '@/types/articles';
import AnalyzSection from './analyz-section';
import InfoTranslate from './info-translate';
import { useReadLocalStorage } from 'usehooks-ts';
import { storage } from '@/config/constants';
import NavigateHeader from './navigate';
import TakeNote from './take-note';
import IReadButton from './i-read-button';

interface ContainerPostProps {
  article: ArticleTypes;
  category: string;
}

export default function ContainerPost({ article, category }: ContainerPostProps) {
  const isOpenAlertLocalStorage = useReadLocalStorage<boolean>(storage.isOpenAlert);

  return (
    <>
      {Boolean(isOpenAlertLocalStorage) || (!isOpenAlertLocalStorage && <InfoTranslate />)}
      <div className="md:p-16 p-6">
        <NavigateHeader category={category} id={article?.id} />

        <div>
          <h1 className="text-3xl md:text-7xl/[6rem] font-extrabold mb-6 bg-gradient-to-r dark:selection:bg-blue-600 dark:selection:text-white from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {article?.title}
          </h1>

          <p className="text-lg md:text-4xl/[3.5rem] whitespace-pre-line">{article?.content}</p>
        </div>

        <AnalyzSection article={article?.content} />

        <IReadButton id={article?.id} />

        <TakeNote id={article?.id} title={article?.title} />
      </div>
    </>
  );
}
