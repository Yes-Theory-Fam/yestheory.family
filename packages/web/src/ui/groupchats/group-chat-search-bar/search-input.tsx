import { FC, useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useDebouncedValue } from "lib/hooks/use-debounced-value";

export type SearchInputProps = {
  onChange: (newValue: string) => void;
};

// TODO pagination

export const SearchInput: FC<SearchInputProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebouncedValue(search, 300);

  const focusInput = () => inputRef.current?.focus();

  useEffect(() => onChange(debouncedSearch), [debouncedSearch]);

  return (
    <div
      className={
        "flex bg-brand-50/50 rounded-md border-2 border-transparent focus-within:border-brand-800 transition-all"
      }
    >
      <input
        ref={inputRef}
        className={"peer w-full px-3 py-2 bg-transparent outline-none"}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div
        onClick={focusInput}
        className={"flex items-center justify-center p-2"}
      >
        <MagnifyingGlassIcon className={"w-4 h-4"} />
      </div>
    </div>
  );
};
