import { FunctionalComponent } from "preact";
import { ScrollToActionContainer, Heading } from "@yestheory.family/ui";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { buddyProjectSvg, yesbotBuddyProjectWebp } from "../assets";
import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BuddyProjectProvider } from "../components/buddyproject/context/context";
import { BuddyProjectButton } from "../components/buddyproject/button";

const CTA: FunctionalComponent = () => {
  return (
    <ScrollToActionContainer text={"Get involved"}>
      <VStack w={["full", null, null, null, "50%"]} spacing={10} px={6}>
        <Image
          src={buddyProjectSvg}
          alt={"Buddy Project Logo"}
          height={320}
          width={700}
        />
        <Text
          fontSize={"2xl"}
          align={"center"}
          maxW={["full", null, null, null, "60%"]}
        >
          Great things come to those who are willing to risk rejection and put
          themselves out there.
        </Text>
      </VStack>
    </ScrollToActionContainer>
  );
};

const SectionHeading: FunctionalComponent<{ text: string }> = ({ text }) => (
  <Text color={"gray.800"} fontSize={"2xl"} fontWeight={"bold"}>
    {text}
  </Text>
);

const Header: FunctionalComponent = () => {
  return (
    <Flex direction={"column"}>
      <Heading
        frontText={"Find a stranger\n"}
        blueText={"Discover a friend"}
        textAlign={"left"}
        textTransform={"none"}
        center={false}
        maxFontSize={96}
      />
      <SectionHeading text={"Hi!"} />
      <Text>
        An opportunity to get to know a person miles away from you, building a
        new friendship, and discovering a new way of living, what’s not to like?
      </Text>
    </Flex>
  );
};

const Step: FunctionalComponent<{ heading: string }> = ({
  heading,
  children,
}) => (
  <GridItem>
    <VStack align={"flex-start"}>
      <SectionHeading text={heading} />
      {children}
    </VStack>
  </GridItem>
);

const Info: FunctionalComponent = () => {
  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", null, null, null, "repeat(3, 1fr)"]}
      gap={8}
    >
      <GridItem colSpan={[null, null, null, null, 2]} alignSelf={"center"}>
        <Header />
      </GridItem>
      <GridItem>
        <Center h={"full"}>
          <Box
            position={"relative"}
            maxW={700}
            h={"full"}
            w={"full"}
            minH={[400, null, null, null, undefined]}
          >
            <Image
              src={yesbotBuddyProjectWebp}
              layout={"fill"}
              objectFit={"contain"}
            />
          </Box>
        </Center>
      </GridItem>
      <Step heading={"How do I join?"}>
        <Text color={"brand.800"} fontWeight={"bold"}>
          Click the button down below!
        </Text>
        <Text>
          Once you do that, you will be asked to join the{" "}
          <Text as={"span"} fontWeight={"bold"}>
            Yes Theory Fam
          </Text>{" "}
          server (if you're not already in it). From then on, everything will be
          happening on{" "}
          <Link href={"https://discord.gg/yestheory"}>Discord</Link>.
        </Text>
      </Step>
      <Step heading={"What happens next?"}>
        <Text>
          As soon as the sign-up deadline is reached, everyone will be matched
          with a buddy.
        </Text>
        <Text>
          <Text as={"span"} fontWeight={"bold"}>
            Yes Bot
          </Text>
          , our very own bot, will message you on discord with the name of your
          partner, a set of questions and further instructions. One of you will
          start messaging the other.
        </Text>
      </Step>
      <Step heading={"How will it work?"}>
        <Text>
          Both of you will be given your own set of questions, with each of you
          taking turns asking and both answering them until all the questions
          are cleared.
        </Text>
      </Step>
    </Grid>
  );
};

const BuddyProject: FunctionalComponent = () => {
  return (
    <>
      <Head>
        <title>Buddy Project</title>
      </Head>
      <CTA />
      <BuddyProjectProvider>
        <Container maxW="container.xl" mx={"auto"} px={4} my={6}>
          <Flex direction={"column"} align={"center"}>
            <Info />
            <Box mt={6}>
              <BuddyProjectButton />
            </Box>
          </Flex>
        </Container>
      </BuddyProjectProvider>
    </>
  );
};

export default BuddyProject;
