'use client';

import {XMarkIcon} from '@heroicons/react/20/solid';
import {
  Root,
  Portal,
  Overlay,
  Content,
  Title,
  Close,
  Description,
} from '@radix-ui/react-dialog';
import {type PropsWithChildren} from 'react';
import {Button, type ButtonProps} from '../button/button';
import {Heading} from '../heading/heading';

export type ModalActionButton = Omit<ButtonProps, 'children'> & {
  text: string;
};

export type ModalProps = {
  title: string;
  actions: ModalActionButton[];
  onCancel?: () => void;
};

export const Modal = ({
  title,
  onCancel,
  actions,
  children,
}: PropsWithChildren<ModalProps>) => (
  <Root open={true}>
    <Portal>
      <Overlay className='fixed inset-0 z-50 bg-gray-500/30 backdrop-blur-sm'>
        <Content className='relative inset-0 top-1/2 mx-auto flex max-w-2xl -translate-y-1/2 flex-col items-start justify-between gap-6 rounded bg-white p-4 shadow-lg md:p-8'>
          <Title asChild>
            <Heading size='h3' frontText={title} />
          </Title>

          {onCancel && (
            <Close asChild>
              <button
                type='button'
                onClick={onCancel}
                className='absolute right-4 top-4 p-2'
                aria-label='Close'
              >
                <XMarkIcon className='h-8 w-8 text-gray-600' />
              </button>
            </Close>
          )}

          <Description asChild>
            {/* The fragment ensures only one child is passed to SlotClone of Radix */}
            <>{children}</>
          </Description>

          <div className='mt-6 flex w-full flex-col justify-center gap-4 md:flex-row md:justify-end'>
            {actions.map(({text, ...props}) => (
              <Close key={text} asChild>
                <Button {...props}>{text}</Button>
              </Close>
            ))}
          </div>
        </Content>
      </Overlay>
    </Portal>
  </Root>
);
