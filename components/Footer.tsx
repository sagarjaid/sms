/** @format */

import Link from 'next/link';
import Image from 'next/image';
import config from '@/config';
import logo from '@/app/logo.png';
import logo2 from '@/app/logo-2.png';
import { useTheme } from 'next-themes';

// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.resend.supportEmail, the link won't be displayed.

const Footer = () => {
  const { theme } = useTheme();

  const getLogo = () => {
    return theme === 'dark' ? logo2 : logo;
  };

  return (
    <footer className='border-t border-border bg-background'>
      <div className='max-w-7xl mx-auto px-8 py-24'>
        <div className='flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col'>
          <div className='w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left'>
            <Link
              className='flex items-center justify-center md:justify-start gap-2'
              href='/'
              title={`${config.appName} homepage`}>
              <Image
                src={getLogo()}
                alt={`${config.appName} logo`}
                className='w-[130px] transition-all duration-300'
                placeholder='blur'
                priority={true}
                width={100}
                height={50}
              />
            </Link>

            <p className='mt-3 text-sm text-muted-foreground'>
              {config.appDescription}
            </p>
            <p className='mt-3 text-sm text-muted-foreground/60'>
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>

          <div className='flex-grow flex flex-wrap justify-center -mb-10 md:mt-0 mt-10'>
            <div className='lg:w-1/3 md:w-1/2 w-full px-4'>
              <div className='font-semibold text-foreground tracking-widest text-sm md:text-left mb-3'>
                LINKS
              </div>

              <div className='flex flex-col justify-center items-center md:items-start gap-1 mb-10'>
                <Link
                  href='/stock'
                  className='text-sm  leading-6 text-foreground/80 hover:text-foreground transition-colors'>
                  Stocks
                </Link>
                <Link
                  href='/commodity/gld-vs-btc'
                  className='text-sm font-semibold leading-6 text-foreground/80 hover:text-foreground transition-colors'>
                  Commodities
                </Link>
                <Link
                  href='/currency'
                  className='text-sm leading-6 text-foreground/80 hover:text-foreground transition-colors'>
                  Currencies
                </Link>
                <Link
                  href='/real-estate'
                  className='text-sm leading-6 text-foreground/80 hover:text-foreground transition-colors'>
                  Real Estate
                </Link>
                <Link
                  href='/indices'
                  className='text-sm  leading-6 text-foreground/80 hover:text-foreground transition-colors'>
                  Indices
                </Link>
                <Link
                  href='/bond'
                  className='text-sm  leading-6 text-foreground/80 hover:text-foreground transition-colors'>
                  Bonds
                </Link>
              </div>
            </div>

            <div className='lg:w-1/3 md:w-1/2 w-full px-4'>
              <div className='font-semibold text-foreground tracking-widest text-sm md:text-left mb-3'>
                LEGAL
              </div>

              <div className='flex flex-col justify-center items-center md:items-start gap-1 mb-10'>
                <Link
                  href='/tos'
                  className='text-sm  leading-6 text-foreground/80 hover:text-foreground transition-colors'>
                  Terms of services
                </Link>
                <Link
                  href='/privacy-policy'
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
