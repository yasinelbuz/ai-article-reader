import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ReadNow - Improve Your English with AI",
    template: "%s | ReadNow",
  },
  description:
    "Enhance your English reading skills with AI-powered articles tailored to your level. Practice vocabulary, track progress, and learn efficiently.",
  keywords: [
    "English learning",
    "AI articles",
    "reading practice",
    "vocabulary",
    "language learning",
  ],
  authors: [{ name: "ReadNow Team" }],
  openGraph: {
    title: "ReadNow",
    description: "AI-powered English reading practice",
    url: "https://readnow.com",
    siteName: "ReadNow",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
