'use client';

import {type FC, useEffect} from 'react';
import {navigateToLogin} from '../../../../context/user/navigate-to-login';

const PayloadRedirect: FC = () => {
  useEffect(() => {
    navigateToLogin('/admin');
  }, []);

  return (
    <div className='flex h-screen items-center justify-center px-6'>
      You are getting redirected in a second!
    </div>
  );
};

export default PayloadRedirect;
