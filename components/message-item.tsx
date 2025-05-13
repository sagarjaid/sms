/** @format */

import type { Message } from '@/types/message';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  return (
    <Card className='mb-4'>
      <CardHeader className='pb-2'>
        <div className='flex justify-between items-center'>
          <div className='font-medium'>From: {message.from}</div>
          <div className='text-sm text-gray-500'>
            {formatDistanceToNow(new Date(message.receivedAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='whitespace-pre-wrap'>{message.body}</p>
      </CardContent>
    </Card>
  );
}
