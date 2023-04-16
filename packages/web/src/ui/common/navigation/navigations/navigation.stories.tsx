import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import { NavigationProps } from "../navigation.types";
import { Navigation } from "./joined-navigation";

export default {
  title: "Common/Navigation/Navigation",
  component: Navigation,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "",
        segments: ["example"],
      },
    },
  },
} satisfies Meta<NavigationProps>;

export const NavigationLoggedOut = {
  args: {
    user: undefined,
    links: [
      { text: "Example", href: "/example" },
      { text: "Buddy Project", href: "/buddyproject" },
    ],
    menuItems: [],
    onLoginButtonClick: action("login-button-clicked"),
  },
};
export const NavigationLoggedIn = {
  args: {
    ...NavigationLoggedOut.args,
    user: {
      avatarUrl: "https://i.pravatar.cc/150?img=57",
      username: "geisterfurz007#5952",
    },
  },
};
