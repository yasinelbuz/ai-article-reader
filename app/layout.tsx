import type { Metadata } from "next";
import { GeneralMetadata } from "@/config/seo";
import { GeneralLayoutProps } from "@/types";
import { AnalyticsWrapper } from "@/components/wrapper/analytics-wrapper";
import { inter } from "@/config/fonts";
import "@/styles/globals.css";
import { Navbar } from "@/components/header";

export const metadata: Metadata = GeneralMetadata;

const Head = () => {
  return (
    <head>
      <link rel="icon" href="/logo.svg" />
    </head>
  );
};

export default function RootLayout({
  children,
}: GeneralLayoutProps) {
  return (
    <html lang="en" className="black">
      <Head />
      <body className={inter.className}>
        <Navbar />
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
