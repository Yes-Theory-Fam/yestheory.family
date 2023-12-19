import React, {type FC, useEffect, useState} from 'react';
import {AuthState} from '../collections/users';

const fetchAuthState = async (abort: AbortSignal) => {
  const response = await fetch('/api/users/auth-state', {signal: abort});

  return (await response.text()) as AuthState;
};

const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.LOADING);

  useEffect(() => {
    const abortController = new AbortController();

    fetchAuthState(abortController.signal).then(setAuthState);

    return () => abortController.abort();
  }, []);

  return authState;
};

export const AfterLogin: FC = () => {
  const authState = useAuthState();

  if (authState === AuthState.LOADING) return null;

  if (authState === AuthState.MISSING_COOKIE) {
    return (
      <p className='text-center text-2xl'>
        You are not logged in on YTF. Click{' '}
        <a
          href={`${process.env.PAYLOAD_PUBLIC_WEB_FRONTEND_URL}/auth/payload-redirect`}
        >
          here
        </a>{' '}
        to log in through Discord.
      </p>
    );
  }

  if (authState === AuthState.MISSING_USER) {
    return (
      <p>
        You have not yet been given access to the backoffice. If you believe you
        should be given access, please fill out this form. A member of the team
        will get back to you!
      </p>
    );
  }

  return (
    <p>
      Well, this should have been moving forward now actually. This is odd, you
      shouldn&apos;t see this...
    </p>
  );
};
