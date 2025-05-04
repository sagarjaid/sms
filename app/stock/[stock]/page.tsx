/** @format */

import { Metadata } from 'next';
import StockPageClient from './client.page';

interface StockPageProps {
  params: {
    stock: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: StockPageProps): Promise<Metadata> {
  const stockSymbol = params.stock.split('-')[0].toUpperCase();

  // Define stocksList array to get stock name
  const stocksList = [
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
  ];

  const stockInfo = stocksList.find((stock) => stock.symbol === stockSymbol);
  const stockName = stockInfo ? stockInfo.name : 'Unknown Stock';

  return {
    title: `${stockName} vs Bitcoin | ${stockSymbol} vs BTC Price Comparison — BasedinBitcoin`,
    description: `Compare ${stockName} (${stockSymbol}) stock price with Bitcoin (BTC). View real-time price charts, historical data, and market analysis for ${stockSymbol} vs BTC.`,
    keywords: `${stockSymbol}, Bitcoin, BTC, stock price, cryptocurrency, market analysis, price comparison, trading chart`,
    openGraph: {
      title: `${stockName} vs Bitcoin | ${stockSymbol} vs BTC Price Comparison — BasedinBitcoin`,
      description: `Compare ${stockName} (${stockSymbol}) stock price with Bitcoin (BTC). View real-time price charts and market analysis.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${stockName} vs Bitcoin | ${stockSymbol} vs BTC Price Comparison — BasedinBitcoin`,
      description: `Compare ${stockName} (${stockSymbol}) stock price with Bitcoin (BTC). View real-time price charts and market analysis.`,
    },
  };
}

export default function StockPage({ params }: StockPageProps) {
  return <StockPageClient stock={params.stock} />;
}
