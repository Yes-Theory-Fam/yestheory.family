import { action } from "@storybook/addon-actions";
import { StoryFn, Meta } from "@storybook/react";
import { LoginButton, LoginButtonProps } from "./login-button";

export default {
  title: "Common/Navigation/LoginButton",
  component: LoginButton,
} satisfies Meta<LoginButtonProps>;

const Template: StoryFn<LoginButtonProps> = (args) => <LoginButton {...args} />;

export const LoginButtonStory = Template.bind({});
LoginButtonStory.storyName = "LoginButton";
LoginButtonStory.args = {
  inverted: false,
  onClick: action("login-button-clicked"),
};
