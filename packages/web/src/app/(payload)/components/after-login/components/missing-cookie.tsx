import React, {type FC} from 'react';

export const MissingCookie: FC = () => (
  <p className='text-center'>
    You are not logged in on YTF. Click{' '}
    <a href='/auth/payload-redirect'>here</a> to log in through Discord.
  </p>
);
