/** @format */

import { Metadata } from 'next';
import RealEstatePageClient from './client.page';

interface RealEstatePageProps {
  params: {
    realestate: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: RealEstatePageProps): Promise<Metadata> {
  const realEstateSymbol = params.realestate.split('-')[0].toUpperCase();

  // Define realEstateList array to get real estate name
  const realEstateList = [
    { name: 'SPDR Dow Jones Global Real Estate ETF', symbol: 'RWO' },
    { name: 'Invesco NASDAQ ETF', symbol: 'IYR' },
    { name: 'iShares U.S. Real Estate ETF', symbol: 'IYY' },
    { name: 'iShares Global REIT ETF', symbol: 'REET' },
  ];

  const realEstateInfo = realEstateList.find(
    (realEstate) => realEstate.symbol === realEstateSymbol
  );
  const realEstateName = realEstateInfo
    ? realEstateInfo.name
    : 'Unknown Real Estate';

  return {
    title: `${realEstateName} vs Bitcoin | ${realEstateSymbol} vs BTC Price Comparison — BasedinBitcoin`,
    description: `Compare ${realEstateName} (${realEstateSymbol}) price with Bitcoin (BTC). View real-time price charts, historical data, and market analysis for ${realEstateSymbol} vs BTC.`,
    keywords: `${realEstateSymbol}, Bitcoin, BTC, real estate ETF, REIT, cryptocurrency, market analysis, price comparison, trading chart`,
    openGraph: {
      title: `${realEstateName} vs Bitcoin | ${realEstateSymbol} vs BTC Price Comparison — BasedinBitcoin`,
      description: `Compare ${realEstateName} (${realEstateSymbol}) price with Bitcoin (BTC). View real-time price charts and market analysis.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${realEstateName} vs Bitcoin | ${realEstateSymbol} vs BTC Price Comparison — BasedinBitcoin`,
      description: `Compare ${realEstateName} (${realEstateSymbol}) price with Bitcoin (BTC). View real-time price charts and market analysis.`,
    },
  };
}

export default function RealEstatePage({ params }: RealEstatePageProps) {
  return <RealEstatePageClient realestate={params.realestate} />;
}
