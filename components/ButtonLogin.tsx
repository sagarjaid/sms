/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

'use client';

import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import apiClient from '@/lib/api';
import LoginWithGoogle from './LoginWithGoogle';
import { Button } from './ui/button';

// A button to show user some account actions
//  1. Billing: open a Stripe Customer Portal to manage their billing (cancel subscription, update payment method, etc.).
//     You have to manually activate the Customer Portal in your Stripe Dashboard (https://dashboard.stripe.com/test/settings/billing/portal)
//     This is only available if the customer has a customerId (they made a purchase previously)
//  2. Logout: sign out and go back to homepage
// See more at https://shipfa.st/docs/components/buttonAccount
const ButtonLogin = () => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleBilling = async () => {
    setIsLoading(true);

    try {
      const { url }: { url: string } = await apiClient.post(
        '/stripe/create-portal',
        {
          returnUrl: window.location.href,
        }
      );

      window.location.href = url;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <>
      {user ? (
        <Button
          variant='outline'
          className='py-2 w-[170px] justify-start'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleSignOut}>
          {!isHovered ? (
            <>
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user?.user_metadata?.avatar_url}
                  alt={'Profile picture'}
                  className='w-6 h-6 rounded-full shrink-0'
                  referrerPolicy='no-referrer'
                  width={24}
                  height={24}
                />
              ) : (
                <span className='w-6 h-6 bg-muted flex justify-center items-center rounded-full shrink-0 capitalize text-sm'>
                  {user?.email?.charAt(0)}
                </span>
              )}

              <span className='text-sm font-medium truncate'>
                {user?.user_metadata?.name || user?.email?.split('@')[0]}
              </span>
            </>
          ) : (
            <span className='text-sm font-medium flex items-center gap-2 w-full justify-center'>
              Logout
              <svg
                className='w-2.5 h-2.5'
                fill='none'
                strokeWidth={2}
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25'
                />
              </svg>
            </span>
          )}
        </Button>
      ) : (
        <LoginWithGoogle />
      )}
    </>
  );
};

export default ButtonLogin;
