/** @format */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Bond {
  name: string;
  symbol: string;
}

interface BondListProps {
  bondsList: Bond[];
}

const BondList = ({ bondsList }: BondListProps) => {
  const pathName = usePathname();

  const isActive = (symbol: string) => {
    const bondPath = `${symbol.toLowerCase()}-vs-btc`;
    return pathName === `/bond/${bondPath}`;
  };

  return (
    <div className='hidden md:block w-52 max-h-[calc(100vh-80px)] border-r overflow-hidden'>
      {bondsList.map((bond) => (
        <Link
          href={`/bond/${bond.symbol.toLowerCase()}-vs-btc`}
          className={`py-3 px-4 block transition-colors ${
            isActive(bond.symbol) ? 'bg-muted' : 'hover:bg-muted'
          }`}
          key={bond.symbol}>
          {bond.name}
        </Link>
      ))}
    </div>
  );
};

export default BondList;
