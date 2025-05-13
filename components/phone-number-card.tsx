/** @format */

import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';

interface PhoneNumberCardProps {
  phoneNumber: string;
  country: string;
  countryCode: string;
}

export default function PhoneNumberCard({
  phoneNumber,
  country,
  countryCode,
}: PhoneNumberCardProps) {
  const formattedNumber =
    phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

  return (
    <Card className='overflow-hidden'>
      <CardContent className='p-6 flex flex-col items-center'>
        <div className='w-full flex justify-center mb-4'>
          <Image
            src={`/images/flags/${countryCode.toLowerCase()}.svg`}
            alt={`${country} flag`}
            width={100}
            height={60}
            className='border border-gray-200'
          />
        </div>
        <div className='text-center'>
          <p className='text-xl font-semibold'>{formattedNumber}</p>
          <p className='text-sm text-gray-500'>{country}</p>
        </div>
      </CardContent>
      <CardFooter className='p-0'>
        <Link
          href={`/country/${country}/${phoneNumber}`}
          className='w-full'>
          <button className='w-full py-2 text-center text-blue-500 hover:bg-blue-50 transition-colors border-t'>
            Open
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
}
