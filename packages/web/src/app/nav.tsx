"use client";

import { FC } from "react";
import { Navigation } from "ui";
import { navigateToLogin, useAuth } from "../context/user/user";

const logout = async () => {
  await fetch("/api/logout", { credentials: "include", method: "POST" });
};

export const Nav: FC = () => {
  const auth = useAuth();

  return (
    <Navigation
      links={[{ text: "Buddy Project", href: "/buddyproject" }]}
      onLoginButtonClick={navigateToLogin}
      menuItems={[
        {
          key: "logout",
          onClick: () => logout().then(() => auth.refetch()),
          label: "Logout",
        },
      ]}
      user={auth.user}
    />
  );
};
