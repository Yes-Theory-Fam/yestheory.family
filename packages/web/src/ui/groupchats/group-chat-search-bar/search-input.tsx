import {MagnifyingGlassIcon} from '@heroicons/react/24/solid';
import {type FC, useRef} from 'react';

export type SearchInputProps = {
  onChange: (newValue: string) => void;
};

export const SearchInput: FC<SearchInputProps> = ({onChange}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className='flex rounded-md border-2 border-transparent bg-brand-50/50 transition-all focus-within:border-brand-800'>
      <input
        ref={inputRef}
        className='peer w-full bg-transparent px-3 py-2 outline-none'
        onChange={(e) => onChange(e.target.value)}
      />
      <div
        onClick={focusInput}
        className='flex items-center justify-center p-2'
      >
        <MagnifyingGlassIcon className='h-4 w-4' />
      </div>
    </div>
  );
};
