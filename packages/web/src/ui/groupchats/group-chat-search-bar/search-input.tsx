import { FC, useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useDebouncedValue } from "lib/hooks/use-debounced-value";

export type SearchInputProps = {
  onChange: (newValue: string) => void;
};

export const SearchInput: FC<SearchInputProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebouncedValue(search, 300);

  const focusInput = () => inputRef.current?.focus();

  useEffect(() => {
    onChange(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className={"flex"}>
      <input
        ref={inputRef}
        className={
          "peer w-full px-3 py-2 outline-none border-2 border-transparent focus-visible:border-brand-800 border-r-0"
        }
        onChange={(e) => setSearch(e.target.value)}
      />
      <div
        onClick={focusInput}
        className={
          "flex items-center justify-center bg-white p-2 border-transparent border-2 border-l-0 peer-focus:border-brand-800"
        }
      >
        <MagnifyingGlassIcon className={"w-4 h-4"} />
      </div>
    </div>
  );
};
