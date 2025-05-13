/** @format */

'use client';

import Link from 'next/link';
import { getAbsoluteUrl } from '@/lib/utils';
import { KEYWORDS } from '@/lib/keyword';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function KeywordsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {KEYWORDS.map((keyword) => (
            <Link
              href={getAbsoluteUrl(`/${keyword.slug}`)}
              key={keyword.slug}
              className='text-blue-600 hover:text-blue-800 transition-colors'>
              {keyword.title}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
