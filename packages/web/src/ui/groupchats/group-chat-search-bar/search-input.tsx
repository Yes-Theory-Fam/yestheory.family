import {MagnifyingGlassIcon} from '@heroicons/react/20/solid';
import {type FC, useRef} from 'react';

export type SearchInputProps = {
  onChange: (newValue: string) => void;
};

export const SearchInput: FC<SearchInputProps> = ({onChange}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className='group/searchbar flex rounded-md border-2 border-brand-800 focus-within:shadow-md'>
      <input
        placeholder='Search a group'
        ref={inputRef}
        className='peer w-full bg-transparent px-3 py-2 outline-none'
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
      <div
        onClick={focusInput}
        className='flex items-center justify-center px-3 py-2 transition-colors group-focus-within/searchbar:bg-brand-800'
      >
        <MagnifyingGlassIcon className='h-5 w-5 text-brand-800 transition-colors group-focus-within/searchbar:text-white' />
      </div>
    </div>
  );
};
