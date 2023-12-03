"use client";

import { FC, Fragment, useState } from "react";
import { GroupChatPlatform, GroupChatResult } from "ui/groupchats";
import { GroupChatSearchBar } from "ui/groupchats/client";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { navigateToLogin } from "../../../context/user/navigate-to-login";
import { useGroupchatSearch } from "./use-groupchat-search";

export const GroupChatSearch: FC<{ isLoggedIn: boolean }> = ({
  isLoggedIn,
}) => {
  const [search, setSearch] = useState<{
    query: string;
    platforms: GroupChatPlatform[];
  }>({ query: "", platforms: [] });

  const { loading, groupchats } = useGroupchatSearch(
    search.query,
    search.platforms,
  );

  return (
    <div className={"flex flex-col gap-4 max-w-4xl mx-auto"}>
      <GroupChatSearchBar
        onSearchChange={({ query, platforms }) =>
          setSearch({ query, platforms })
        }
      />

      <div className={"flex flex-col gap-2"}>
        <p>Not seeing what you are looking for?</p>
        <p>
          <InformationCircleIcon
            className={"h-6 w-6 text-brand-800 inline-block mr-2"}
          />
          Ask the group&apos;s admin to shoot me a message{" "}
          <a
            className={"underline decoration-brand-500"}
            href="https://discord.com/users/290193372407136256"
            target={"_blank"}
            rel="noreferrer"
          >
            over on Discord
          </a>{" "}
          to get the group on here!
        </p>

        {!isLoggedIn && (
          <p>
            <ExclamationTriangleIcon
              className={"h-6 w-6 text-warning inline-block mr-2"}
            />
            Only Facebook groups and Instagram pages are available without{" "}
            <Link
              href={"#"}
              onClick={navigateToLogin}
              className={"underline decoration-brand-500"}
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
            <div className={"h-px mx-4 bg-gray-100 min-w-max last:hidden"} />
          </Fragment>
        ))}

        {loading && "Loading..."}
      </div>
    </div>
  );
};
