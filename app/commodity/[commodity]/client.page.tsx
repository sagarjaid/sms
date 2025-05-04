/** @format */

'use client';

import Header from '@/components/Header';
import { useMemo } from 'react';
import Navbar from '@/components/Navbar';
import CommodityList from '@/components/CommodityList';
import TradingViewSection from '@/containers/tradingview-section';
import { usePathname } from 'next/navigation';

interface CommodityPageProps {
  commodity: string;
}

export default function CommodityPageClient({ commodity }: CommodityPageProps) {
  const path = usePathname();

  // Extract commodity symbol from URL (e.g., "gld-vs-btc" -> "GLD")
  const commoditySymbol = commodity.split('-')[0].toUpperCase();

  // Define commoditiesList array
  const commoditiesList = useMemo(
    () => [
      { name: 'Gold', symbol: 'GLD' },
      { name: 'Silver', symbol: 'SLV' },
      { name: 'Copper', symbol: 'CPER' },
      { name: 'Platinum', symbol: 'PPLT' },
      { name: 'Wti Crude Oil', symbol: 'USO' },
      { name: 'Sugar', symbol: 'CANE' },
      { name: 'Corn', symbol: 'CORN' },
      { name: 'Coffee', symbol: 'COFE' },
      { name: 'Natural Gas', symbol: 'UNG' },
      { name: 'Wheat', symbol: 'WEAT' },
    ],
    []
  );

  // Find commodity name from commoditiesList
  const commodityInfo = commoditiesList.find(
    (commodity) => commodity.symbol === commoditySymbol
  );
  const commodityName = commodityInfo
    ? commodityInfo.name
    : 'Unknown Commodity';

  return (
    <main>
      <div className='flex w-full text-xs '>
        <Navbar />
        <div className='flex justify-between w-full'>
          <div className='flex flex-col w-full h-screen  overflow-y-scroll'>
            <Header />
            <div className='flex w-full'>
              <CommodityList commoditiesList={commoditiesList} />
              <div className='w-full p-4'>
                <TradingViewSection
                  stocksList={commoditiesList}
                  initialStockTicker={commoditySymbol}
                  initialTitle={`${commodityName} / BTC`}
                  TopTitle='Commodities: '
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
