/** @format */

'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
// import Navbar from '@/components/Navbar';

import { useState, useMemo } from 'react';
import TradingViewSection from '@/containers/tradingview-section';
import BondsTable from '@/containers/bonds-table';

import Image from 'next/image';
import hero from '@/app/hero.png';
// import DashboardSection from '@/containers/dashboard-page';
import { usePathname } from 'next/navigation';
// import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { AssetSearch } from '@/components/asset-search';
import Navbar from '@/components/Navbar';
import BondList from '@/components/BondList';

interface BondPageProps {
  params: {
    bond: string;
  };
}

export default function BondPage({ params }: BondPageProps) {
  const path = usePathname();
  const bond = params.bond;

  // Extract bond symbol from URL (e.g., "govt-vs-btc" -> "GOVT")
  const bondSymbol = bond.split('-')[0].toUpperCase();

  // Define bondsList array
  const bondsList = useMemo(
    () => [
      { name: 'iShares U.S. Treasury Bond ETF', symbol: 'GOVT' },
      { name: 'iShares Core U.S. Aggregate Bond ETF', symbol: 'AGG' },
      {
        name: 'iShares iBoxx $ Investment Grade Corporate Bond',
        symbol: 'LQD',
      },
      { name: 'iShares MBS ETF', symbol: 'MBB' },
    ],
    []
  );

  // Find bond name from bondsList
  const bondInfo = bondsList.find((bond) => bond.symbol === bondSymbol);
  const bondName = bondInfo ? bondInfo.name : 'Unknown Bond';

  return (
    <>
      <main>
        <div className='flex w-full text-xs '>
          <Navbar />
          <div className='flex justify-between w-full'>
            <div className='flex flex-col w-full h-screen overflow-y-scroll'>
              <Header />
              <div className='flex w-full h-screen'>
                <BondList bondsList={bondsList} />
                <div className='w-full p-4'>
                  <TradingViewSection
                    stocksList={bondsList}
                    initialStockTicker={bondSymbol}
                    initialTitle={`${bondName} / BTC`}
                    TopTitle='Bonds: '
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
