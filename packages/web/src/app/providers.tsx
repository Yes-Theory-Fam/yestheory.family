'use client';

import NiceModal from '@ebay/nice-modal-react';
import {type FC, type PropsWithChildren} from 'react';
import {ScrollbarWidthProvider} from '../components/scrollbar-width-provider';
import {type User, UserProvider} from '../context/user/user-context';

export type ProvidersProps = PropsWithChildren<{
  user: User | null;
}>;

export const Providers: FC<ProvidersProps> = ({user, children}) => (
  <NiceModal.Provider>
    <ScrollbarWidthProvider />
    <UserProvider user={user}>{children}</UserProvider>
  </NiceModal.Provider>
);
