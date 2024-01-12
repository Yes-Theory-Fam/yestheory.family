import {useState, useEffect, useCallback} from 'react';
import type {Groupchat_Platform} from '../../../__generated__/graphql';
import {useTypesense} from '../../../context/typesense';
import {useDebouncedValue} from '../../../lib/hooks/use-debounced-value';
import {fetchResults} from './fetch-groupchats';

export type GroupchatResult = {
  id: string;
  name: string;
  keywords: string[];
  url: string;
  description: string;
  platform: Groupchat_Platform;
  promoted: number;
};

export type UseGroupchatSearchReturn = {
  groupchats: GroupchatResult[];
  loading: boolean;
};

export const useGroupchatSearch = (
  queryText: string,
  platforms: Groupchat_Platform[],
  initialGroupchats: GroupchatResult[],
): UseGroupchatSearchReturn => {
  const {client} = useTypesense();

  const [nextPage, setNextPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<GroupchatResult[]>(initialGroupchats);

  queryText = useDebouncedValue(queryText, 300);

  const fetchMore = useCallback(
    async (mode: 'append' | 'replace', page: number) => {
      if (loading || (!hasNextPage && mode === 'append')) return;

      setLoading(true);
      const [newChats, hasNext] = await fetchResults(
        queryText,
        platforms,
        client,
        page,
      );

      setChats((chats) =>
        mode === 'replace' ? newChats : [...chats, ...newChats],
      );
      setHasNextPage(hasNext);
      if (hasNext) setNextPage(page + 1);
      setLoading(false);
    },
    [hasNextPage, loading, queryText, platforms, client],
  );

  useEffect(() => {
    void fetchMore('replace', 1);
    // We want to call this on initial render, when the client changes (i.e. when the apiKey changes due to logout)
    //   or when queryText and platforms change. fetchMore changes in more instances. This deps array is intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryText, platforms, client]);

  useEffect(() => {
    let tripped = false;

    const scrollListener = () => {
      const scrollTarget = document.scrollingElement as HTMLHtmlElement | null;
      if (!scrollTarget || tripped || loading) return;

      const footerHeight = document.querySelector('footer')?.clientHeight ?? 0;
      const loadingOffset = footerHeight + 150;

      const {scrollTop, scrollHeight, clientHeight} = scrollTarget;

      if (scrollTop + clientHeight + loadingOffset >= scrollHeight) {
        tripped = true;
        void fetchMore('append', nextPage);
      }
    };

    document.addEventListener('scroll', scrollListener);

    return () => document.removeEventListener('scroll', scrollListener);
  }, [fetchMore, loading, nextPage]);

  return {
    loading,
    groupchats: chats,
  };
};
