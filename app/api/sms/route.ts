/** @format */

import { type NextRequest, NextResponse } from 'next/server';
import { addMessage } from '@/lib/db';
import { TwimlResponse } from '@/lib/twilio';

export async function POST(request: NextRequest) {
  try {
    // Parse the form data from Twilio
    const formData = await request.formData();

    const from = formData.get('From') as string;
    const to = formData.get('To') as string;
    const body = formData.get('Body') as string;

    console.log('Received SMS:', { from, to, body }); // Add logging

    // Remove the '+' from the phone number for consistency
    const phoneNumber = to.startsWith('+') ? to.substring(1) : to;

    // Store the message
    addMessage({
      phoneNumber,
      from,
      body,
    });

    // Return a TwiML response
    // return new NextResponse(TwimlResponse(), {
    //   headers: {
    //     'Content-Type': 'text/xml',
    //   },

    // });
  } catch (error) {
    console.error('Error processing SMS webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process SMS' },
      { status: 500 }
    );
  }
}
