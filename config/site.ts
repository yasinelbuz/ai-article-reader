import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'A lot of articles',
  description: 'Learn English with interesting articles',
  url: 'https://ai-articles.vercel.app',
  ogImage: 'https://ai-articles.vercel.app/og.png',
  mailSupport: 'yasinelbuz@gmail.com',
  authors: [{ name: 'Yasin Elbüz' }],
};

export const siteText = {
  home: {
    articleCountLabel: 'articles found',
    allBtn: 'All Articles',
    beginnerBtn: 'Beginner',
    preBeginnerBtn: 'Pre Beginner',
    intermediateBtn: 'Intermediate',
    advancedBtn: 'Advanced',
    readBtn: 'Read',
    unreadBtn: 'Unread',
  },
  notFound: {
    title: '404',
    description: "Oops! The page you're looking for doesn't exist or has been moved.",
    returnHomeButton: 'Return Home',
  },
  post: {
    readingTime: 'Reading time',
    minutes: 'minutes',
    seconds: 'seconds',
    minutesAndSeconds: 'minutes and seconds',
  },
};
