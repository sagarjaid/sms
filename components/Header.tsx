/** @format */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import config from '@/config';
import logo from '@/app/icon.png';
import { Button } from '@/components/ui/button-2';

const Header = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  return (
    <header className='border-b border-border bg-background'>
      <nav
        className='container flex items-center justify-between px-8 py-4 mx-auto'
        aria-label='Global'>
        <div className='flex lg:flex-1'>
          <Link
            className='flex items-center gap-2 shrink-0'
            href='/'
            title={`${config.appName} homepage`}>
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className='w-8'
              placeholder='blur'
              priority={true}
              width={32}
              height={32}
            />
            <span className='font-extrabold text-lg'>{config.appName}</span>
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

        <div className='hidden lg:flex lg:gap-x-12'>
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

        <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='mr-2'>
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
          <Link
            href='/signin'
            className='text-sm font-semibold leading-6 text-foreground hover:text-muted-foreground transition-colors'>
            Log in <span aria-hidden='true'>&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
        <div className='fixed inset-0 bg-background/80 backdrop-blur-sm' />
        <div className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border'>
          <div className='flex items-center justify-between'>
            <Link
              className='flex items-center gap-2 shrink-0'
              title={`${config.appName} homepage`}
              href='/'>
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                className='w-8'
                placeholder='blur'
                priority={true}
                width={32}
                height={32}
              />
              <span className='font-extrabold text-lg'>{config.appName}</span>
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
                <Link
                  href='/signin'
                  className='text-sm font-semibold leading-6 text-foreground hover:text-muted-foreground transition-colors'>
                  Log in <span aria-hidden='true'>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
