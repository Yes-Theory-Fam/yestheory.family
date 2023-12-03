import { useState, useEffect, useCallback } from "react";
import { GroupChatPlatform } from "../../../ui/groupchats";
import { SearchClient } from "typesense";
import { useTypesense } from "../../../context/typesense";

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
    platforms.length === 0 ? "" : `platform:[${platforms.join(",")}]`;

  const {
    hits,
    found,
    page: returnedPage,
  } = await searchClient
    .collections<GroupchatResult>("groupchats")
    .documents()
    .search(
      {
        q: queryText,
        query_by: "name,keywords,description",
        filter_by: filterBy,
        sort_by: "promoted:desc",
        per_page: pageSize,
        page,
      },
      {},
    );

  const results =
    hits
      ?.map((h) => h.document)
      .filter((x): x is GroupchatResult => "name" in x) ?? [];

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
  const { client } = useTypesense();

  const [nextPage, setNextPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<GroupchatResult[]>([]);

  const fetchMore = useCallback(
    async (mode: "append" | "replace") => {
      if (loading || !hasNextPage) return;

      setLoading(true);
      const [newChats, hasNext] = await fetchResults(
        queryText,
        platforms,
        client,
        nextPage,
      );

      setChats((chats) =>
        mode === "replace" ? newChats : [...chats, ...newChats],
      );
      setHasNextPage(hasNext);
      if (hasNext) setNextPage(nextPage + 1);
      setLoading(false);
    },
    [nextPage, hasNextPage, loading, queryText, platforms, client],
  );

  useEffect(() => {
    setNextPage(1);
    void fetchMore("replace");
  }, [queryText, platforms, client]);

  useEffect(() => {
    if (loading) return;

    let tripped = false;

    const scrollListener = () => {
      const scrollTarget = document.scrollingElement as HTMLHtmlElement | null;
      if (!scrollTarget || tripped) return;

      const footerHeight = document.querySelector("footer")?.clientHeight ?? 0;
      const loadingOffset = footerHeight + 150;

      const { scrollTop, scrollHeight, clientHeight } = scrollTarget;

      if (scrollTop + clientHeight + loadingOffset >= scrollHeight) {
        console.log(`Scroll triggered for nextPage ${nextPage}`);
        tripped = true;
        void fetchMore("append");
      }
    };

    document.addEventListener("scroll", scrollListener);

    return () => document.removeEventListener("scroll", scrollListener);
  }, [fetchMore, loading, nextPage]);

  return {
    loading,
    groupchats: chats,
  };
};
