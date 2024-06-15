import type * as GraphQL from 'graphql';
import {type Config} from 'payload/config';
import {type PayloadRequest} from 'payload/types';

type GraphQLExtension = NonNullable<NonNullable<Config['graphQL']>['queries']>;
type GraphQLExtensionContext = Parameters<GraphQLExtension>[1];

export type QueryFactory<TResult, TResolvedArgs> = (
  graphql: typeof GraphQL,
  context: GraphQLExtensionContext,
) => {
  type?: GraphQL.GraphQLType;
  args: Record<string, unknown>;
  resolve: GraphQL.GraphQLFieldResolver<
    unknown,
    {req: PayloadRequest},
    TResolvedArgs,
    TResult | Promise<TResult>
  >;
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
export const mergeQueries =
  <TResult, TResolvedArgs>(
    queryFactories: Record<string, QueryFactory<TResult, TResolvedArgs>>,
  ): GraphQLExtension =>
  (graphql, context) => {
    const queries: {
      [key: string]: ReturnType<QueryFactory<TResult, TResolvedArgs>>;
    } = {};

    for (const [name, factory] of Object.entries(queryFactories)) {
      queries[name] = factory(graphql, context);
    }

    return queries;
  };
