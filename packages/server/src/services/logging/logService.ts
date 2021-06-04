import "reflect-metadata";
import { Container } from "typedi";
import { createServerLogger } from "./log";

export function Logger(kind: string, program: string) {
  return function (
    object: { new (...args: any[]): any },
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
