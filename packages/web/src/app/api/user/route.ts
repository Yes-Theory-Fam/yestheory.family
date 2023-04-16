import { NextResponse } from "next/server";
import { getCurrentUser } from "./common";

export const GET = async (request: Request): Promise<Response> => {
  const user = await getCurrentUser(request.headers);

  return NextResponse.json(user);
};
