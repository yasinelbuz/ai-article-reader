import { SiteConfig } from "@/types";

const site_url = process.env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "ReadNow",
  description: "Learn English with interesting articles",
  url: site_url?.toString() || "",
  ogImage: `${site_url?.toString() || ""}/og.jpg`,
  mailSupport: "yasinelbuz@gmail.com",
  authors: [{ name: "Yasin Elbüz" }],
};

export const siteText = {
  home: {
    articleCountLabel: "articles found",
    allBtn:"All Articles",
    beginnerBtn:"Beginner",
    intermediateBtn:"Intermediate",
    advancedBtn:"Advanced",
    readBtn:"Read",
    unreadBtn:"Unread",
  },
  notFound: {
    title: "404",
    description: "Oops! The page you're looking for doesn't exist or has been moved.",
    returnHomeButton: "Return Home",
  },
}
