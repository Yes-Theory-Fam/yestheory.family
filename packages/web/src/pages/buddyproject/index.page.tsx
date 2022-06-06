import { FC } from "react";
import { ScrollToActionContainer } from "@yestheory.family/ui";
import Head from "next/head";
import Image from "next/image";
import { buddyProjectSvg } from "../../../assets";
import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";
import { BuddyProjectProvider } from "./components/context/context";
import { BuddyProjectButton } from "./components/button";
import { DisplayedInfos } from "./components/infos/displayed-infos";

const CTA: FC = () => {
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

const BuddyProject: FC = () => {
  return (
    <>
      <Head>
        <title>Buddy Project</title>
      </Head>
      <CTA />
      <BuddyProjectProvider>
        <Container maxW="container.xl" mx={"auto"} px={4} my={6}>
          <Flex direction={"column"} align={"center"}>
            <DisplayedInfos />
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
