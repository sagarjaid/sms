/** @format */

import { ReactNode } from 'react';
import { Bricolage_Grotesque } from 'next/font/google';
import { Viewport } from 'next';
import { getSEOTags } from '@/lib/seo';
import ClientLayout from '@/components/LayoutClient';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import config from '@/config';
import './globals.css';
import { ThemeProvider } from '../components/theme-provider';
import { getAbsoluteUrl } from '@/lib/utils';

const font = Bricolage_Grotesque({ subsets: ['latin'] });

export const viewport: Viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: 'device-width',
  initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags({
  title: 'SMSlly - Receive SMS Online | Temporary Phone Number',
  description:
    'Get a temporary phone number to receive SMS online. Free and secure SMS receiving service for verification codes, messages, and more.',
  keywords: [
    'temporary phone number',
    'receive SMS online',
    'SMS verification',
    'virtual phone number',
    'disposable phone number',
    'SMS receiving service',
    'online SMS',
    'free SMS receiver',
  ],
  canonicalUrlRelative: '/',
  extraTags: {
    'google-site-verification': '895IiSDa7RFQw0Hn3OX_FYAZpFILGo1426eQ4JNjla0"',
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      className={font.className}
      suppressHydrationWarning>
      <head>
        <link
          rel='icon'
          href={getAbsoluteUrl('/favicon.png')}
          type='image/png'
          sizes='516x518'
        />
        {/* apple-icon.png is missing, so this will 404 until you add it to public/ */}
        <link
          rel='apple-touch-icon'
          href={getAbsoluteUrl('/apple-icon.png')}
          type='image/png'
          sizes='516x518'
        />
      </head>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
          storageKey='theme'
          forcedTheme={undefined}>
          <GoogleAnalytics />
          {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
