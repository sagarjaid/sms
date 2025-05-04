/** @format */

import { Metadata } from 'next';
import CurrencyPageClient from './client.page';

interface CurrencyPageProps {
  params: {
    currency: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CurrencyPageProps): Promise<Metadata> {
  const currencySymbol = params.currency.split('-')[0].toUpperCase();

  // Define currencyList array to get currency name
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

  const currencyInfo = currencyList.find(
    (curr) => curr.symbol === currencySymbol
  );
  const currencyName = currencyInfo ? currencyInfo.name : 'Unknown Currency';

  return {
    title: `${currencyName} vs Bitcoin | ${currencySymbol} vs BTC Price Comparison — BasedinBitcoin`,
    description: `Compare ${currencyName} price with Bitcoin (BTC). View real-time price charts, historical data, and market analysis for ${currencySymbol} vs BTC.`,
    keywords: `${currencySymbol}, Bitcoin, BTC, cryptocurrency, forex, market analysis, price comparison, trading chart`,
    openGraph: {
      title: `${currencyName} vs Bitcoin | ${currencySymbol} vs BTC Price Comparison — BasedinBitcoin`,
      description: `Compare ${currencyName} price with Bitcoin (BTC). View real-time price charts and market analysis.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${currencyName} vs Bitcoin | ${currencySymbol} vs BTC Price Comparison — BasedinBitcoin`,
      description: `Compare ${currencyName} price with Bitcoin (BTC). View real-time price charts and market analysis.`,
    },
  };
}

export default function CurrencyPage({ params }: CurrencyPageProps) {
  return <CurrencyPageClient currency={params.currency} />;
}
