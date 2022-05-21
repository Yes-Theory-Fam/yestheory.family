import { FC } from "react";
import { Step } from "../../common";
import { Text } from "@chakra-ui/react";
import { useBuddyProjectState } from "../../../context/context";
import { BuddyProjectStatus } from "../../../../../__generated__/types";

export const ChattingWithYourBuddyStep: FC = () => {
  const state = useBuddyProjectState();

  const heading = `How ${
    state.status === BuddyProjectStatus.Matched ? "does" : "will"
  } it work?`;

  return (
    <Step heading={heading}>
      <Text>
        Both of you will be given your own set of questions, with each of you
        taking turns asking and both answering them until all the questions are
        cleared.
      </Text>
      <Text>
        You are of course free to communicate and go through the questions by
        texting, but experience has shown us that voice or video calls feel much
        more rewarding than that!
      </Text>
    </Step>
  );
};
