import { Metadata } from "next";
import { siteConfig } from "./site";

const keywords = [
  "English learning",
  "AI articles",
  "reading practice",
  "vocabulary",
  "language learning",
];

export const GeneralMetadata: Metadata = {
    title: {
      default: siteConfig.name + " - " + siteConfig.description,
      template: "%s | " + siteConfig.name,
    },
    description:
      siteConfig.description,
    keywords: keywords,
    authors: siteConfig.authors,
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: siteConfig.ogImage }],
    },
  };