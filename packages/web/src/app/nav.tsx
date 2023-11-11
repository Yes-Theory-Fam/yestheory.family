"use client";

import { FC } from "react";
import { Navigation } from "ui";
import { navigateToLogin } from "../context/user/navigate-to-login";
import { logout } from "../context/user/logout-server-action";
import { CurrentUserQuery } from "../__generated__/graphql";
import { useRouter } from "next/navigation";

export type NavProps = {
  user: Exclude<CurrentUserQuery["me"], null>;
};

export const Nav: FC<NavProps> = ({ user }) => {
  const router = useRouter();

  return (
    <Navigation
      links={[
        { text: "Buddy Project", href: "/buddyproject" },
        { text: "Groupchats", href: "/groupchats" },
      ]}
      onLoginButtonClick={navigateToLogin}
      menuItems={[
        {
          key: "logout",
          onClick: () => logout().then(() => router.refresh()),
          label: "Logout",
        },
      ]}
      user={user}
    />
  );
};
