/** @format */

'use client';
import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  type: string;
}

interface BlogTOCProps {
  toc: TocItem[];
  className?: string;
  fixed?: boolean;
}

export default function BlogTOC({ toc, className, fixed }: BlogTOCProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(fixed ? true : false);

  useEffect(() => {
    if (!open) return;
    const handleScroll = () => {
      const headings = toc
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);
      let current: string | null = null;
      for (const heading of headings) {
        if (heading && heading.getBoundingClientRect().top < 120) {
          current = heading.id;
        }
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc, open]);

  return (
    <div
      className={`p-2 max-h-96 overflow-y-auto  top-24 ${
        fixed ? 'sticky' : ''
      } ${className || ''}`}>
      <div
        className={`flex items-center justify-between  ${
          open ? 'border-b border-border pb-2 mb-4' : ''
        }`}>
        <span className='font-semibold uppercase text-primary'>
          Table of Contents
        </span>
        <button
          className='text-xs px-2 py-1 rounded hover:bg-muted  border border-border ml-2'
          onClick={() => setOpen((v) => !v)}
          aria-label={
            open ? 'Hide Table of Contents' : 'Show Table of Contents'
          }>
          {open ? '<' : '>'}
        </button>
      </div>
      {open && (
        <ul className='flex flex-col items-start gap-2 w-full'>
          {toc.map((item) => (
            <li
              key={item.id}
              className='w-full'>
              <a
                href={`#${item.id}`}
                className={`hover:underline text-muted-foreground text-left text-sm focus:text-primary focus:outline-none transition-colors duration-150 block ${
                  item.type === 'heading_3' ? 'pl-6' : 'pl-0'
                } ${
                  activeId === item.id ? 'font-semibold text-foreground' : ''
                }`}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
