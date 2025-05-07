/** @format */

import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import config from '@/config';

export const dynamic = 'force-dynamic';

// This route is called after a successful login. It exchanges the code for a session and redirects to the callback URL (see config.js).
export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');
  const redirectTo = requestUrl.searchParams.get('redirect_to');

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  const redirectUrl = redirectTo
    ? requestUrl.origin + redirectTo
    : requestUrl.origin + config.auth.callbackUrl;

  return NextResponse.redirect(redirectUrl);
}
