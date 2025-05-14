/** @format */

import PhoneNumberCard from './phone-number-card';
import * as Flags from 'country-flag-icons/react/3x2';
import { PHONE_NUMBERS } from '@/lib/number';

export default function PhoneNumberGrid({ country }: { country: string[] }) {
  // Group phone numbers by country
  const groupedNumbers = PHONE_NUMBERS.reduce((acc, number) => {
    if (country.includes(number.slug)) {
      if (!acc[number.slug]) {
        acc[number.slug] = [];
      }
      acc[number.slug].push(number);
    }
    return acc;
  }, {} as Record<string, typeof PHONE_NUMBERS>);

  // Maintain country order and sort numbers within each country
  const filteredPhoneNumbers = country
    .map((slug) => groupedNumbers[slug] || [])
    .flatMap((numbers) =>
      numbers.sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber))
    );

  return (
    <div className='container mx-auto pb-12'>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {filteredPhoneNumbers.map((number) => {
          const FlagComponent = (Flags as any)[number.countryCode];
          return (
            <PhoneNumberCard
              key={number.phoneNumber}
              phoneNumber={number.phoneNumber}
              country={number.country}
              slug={number.slug}
              countryCode={number.countryCode}
              flag={
                FlagComponent ? (
                  <FlagComponent
                    className='w-16 h-16 rounded-sm'
                    title={number.country}
                  />
                ) : (
                  <div className='w-5 h-4 bg-gray-200 rounded-sm flex items-center justify-center text-[8px] text-gray-500'>
                    {number.countryCode}
                  </div>
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
}
