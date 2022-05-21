import { FC } from "react";
import { useBuddyProjectState } from "../context/context";
import { Heading } from "@yestheory.family/ui";
import { Box, Center, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { SectionHeading } from "./common";
import Image from "next/image";
import { yesbotBuddyProjectWebp } from "../../../assets";
import { MatchedInfos, NotSignedUpInfos, SignedUpInfos } from "./states";
import { BuddyProjectStatus } from "../../../__generated__/types";

const stateToInfo: Record<BuddyProjectStatus, FC> = {
  [BuddyProjectStatus.Matched]: MatchedInfos,
  [BuddyProjectStatus.NotSignedUp]: NotSignedUpInfos,
  [BuddyProjectStatus.SignedUp]: SignedUpInfos,
};

const Header: FC = () => {
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

export const DisplayedInfos: FC = () => {
  const state = useBuddyProjectState();

  const Infos = stateToInfo[state.status ?? BuddyProjectStatus.NotSignedUp];

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
            minH={[400, null, null, null, "unset"]}
          >
            <Image
              src={yesbotBuddyProjectWebp}
              layout={"fill"}
              objectFit={"contain"}
            />
          </Box>
        </Center>
      </GridItem>
      <Infos />
    </Grid>
  );
};
