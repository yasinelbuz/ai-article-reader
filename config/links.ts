import { siteText } from "./site";

export const links = {
    home: { href: "/", label: "Home" },
    progress: { href: "/reading-progress", label: "Progress" },
    about: { href: "/about", label: "About" },
    contact: { href: "/contact", label: "Contact" },
  };

export const filterButtons = [
    { id: "all", label: siteText.home.allBtn },
    { id: "beginner", label: siteText.home.beginnerBtn },
    { id: "intermediate", label: siteText.home.intermediateBtn },
    { id: "advanced", label: siteText.home.advancedBtn },
  ];

export const readStatusButtons = [
    { id: "all", label: siteText.home.allBtn },
    { id: "read", label: siteText.home.readBtn },
    { id: "unread", label: siteText.home.unreadBtn },
  ];