"use client";

import { FC, useEffect, useState } from "react";
import { GroupChatPlatform, GroupChatResult } from "ui/groupchats";
import { GroupChatSearchBar } from "ui/groupchats/client";
import { getTypesenseClient } from "../../../lib/typesense";

type GroupchatResult = {
  id: string;
  name: string;
  keywords: string[];
  url: string;
  description: string;
  platform: GroupChatPlatform;
  promoted: number;
};

const fetchResults = async (
  queryText: string,
  platforms: GroupChatPlatform[]
): Promise<GroupchatResult[]> => {
  const filterBy =
    platforms.length === 0 ? "" : `platform:[${platforms.join(",")}]`;
  const searchClient = getTypesenseClient();

  const { hits } = await searchClient
    .collections<GroupchatResult>("groupchats")
    .documents()
    .search(
      {
        q: queryText,
        query_by: "name,keywords,description",
        filter_by: filterBy,
        sort_by: "promoted:desc",
      },
      {}
    );

  return (
    hits
      ?.map((h) => h.document)
      .filter((x): x is GroupchatResult => "name" in x) ?? []
  );
};

export const GroupChatSearch: FC = () => {
  const [results, setResults] = useState<GroupchatResult[]>([]);

  useEffect(() => {
    fetchResults("", []).then(setResults);
  }, []);

  return (
    <div className={"flex flex-col gap-4"}>
      <GroupChatSearchBar
        onSearchChange={({ query, platforms }) =>
          fetchResults(query, platforms).then(setResults)
        }
      />

      <div className={"flex flex-col gap-2"}>
        {results.map((r) => (
          <>
            <GroupChatResult key={r.id} {...r} />
            <div className={"h-px mx-4 bg-gray-100 min-w-max last:hidden"} />
          </>
        ))}
      </div>
    </div>
  );
};
