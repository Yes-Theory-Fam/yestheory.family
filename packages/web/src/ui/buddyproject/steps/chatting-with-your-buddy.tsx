import { FC } from "react";
import { Step } from "../common";

export type ChattingWithYourBuddyProps = {
  isMatched?: boolean;
};

export const ChattingWithYourBuddyStep: FC<ChattingWithYourBuddyProps> = ({
  isMatched = false,
}) => {
  const heading = `How ${isMatched ? "does" : "will"} it work?`;

  return (
    <Step heading={heading}>
      <p>
        Both of you will be given your own set of questions, with each of you
        taking turns asking and both answering them until all the questions are
        cleared.
      </p>
      <p>
        You are of course free to communicate and go through the questions by
        texting, but experience has shown us that voice or video calls feel much
        more rewarding than chat!
      </p>
    </Step>
  );
};
