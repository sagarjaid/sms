/** @format */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface RealEstate {
  name: string;
  symbol: string;
}

interface RealEstateListProps {
  realEstateList: RealEstate[];
}

const RealEstateList = ({ realEstateList }: RealEstateListProps) => {
  const pathName = usePathname();

  const isActive = (symbol: string) => {
    const realEstatePath = `${symbol.toLowerCase()}-vs-btc`;
    return pathName === `/real-estate/${realEstatePath}`;
  };

  return (
    <div className='w-52 max-h-[calc(100vh-80px)] border-r overflow-hidden'>
      {realEstateList.map((realEstate) => (
        <Link
          href={`/real-estate/${realEstate.symbol.toLowerCase()}-vs-btc`}
          className={`py-3 px-4 block transition-colors ${
            isActive(realEstate.symbol) ? 'bg-muted' : 'hover:bg-muted'
          }`}
          key={realEstate.symbol}>
          {realEstate.name}
        </Link>
      ))}
    </div>
  );
};

export default RealEstateList;
