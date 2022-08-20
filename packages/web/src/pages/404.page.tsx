import { FC } from "react";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import { Box, Button, Center, Link, Text, VStack } from "@chakra-ui/react";
import { Heading } from "@yestheory.family/ui";
import { underConstructionWebp } from "../../assets";
import { useRouter } from "next/router";

const Paragraphs: FC = () => {
  const router = useRouter();
  const navigateBack = () => {
    router.back();
    return false;
  };

  return (
    <VStack
      maxW={"6xl"}
      spacing={8}
      textAlign={["left", null, "center"]}
      align={["flex-start", null, "center"]}
    >
      <Text>Hey! We are happy to have you around :)</Text>
      <Text>
        Please note that this page is under heavy construction so new features
        will pop up soon when everything is set up!
      </Text>
      <Text>
        We are looking forward to having you back when our photowall, meetups
        and groupchats launch.
      </Text>
      <Text>
        That being said: We couldn&apos;t find the page you were looking for.
        This might be because you mistyped a link, something is broken or
        because the page isn&apos;t completed yet. While you are waiting, check
        out our Discord server below or go{" "}
        <Link href={"#"} onClick={navigateBack} color={"brand.800"}>
          back
        </Link>
        !
      </Text>
    </VStack>
  );
};

const Wip: FC = () => {
  const imageSize = 400;

  return (
    <>
      <Head>
        <title>Work In Progress!</title>
      </Head>
      <Center mt={[16, null, 24]}>
        <VStack spacing={12} w={"90%"}>
          <Box>
            <Image
              src={underConstructionWebp}
              alt={"YesBot building a sandcastle :)"}
              width={imageSize}
              height={imageSize}
            />
          </Box>
          <Heading frontText={"Under construction"} />
          <Paragraphs />
          <NextLink href={"https://discord.gg/yestheory"}>
            <Button variant={"solid"}>Join Now</Button>
          </NextLink>
        </VStack>
      </Center>
    </>
  );
};

export default Wip;
