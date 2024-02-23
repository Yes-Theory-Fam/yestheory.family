import {type FormBuilder} from '@atmina/formbuilder';
import {clsx} from 'clsx';
import React, {type ComponentPropsWithoutRef, type FC} from 'react';

export type TextareaFieldProps = {
  on: FormBuilder<string>;
  className?: string;
  inputClassName?: string;
} & Omit<
  ComponentPropsWithoutRef<'textarea'>,
  'onChange' | 'value' | 'className'
>;

export const TextareaField: FC<TextareaFieldProps> = ({
  on,
  className,
  inputClassName,
  ...formProps
}) => (
  <div className={clsx('textarea field-type w-full', className)}>
    <label className='textarea-outer'>
      <div className='textarea-inner'>
        <textarea
          className={clsx('textarea-element', inputClassName)}
          {...on()}
          {...formProps}
        />
      </div>
    </label>
  </div>
);
