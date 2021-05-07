import { FunctionalComponent } from "preact";
import Image from "next/image";
import NextLink from "next/link";
import { Box, Button, Center, Link, Text, VStack } from "@chakra-ui/react";
import { Heading } from "@yestheory.family/ui";
import { underConstructionWebp } from "../assets";
import { useRouter } from "next/router";

const Paragraphs: FunctionalComponent = () => {
  const router = useRouter();
  const navigateBack = () => {
    router.back();
    return false;
  };

  return (
    <VStack
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
        While you are waiting, check out our Discord server below or go{" "}
        <Link href={"#"} onClick={navigateBack} color={"brand.800"}>
          back
        </Link>
        !
      </Text>
    </VStack>
  );
};

const Wip: FunctionalComponent = () => {
  const imageSize = 400;

  return (
    <Center>
      <VStack spacing={8} w={"90%"}>
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
  );
};

export default Wip;
