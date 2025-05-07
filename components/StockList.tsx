/** @format */

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Stock {
  name: string;
  symbol: string;
}

interface StockListProps {
  stocksList: Stock[];
}

const StockList = ({ stocksList }: StockListProps) => {
  const pathName = usePathname();

  const isActive = (symbol: string) => {
    const stockPath = `${symbol.toLowerCase()}-vs-btc`;
    return pathName === `/stock/${stockPath}`;
  };

  return (
    <div className='hidden md:block w-52 max-h-[calc(100vh-80px)] border-r overflow-hidden hover:overflow-y-scroll'>
      {stocksList.map((stock) => (
        <Link
          href={`/stock/${stock.symbol.toLowerCase()}-vs-btc`}
          className={`py-3 px-4 block transition-colors ${
            isActive(stock.symbol) ? 'bg-muted' : 'hover:bg-muted'
          }`}
          key={stock.symbol}>
          {stock.name}
        </Link>
      ))}
    </div>
  );
};

export default StockList;
