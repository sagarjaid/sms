/** @format */

'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import { AssetSearch } from '@/components/asset-search';
import Link from 'next/link';

// Define types for our assets
interface Asset {
  name: string;
  symbol: string;
  category: string;
}

export default function AllAssets() {
  const path = usePathname();

  const allAssets = useMemo(
    () => [
      // Stocks
      ...stocksList.map((stock) => ({ ...stock, category: 'stock' })),

      // Commodities
      ...commodityList.map((commodity) => ({
        ...commodity,
        category: 'commodity',
      })),

      // Cryptocurrencies
      ...currencyList.map((currency) => ({
        ...currency,
        category: 'currency',
      })),

      // Real Estate
      ...estateList.map((estate) => ({ ...estate, category: 'real-estate' })),

      // Indices
      ...indexList.map((index) => ({ ...index, category: 'indices' })),

      // Bonds
      ...bondsList.map((bond) => ({ ...bond, category: 'bond' })),
    ],
    []
  );

  const getAssetUrl = (asset: Asset) => {
    const symbol = asset.symbol.toLowerCase();
    switch (asset.category) {
      case 'currency':
        return `/${asset.category}/${symbol}`;
      default:
        return `/${asset.category}/${symbol}-vs-btc`;
    }
  };

  return (
    <>
      <main className='h-screen'>
        <div className='flex w-full text-xs'>
          <Navbar />
          <div className='flex justify-between w-full'>
            <div className='flex flex-col w-full'>
              <Header />
              <div className='flex flex-col w-full p-4'>
                <h2 className='text-2xl font-bold mb-4'>All Assets</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {allAssets.map((asset) => (
                    <Link
                      key={asset.symbol}
                      href={getAssetUrl(asset)}
                      className='p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50 block'>
                      <div className='font-semibold'>{asset.name}</div>
                      <div className='text-sm text-gray-600'>
                        {asset.symbol}
                      </div>
                      <div className='text-xs text-gray-500 mt-1'>
                        {asset.category}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Asset data
const stocksList = [
  { name: 'Apple Inc', symbol: 'AAPL' },
  { name: 'Tesla Inc', symbol: 'TSLA' },
  { name: 'Microsoft Inc', symbol: 'MSFT' },
  { name: 'Nvidia Inc', symbol: 'NVDA' },
  { name: 'Amazon Inc', symbol: 'AMZN' },
  { name: 'Alphabet Inc', symbol: 'GOOGL' },
  { name: 'Meta Inc', symbol: 'META' },
  { name: 'Berkshire Hathaway Inc', symbol: 'BRK.B' },
  { name: 'ExxonMobil Inc', symbol: 'XOM' },
  { name: 'BP Inc', symbol: 'BP' },
  { name: 'Marathon Digital Inc', symbol: 'MARA' },
  { name: 'Microstrategy Inc', symbol: 'MSTR' },
  { name: 'JPMorgan Chase Inc', symbol: 'JPM' },
  { name: 'Goldman Sachs Inc', symbol: 'GS' },
  { name: 'Mastercard Inc', symbol: 'MA' },
  { name: 'Visa Inc', symbol: 'V' },
  { name: 'Disney Inc', symbol: 'DIS' },
  { name: 'LVMH Inc', symbol: 'NKE' },
  { name: 'Pepsi', symbol: 'PEP' },
  { name: 'Coca Cola', symbol: 'KO' },
  { name: 'CSL Inc', symbol: 'CSL' },
  { name: 'Taiwan Semiconductor Manufacturing', symbol: 'TSM' },
  { name: 'General Electric', symbol: 'GE' },
  { name: 'General Motors', symbol: 'GM' },
  { name: 'Ford Motor', symbol: 'F' },
];

const commodityList = [
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
];

const currencyList = [
  { symbol: 'BTCUSD', name: 'USD / BTC' },
  { symbol: 'BTCAUD', name: 'AUD / BTC' },
  { symbol: 'BTCEUR', name: 'EUR / BTC' },
  { symbol: 'BTCGBP', name: 'GBP / BTC' },
  { symbol: 'BTCJPY', name: 'JPY / BTC' },
  { symbol: 'ETHBTC', name: 'ETH / BTC' },
  { symbol: 'LTCBTC', name: 'LTC / BTC' },
  { symbol: 'XRPBTC', name: 'XRP / BTC' },
];

const estateList = [
  { name: 'SPDR Dow Jones Global Real Estate ETF', symbol: 'RWO' },
  { name: 'Invesco NASDAQ ETF', symbol: 'IYR' },
  { name: 'iShares U.S. Real Estate ETF', symbol: 'IYY' },
  { name: 'iShares Global REIT ETF', symbol: 'REET' },
];

const indexList = [
  { name: 'S&P500 ETF', symbol: 'SPY' },
  { name: 'Invesco NASDAQ ETF', symbol: 'QQQ' },
  { name: 'iShares Dow Jones ETF', symbol: 'IYY' },
  { name: 'iShares Bitcoin Trust', symbol: 'IBIT' },
  { name: 'Fidelity Wise Origin Bitcoin Trust', symbol: 'FBTC' },
  { name: 'Grayscale Bitcoin Trust', symbol: 'GBTC' },
];

const bondsList = [
  { name: 'iShares U.S. Treasury Bond ETF', symbol: 'GOVT' },
  { name: 'iShares Core U.S. Aggregate Bond ETF', symbol: 'AGG' },
  { name: 'iShares iBoxx $ Investment Grade Corporate Bond', symbol: 'LQD' },
  { name: 'iShares MBS ETF', symbol: 'MBB' },
];
