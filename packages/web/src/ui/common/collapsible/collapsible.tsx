'use client';

import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {type FC, type PropsWithChildren, useState} from 'react';
import AnimateHeight from 'react-animate-height';
import {twMerge} from 'tailwind-merge';

export type CollapsibleProps = {
  title: string;
  defaultOpen?: boolean;
};

export const Collapsible: FC<PropsWithChildren<CollapsibleProps>> = ({
  title,
  defaultOpen = false,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(!defaultOpen);

  return (
    <div>
      <div
        className='flex cursor-pointer select-none justify-between px-4 py-2'
        role='button'
        onClick={() => setCollapsed((c) => !c)}
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={twMerge(
            'size-4 transition-transform duration-200',
            !collapsed && 'rotate-180',
          )}
        />
      </div>

      <AnimateHeight height={collapsed ? 0 : 'auto'} duration={200}>
        <div className='border p-4'>{children}</div>
      </AnimateHeight>
    </div>
  );
};
