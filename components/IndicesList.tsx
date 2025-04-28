/** @format */

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Index {
  name: string;
  symbol: string;
}

interface IndicesListProps {
  indicesList: Index[];
}

const IndicesList = ({ indicesList }: IndicesListProps) => {
  const pathName = usePathname();

  const isActive = (symbol: string) => {
    const indexPath = `${symbol.toLowerCase()}-vs-btc`;
    return pathName === `/indices/${indexPath}`;
  };

  return (
    <div className='w-52 max-h-[calc(100vh-80px)] border-r overflow-hidden'>
      {indicesList.map((index) => (
        <Link
          href={`/indices/${index.symbol.toLowerCase()}-vs-btc`}
          className={`py-3 px-4 block transition-colors ${
            isActive(index.symbol) ? 'bg-muted' : 'hover:bg-muted'
          }`}
          key={index.symbol}>
          {index.name}
        </Link>
      ))}
    </div>
  );
};

export default IndicesList;
