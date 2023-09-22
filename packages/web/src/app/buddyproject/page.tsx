import { Metadata } from "next";
import { Image } from "ui";
import { ScrollToActionContainer } from "ui/client";
import { InfoGrid } from "ui/buddyproject";
import { buddyProjectSvg, yesbotBuddyProjectWebp } from "../../../assets";
import { BuddyProjectButton } from "./components/buddy-project-button";
import { getUrqlClient } from "../../lib/urql/get-client";
import {
  BuddyProjectStateDocument,
  BuddyProjectStateQuery,
  BuddyProjectStateQueryVariables,
  ServerStateDocument,
  ServerStateQuery,
  ServerStateQueryVariables,
} from "./buddyproject.server.generated";

const title = "The Buddy Project";
const description =
  "The Buddy Project is a recurring event led by the Yes Theory community to make new friends!";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    type: "website",
    images: [process.env.FRONTEND_URL + yesbotBuddyProjectWebp.src],
    url: "https://yestheory.family/buddyproject",
    description,
  },
};

const CTA = () => {
  return (
    <ScrollToActionContainer text="Get involved">
      <div className="mx-auto w-full lg:w-1/2 gap-2.5 px-6">
        <Image
          priority
          src={buddyProjectSvg}
          alt={"Buddy Project Logo"}
          className="mx-auto"
          height={320}
          width={700}
        />
        <p className="text-2xl text-center max-w-full md:max-w-[60%] mx-auto">
          Great things come to those who are willing to risk rejection and put
          themselves out there.
        </p>
      </div>
    </ScrollToActionContainer>
  );
};

const Page = async () => {
  const client = getUrqlClient();
  const x = await client.query<ServerStateQuery, ServerStateQueryVariables>(
    ServerStateDocument,
    {}
  );

  const currentUser = x.data?.me;
  const isLoggedIn = !!currentUser;
  const isOnServer = currentUser?.isOnServer ?? false;

  const emptyState = { status: "NOT_SIGNED_UP", buddy: null } as const;

  const state = isLoggedIn
    ? (
        await client.query<
          BuddyProjectStateQuery,
          BuddyProjectStateQueryVariables
        >(BuddyProjectStateDocument, {})
      ).data?.getBuddyProjectStatus ?? emptyState
    : emptyState;
  const { status, buddy } = state;

  return (
    <>
      <CTA />
      <div className="mx-auto my-6 min-h-[75vh] flex flex-col justify-center items-center gap-8">
        <InfoGrid state={status} buddyName={buddy?.username ?? "Unmatched"} />
        <BuddyProjectButton
          state={status}
          isLoggedIn={isLoggedIn}
          isOnServer={isOnServer}
        />
      </div>
    </>
  );
};

export default Page;
