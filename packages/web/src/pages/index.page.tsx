import { FC } from "react";
import {
  HeadingProps,
  HomeParallax,
  HomeRow,
  HomeRowProps,
  ScrollToActionContainer,
} from "@yestheory.family/ui";
import { Box, Container, VStack } from "@chakra-ui/react";

const image = {
  src: "https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-30-57b30ad41bc90__605.jpg",
  alt: "Image of a cute kitten :)",
};

const heading: HeadingProps = {
  frontText: "Discover ",
  blueText: "empowering stories",
  size: "h2",
};

const exampleData: HomeRowProps[] = [
  {
    direction: "ltr",
    image,
    paragraph: {
      heading,
      buttonHref: "/about",
      paragraphs: [],
    },
  },
  {
    direction: "rtl",
    image,
    paragraph: {
      heading,
      buttonHref: "/about",
      paragraphs: [],
    },
  },
  {
    direction: "ltr",
    image,
    paragraph: {
      heading,
      buttonHref: "/about",
      paragraphs: [],
    },
  },
];

const Index: FC = () => {
  return (
    <>
      <ScrollToActionContainer text={"Scroll for more"} overlapContent>
        <HomeParallax />
      </ScrollToActionContainer>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        w={"100%"}
        bg={"white"}
      >
        <Container p={0} maxW={"container.xxl"}>
          <VStack px={8} py={8} spacing={[8, null, null, 12]}>
            {exampleData.map((d, i) => (
              <HomeRow {...d} key={i} />
            ))}
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default Index;
