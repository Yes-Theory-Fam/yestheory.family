import { resolvers as userResolvers } from "./user";
import { NonEmptyArray } from "type-graphql";

// eslint-disable-next-line @typescript-eslint/ban-types
export const resolvers: NonEmptyArray<Function> = [...userResolvers];

export * from "./user";
export * as Discord from "./discord";
export { default as authenticationRouter } from "./auth";