"use client";

import React, { useState } from "react";
import ArticleCard from "@/components/article-card";
import { filterButtons, readStatusButtons } from "@/config/links";
import { Level, ReadStatus } from "@/types";
import { ArticleTypes } from "@/types/articles";
import { cn } from "@/utils";
import { Divider } from "@/components/ui/divider";
import { siteText } from "@/config/site";
import { generateSlug } from "@/utils/slug-generator";


type FilterButtonTypes = {
  selectedLevel: string,
  setSelectedLevel: (level: Level) => void
} 

type ReadStatusButtonTypes = {
  selectedReadStatus: string,
  setSelectedReadStatus: (readStatus: ReadStatus) => void
}

type HomeContainerTypes = {
  articles: ArticleTypes[]
}

const initialSelectedLevelAndReadStatusValue = "all"

const mainClass = "container mx-auto px-4 py-16"
const mainInlineClass = "flex flex-col gap-4 my-8"
const dividerClass = "my-8 border-gray-600"
const articleCountClass = "flex items-center text-sm text-gray-400"
const articleGridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

export default function HomeContainer({ articles }: HomeContainerTypes) {
  const [selectedLevel, setSelectedLevel] = useState<Level>(initialSelectedLevelAndReadStatusValue);
  const [readStatus, setReadStatus] = useState<ReadStatus>(initialSelectedLevelAndReadStatusValue);

  const filteredArticles:ArticleTypes[] = articles.filter((article: ArticleTypes) => {
    if (selectedLevel === initialSelectedLevelAndReadStatusValue) return true;
    return generateSlug(article.category) === selectedLevel;
  });

  return (
    <main className={mainClass}>
      <div className={mainInlineClass}>
        <FilterButtons selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel}/>
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

  const container = "flex flex-wrap items-center gap-2"
  const buttonClass = "px-6 py-2.5 rounded-[15px] text-sm font-medium transition-all duration-300"

  return (
    <div className={container}>
          {filterButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setSelectedLevel(button.id as Level)}
              className={cn(buttonClass, 
                selectedLevel === button.id
                ? "bg-violet-800 text-white shadow-lg"
                : "bg-[#1A1A1B] text-gray-400 hover:bg-[#242425] hover:text-violet-400")}
            >
              {button.label}
            </button>
          ))}
        </div>
  )
}

const ReadStatusButtons = ({ selectedReadStatus, setSelectedReadStatus }: ReadStatusButtonTypes) => {

  const container = "flex flex-wrap items-center gap-2"
  const buttonClass = "px-6 py-2.5 rounded-[15px] text-sm font-medium transition-all duration-300"

  return (
    <div className={container}>
          {readStatusButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setSelectedReadStatus(button.id as ReadStatus)}
              className={cn(buttonClass, 
                selectedReadStatus === button.id
                ? "bg-violet-800 text-white shadow-lg"
                : "bg-[#1A1A1B] text-gray-400 hover:bg-[#242425] hover:text-violet-400")}
            >
              {button.label}
            </button>
          ))}
        </div>
  )
}
