import { h, FunctionalComponent } from "preact";
import { Link, LinkProps, Stack } from "@chakra-ui/react";

export interface FooterLinkDefinition extends LinkProps {
  text: string;
}

interface LinkRowProps {
  links: FooterLinkDefinition[];
}

const definitionToLink = (definition: FooterLinkDefinition) => {
  const { text, ...args } = definition;
  return (
    <Link {...args} color={"gray.600"}>
      {text}
    </Link>
  );
};

export const FooterLinkRow: FunctionalComponent<LinkRowProps> = ({ links }) => (
  <Stack
    direction={["column", null, "row"]}
    align={"center"}
    spacing={[2, null, 8]}
  >
    {links.map(definitionToLink)}
  </Stack>
);
