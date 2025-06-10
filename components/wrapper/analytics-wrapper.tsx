'use client';

import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

export const AnalyticsWrapper = () => (
  <>
    <Analytics />
    <GoogleAnalytics gaId="G-S91SX8FPZ1" />
  </>
);
