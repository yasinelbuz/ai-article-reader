import { Navbar } from '@/components/header';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { AnalyticsWrapper } from '@/components/wrapper/analytics-wrapper';
import { inter } from '@/config/fonts';
import { GeneralMetadata } from '@/config/seo';
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
