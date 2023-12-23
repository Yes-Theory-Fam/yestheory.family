import type express from 'express';
import type * as GraphQL from 'graphql';
import {type Payload, type RequestContext} from 'payload';
import {type PayloadRequest} from 'payload/types';

export type QueryFactory<TResult, TResolvedArgs> = (
  graphql: typeof GraphQL,
  payload: Payload,
) => {
  type?: GraphQL.GraphQLType;
  args: Record<string, unknown>;
  resolve: (
    before: unknown,
    args: TResolvedArgs,
    context: {req: PayloadRequest; res: express.Response},
  ) => Promise<TResult> | TResult;
};

/**
 * Creates a payload query factory from a mapping of query names to query factories.
 *
 * Usage:
 *
 * my-query.ts:
 * const myQuery: QueryFactory<any, any> = (GraphQL, payload) => ({
 *   type: new GraphQL.GraphQLObjectType({
 *     ...,
 *   }),
 *   ...,
 * })
 *
 * payload.config.ts:
 * buildConfig({
 *   ...,
 *   graphQL: {
 *     queries: mergeQueries({nameOfQuery: myQuery}),
 *   }
 * })
 */
export const mergeQueries = <TResult, TResolvedArgs>(
  queryFactories: Record<string, QueryFactory<TResult, TResolvedArgs>>,
) => {
  return (graphql: typeof GraphQL, payload: Payload) => {
    const queries: {
      [key: string]: ReturnType<QueryFactory<TResult, TResolvedArgs>>;
    } = {};

    for (const [name, factory] of Object.entries(queryFactories)) {
      queries[name] = factory(graphql, payload);
    }

    return queries;
  };
};
