/** @format */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Currency {
  name: string;
  symbol: string;
}

interface CurrencyListProps {
  currencyList: Currency[];
}

export default function CurrencyList({ currencyList }: CurrencyListProps) {
  const pathName = usePathname();

  const isActive = (symbol: string) => {
    const currencyPath = `${symbol.toLowerCase()}-vs-btc`;
    return pathName === `/currency/${currencyPath}`;
  };

  return (
    <div className='w-52 max-h-[calc(100vh-80px)] border-r overflow-hidden hover:overflow-y-scroll'>
      {currencyList.map((currency) => (
        <Link
          href={`/currency/${currency.symbol.toLowerCase()}-vs-btc`}
          className={`py-3 px-4 block transition-colors ${
            isActive(currency.symbol) ? 'bg-muted' : 'hover:bg-muted'
          }`}
          key={currency.symbol}>
          {currency.name}
        </Link>
      ))}
    </div>
  );
}
