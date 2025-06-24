'use client';

import Link from 'next/link';
import dayjs from 'dayjs';
import { MoveRight } from 'lucide-react';
import relativeTime from 'dayjs/plugin/relativeTime';
import { generateSlug } from '@/utils/slug-generator';
import { ArticleTypes } from '@/types/articles';
import Button from './ui/button';
import { cn } from '@/lib/utils';

dayjs.extend(relativeTime);

export default function ArticleCard({
  article,
  isReadLocalStorageList,
}: {
  article: ArticleTypes;
  isReadLocalStorageList: string[];
}) {
  const isRead = isReadLocalStorageList.includes(article.id);

  return (
    <div
      className={cn(
        'h-[350px] text-black bg-white group relative block rounded-[20px] border border-gray-300 transition-all duration-300 hover:shadow-[0_0_50px_0_rgba(0,0,0,0.05)] overflow-hidden',
        isRead && 'grayscale'
      )}
    >
      {isRead && (
        <div
          className="absolute inset-0 pointer-events-none z-20 blur-sm grayscale"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg width='100%' height='100%' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='scratch' width='10' height='10' patternUnits='userSpaceOnUse'><path d='M0,10 L10,0' stroke='black' stroke-width='0.5' opacity='1' /></pattern></defs><rect width='100%' height='100%' fill='url(%23scratch)' /></svg>")`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 1,
          }}
        />
      )}

      {/* Kategori efekti (arka plan dairesi) */}
      {!isRead && (
        <div
          className={`group-hover:bg-blue-500 group-hover:p-36 transition-all duration-300 absolute top-0 left-0 p-24 rounded-br-full z-[0] ${article.category}`}
        ></div>
      )}

      {/* Ana içerik */}
      <div className="h-full relative z-10">
        <div className="p-8">
          <Link
            href={`/articles/${generateSlug(article.category)}/${generateSlug(article.title)}/${
              article.id
            }`}
          >
            <h1 className="text-[2.8rem] font-extrabold leading-tight tracking-tight line-clamp-2 break-words">
              {article.title}
            </h1>
          </Link>

          <p className="text-xs mt-1">{dayjs(article.created_time).fromNow()}</p>
          <p className="inline-block line-clamp-2 mt-4 text-sm">{article.content_summary}</p>

          <div className="flex items-center mt-4 gap-2">
            <span
              className={cn(
                'inline-flex items-center px-3 py-1 border text-xs font-semibold rounded-full capitalize',
                article.category === 'Beginner' && 'border-green-600',
                article.category === 'Intermediate' && 'border-yellow-600',
                article.category === 'Advanced' && 'border-red-600'
              )}
              aria-label="Difficulty Level"
            >
              {article.category}
            </span>
            {isRead && (
              <span
                className={cn(
                  'inline-flex items-center px-3 py-1 border text-xs font-semibold rounded-full capitalize',
                  isRead && 'border-green-600'
                )}
                aria-label="Difficulty Level"
              >
                Readed
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/articles/${generateSlug(article.category)}/${generateSlug(article.title)}/${
            article.id
          }`}
          className="block absolute left-0 right-0 bottom-0"
        >
          <div className="sticky bottom-0 flex items-center justify-center">
            <Button
              variant="gradientPurpleBlue"
              className="w-full h-[50px] flex items-center gap-2 justify-center rounded-tl-[0] rounded-tr-[0]"
            >
              <span>Start Reading</span>
              <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
