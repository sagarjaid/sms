/** @format */

import PhoneNumberCard from './phone-number-card';

// This would typically come from an API or database
const PHONE_NUMBERS = [
  { phoneNumber: '13132003002', country: 'united-states', countryCode: 'US' },
  { phoneNumber: '13462042708', country: 'united-states', countryCode: 'US' },
  { phoneNumber: '13137425508', country: 'united-states', countryCode: 'US' },
  { phoneNumber: '13132102924', country: 'united-states', countryCode: 'US' },
  { phoneNumber: '14066306572', country: 'united-states', countryCode: 'US' }, // Added the user's phone number
];

export default function PhoneNumberGrid() {
  return (
    <div className='container mx-auto py-12 px-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {PHONE_NUMBERS.map((number) => (
          <PhoneNumberCard
            key={number.phoneNumber}
            phoneNumber={number.phoneNumber}
            country={number.country}
            countryCode={number.countryCode}
          />
        ))}
      </div>
    </div>
  );
}
