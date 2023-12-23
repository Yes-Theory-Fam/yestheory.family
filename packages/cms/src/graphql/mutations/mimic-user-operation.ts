import GraphQLTypeJson from 'graphql-type-json';
import type {GeneratedTypes} from 'payload';
import {NotFound} from 'payload/errors';
import type {CollectionConfig} from 'payload/types';
import {type PayloadUser, type SessionUser} from '../../collections/users';
import {type QueryFactory} from '../../utils/merge-queries';

type CollectionKey = keyof GeneratedTypes['collections'];
type AccessOperation = keyof CollectionConfig['access'];

export const mimicUserOperationMutation: QueryFactory<
  unknown,
  {
    userId: string;
    collection: CollectionKey;
    operation: AccessOperation;
    data: unknown;
  }
> = (GraphQL, payload) => ({
  type: GraphQLTypeJson,
  args: {
    userId: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString)},
    collection: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString)},
    operation: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString)},
    data: {
      type: new GraphQL.GraphQLNonNull(GraphQLTypeJson),
    },
  },
  resolve: async (_, {userId, collection, operation, data}, context) => {
    const {req} = context;
    const user = req.user as SessionUser;
    const roles = '_strategy' in user ? user.roles : user.user.roles;

    if (!roles.includes('owner')) throw new Error('Unauthenticated');

    const resolvedCollection = payload.collections[collection];
    if (!resolvedCollection) {
      throw new Error(`Collection ${String(collection)} not found`);
    }

    let mimickedUser: PayloadUser;
    try {
      mimickedUser = await payload.findByID({collection: 'users', id: userId});
    } catch (e) {
      if (e instanceof NotFound) {
        throw new Error(`User ${userId} not found`);
      }

      throw e;
    }

    switch (operation) {
      case 'create':
        return (
          await payload.create({
            collection,
            user: mimickedUser,
            data,
          })
        ).id;
      case 'delete':
        await payload.delete({
          collection,
          user: mimickedUser,
          id: (data as {id: string | number}).id,
        });
        break;
      default:
        throw new Error(`Not implemented: Mimic for operation ${operation}`);
    }

    return true;
  },
});
