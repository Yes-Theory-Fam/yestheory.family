'use client';

import {useRouter} from 'next/navigation';
import {type FC} from 'react';
import {Navigation, type NavLinkDefinition} from 'ui';
import {type CurrentUserQuery} from '../__generated__/graphql';
import {logout} from '../context/user/logout-server-action';
import {navigateToLogin} from '../context/user/navigate-to-login';

export type NavProps = {
  user: Exclude<CurrentUserQuery['me'], null>;
  routes: NavLinkDefinition[];
};

export const Nav: FC<NavProps> = ({user, routes}) => {
  const router = useRouter();

  return (
    <Navigation
      links={routes}
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
