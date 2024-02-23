import {type ComponentProps, type FC} from 'react';

export type ToggleButtonProps = Omit<
  ComponentProps<'input'>,
  'onChange' | 'type' | 'className'
> & {
  label: string;
  onChange: (newValue: boolean) => void;
};

export const ToggleButton: FC<ToggleButtonProps> = ({
  label,
  onChange,
  ...rest
}) => (
    <label className='group cursor-pointer'>
      <input
        type='checkbox'
        className='peer hidden'
        onChange={(e) => onChange(e.target.checked)}
        {...rest}
      />
      <span className='rounded-lg border-2 border-brand-800 bg-white px-3 py-2 text-sm text-brand-800 transition-colors group-hover:bg-brand-50 peer-checked:bg-brand-800 peer-checked:text-white'>
        {label}
      </span>
    </label>
  );
