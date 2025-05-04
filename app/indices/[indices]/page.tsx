/** @format */

import { Metadata } from 'next';
import IndicesPageClient from './client.page';

interface IndicesPageProps {
  params: {
    indices: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: IndicesPageProps): Promise<Metadata> {
  const indicesSymbol = params.indices.split('-')[0].toUpperCase();

  // Define indicesList array to get indices name
  const indicesList = [
    { name: 'S&P500 ETF', symbol: 'SPY' },
    { name: 'Invesco NASDAQ ETF', symbol: 'QQQ' },
    { name: 'iShares Dow Jones ETF', symbol: 'IYY' },
    { name: 'iShares Bitcoin Trust', symbol: 'IBIT' },
    { name: 'Fidelity Wise Origin Bitcoin Trust', symbol: 'FBTC' },
    { name: 'Grayscale Bitcoin Trust', symbol: 'GBTC' },
  ];

  const indicesInfo = indicesList.find(
    (indices) => indices.symbol === indicesSymbol
  );
  const indicesName = indicesInfo ? indicesInfo.name : 'Unknown Index';

  return {
    title: `${indicesName} vs Bitcoin | ${indicesSymbol} vs BTC Price Comparison — BasedinBitcoin`,
    description: `Compare ${indicesName} (${indicesSymbol}) price with Bitcoin (BTC). View real-time price charts, historical data, and market analysis for ${indicesSymbol} vs BTC.`,
    keywords: `${indicesSymbol}, Bitcoin, BTC, ETF, index fund, cryptocurrency, market analysis, price comparison, trading chart`,
    openGraph: {
      title: `${indicesName} vs Bitcoin | ${indicesSymbol} vs BTC Price Comparison — BasedinBitcoin`,
      description: `Compare ${indicesName} (${indicesSymbol}) price with Bitcoin (BTC). View real-time price charts and market analysis.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${indicesName} vs Bitcoin | ${indicesSymbol} vs BTC Price Comparison — BasedinBitcoin`,
      description: `Compare ${indicesName} (${indicesSymbol}) price with Bitcoin (BTC). View real-time price charts and market analysis.`,
    },
  };
}

export default function IndicesPage({ params }: IndicesPageProps) {
  return <IndicesPageClient indices={params.indices} />;
}
