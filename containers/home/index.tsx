'use client';

import React, { useState } from 'react';
import ArticleCard from '@/components/article-card';
import { filterButtons } from '@/config/links';
import { Level } from '@/types';
import { ArticleTypes } from '@/types/articles';
import { siteText } from '@/config/site';
import { generateSlug } from '@/utils/slug-generator';
import Button from '@/components/ui/button';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { storage } from '@/config/constants';

type FilterButtonTypes = {
  selectedLevel: string;
  setSelectedLevel: (level: Level) => void;
};

type HomeContainerTypes = {
  articles: ArticleTypes[];
};

const initialSelectedLevelAndReadStatusValue = 'all';

const mainClass = 'md:p-16 p-6 4xl:container 4xl:mx-auto';
const mainInlineClass = 'flex flex-col gap-4 mb-16';
const articleCountClass = 'flex items-center text-sm text-gray-400';
const articleGridClass =
  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-3 gap-6';

export default function HomeContainer({ articles }: HomeContainerTypes) {
  const selectedLevelLocalStorage: Level | null = useReadLocalStorage(storage.selectedLevel);

  const [selectedLevel, setSelectedLevel] = useState<Level>(
    selectedLevelLocalStorage || (initialSelectedLevelAndReadStatusValue as Level)
  );

  const filteredArticles: ArticleTypes[] = articles.filter((article: ArticleTypes) => {
    if (selectedLevel === initialSelectedLevelAndReadStatusValue) return true;
    return generateSlug(article.category) === selectedLevel;
  });

  return (
    <main className={mainClass}>
      <div className={mainInlineClass}>
        <FilterButtons selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />
        {/* <ReadStatusButtons selectedReadStatus={readStatus} setSelectedReadStatus={setReadStatus}/> */}

        <div className={articleCountClass}>
          {filteredArticles.length} {siteText.home.articleCountLabel}
        </div>
      </div>

      <div className={articleGridClass}>
        {filteredArticles.map((article: ArticleTypes) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}

const FilterButtons = ({ selectedLevel, setSelectedLevel }: FilterButtonTypes) => {
  const container = 'flex flex-wrap items-center gap-2';

  const [selectedLevelLocalStorage, setSelectedLevelLocalStorage] = useLocalStorage(
    storage.selectedLevel,
    selectedLevel as Level
  );

  const handleButtonClick = (level: Level) => {
    setSelectedLevel(level);
    setSelectedLevelLocalStorage(level);
  };

  return (
    <div className={container}>
      {filterButtons.map(button => (
        <Button
          key={button.id}
          onClick={() => handleButtonClick(button.id as Level)}
          variant={
            (selectedLevelLocalStorage || selectedLevel) === button.id
              ? 'gradientPurpleBlue'
              : 'gradientTealLime'
          }
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};
