import { siteText } from './site';

export const links = {
  home: { href: '/', label: 'Home' },
  progress: { href: '/reading-progress', label: 'Progress' },
  about: { href: '/about', label: 'About' },
  contact: { href: '/contact', label: 'Contact' },
};

export const EXTENSIONS_LINKS = {
  chrome:
    'https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb',
  firefox: 'https://addons.mozilla.org/en-US/firefox/addon/to-google-translate/',
  edge: 'https://microsoftedge.microsoft.com/addons/detail/kkmlkkjojmombglmlpbpapmhcaljjkde',
  safari: 'https://apps.apple.com/us/app/translate-tab/id458725185',
};

export const filterButtons = [
  { id: 'all', label: siteText.home.allBtn },
  { id: 'pre-beginner', label: siteText.home.preBeginnerBtn },
  { id: 'beginner', label: siteText.home.beginnerBtn },
  { id: 'intermediate', label: siteText.home.intermediateBtn },
  { id: 'advanced', label: siteText.home.advancedBtn },
];

export const readStatusButtons = [
  { id: 'all', label: siteText.home.allBtn },
  { id: 'read', label: siteText.home.readBtn },
  { id: 'unread', label: siteText.home.unreadBtn },
];
