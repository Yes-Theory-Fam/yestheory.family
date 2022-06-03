import { Service } from "typedi";
import {
  ClassType,
  NonEmptyArray,
  Resolver as OriginalResolver,
} from "type-graphql";
import { createServerLogger } from "../logging/log";
import { glob } from "glob";
import path from "path";
import {
  AbstractClassOptions,
  ClassTypeResolver,
} from "type-graphql/dist/decorators/types";

type Class = { new (...args: never[]): unknown };
const resolvers: Class[] = [];

type ResolverParameters =
  | []
  | [AbstractClassOptions]
  | [ClassTypeResolver, AbstractClassOptions?]
  | [ClassType, AbstractClassOptions?];

const logger = createServerLogger("services", "resolver");

export const Resolver = (...args: ResolverParameters) => {
  return <U extends Class>(target: U): U => {
    logger.debug(`Adding resolver '${target.name}'`);
    resolvers.push(target);
    Service()(target);
    // @ts-expect-error - For some reason the union type isn't an array of length 0-2 but 0+ which isn't correct, so we
    //   have to ignore this.
    OriginalResolver(...args)(target);
    return target;
  };
};

const collectResolvers = (): Promise<void> =>
  new Promise((res, rej) => {
    logger.info("Collecting resolvers");

    const extension = process.env.NODE_ENV === "production" ? ".js" : ".ts";
    const baseDirectory =
      process.env.NODE_ENV === "production" ? "dist" : "src";

    glob(`${baseDirectory}/features/**/*${extension}`, async (e, matches) => {
      if (e) {
        logger.error("Error loading resolvers: ", e);
        rej(e);
        return;
      }

      const importPromises = matches.map((p) => {
        const split = p.split(".");
        split.unshift();
        const modulePath = path.join(process.cwd(), split.join("."));

        return import(modulePath);
      });

      try {
        await Promise.all(importPromises);
      } catch (e) {
        logger.error("Error loading resolvers: ", e);
        rej(e);
        return;
      }
      logger.debug("Loading complete!");
      res();
    });
  });

export const getResolvers = async (): Promise<NonEmptyArray<Class>> => {
  await collectResolvers();

  if (resolvers.length === 0) {
    throw new Error(
      "No resolver was loaded, make sure at least one resolver is tagged with the Resolver decorator from the service directory!"
    );
  }

  return resolvers as NonEmptyArray<Class>;
};
