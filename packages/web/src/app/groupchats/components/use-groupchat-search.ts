import {useState, useEffect, useCallback} from 'react';
import {type SearchClient} from 'typesense';
import {useTypesense} from '../../../context/typesense';
import {useDebouncedValue} from '../../../lib/hooks/use-debounced-value';
import {type GroupChatPlatform} from '../../../ui/groupchats';

export type GroupchatResult = {
  id: string;
  name: string;
  keywords: string[];
  url: string;
  description: string;
  platform: GroupChatPlatform;
  promoted: number;
};

const pageSize = 15;

const fetchResults = async (
  queryText: string,
  platforms: GroupChatPlatform[],
  searchClient: SearchClient,
  page = 1,
): Promise<[GroupchatResult[], hasNext: boolean]> => {
  const filterBy =
    platforms.length === 0 ? '' : `platform:[${platforms.join(',')}]`;

  const {
    hits,
    found,
    page: returnedPage,
  } = await searchClient
    .collections<GroupchatResult>('groupchats')
    .documents()
    .search(
      {
        q: queryText,
        query_by: 'name,keywords,description',
        filter_by: filterBy,
        sort_by: 'promoted:desc',
        per_page: pageSize,
        page,
      },
      {},
    );

  const results =
    hits
      ?.map((h) => h.document)
      .filter((x): x is GroupchatResult => 'name' in x) ?? [];

  const hasNext = returnedPage * pageSize < found;

  return [results, hasNext];
};

export type UseGroupchatSearchReturn = {
  groupchats: GroupchatResult[];
  loading: boolean;
};

export const useGroupchatSearch = (
  queryText: string,
  platforms: GroupChatPlatform[],
): UseGroupchatSearchReturn => {
  const {client} = useTypesense();

  const [nextPage, setNextPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<GroupchatResult[]>([]);

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
    // We want to call this on initial render or when queryText and platforms change. fetchMore changes in more
    // instances. This deps array is intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryText, platforms]);

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
