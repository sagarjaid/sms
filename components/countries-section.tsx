/** @format */

'use client';

import Link from 'next/link';
import { getAbsoluteUrl, formatCountryUrl } from '@/lib/utils';
import { Country } from 'country-state-city';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as Flags from 'country-flag-icons/react/3x2';

export default function CountriesSection({
  prefix = 'country',
  suffix = '',
}: {
  prefix?: string;
  suffix?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Countries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Country.getAllCountries().map((country) => {
            // Get the flag component using the country's ISO code
            const FlagComponent = (Flags as any)[country.isoCode];

            return (
              <Link
                href={getAbsoluteUrl(
                  formatCountryUrl(country.name, prefix, suffix)
                )}
                key={country.isoCode}
                className='flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors'>
                {FlagComponent ? (
                  <FlagComponent
                    className='w-5 h-4 rounded-sm'
                    title={country.name}
                  />
                ) : (
                  <div className='w-5 h-4 bg-gray-200 rounded-sm flex items-center justify-center text-[8px] text-gray-500'>
                    {country.isoCode}
                  </div>
                )}
                <span>{country.name}</span>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
