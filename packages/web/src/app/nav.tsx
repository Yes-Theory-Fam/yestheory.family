'use client';

import {useRouter} from 'next/navigation';
import {type FC} from 'react';
import {Navigation} from 'ui';
import {type CurrentUserQuery} from '../__generated__/graphql';
import {logout} from '../context/user/logout-server-action';
import {navigateToLogin} from '../context/user/navigate-to-login';

export type NavProps = {
  user: Exclude<CurrentUserQuery['me'], null>;
};

export const Nav: FC<NavProps> = ({user}) => {
  const router = useRouter();

  return (
    <Navigation
      links={[
        {text: 'Buddy Project', href: '/buddyproject'},
        {text: 'Groupchats', href: '/groupchats'},
      ]}
      onLoginButtonClick={() => navigateToLogin()}
      menuItems={[
        {
          key: 'logout',
          onClick: () => logout().then(() => router.refresh()),
          label: 'Logout',
        },
      ]}
      user={user}
    />
  );
};
