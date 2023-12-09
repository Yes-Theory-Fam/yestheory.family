'use client';

import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import {type SearchClient} from 'typesense';
import {getTypesenseClient} from './client';

export type TypesenseContextData = {client: SearchClient};

export const TypesenseContext = createContext<TypesenseContextData | null>(
  null,
);

export type TypesenseProviderProps = PropsWithChildren<{
  apiKey: string;
}>;

export const TypesenseProvider: FC<TypesenseProviderProps> = ({
  apiKey,
  children,
}) => {
  const value = useMemo(() => {
    const client = getTypesenseClient(apiKey);

    return {client};
  }, [apiKey]);

  return (
    <TypesenseContext.Provider value={value}>
      {children}
    </TypesenseContext.Provider>
  );
};

export const useTypesense = () => {
  const ctx = useContext(TypesenseContext);

  if (!ctx) throw new Error('useTypesense used outside of TypesenseProvider');

  return ctx;
};
