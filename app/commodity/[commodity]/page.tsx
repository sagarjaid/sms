/** @format */

import { Metadata } from 'next';
import CommodityPageClient from './client.page';

interface CommodityPageProps {
  params: {
    commodity: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CommodityPageProps): Promise<Metadata> {
  const commoditySymbol = params.commodity.split('-')[0].toUpperCase();

  // Define commoditiesList array to get commodity name
  const commoditiesList = [
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

  const commodityInfo = commoditiesList.find(
    (commodity) => commodity.symbol === commoditySymbol
  );
  const commodityName = commodityInfo
    ? commodityInfo.name
    : 'Unknown Commodity';

  return {
    title: `${commodityName} vs Bitcoin | ${commoditySymbol} vs BTC Price Comparison — BasedinBitcoin`,
    description: `Compare ${commodityName} (${commoditySymbol}) price with Bitcoin (BTC). View real-time price charts, historical data, and market analysis for ${commoditySymbol} vs BTC.`,
    keywords: `${commoditySymbol}, Bitcoin, BTC, commodity price, cryptocurrency, market analysis, price comparison, trading chart`,
    openGraph: {
      title: `${commodityName} vs Bitcoin | ${commoditySymbol} vs BTC Price Comparison — BasedinBitcoin`,
      description: `Compare ${commodityName} (${commoditySymbol}) price with Bitcoin (BTC). View real-time price charts and market analysis.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${commodityName} vs Bitcoin | ${commoditySymbol} vs BTC Price Comparison — BasedinBitcoin`,
      description: `Compare ${commodityName} (${commoditySymbol}) price with Bitcoin (BTC). View real-time price charts and market analysis.`,
    },
  };
}

export default function CommodityPage({ params }: CommodityPageProps) {
  return <CommodityPageClient commodity={params.commodity} />;
}
