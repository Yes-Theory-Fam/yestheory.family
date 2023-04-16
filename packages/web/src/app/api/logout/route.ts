import { NextResponse } from "next/server";
import { graphqlWithHeaders } from "../../../lib/graphql";

export const POST = async (request: Request): Promise<Response> => {
  const [, headers] = await graphqlWithHeaders(request.headers, (sdk) =>
    sdk.Logout()
  );

  return NextResponse.json({}, { headers });
};
