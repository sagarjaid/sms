/** @format */

import PhoneNumberCard from './phone-number-card';
import * as Flags from 'country-flag-icons/react/3x2';

// This would typically come from an API or database
const PHONE_NUMBERS = [
  { phoneNumber: '13132003002', country: 'united-states', countryCode: 'US' },
  { phoneNumber: '13462042708', country: 'united-states', countryCode: 'US' },
  { phoneNumber: '13137425508', country: 'united-states', countryCode: 'US' },
  { phoneNumber: '13132102924', country: 'united-states', countryCode: 'US' },
  { phoneNumber: '14066306572', country: 'united-states', countryCode: 'US' },
  { phoneNumber: '13132003002', country: 'united-states', countryCode: 'US' },
  { phoneNumber: '13462042708', country: 'united-states', countryCode: 'US' },
  { phoneNumber: '13137425508', country: 'united-states', countryCode: 'US' },
  { phoneNumber: '13132102924', country: 'united-states', countryCode: 'US' },
  { phoneNumber: '14066306572', country: 'united-states', countryCode: 'US' }, // Added the user's phone number
];

export default function PhoneNumberGrid() {
  return (
    <div className='container mx-auto pb-12'>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {PHONE_NUMBERS.map((number) => {
          const FlagComponent = (Flags as any)[number.countryCode];
          return (
            <PhoneNumberCard
              key={number.phoneNumber}
              phoneNumber={number.phoneNumber}
              country={number.country}
              countryCode={number.countryCode}
              flag={
                FlagComponent ? (
                  <FlagComponent
                    className='w-10 h-10 rounded-sm'
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
