/** @format */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Commodity {
  name: string;
  symbol: string;
}

interface CommodityListProps {
  commoditiesList: Commodity[];
}

const CommodityList = ({ commoditiesList }: CommodityListProps) => {
  const pathName = usePathname();

  const isActive = (symbol: string) => {
    const commodityPath = `${symbol.toLowerCase()}-vs-btc`;
    return pathName === `/commodity/${commodityPath}`;
  };

  return (
    <div className='w-52 max-h-[calc(100vh-80px)] border-r overflow-hidden'>
      {commoditiesList.map((commodity) => (
        <Link
          href={`/commodity/${commodity.symbol.toLowerCase()}-vs-btc`}
          className={`py-3 px-4 block transition-colors ${
            isActive(commodity.symbol) ? 'bg-muted' : 'hover:bg-muted'
          }`}
          key={commodity.symbol}>
          {commodity.name}
        </Link>
      ))}
    </div>
  );
};

export default CommodityList;
