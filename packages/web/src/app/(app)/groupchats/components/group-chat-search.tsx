'use client';

import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid';
import {type FC, Fragment, useState} from 'react';
import {GroupChatResult} from 'ui/groupchats';
import {GroupChatSearchBar} from 'ui/groupchats/client';
import type {Groupchat_Platform} from '../../../../__generated__/graphql';
import {navigateToLogin} from '../../../../context/user/navigate-to-login';
import {Link} from '../../../../ui';
import {type GroupchatResult, useGroupchatSearch} from './use-groupchat-search';

export type GroupChatSearchProps = {
  isLoggedIn: boolean;
  initialGroupchats: GroupchatResult[];
};

export const GroupChatSearch: FC<GroupChatSearchProps> = ({
  isLoggedIn,
  initialGroupchats,
}) => {
  const [search, setSearch] = useState<{
    query: string;
    platforms: Groupchat_Platform[];
  }>({query: '', platforms: []});

  const {loading, groupchats} = useGroupchatSearch(
    search.query,
    search.platforms,
    initialGroupchats,
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
          <InformationCircleIcon className='mr-2 inline-block size-6 text-brand-800' />
          Ask the group&apos;s admin to head over{' '}
          <Link
            href={process.env.NEXT_PUBLIC_PAYLOAD_URL}
            target='_blank'
            rel='nofollow noreferrer'
          >
            here
          </Link>
          !
        </p>

        {!isLoggedIn && (
          <p>
            <ExclamationTriangleIcon className='mr-2 inline-block size-6 text-warning' />
            Only specific chats are available without{' '}
            <Link href='#' onClick={() => navigateToLogin()}>
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
