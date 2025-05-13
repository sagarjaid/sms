/** @format */

import { type NextRequest, NextResponse } from 'next/server';
import { getAllPhoneNumbers, getMessagesByPhoneNumber } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const phoneNumbers = getAllPhoneNumbers();
    const messages = phoneNumbers.reduce(
      (acc, phoneNumber) => {
        acc[phoneNumber] = getMessagesByPhoneNumber(phoneNumber);
        return acc;
      },
      {} as Record<string, any>
    );

    return NextResponse.json({
      phoneNumbers,
      messages,
      env: {
        twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER ? 'Set' : 'Not set',
        twilioAccountSid: process.env.TWILIO_ACCOUNT_SID ? 'Set' : 'Not set',
        twilioAuthToken: process.env.TWILIO_AUTH_TOKEN ? 'Set' : 'Not set',
      },
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json(
      { error: 'Debug endpoint error' },
      { status: 500 }
    );
  }
}
