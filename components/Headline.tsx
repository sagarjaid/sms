/** @format */

'use client';

import Typewriter from 'typewriter-effect';
import Image from 'next/image';
import hero from '@/app/hero.png';
import { AssetSearch } from './asset-search';

const Headline = () => {
  return (
    <div className='flex flex-col md:flex-row gap-6 md:gap-2 w-full justify-between items-center max-w-7xl mx-auto p-6 my-20 md:my-40'>
      <div className='flex flex-col items-center md:items-start gap-4'>
        <button className='relative flex w-fit items-center px-2.5 py-0.5 font-semibold border text-xs sdm:text-base rounded-lg'>
          LIVE
          <span className='absolute -top-1 -right-1 flex h-3 w-3'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75'></span>
            <span className='relative inline-flex h-3 w-3 rounded-full bg-red-500'></span>
          </span>
        </button>

        <div className='flex flex-row justify-center md:flex-col gap-1 md:gap-4'>
          <h1 className='font-extrabold text-2xl sdm:text-3xl lg:text-6xl '>
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
          <div className='font-extrabold text-2xl sdm:text-3xl lg:text-6xl '>
            Bitcoin
          </div>
        </div>

        <div className='text-center md:text-left'>
          Track asset prices in real-time against Bitcoin (BTC)
        </div>
        {/* <button className=' hidden w-fit md:flex gap-3 items-center text-lg px-4 py-2 text-gray-900 font-semibold border border-gray-900 rounded-lg'>
          <span> Get Started</span>
          <span>🚀</span>
        </button> */}
        <AssetSearch />
      </div>
      <Image
        src={hero}
        alt='Product Demo'
        className='w-11/12 md:w-[54%]  rounded-lg shadow-sm'
        priority={true}
        width={500}
        height={500}
      />
      <button className='flex w-fit md:hidden gap-3 items-center text-lg px-4 py-2 text-gray-900 font-semibold border border-gray-900 rounded-lg'>
        <span> Get Started</span>
        <span>🚀</span>
      </button>
    </div>
  );
};

export default Headline;
