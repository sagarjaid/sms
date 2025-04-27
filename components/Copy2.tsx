/** @format */
'use client';

import Image from 'next/image';
import hero from '@/app/hero.png';
import Typewriter from 'typewriter-effect';

const Copy2 = () => {
  return (
    <div className='flex flex-col gap-16 w-full justify-between items-center max-w-7xl mx-auto p-6  my-10 md:my-40'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <h1 className='font-extrabold text-8xl '>🤑</h1>
        <div className='flex flex-row justify-center  gap-1'>
          <h1 className='font-extrabold text-2xl sdm:text-3xl lg:text-6xl '>
            <Typewriter
              options={{
                strings: [
                  'Stocks',
                  'Currencies',
                  'Commodities',
                  'Indices',
                  'Real Estate',
                  'Bonds',
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <div className='font-extrabold text-2xl sdm:text-3xl lg:text-6xl '>
            vs Bitcoin
          </div>
        </div>

        <div className='text-center md:text-left'>
          Track asset prices in real-time against Bitcoin (BTC)
        </div>
      </div>
      <Image
        src={hero}
        alt='Product Demo'
        className=' w-11/12 md:w-2/3 rounded-lg shadow-sm'
        priority={true}
        width={500}
        height={500}
      />
      <button className=' hidden w-fit md:flex gap-3 items-center text-lg px-4 py-2 text-gray-900 font-semibold border border-gray-700 rounded-lg'>
        <span> Get Started</span>
        <span>🚀</span>
      </button>
    </div>
  );
};

export default Copy2;
