/** @format */

import { Metadata } from 'next';
import BondPageClient from './client.page';

interface BondPageProps {
  params: {
    bond: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BondPageProps): Promise<Metadata> {
  const bondSymbol = params.bond.split('-')[0].toUpperCase();

  // Define bondsList array to get bond name
  const bondsList = [
    { name: 'iShares U.S. Treasury Bond ETF', symbol: 'GOVT' },
    { name: 'iShares Core U.S. Aggregate Bond ETF', symbol: 'AGG' },
    {
      name: 'iShares iBoxx $ Investment Grade Corporate Bond',
      symbol: 'LQD',
    },
    { name: 'iShares MBS ETF', symbol: 'MBB' },
  ];

  const bondInfo = bondsList.find((bond) => bond.symbol === bondSymbol);
  const bondName = bondInfo ? bondInfo.name : 'Unknown Bond';

  return {
    title: `${bondName} vs Bitcoin | ${bondSymbol} vs BTC Price Comparison — BasedinBitcoin`,
    description: `Compare ${bondName} (${bondSymbol}) price with Bitcoin (BTC). View real-time price charts, historical data, and market analysis for ${bondSymbol} vs BTC.`,
    keywords: `${bondSymbol}, Bitcoin, BTC, bond price, cryptocurrency, market analysis, price comparison, trading chart`,
    openGraph: {
      title: `${bondName} vs Bitcoin | ${bondSymbol} vs BTC Price Comparison — BasedinBitcoin`,
      description: `Compare ${bondName} (${bondSymbol}) price with Bitcoin (BTC). View real-time price charts and market analysis.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${bondName} vs Bitcoin | ${bondSymbol} vs BTC Price Comparison — BasedinBitcoin`,
      description: `Compare ${bondName} (${bondSymbol}) price with Bitcoin (BTC). View real-time price charts and market analysis.`,
    },
  };
}

export default function BondPage({ params }: BondPageProps) {
  return <BondPageClient bond={params.bond} />;
}
