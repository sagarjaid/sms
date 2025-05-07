/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

'use client';

import { useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import apiClient from '@/lib/api';
import ButtonSignin from './ButtonSignin';
import LoginWithGoogle from './LoginWithGoogle';
import { Button } from './ui/button';

// A button to show user some account actions
//  1. Billing: open a Stripe Customer Portal to manage their billing (cancel subscription, update payment method, etc.).
//     You have to manually activate the Customer Portal in your Stripe Dashboard (https://dashboard.stripe.com/test/settings/billing/portal)
//     This is only available if the customer has a customerId (they made a purchase previously)
//  2. Logout: sign out and go back to homepage
// See more at https://shipfa.st/docs/components/buttonAccount
const ButtonAccount = () => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);

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
    <Popover className='relative z-10'>
      {({ open }) => (
        <>
          {user ? (
            // <Popover.Button className='flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/80 transition-colors'>
            <Popover.Button>
              <Button
                variant='outline'
                className='py-2'>
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

                <span className='text-sm font-medium'>
                  {user?.user_metadata?.name || user?.email?.split('@')[0]}
                </span>
              </Button>
            </Popover.Button>
          ) : (
            <LoginWithGoogle />
          )}

          <Transition
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'>
            {/* <Popover.Panel className='absolute left-0 z-10 mt-3 w-screen max-w-[150px] flex flex-col gap-1 justify-center items-end rounded-sm transform'> */}
            <Popover.Panel className='absolute right-0 mt-1'>
              <Button
                variant='outline'
                className='flex cursor-pointer  border border-border items-center gap-2 hover:bg-error/20 hover:text-error duration-200 py-2 px-4 w-fit rounded-lg font-medium'
                onClick={handleSignOut}>
                <span className='text-sm font-medium'>Logout</span>
                <svg
                  className='w-3 h-3'
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
              </Button>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ButtonAccount;
