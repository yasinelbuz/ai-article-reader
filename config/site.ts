import { SiteConfig } from '@/types';

const site_url = process.env.NEXT_PUBLIC_APP_URL;
export const PrefersColorShemeDark = '(prefers-color-scheme: dark)';

export const themeOptions = {
  light: 'light',
  dark: 'dark',
};

export const siteConfig: SiteConfig = {
  name: 'ReadNow',
  description: 'Learn English with interesting articles',
  url: site_url?.toString() || '',
  ogImage: `${site_url?.toString() || ''}/og.png`,
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
