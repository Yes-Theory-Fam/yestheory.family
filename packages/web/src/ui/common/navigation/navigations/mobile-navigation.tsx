'use client';

import {Bars3Icon, XMarkIcon} from '@heroicons/react/20/solid';
import {AnimatePresence, motion} from 'framer-motion';
import {useSelectedLayoutSegments} from 'next/navigation';
import {
  type FC,
  type JSXElementConstructor,
  type SVGProps,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {Link} from '../../link/link';
import {Logo, type LogoProps} from '../../logo/logo';
import {LoginButton} from '../login-button/login-button';
import {NavLink} from '../nav-link/nav-link';
import {type NavigationProps} from '../navigation.types';
import {Profile} from '../profile/profile';

interface MobileHeadlineProps {
  logoVariant: LogoProps['variant'];
  icon: JSXElementConstructor<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {title?: string; titleId?: string}
  >;
  onClick: () => void;
  name: string;
}

const MobileHeadline: FC<MobileHeadlineProps> = ({
  logoVariant,
  icon: Icon,
  onClick,
  name,
}) => (
  <div className='flex items-center justify-between p-4 md:hidden'>
    <Link hideUnderline href='/' aria-label='Home'>
      <Logo variant={logoVariant} size='small' />
    </Link>

    <button className='p-2' onClick={onClick} aria-label={name}>
      <Icon className='size-6' />
    </button>
  </div>
);

export const MobileNavigation: FC<NavigationProps> = ({
  onLoginButtonClick,
  user,
  menuItems,
  links,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSegmentsString = useSelectedLayoutSegments().join('-');

  // Close the menu when selectedSegments (= the current route) changes
  useEffect(() => setIsOpen(false), [selectedSegmentsString]);

  const navLinks = useMemo(
    () => links.map((l) => <NavLink key={l.href.toString()} {...l} inverted />),
    [links],
  );

  return (
    <>
      <MobileHeadline
        logoVariant='color'
        icon={Bars3Icon}
        onClick={() => setIsOpen(true)}
        name='Menu'
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key='mobile-menu'
            initial={{
              transform: 'translateX(100%)',
              transitionProperty: 'transform',
            }}
            animate={{transform: 'translateX(0%)'}}
            exit={{
              transform: 'translateX(100%)',
              transitionProperty: 'transform',
            }}
            className='fixed inset-0 z-[50] bg-brand-800'
          >
            <div className='flex flex-col text-white'>
              <MobileHeadline
                logoVariant='white'
                icon={XMarkIcon}
                onClick={() => setIsOpen(false)}
                name='Close menu'
              />
            </div>

            <div className='flex flex-col items-center gap-6'>
              {navLinks}

              {user ? (
                <Profile variant='mobile' user={user} menuItems={menuItems} />
              ) : (
                <LoginButton onClick={onLoginButtonClick} inverted />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
