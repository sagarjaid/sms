/** @format */
'use client';

import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

// Import chart images
import stocksChart from '@/app/icons/stocks-chart.png';
import commoditiesChart from '@/app/icons/commodities-chart.png';
import currenciesChart from '@/app/icons/currencies-chart.png';
import realEstateChart from '@/app/icons/real-estate-chart.png';
import indicesChart from '@/app/icons/indices-chart.png';
import bondsChart from '@/app/icons/bonds-chart.png';
import Link from 'next/link';

const Copy = () => {
  const [selectedTab, setSelectedTab] = useState('Stocks');

  const getImageForTab = (tab: string) => {
    switch (tab) {
      case 'Stocks':
        return stocksChart;
      case 'Commodities':
        return commoditiesChart;
      case 'Currencies':
        return currenciesChart;
      case 'Real Estate':
        return realEstateChart;
      case 'Indices':
        return indicesChart;
      case 'Bonds':
        return bondsChart;
      default:
        return stocksChart;
    }
  };

  const getSlugForTab = (tab: string) => {
    switch (tab) {
      case 'Stocks':
        return 'stock';
      case 'Commodities':
        return 'commodity';
      case 'Currencies':
        return 'currency';
      case 'Real Estate':
        return 'real-estate';
      case 'Indices':
        return 'indices';
      case 'Bonds':
        return 'bond';
      default:
        return 'all';
    }
  };

  return (
    <div className='flex flex-col gap-16 w-full justify-between items-center max-w-7xl mx-auto pb-40'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <h1 className='font-extrabold text-3xl lg:text-4xl'>Stay Updated 🚀</h1>
        <div className='text-center md:text-left'>
          Compare Asset Prices with Bitcoin&apos;s Value Today
        </div>
      </div>

      <div className='w-full max-w-2xl'>
        <Tabs
          defaultValue='Stocks'
          className='w-full'
          onValueChange={(value) => setSelectedTab(value)}>
          <div className='overflow-x-auto pb-2'>
            <TabsList className='bg-transparent h-auto p-0 w-full justify-start min-w-max'>
              <TabsTrigger
                value='Stocks'
                className='px-4 py-1.5 m-1 rounded-full data-[state=active]:bg-muted data-[state=active]:text-foreground'>
                Stocks
              </TabsTrigger>
              <TabsTrigger
                value='Commodities'
                className='px-4 py-1.5 m-1 rounded-full data-[state=active]:bg-muted data-[state=active]:text-foreground'>
                Commodities
              </TabsTrigger>
              <TabsTrigger
                value='Currencies'
                className='px-4 py-1.5 m-1 rounded-full data-[state=active]:bg-muted data-[state=active]:text-foreground'>
                Currencies
              </TabsTrigger>
              <TabsTrigger
                value='Real Estate'
                className='px-4 py-1.5 m-1 rounded-full data-[state=active]:bg-muted data-[state=active]:text-foreground'>
                Real Estate
              </TabsTrigger>
              <TabsTrigger
                value='Indices'
                className='px-4 py-1.5 m-1 rounded-full data-[state=active]:bg-muted data-[state=active]:text-foreground'>
                Indices
              </TabsTrigger>
              <TabsTrigger
                value='Bonds'
                className='px-4 py-1.5 m-1 rounded-full data-[state=active]:bg-muted data-[state=active]:text-foreground'>
                Bonds
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>

      <Image
        src={getImageForTab(selectedTab)}
        alt={`${selectedTab} Chart Demo`}
        className='w-11/12 md:w-2/3 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-500'
        priority={true}
        width={500}
        height={500}
      />

      <Link
        href={`/${getSlugForTab(selectedTab)}`}
        className='border border-gray-700 rounded-sm  gap-1.5 hover:bg-muted/80 text-muted-foreground font-bold py-4 px-6  flex items-center h-12 transition-colors'>
        <span>Continue to {selectedTab}</span>
        <span>🚀</span>
      </Link>
    </div>
  );
};

export default Copy;
