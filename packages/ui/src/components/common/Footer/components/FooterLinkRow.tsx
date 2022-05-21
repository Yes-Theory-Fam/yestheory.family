import { FC } from "react";
import { LinkProps, Stack } from "@chakra-ui/react";
import { WrappedLink } from "../../../util";

export interface FooterLinkDefinition extends LinkProps {
  text: string;
}

interface LinkRowProps {
  links: FooterLinkDefinition[];
}

const definitionToLink = (definition: FooterLinkDefinition) => {
  const { text, ...args } = definition;
  return (
    <WrappedLink {...args} color={"gray.600"} key={args.key}>
      {text}
    </WrappedLink>
  );
};

export const FooterLinkRow: FC<LinkRowProps> = ({ links }) => (
  <Stack
    direction={["column", null, "row"]}
    align={"center"}
    spacing={[2, null, 8]}
  >
    {links.map(definitionToLink)}
  </Stack>
);
