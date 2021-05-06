import { h, FunctionalComponent } from "preact";
import { Box, Center, Image, ImageProps, Stack } from "@chakra-ui/react";
import { HomeParagraph, HomeParagraphProps } from "..";

export interface HomeRowProps {
  image: ImageProps;
  paragraph: HomeParagraphProps;
  direction: "ltr" | "rtl";
}

export const HomeRow: FunctionalComponent<HomeRowProps> = (props) => {
  const rowDirection = props.direction === "ltr" ? "row" : "row-reverse";
  const shadow = props.direction === "ltr" ? "imageRight" : "imageLeft";

  return (
    <Stack
      direction={["column", null, null, null, rowDirection]}
      spacing={[8, null, null, null, 36]}
    >
      <Box
        flex={1}
        my={[0, null, null, null, "auto"]}
        mx={["auto", null, null, null, 0]}
      >
        <Image {...props.image} objectFit={"cover"} shadow={shadow} />
      </Box>
      <Center flex={1}>
        <HomeParagraph {...props.paragraph} />
      </Center>
    </Stack>
  );
};
