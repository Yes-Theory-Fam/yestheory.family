import {useIsomorphicLayoutEffect} from 'framer-motion';
import {type FC} from 'react';

export const ScrollbarWidthProvider: FC = () => {
  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const windowInnerWidth = window.innerWidth;
    const clientWidth = document.body.clientWidth;

    const scrollbarWidth = windowInnerWidth - clientWidth;
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      `${scrollbarWidth}px`,
    );
  }, []);

  return null;
};
