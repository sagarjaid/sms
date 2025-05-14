/** @format */

import { Country } from 'country-state-city';
import { COUNTRY_PREFIXES } from './number';

// Function to generate a random number within a range
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a valid phone number for a country
function generatePhoneNumber(countryCode: string, prefixes: string[]): string {
  // Get a random prefix from the country's prefixes
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  // Generate remaining digits (ensuring total length is appropriate)
  const remainingLength = 10 - prefix.length; // Assuming standard 10-digit number
  const remainingDigits = Array.from({ length: remainingLength }, () =>
    getRandomNumber(0, 9)
  ).join('');

  // Remove any non-digit characters from the country code and combine
  const cleanCountryCode = countryCode.replace(/\D/g, '');
  return `${cleanCountryCode}${prefix}${remainingDigits}`;
}

// Generate phone numbers for each country
export const PHONE_NUMBERS_OLD = Object.entries(COUNTRY_PREFIXES).flatMap(
  ([countryCode, prefixes]) => {
    const country = Country.getAllCountries().find(
      (c) => c.isoCode === countryCode
    );
    if (!country) return [];

    // Generate 12 phone numbers for each country
    return Array.from({ length: 10 }, () => ({
      phoneNumber: generatePhoneNumber(country.phonecode, prefixes),
      country: country.name,
      slug: country.name.toLowerCase().replace(/\s+/g, '-'),
      countryCode: country.isoCode,
    }));
  }
);
