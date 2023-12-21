import React, {type FC, useEffect, useState} from 'react';
import {AuthState} from '../../collections/users';
import {AuthenticatedMishap} from './components/authenticated-mishap';
import {MissingAccess} from './components/missing-access';
import {MissingCookie} from './components/missing-cookie';

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

  return (
    <div className='flex flex-col items-center text-xl leading-loose'>
      {authState === AuthState.MISSING_COOKIE && <MissingCookie />}
      {authState === AuthState.MISSING_ACCESS && <MissingAccess />}
      {authState === AuthState.AUTHENTICATED && <AuthenticatedMishap />}
    </div>
  );
};
