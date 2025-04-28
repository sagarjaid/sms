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
import CurrencyList from '@/components/CurrencyList';

interface CurrencyPageProps {
  params: {
    currency: string;
  };
}

export default function CurrencyPage({ params }: CurrencyPageProps) {
  const path = usePathname();
  const currency = params.currency;

  // Extract currency symbol from URL (e.g., "btcusd-vs-btc" -> "BTCUSD")
  const currencySymbol = currency.split('-')[0].toUpperCase();

  const currencyList = useMemo(
    () => [
      { symbol: 'BTCUSD', name: 'USD / BTC' },
      { symbol: 'BTCAUD', name: 'AUD / BTC' },
      { symbol: 'BTCEUR', name: 'EUR / BTC' },
      { symbol: 'BTCGBP', name: 'GBP / BTC' },
      { symbol: 'BTCJPY', name: 'JPY / BTC' },
      { symbol: 'ETHBTC', name: 'ETH / BTC' },

      { symbol: 'LTCBTC', name: 'LTC / BTC' },

      { symbol: 'XRPBTC', name: 'XRP / BTC' },
    ],
    []
  );

  // Find currency name from currencyList
  const currencyInfo = currencyList.find(
    (curr) => curr.symbol === currencySymbol
  );
  const currencyName = currencyInfo ? currencyInfo.name : 'Unknown Currency';

  return (
    <>
      <main>
        <div className='flex w-full text-xs '>
          <Navbar />
          <div className='flex justify-between w-full'>
            <div className='flex flex-col w-full h-screen  overflow-y-scroll'>
              <Header />
              <div className='flex w-full h-screen'>
                <CurrencyList currencyList={currencyList} />
                <div className='w-full p-4'>
                  <TradingViewSection
                    page='currency'
                    stocksList={currencyList}
                    initialStockTicker={currencySymbol}
                    initialTitle={currencyName}
                    TopTitle='Currency: '
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
