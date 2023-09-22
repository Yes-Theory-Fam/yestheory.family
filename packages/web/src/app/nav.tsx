"use client";

import { FC } from "react";
import { Navigation } from "ui";
import { navigateToLogin, useAuth } from "../context/user/user";

export const Nav: FC = () => {
  const auth = useAuth();

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
          onClick: auth.logout,
          label: "Logout",
        },
      ]}
      user={auth.user}
    />
  );
};
