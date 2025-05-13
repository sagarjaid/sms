/** @format */

import { type NextRequest, NextResponse } from 'next/server';
import { getMessagesByPhoneNumber } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { phoneNumber: string } }
) {
  try {
    const phoneNumber = params.phoneNumber;
    const messages = getMessagesByPhoneNumber(phoneNumber);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
