/** @format */

'use client';
import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

  const shareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, '_blank');
  };

  const shareWhatsApp = () => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(
      title + ' ' + url
    )}`;
    window.open(shareUrl, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className='flex gap-4 flex-wrap mt-8 mb-8'>
      <button
        className='border px-4 py-2 rounded hover:bg-muted'
        onClick={shareTwitter}
        aria-label='Share on X'>
        Share on X
      </button>
      <button
        className='border px-4 py-2 rounded hover:bg-muted'
        onClick={shareLinkedIn}
        aria-label='Share on LinkedIn'>
        Share on LinkedIn
      </button>
      <button
        className='border px-4 py-2 rounded hover:bg-muted'
        onClick={shareWhatsApp}
        aria-label='Share on WhatsApp'>
        Share on WhatsApp
      </button>
      <button
        className='border px-4 py-2 rounded hover:bg-muted'
        onClick={copyLink}
        aria-label='Copy Link'>
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}
