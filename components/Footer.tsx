/** @format */

'use client';

import Link from 'next/link';
import config from '@/config';
import { useTheme } from 'next-themes';
import Logo from './Logo';
import { KEYWORDS } from '@/lib/keyword';
import { getAbsoluteUrl } from '@/lib/utils';

// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.resend.supportEmail, the link won't be displayed.

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className='border-t border-border bg-background'>
      <div className='max-w-7xl mx-auto px-8 py-24'>
        <div className='flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col gap-10'>
          <div className='w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left'>
            <Logo
              className='justify-center md:justify-start'
              priority={true}
            />

            <p className='mt-3 text-sm text-muted-foreground'>
              {config.appDescription}
            </p>
            <p className='mt-3 text-sm text-muted-foreground/60'>
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>

          <div className='flex-grow flex flex-wrap justify-center -mb-10 md:mt-0 mt-10'>
            <div className='lg:w-1/3 md:w-1/2 w-full px-4'>
              <div className='font-semibold text-foreground tracking-widest text-sm text-center md:text-left mb-3'>
                POPULAR LINKS
              </div>

              <div className='flex flex-col justify-center items-center md:items-start gap-2 mb-10'>
                {KEYWORDS.slice(0, 6).map((keyword) => (
                  <Link
                    key={keyword.slug}
                    href={getAbsoluteUrl(`/${keyword.slug}`)}
                    className='text-sm leading-6 text-foreground/80 hover:text-foreground transition-colors'>
                    {keyword.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className='lg:w-1/3 md:w-1/2 w-full px-4'>
              <div className='font-semibold text-foreground tracking-widest text-sm text-center md:text-left mb-3'>
                MORE LINKS
              </div>

              <div className='flex flex-col justify-center items-center md:items-start gap-2 mb-10'>
                {KEYWORDS.slice(6).map((keyword) => (
                  <Link
                    key={keyword.slug}
                    href={getAbsoluteUrl(`/${keyword.slug}`)}
                    className='text-sm leading-6 text-foreground/80 hover:text-foreground transition-colors'>
                    {keyword.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className='lg:w-1/3 md:w-1/2 w-full px-4'>
              <div className='font-semibold text-foreground tracking-widest text-sm text-center md:text-left mb-3'>
                LEGAL
              </div>

              <div className='flex flex-col justify-center items-center md:items-start gap-1 mb-10'>
                <Link
                  href={getAbsoluteUrl('/tos')}
                  className='text-sm  leading-6 text-foreground/80 hover:text-foreground transition-colors'>
                  Terms of services
                </Link>
                <Link
                  href={getAbsoluteUrl('/privacy-policy')}
                  className='text-sm leading-6 text-foreground/80 hover:text-foreground transition-colors'>
                  Privacy policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
