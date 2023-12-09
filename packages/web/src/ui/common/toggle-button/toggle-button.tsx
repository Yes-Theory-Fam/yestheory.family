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
}) => {
  return (
    <label className='group cursor-pointer'>
      <input
        type='checkbox'
        className='peer hidden'
        onChange={(e) => onChange(e.target.checked)}
        {...rest}
      />
      <span className='rounded-lg border border-brand-800 bg-white p-2 text-sm text-brand-800 transition-colors group-hover:bg-brand-800 group-hover:text-white peer-checked:bg-brand-800 peer-checked:text-white'>
        {label}
      </span>
    </label>
  );
};
