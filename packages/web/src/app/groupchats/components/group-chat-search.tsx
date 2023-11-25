"use client";

import { FC, useEffect, useState } from "react";
import { GroupChatPlatform, GroupChatResult } from "ui/groupchats";
import { GroupChatSearchBar } from "ui/groupchats/client";
import { SearchClient } from "typesense";

const searchClient = new SearchClient({
  apiKey: "1234567890", // TODO configurable, safe for public consumption
  nodes: [
    {
      host: "localhost",
      port: 3000,
      protocol: "http",
      path: "/typesense",
    },
  ],
});

type GroupchatResult = {
  id: string;
  name: string;
  keywords: string[];
  url: string;
  description: string;
  platform: GroupChatPlatform;
};

const fetchResults = async (
  queryText: string,
  platforms: GroupChatPlatform[]
): Promise<GroupchatResult[]> => {
  const filterBy =
    platforms.length === 0 ? "" : `platform:[${platforms.join(",")}]`;

  const { hits } = await searchClient
    .collections<GroupchatResult>("groupchats")
    .documents()
    .search(
      {
        q: queryText,
        query_by: "name,keywords,description",
        filter_by: filterBy,
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
  // TODO SWR
  const [results, setResults] = useState<GroupchatResult[]>([]);

  useEffect(() => {
    fetchResults("", []).then(setResults);
  }, []);

  return (
    <div>
      <GroupChatSearchBar
        onSearchChange={({ query, platforms }) =>
          fetchResults(query, platforms).then(setResults)
        }
      />

      <div className="divide-y">
        {results.map((r) => (
          <GroupChatResult key={r.id} {...r} />
        ))}
      </div>
    </div>
  );
};
