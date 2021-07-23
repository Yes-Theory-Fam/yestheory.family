import { Service } from "typedi";
import { NonEmptyArray, Resolver as OriginalResolver } from "type-graphql";
import { createServerLogger } from "../logging/log";
import { glob } from "glob";
import path from "path";

type Class = { new (...args: never[]): unknown };
const resolvers: Class[] = [];

export const Resolver = (...args: Parameters<typeof OriginalResolver>) => {
  return <U extends Class>(target: U): U => {
    resolvers.push(target);
    Service()(target);
    OriginalResolver(...args)(target);
    return target;
  };
};

const logger = createServerLogger("services", "resolver");

const collectResolvers = (): Promise<void> =>
  new Promise((res, rej) => {
    logger.info("Collecting resolvers");

    const extension = process.env.NODE_ENV === "production" ? ".js" : ".ts";
    const baseDirectory =
      process.env.NODE_ENV === "production" ? "build" : "src";

    glob(`${baseDirectory}/features/**/*${extension}`, async (e, matches) => {
      if (e) {
        logger.error("Error loading commands: ", e);
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

// type-graphql explicitly asks for Function as type
//   eslint-disable-next-line @typescript-eslint/ban-types
export const getResolvers = async (): Promise<NonEmptyArray<Function>> => {
  await collectResolvers();

  if (resolvers.length === 0) {
    throw new Error(
      "No resolver was loaded, make sure at least one resolver is tagged with the Resolver decorator from the service directory!"
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  return (resolvers as unknown) as NonEmptyArray<Function>;
};
