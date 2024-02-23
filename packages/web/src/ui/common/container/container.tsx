import {type FC, type PropsWithChildren} from 'react';
import {twMerge} from 'tailwind-merge';

export type ContainerProps = {
  className?: string;
};

export const Container: FC<PropsWithChildren<ContainerProps>> = ({
  className,
  children,
}) => (
    <div
      className={twMerge('mx-auto w-full max-w-7xl px-4 md:px-8', className)}
    >
      {children}
    </div>
  );
