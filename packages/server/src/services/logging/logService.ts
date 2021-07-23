import "reflect-metadata";
import { Container } from "typedi";
import { createServerLogger } from "./log";
import { Constructable } from "typedi/types/types/constructable.type";

export function Logger(kind: string, program: string) {
  return function (
    object: Constructable<unknown>,
    propertyName: string,
    index?: number
  ): void {
    const logger = createServerLogger(kind, program);
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: () => logger,
    });
  };
}
