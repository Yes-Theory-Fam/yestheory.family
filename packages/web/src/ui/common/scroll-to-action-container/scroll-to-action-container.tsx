'use client';

import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {type FC, type PropsWithChildren, useRef} from 'react';

export type ScrollToActionContainerProps = {
  text: string;
};

export const ScrollToActionContainer: FC<
  PropsWithChildren<ScrollToActionContainerProps>
> = ({children, text}) => {
  const selfRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    const navBarElement = document.querySelector('#navigation');
    if (!navBarElement) {
      throw new Error(
        'Failed to resolve #navigation element to determine scroll amount. Make sure an element with that ID exists!',
      );
    }

    const navbarHeight = navBarElement.getBoundingClientRect().height;
    const selfHeight = selfRef.current?.getBoundingClientRect().height ?? 0;

    window.scroll({
      top: selfHeight - navbarHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={selfRef}
      className='relative flex min-h-screen flex-col items-center justify-center'
    >
      {children}
      <button
        className='left absolute bottom-3 left-[50%] flex -translate-x-1/2 cursor-pointer flex-col items-center text-brand-800'
        onClick={scrollToContent}
      >
        <p className='text-xs uppercase'>{text}</p>
        <ChevronDownIcon className='h-6 w-6' />
      </button>
    </div>
  );
};
