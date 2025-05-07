/** @format */

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/notion';

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className='group block bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-colors'>
          {post.coverImage && (
            <div className='relative h-48 w-full'>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className='object-cover'
              />
            </div>
          )}
          <div className='p-6'>
            <h2 className='text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2'>
              {post.title.length > 140
                ? post.title.slice(0, 137) + '...'
                : post.title}
            </h2>
            {post.subTitle && (
              <div className='text-base text-muted-foreground mb-2'>
                {post.subTitle.length > 140
                  ? post.subTitle.slice(0, 137) + '...'
                  : post.subTitle}
              </div>
            )}
            <div className='flex items-center justify-between text-sm text-muted-foreground'>
              <span>{post.author}</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
