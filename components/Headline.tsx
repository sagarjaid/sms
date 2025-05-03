/** @format */

'use client';

import Typewriter from 'typewriter-effect';
import Image from 'next/image';
import hero from '@/app/hero.png';
import { AssetSearch } from './asset-search-home';

const Headline = () => {
  return (
    <div className='relative h-screen flex flex-col md:flex-row gap-6 md:gap-2 w-full justify-between md:items-start mt-20  mx-auto p-6 overflow-hidden'>
      <div className='flex flex-col items-center md:items-start gap-4 md:w-1/2 relative mt-32 z-10 md:pl-20'>
        <button className='relative flex w-fit items-center px-2.5 py-0.5 font-semibold border text-xs sdm:text-base rounded-lg'>
          LIVE
          <span className='absolute -top-1 -right-1 flex h-3 w-3'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75'></span>
            <span className='relative inline-flex h-3 w-3 rounded-full bg-red-500'></span>
          </span>
        </button>
        <div className='flex flex-row justify-center md:flex-col gap-1 md:gap-4'>
          <h1 className='font-extrabold text-2xl sdm:text-3xl lg:text-6xl'>
            <Typewriter
              options={{
                strings: [
                  'Stocks vs',
                  'Currencies vs',
                  'Commodities vs',
                  'Indices vs',
                  'Real Estate vs',
                  'Bonds vs',
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <div className='font-extrabold text-2xl sdm:text-3xl lg:text-6xl'>
            Bitcoin
          </div>
        </div>
        <div className='text-center ml-2 md:text-left'>
          Track asset prices in real-time against Bitcoin (BTC)
        </div>
        {/* <button className=' hidden w-fit md:flex gap-3 items-center text-lg px-4 py-2 text-gray-900 font-semibold border border-gray-900 rounded-lg'>
          <span> Get Started</span>
          <span>🚀</span>
        </button> */}
        <AssetSearch />
        <div className='text-center ml-2 text-xs text-gray-400'>
          200 traders searched over 2499 times today!
        </div>
      </div>

      <div className='hidden md:block absolute right-0 top-80 -translate-y-1/2 w-1/2 overflow-hidden'>
        <div className='relative w-full'>
          <div className='flex flex-col transform translate-x-[14%]'>
            <div className='bg-gray-100 rounded-l-lg rounded-bl-none p-2 flex items-center gap-2 border border-gray-200'>
              <div className='flex gap-1.5'>
                <div className='w-3 h-3 rounded-full bg-red-500'></div>
                <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                <div className='w-3 h-3 rounded-full bg-green-500'></div>
              </div>
              <div className='flex-1 bg-white rounded-md h-6 flex items-center px-3 text-sm text-gray-500'>
                basedinbitcoin.com
              </div>
            </div>
            <div className='relative -ml-[-0.1px] box-border'>
              <Image
                src={hero}
                alt='Product Demo'
                className='h-[500px] w-auto object-cover object-left rounded-tl-none rounded-l-lg shadow-lg border border-gray-200 border-t-0 border-r-0 box-border'
                priority={true}
                width={2000}
                height={2000}
              />
            </div>
          </div>
        </div>
      </div>
      <button className='flex w-fit md:hidden gap-3 items-center text-lg px-4 py-2 text-gray-900 font-semibold border border-gray-900 rounded-lg'>
        <span> Get Started</span>
        <span>🚀</span>
      </button>
    </div>
  );
};

export default Headline;
