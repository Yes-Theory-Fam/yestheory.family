import { MeResolver } from "./queries/Me";
import { NonEmptyArray } from "type-graphql";

// eslint-disable-next-line @typescript-eslint/ban-types
export const resolvers: NonEmptyArray<Function> = [MeResolver];
export * from "./AuthenticatedUser";
