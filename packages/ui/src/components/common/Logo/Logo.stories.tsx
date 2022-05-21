import { Meta, Story } from "@storybook/react/types-6-0";
import { Logo, LogoProps } from "../..";
import { HStack, VStack } from "@chakra-ui/react";

export default {
  title: "Common/Logo",
  component: Logo,
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
  },
} as Meta<LogoProps>;

export const Logos: Story = () => {
  return (
    <VStack>
      <HStack p={4} spacing={4}>
        <Logo size={"sm"} />
        <Logo size={"md"} />
        <Logo size={"lg"} />
      </HStack>
      <HStack p={4} bg={"brand.800"} spacing={4}>
        <Logo size={"sm"} variant={"white"} />
        <Logo size={"md"} variant={"white"} />
        <Logo size={"lg"} variant={"white"} />
      </HStack>
    </VStack>
  );
};

export const LogoStory: Story<LogoProps> = (args) => <Logo {...args} />;
LogoStory.args = {
  size: "sm",
};
LogoStory.storyName = "Logo";

export const LogoWhiteStory: Story<LogoProps> = (args) => (
  <Logo {...args} variant={"white"} />
);
LogoWhiteStory.args = {
  size: "sm",
};
LogoWhiteStory.storyName = "Logo White";
LogoWhiteStory.parameters = {
  backgrounds: {
    default: "blue",
    values: [{ name: "blue", value: "#0167ff" }],
  },
};
