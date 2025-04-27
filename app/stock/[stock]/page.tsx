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

interface StockPageProps {
  params: {
    stock: string;
  };
}

export default function StockPage({ params }: StockPageProps) {
  const path = usePathname();
  const stock = params.stock;

  // Extract stock symbol from URL (e.g., "aapl-vs-btc" -> "AAPL")
  const stockSymbol = stock.split('-')[0].toUpperCase();

  // Define stocksList array
  const stocksList = useMemo(
    () => [
      { name: 'Apple', symbol: 'AAPL' },
      { name: 'Tesla', symbol: 'TSLA' },
      { name: 'Microsoft', symbol: 'MSFT' },
      { name: 'Nvidia', symbol: 'NVDA' },
      { name: 'Amazon', symbol: 'AMZN' },
      { name: 'Alphabet', symbol: 'GOOGL' },
      { name: 'Meta', symbol: 'META' },
      { name: 'Berkshire Hathaway', symbol: 'BRK.B' },
      { name: 'ExxonMobil', symbol: 'XOM' },
      { name: 'BP', symbol: 'BP' },
      { name: 'Marathon Digital', symbol: 'MARA' },
      { name: 'Microstrategy', symbol: 'MSTR' },
      { name: 'JPMorgan Chase', symbol: 'JPM' },
      { name: 'Goldman Sachs', symbol: 'GS' },
      { name: 'Mastercard', symbol: 'MA' },
      { name: 'Visa', symbol: 'V' },
      { name: 'Disney', symbol: 'DIS' },
      { name: 'LVMH', symbol: 'NKE' },
      { name: 'Pepsi', symbol: 'PEP' },
      { name: 'Coca Cola', symbol: 'KO' },
      { name: 'CSL', symbol: 'CSL' },
      { name: 'TSMC', symbol: 'TSM' },
      { name: 'General Electric', symbol: 'GE' },
      { name: 'General Motors', symbol: 'GM' },
      { name: 'Ford Motor', symbol: 'F' },
    ],
    []
  );

  // Find stock name from stocksList
  const stockInfo = stocksList.find((stock) => stock.symbol === stockSymbol);
  const stockName = stockInfo ? stockInfo.name : 'Unknown Stock';

  return (
    <>
      <main>
        <div className='flex w-full text-xs '>
          <Navbar />
          <div className='flex justify-between w-full'>
            <div className='flex flex-col w-full h-screen  overflow-y-scroll'>
              <Header />
              <div className='flex w-full'>
                <StockList stocksList={stocksList} />
                <div className='w-full p-4'>
                  <TradingViewSection
                    stocksList={stocksList}
                    initialStockTicker={stockSymbol}
                    initialTitle={`${stockName} / BTC`}
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
