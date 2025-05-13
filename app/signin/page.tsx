/** @format */

import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignInButton from './sign-in-button';

export const metadata = {
  title: 'Sign In | SMSlly - Receive SMS Online',
  description:
    'Sign in to SMSlly to access temporary phone numbers and SMS receiving services. Secure login with Google authentication for managing your SMS verification needs.',
  keywords: [
    'SMSlly login',
    'SMSlly sign in',
    'SMS service login',
    'temporary phone number login',
    'SMS verification login',
    'receive SMS online login',
    'secure SMS login',
    'Google authentication',
    'SMS service account',
    'virtual phone number login',
  ],
  openGraph: {
    title: 'Sign In | SMSlly - Receive SMS Online',
    description:
      'Sign in to SMSlly to access temporary phone numbers and SMS receiving services. Secure login with Google authentication for managing your SMS verification needs.',
  },
};

export default function Login() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>
            Sign In to SMSlly
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col items-center gap-4'>
          <p className='text-center text-muted-foreground mb-4'>
            Sign in to access temporary phone numbers and SMS receiving services
          </p>
          <SignInButton />
          <p className='text-sm text-muted-foreground text-center mt-4'>
            By signing in, you agree to our{' '}
            <Link
              href='/tos'
              className='text-primary hover:underline'>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy-policy'
              className='text-primary hover:underline'>
              Privacy Policy
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
