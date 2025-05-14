/** @format */

'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { formatCountryUrl, getAbsoluteUrl } from '@/lib/utils';
import { SERVICES } from '@/lib/service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

const INITIAL_DISPLAY_COUNT = 50;

interface ServicesSectionProps {
  showAll?: boolean;
  prefix?: string;
  suffix?: string;
}

export default function ServicesSection({
  showAll = false,
  prefix = '/service',
  suffix = '',
}: ServicesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(showAll);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredServices = SERVICES.filter((service) =>
    service.toLowerCase().includes(debouncedSearchQuery.toLowerCase().trim())
  );

  const displayedServices = isExpanded
    ? filteredServices
    : filteredServices.slice(0, INITIAL_DISPLAY_COUNT);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <Card>
      <CardHeader className='flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-2'>
        <CardTitle>Available Services</CardTitle>
        <div className='relative w-full sm:w-64'>
          <Input
            placeholder='Search services...'
            value={searchQuery}
            onChange={handleSearch}
            className='pr-8 border w-full'
            aria-label='Search services'
          />
          <Search className='absolute right-3 top-2.5 h-4 w-4 text-muted-foreground' />
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center sm:text-left'>
          {displayedServices.length > 0 ? (
            displayedServices.map((service) => (
              <Link
                href={getAbsoluteUrl(formatCountryUrl(service, prefix, suffix))}
                key={service}
                className='text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base'>
                {service}
              </Link>
            ))
          ) : (
            <div className='col-span-full text-center text-muted-foreground py-4'>
              No services found matching your search
            </div>
          )}
        </div>
        {filteredServices.length > INITIAL_DISPLAY_COUNT && (
          <div className='mt-4 flex justify-center'>
            <Button
              variant='outline'
              onClick={() => setIsExpanded(!isExpanded)}
              className='text-sm w-full sm:w-auto'>
              {isExpanded
                ? 'Show Less'
                : `Show More (${
                    filteredServices.length - INITIAL_DISPLAY_COUNT
                  })`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
