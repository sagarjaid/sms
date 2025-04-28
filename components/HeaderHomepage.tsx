/** @format */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import config from '@/config';
import logo from '@/app/logo.png';
import logo2 from '@/app/logo-2.png';
import { Button } from '@/components/ui/button-2';
import { AssetSearch } from './asset-search';

const HeaderHomepage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const isAssetPage = ['/stock', '/crypto'].includes(pathname);

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  const getLogo = () => {
    return theme === 'dark' ? logo2 : logo;
  };

  return (
    <header className='border-b border-border sticky  top-0 w-full z-50 bg-background'>
      <nav
        className='w-full flex items-center justify-between max-w-7xl mx-auto p-4 lg:p-4'
        aria-label='Global'>
        <div className={`flex ${isAssetPage ? 'lg:hidden' : 'lg:block'}`}>
          <Link
            className='flex items-center mt-1 gap-2 shrink-0'
            href='/'
            title={`${config.appName} homepage`}>
            <Image
              src={getLogo()}
              alt={`${config.appName} logo`}
              className={`transition-all duration-300 w-[130px]`}
              priority={true}
              width={100}
              height={50}
            />
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsOpen(true)}>
            <span className='sr-only'>Open main menu</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          </Button>
        </div>

        <div
          className={`hidden ${
            isAssetPage ? 'lg:flex lg:flex-1' : 'lg:hidden'
          }`}>
          <AssetSearch />
        </div>

        <div className='hidden items-center lg:flex lg:flex-1 lg:justify-end lg:gap-x-4'>
          <div className='hidden lg:flex lg:gap-x-8'>
            <Link
              href='/#features'
              className='text-sm font-semibold leading-6 text-foreground hover:text-muted-foreground transition-colors'>
              Home
            </Link>
            <Link
              href='/#pricing'
              className='text-sm font-semibold leading-6 text-foreground hover:text-muted-foreground transition-colors'>
              Pricing
            </Link>
            <Link
              href='/blog'
              className='text-sm font-semibold leading-6 text-foreground hover:text-muted-foreground transition-colors'>
              Blog
            </Link>
          </div>

          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <span className='sr-only'>Toggle theme</span>
            {theme === 'dark' ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                className='w-5 h-5'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='black'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
                />
              </svg>
            )}
          </Button>

          <Link
            href='/signin'
            className='border border-border rounded-sm  gap-1.5 hover:bg-muted/80 text-muted-foreground font-bold py-1 px-2  flex items-center h-10 transition-colors'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5'
              viewBox='0 0 48 48'>
              <path
                fill='#FFC107'
                d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z'
              />
              <path
                fill='#FF3D00'
                d='m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z'
              />
              <path
                fill='#4CAF50'
                d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z'
              />
              <path
                fill='#1976D2'
                d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z'
              />
            </svg>
            <span className='text-xs'>Login with Google</span>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
        <div className='fixed inset-0 bg-background/80 backdrop-blur-sm' />
        <div className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-4 sm:max-w-sm sm:ring-1 sm:ring-border'>
          <div className='flex items-center justify-between'>
            <Link
              className='flex items-center py-4 mt-1 gap-2 shrink-0'
              href='/'
              title={`${config.appName} homepage`}>
              <Image
                src={getLogo()}
                alt={`${config.appName} logo`}
                className={`transition-all duration-300 w-[130px]`}
                priority={true}
                width={100}
                height={50}
              />
            </Link>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsOpen(false)}>
              <span className='sr-only'>Close menu</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </Button>
          </div>

          <div className='flow-root mt-6'>
            <div className='py-4'>
              <div className='flex flex-col gap-y-4 items-start'>
                <Link
                  href='/#features'
                  className='text-sm font-semibold leading-6 text-foreground hover:text-muted-foreground transition-colors'>
                  Features
                </Link>
                <Link
                  href='/#pricing'
                  className='text-sm font-semibold leading-6 text-foreground hover:text-muted-foreground transition-colors'>
                  Pricing
                </Link>
                <Link
                  href='/blog'
                  className='text-sm font-semibold leading-6 text-foreground hover:text-muted-foreground transition-colors'>
                  Blog
                </Link>
              </div>
            </div>
            <div className='py-6'>
              <div className='flex items-center gap-x-4'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  <span className='sr-only'>Toggle theme</span>
                  {theme === 'dark' ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
                      />
                    </svg>
                  )}
                </Button>

                <Button
                  asChild
                  variant='default'>
                  <Link
                    href='/signin'
                    className='text-sm font-semibold leading-6'>
                    Log in <span aria-hidden='true'>&rarr;</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderHomepage;
