import { Service } from "typedi";
import {
  ClassType,
  NonEmptyArray,
  Resolver as OriginalResolver,
} from "type-graphql";
import { createServerLogger } from "../logging/log";
import { glob } from "glob";
import path from "path";
import { ClassTypeResolver } from "type-graphql/build/typings/decorators/types";

type Class = { new (...args: never[]): unknown };

export const enum ResolverTarget {
  YESBOT = "YESBOT",
  PUBLIC = "PUBLIC",
}

const resolvers: Record<ResolverTarget, Class[]> = {
  [ResolverTarget.YESBOT]: [],
  [ResolverTarget.PUBLIC]: [],
};

const logger = createServerLogger("services", "resolver");

export const Resolver = (
  resolverTarget: ResolverTarget | ResolverTarget[],
  args?: ClassTypeResolver | ClassType | undefined
) => {
  const resolverTargets = Array.isArray(resolverTarget)
    ? resolverTarget
    : [resolverTarget];

  return <U extends Class>(target: U): U => {
    logger.debug(`Adding resolver '${target.name}'`);

    for (const singleResolverTarget of resolverTargets) {
      resolvers[singleResolverTarget].push(target);
    }

    Service()(target);

    // @ts-expect-error lol
    if (args) OriginalResolver(args)(target);
    else OriginalResolver()(target);

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

export const getResolvers = async (
  target: ResolverTarget
): Promise<NonEmptyArray<Class>> => {
  const resolversForTarget = resolvers[target];

  if (resolversForTarget.length === 0) {
    await collectResolvers();
  }

  if (resolversForTarget.length === 0) {
    throw new Error(
      "No resolver was loaded, make sure at least one resolver is tagged with the Resolver decorator from the service directory!"
    );
  }

  return resolversForTarget as NonEmptyArray<Class>;
};
