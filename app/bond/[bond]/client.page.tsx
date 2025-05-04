/** @format */

'use client';

import Header from '@/components/Header';
import { useMemo } from 'react';
import Navbar from '@/components/Navbar';
import BondList from '@/components/BondList';
import TradingViewSection from '@/containers/tradingview-section';
import { usePathname } from 'next/navigation';

interface BondPageProps {
  bond: string;
}

export default function BondPageClient({ bond }: BondPageProps) {
  const path = usePathname();

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
    <main>
      <div className='flex w-full text-xs '>
        <Navbar />
        <div className='flex justify-between w-full'>
          <div className='flex flex-col w-full h-screen overflow-y-scroll'>
            <Header />
            <div className='flex w-full'>
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
  );
}
