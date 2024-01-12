'use client';

import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import {type FC, Fragment, useState} from 'react';
import {GroupChatResult} from 'ui/groupchats';
import {GroupChatSearchBar} from 'ui/groupchats/client';
import type {Groupchat_Platform} from '../../../__generated__/graphql';
import {navigateToLogin} from '../../../context/user/navigate-to-login';
import {useGroupchatSearch} from './use-groupchat-search';

export const GroupChatSearch: FC<{isLoggedIn: boolean}> = ({isLoggedIn}) => {
  const [search, setSearch] = useState<{
    query: string;
    platforms: Groupchat_Platform[];
  }>({query: '', platforms: []});

  const {loading, groupchats} = useGroupchatSearch(
    search.query,
    search.platforms,
  );

  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-4'>
      <GroupChatSearchBar
        search={search}
        onSearchChange={({query, platforms}) => setSearch({query, platforms})}
      />

      <div className='flex flex-col gap-2'>
        <p>Not seeing what you are looking for?</p>
        <p>
          <InformationCircleIcon className='mr-2 inline-block h-6 w-6 text-brand-800' />
          Ask the group&apos;s admin to shoot me a message{' '}
          <a
            className='underline decoration-brand-500'
            href='https://discord.com/users/290193372407136256'
            target='_blank'
            rel='noreferrer'
          >
            over on Discord
          </a>{' '}
          to get the group on here!
        </p>

        {!isLoggedIn && (
          <p>
            <ExclamationTriangleIcon className='mr-2 inline-block h-6 w-6 text-warning' />
            Only specific chats are available without{' '}
            <Link
              href='#'
              onClick={() => navigateToLogin()}
              className='underline decoration-brand-500'
            >
              logging in with Discord
            </Link>
            .
          </p>
        )}
        <hr />

        {groupchats.map((r) => (
          <Fragment key={r.id}>
            <GroupChatResult {...r} />
            <div className='mx-4 h-px min-w-max bg-gray-100 last:hidden' />
          </Fragment>
        ))}

        {groupchats.length === 0 && (
          <div className='mt-6 flex flex-col items-center text-xl'>
            No groupchats found.
          </div>
        )}

        {loading && 'Loading...'}
      </div>
    </div>
  );
};
