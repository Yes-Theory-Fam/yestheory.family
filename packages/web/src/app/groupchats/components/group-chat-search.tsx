"use client";

import { FC, Fragment, useEffect, useState } from "react";
import { GroupChatPlatform, GroupChatResult } from "ui/groupchats";
import { GroupChatSearchBar } from "ui/groupchats/client";
import { SearchClient } from "typesense";
import { useTypesenseClient } from "../../../lib/typesense/use-typesense-client";
import { navigateToLogin, useAuth } from "../../../context/user/user";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

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
  platforms: GroupChatPlatform[],
  searchClient: SearchClient
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
  const searchClient = useTypesenseClient();

  const { loggedIn } = useAuth();

  useEffect(() => {
    fetchResults("", [], searchClient).then(setResults);
  }, [searchClient]);

  return (
    <div className={"flex flex-col gap-4 max-w-4xl mx-auto"}>
      <GroupChatSearchBar
        onSearchChange={({ query, platforms }) =>
          fetchResults(query, platforms, searchClient).then(setResults)
        }
      />

      <div className={"flex flex-col gap-2"}>
        {!loggedIn && (
          <>
            <p>
              <ExclamationTriangleIcon
                className={"h-6 w-6 text-warning inline-block mr-2"}
              />
              Not seeing what you are looking for? Only Facebook groups and
              Instagram pages are available without{" "}
              <Link
                href={"#"}
                onClick={navigateToLogin}
                className={"underline decoration-brand-500 decoration"}
              >
                logging in with Discord
              </Link>
              .
            </p>

            <hr />
          </>
        )}

        {results.map((r) => (
          <Fragment key={r.id}>
            <GroupChatResult {...r} />
            <div className={"h-px mx-4 bg-gray-100 min-w-max last:hidden"} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
