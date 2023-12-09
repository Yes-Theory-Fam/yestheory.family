import {type FC, useMemo} from 'react';
import {Link} from '../../link/link';
import {Logo} from '../../logo/logo';
import {LoginButton} from '../login-button/login-button';
import {NavLink} from '../nav-link/nav-link';
import {type NavigationProps} from '../navigation.types';
import {Profile} from '../profile/profile';

export const DesktopNavigation: FC<NavigationProps> = ({
  onLoginButtonClick,
  user,
  menuItems,
  links,
}) => {
  const navLinks = useMemo(() => {
    return links.map((l) => <NavLink key={l.href.toString()} {...l} />);
  }, [links]);

  return (
    <div className='mx-auto hidden h-28 w-full max-w-7xl items-center gap-12 px-6 md:flex'>
      <Link hideUnderline className='mr-auto' href='/'>
        <Logo variant='color' size='medium' />
      </Link>
      {navLinks}
      {user ? (
        <Profile variant='desktop' user={user} menuItems={menuItems} />
      ) : (
        <LoginButton onClick={onLoginButtonClick} />
      )}
    </div>
  );
};
