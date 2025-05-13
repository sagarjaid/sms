/** @format */

'use client';

import { useEffect, useState } from 'react';
import type { Message } from '@/types/message';
import MessageItem from '@/components/message-item';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface MessagesClientProps {
  params: {
    country: string;
    phoneNumber: string;
  };
}

export default function MessagesClient({ params }: MessagesClientProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/messages/${params.phoneNumber}`);

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.messages);
      setError(null);
    } catch (err) {
      setError('Failed to load messages. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Normalize the phone number (remove "+" if present)
    const normalizedPhoneNumber =
      params.phoneNumber.startsWith('+') ?
        params.phoneNumber.substring(1)
      : params.phoneNumber;

    fetchMessages();

    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 10000);

    return () => clearInterval(interval);
  }, [params.phoneNumber]);

  const formattedNumber =
    params.phoneNumber.startsWith('+') ?
      params.phoneNumber
    : `+${params.phoneNumber}`;

  return (
    <div className='container mx-auto py-8 px-4'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href={`/country/${params.country}`}>
            <Button
              variant='outline'
              size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-2xl font-bold'>{formattedNumber}</h1>
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={fetchMessages}
          disabled={loading}>
          <RefreshCw
            className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`}
          />
          Refresh
        </Button>
      </div>

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          {error}
        </div>
      )}

      {loading && messages.length === 0 ?
        <div className='text-center py-12'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4'></div>
          <p>Loading messages...</p>
        </div>
      : messages.length === 0 ?
        <div className='text-center py-12 bg-gray-50 rounded-lg'>
          <p className='text-gray-500'>No messages received yet.</p>
          <p className='text-gray-500 text-sm mt-2'>
            Send an SMS to {formattedNumber} to see it appear here.
          </p>
        </div>
      : <div>
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
            />
          ))}
        </div>
      }
    </div>
  );
}
