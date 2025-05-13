/** @format */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getAbsoluteUrl } from '@/lib/utils';
import { SERVICES } from '@/lib/service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const INITIAL_DISPLAY_COUNT = 50;

interface ServicesSectionProps {
  showAll?: boolean;
  baseUrl?: string;
}

export default function ServicesSection({
  showAll = false,
  baseUrl = '/service',
}: ServicesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(showAll);

  const displayedServices = isExpanded
    ? SERVICES
    : SERVICES.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {displayedServices.map((service) => (
            <Link
              href={getAbsoluteUrl(`/${baseUrl}/${service.toLowerCase()}`)}
              key={service}
              className='text-blue-600 hover:text-blue-800 transition-colors'>
              {service}
            </Link>
          ))}
        </div>
        {SERVICES.length > INITIAL_DISPLAY_COUNT && (
          <div className='mt-4 flex justify-center'>
            <Button
              variant='outline'
              onClick={() => setIsExpanded(!isExpanded)}
              className='text-sm'>
              {isExpanded
                ? 'Show Less'
                : `Show More (${SERVICES.length - INITIAL_DISPLAY_COUNT})`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
