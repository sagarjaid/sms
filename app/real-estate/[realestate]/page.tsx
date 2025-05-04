/** @format */

'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
// import Navbar from '@/components/Navbar';

import { useState, useMemo } from 'react';
import TradingViewSection from '@/containers/tradingview-section';
import StocksTable from '@/containers/stocks-table';

import Image from 'next/image';
import hero from '@/app/hero.png';
// import DashboardSection from '@/containers/dashboard-page';
import { usePathname } from 'next/navigation';
// import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { AssetSearch } from '@/components/asset-search';
import Navbar from '@/components/Navbar';
import StockList from '@/components/StockList';
import RealEstateList from '@/components/RealEstateList';

interface RealEstatePageProps {
  params: {
    realestate: string;
  };
}

export default function RealEstatePage({ params }: RealEstatePageProps) {
  const path = usePathname();
  const realestate = params.realestate;

  // Extract real estate symbol from URL (e.g., "rwo-vs-btc" -> "RWO")
  const realEstateSymbol = realestate.split('-')[0].toUpperCase();

  // Define realEstateList array
  const realEstateList = useMemo(
    () => [
      { name: 'SPDR Dow Jones Global Real Estate ETF', symbol: 'RWO' },
      { name: 'Invesco NASDAQ ETF', symbol: 'IYR' },
      { name: 'iShares U.S. Real Estate ETF', symbol: 'IYY' },
      { name: 'iShares Global REIT ETF', symbol: 'REET' },
    ],
    []
  );

  // Find real estate name from realEstateList
  const realEstateInfo = realEstateList.find(
    (realEstate) => realEstate.symbol === realEstateSymbol
  );
  const realEstateName = realEstateInfo
    ? realEstateInfo.name
    : 'Unknown Real Estate';

  return (
    <>
      <main>
        <div className='flex w-full text-xs '>
          <Navbar />
          <div className='flex justify-between w-full'>
            <div className='flex flex-col w-full h-screen  overflow-y-scroll'>
              <Header />
              <div className='flex w-full h-screen'>
                <RealEstateList realEstateList={realEstateList} />
                <div className='w-full p-4'>
                  <TradingViewSection
                    stocksList={realEstateList}
                    initialStockTicker={realEstateSymbol}
                    initialTitle={`${realEstateName} / BTC`}
                    TopTitle='Real Estate: '
                    selectedTimespan='day'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
