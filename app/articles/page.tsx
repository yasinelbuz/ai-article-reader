import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/utils/articles";
import ReadingStatus from "@/components/ReadingStatus";
import { Article, Level } from "@/types/articles";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "All Articles",
  description: "Browse all available articles by difficulty level",
};

export default function ArticlesPage() {
  notFound();
  return <div>Articles</div>;
}
