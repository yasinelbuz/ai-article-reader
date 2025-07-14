import { Navbar } from '@/components/header';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { AnalyticsWrapper } from '@/components/wrapper/analytics-wrapper';
import { inter } from '@/config/fonts';
import { GeneralMetadata } from '@/config/seo';
import { siteConfig } from '@/config/site';
import '@/styles/globals.css';
import { GeneralLayoutProps } from '@/types';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = GeneralMetadata;

const Head = () => {
  return (
    <head>
      <link rel="icon" href="/logo.svg" />
      <meta name="google-site-verification" content="nLDpdh9AzX941qbDx6EBjfNsVnq2y2zP1ExJ93D6sbM" />
      <meta property="og:title" content={siteConfig.name} />
      <meta property="og:description" content={siteConfig.description} />
      <meta property="og:image" content={siteConfig.ogImage} />
      <meta property="og:url" content={siteConfig.url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteConfig.name} />
      <meta name="twitter:description" content={siteConfig.description} />
      <meta name="twitter:image" content={siteConfig.ogImage} />
      <meta name="twitter:url" content={siteConfig.url} />
      <meta name="twitter:site" content={siteConfig.name} />
    </head>
  );
};

export default function RootLayout({ children }: GeneralLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <AnalyticsWrapper />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
