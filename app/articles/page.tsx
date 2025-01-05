import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "All Articles",
  description: "Browse all available articles by difficulty level",
};

export default function ArticlesPage() {
  notFound();
  return <div>Articles</div>;
}
