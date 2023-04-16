import { FC } from "react";
import { underConstructionWebp } from "../../../../assets";
import { BackLink } from "../back-link";
import { Image, Button, Heading, Link } from "ui";

export const Wip: FC = () => {
  return (
    <div className="flex justify-center items-center mt-16 md:mt-24">
      <div className="flex flex-col gap-12 w-10/12">
        <div className="max-w-md p-6 mx-auto">
          <Image
            src={underConstructionWebp}
            alt={"YesBot building a sandcastle :)"}
            priority
          />
        </div>
        <Heading frontText={"Work in progress"} />
        <div className="flex flex-col max-w-6xl gap-8 text-left md:text-center items-start md:items-center">
          <p>Hey! We are happy to have you around :)</p>
          <p>
            Please note that this page is under heavy construction so new
            features will pop up soon when everything is set up!
          </p>
          <p>
            We are looking forward to having you back when our photowall,
            meetups and groupchats launch.
          </p>
          <p>
            That being said: We couldn&apos;t find the page you were looking
            for. This might be because you mistyped a link, something is broken
            or because the page isn&apos;t completed yet. While you are waiting,
            check out our Discord server below or go <BackLink />!
          </p>
        </div>
        <Link
          hideUnderline
          href={"https://discord.gg/yestheory"}
          className="flex justify-center"
        >
          <Button variant={"solid"}>Join Now</Button>
        </Link>
      </div>
    </div>
  );
};
