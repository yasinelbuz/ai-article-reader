import type { Metadata } from 'next';
import { GeneralMetadata } from '@/config/seo';
import { GeneralLayoutProps } from '@/types';
import { AnalyticsWrapper } from '@/components/wrapper/analytics-wrapper';
import { inter } from '@/config/fonts';
import '@/styles/globals.css';
import { Navbar } from '@/components/header';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = GeneralMetadata;

const Head = () => {
  return (
    <head>
      <link rel="icon" href="/logo.svg" />
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
