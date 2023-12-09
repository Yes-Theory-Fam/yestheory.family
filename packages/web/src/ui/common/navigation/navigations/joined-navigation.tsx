import {type FC} from 'react';
import {type NavigationProps} from '../navigation.types';
import {DesktopNavigation} from './desktop-navigation';
import {MobileNavigation} from './mobile-navigation';

export const Navigation: FC<NavigationProps> = (props) => {
  return (
    <div id='navigation' className='fixed inset-x-0 top-0 z-10 bg-white'>
      <MobileNavigation {...props} />
      <DesktopNavigation {...props} />
    </div>
  );
};
