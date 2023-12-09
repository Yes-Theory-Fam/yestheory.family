import path from 'path';
import {glob} from 'glob';
import {type NonEmptyArray, Resolver as OriginalResolver} from 'type-graphql';
import {Service} from 'typedi';
import {createServerLogger} from '../logging/log';

type Class = {new (...args: never[]): unknown};
type OriginalResolverArgument = Parameters<typeof OriginalResolver>[0];

export const enum ResolverTarget {
  YESBOT = 'YESBOT',
  PUBLIC = 'PUBLIC',
}

const resolvers: Record<ResolverTarget, Class[]> = {
  [ResolverTarget.YESBOT]: [],
  [ResolverTarget.PUBLIC]: [],
};

const logger = createServerLogger('services', 'resolver');

export const Resolver = (
  resolverTarget: ResolverTarget | ResolverTarget[],
  args?: OriginalResolverArgument,
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

    if (args) OriginalResolver(args)(target);
    else OriginalResolver()(target);

    return target;
  };
};

const collectResolvers = async (): Promise<void> => {
  logger.info('Collecting resolvers');

  const extension = process.env.NODE_ENV === 'production' ? '.js' : '.ts';
  const baseDirectory = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

  let matches: string[];

  try {
    matches = await glob(`${baseDirectory}/features/**/*${extension}`);
  } catch (e) {
    logger.error('Error loading resolvers: ', e);
    throw e;
  }

  const importPromises = matches.map((p) => {
    const split = p.split('.');
    split.unshift();
    const modulePath = path.join(process.cwd(), split.join('.'));

    return import(modulePath);
  });

  try {
    await Promise.all(importPromises);
  } catch (e) {
    logger.error('Error loading resolvers: ', e);
    throw e;
  }

  logger.debug('Loading complete!');
};

export const getResolvers = async (
  target: ResolverTarget,
): Promise<NonEmptyArray<Class>> => {
  const resolversForTarget = resolvers[target];

  if (resolversForTarget.length === 0) {
    await collectResolvers();
  }

  if (resolversForTarget.length === 0) {
    throw new Error(
      'No resolver was loaded, make sure at least one resolver is tagged with the Resolver decorator from the service directory!',
    );
  }

  return resolversForTarget as NonEmptyArray<Class>;
};
