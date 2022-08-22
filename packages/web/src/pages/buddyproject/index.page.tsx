import { Box, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { ScrollToActionContainer } from "@yestheory.family/ui";
import Head from "next/head";
import Image from "next/image";
import { FC } from "react";
import { buddyProjectSvg } from "../../../assets";
import { BuddyProjectButton } from "./components/button";
import { BuddyProjectProvider } from "./components/context/context";
import { DisplayedInfos } from "./components/infos/displayed-infos";

const CTA: FC = () => {
  return (
    <ScrollToActionContainer text={"Get involved"}>
      <VStack w={["full", null, null, null, "50%"]} spacing={10} px={6}>
        <Image
          priority
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

const BuddyProject: FC = () => {
  return (
    <>
      <Head>
        <title>Buddy Project</title>

        <meta property="og:title" content="The Buddy Project" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://staging.yestheory.family/_next/static/images/buddyproject_logo-4a69d59781c08948a4253931dffddf5d.svg"
        />
        <meta
          property="og:url"
          content="https://yestheory.family/buddyproject"
        />
        <meta
          property="og:description"
          content="The Buddy Project is a recurring event led by the Yes Theory community to make new friends!"
        />
        <meta
          key="description"
          name="description"
          content="The Buddy Project is a recurring event led by the Yes Theory community to make new friends!"
        />
      </Head>
      <CTA />
      <BuddyProjectProvider>
        <Center maxW="container.xl" mx={"auto"} px={8} my={6} minH={"75vh"}>
          <Flex direction={"column"} align={"center"}>
            <DisplayedInfos />
            <Box mt={6}>
              <BuddyProjectButton />
            </Box>
          </Flex>
        </Center>
      </BuddyProjectProvider>
    </>
  );
};

export default BuddyProject;
