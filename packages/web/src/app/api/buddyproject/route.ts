import { NextRequest, NextResponse } from "next/server";
import { graphqlWithHeaders } from "../../../lib/graphql";

export const POST = async (req: NextRequest) => {
  const [signUp] = await graphqlWithHeaders(req.headers, (sdk) =>
    sdk.BuddyProjectSignUp()
  );

  return NextResponse.json(signUp.buddyProjectSignUp);
};
