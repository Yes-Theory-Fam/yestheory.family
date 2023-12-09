import 'reflect-metadata';
import {Container} from 'typedi';
import {type Constructable} from 'typedi/types/types/constructable.type';
import {createServerLogger} from './log';

export function Logger(kind: string, program: string) {
  return function (
    object: Constructable<unknown>,
    propertyName: string | undefined,
    index?: number,
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
