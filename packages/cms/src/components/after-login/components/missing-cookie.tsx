import React, {type FC} from 'react';

export const MissingCookie: FC = () => {
  return (
    <p>
      You are not logged in on YTF. Click{' '}
      <a
        href={`${process.env.PAYLOAD_PUBLIC_WEB_FRONTEND_URL}/auth/payload-redirect`}
      >
        here
      </a>{' '}
      to log in through Discord.
    </p>
  );
};
