import {GraphQLJSON} from '@payloadcms/graphql/types';
import {type GeneratedTypes, type CollectionConfig, NotFound} from 'payload';
import {type PayloadUser} from '../../collections/users';
import {type QueryFactory} from '../../utils/merge-queries';

type CollectionKey = keyof GeneratedTypes['collections'];
type AccessOperation = keyof CollectionConfig['access'];

export const mimicUserOperationMutation: QueryFactory<
  unknown,
  {
    userId: string;
    collection: CollectionKey;
    operation: AccessOperation;
    data: GeneratedTypes['collections'][CollectionKey];
  }
> = (GraphQL, context) => ({
  type: GraphQLJSON,
  args: {
    userId: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString)},
    collection: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString)},
    operation: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString)},
    data: {
      type: new GraphQL.GraphQLNonNull(GraphQLJSON),
    },
  },
  resolve: async (_, {userId, collection, operation, data}, {req}) => {
    if (!req.user?.roles.includes('owner')) throw new Error('Unauthenticated');

    const resolvedCollection = context.collections[collection];
    if (!resolvedCollection) {
      throw new Error(`Collection ${String(collection)} not found`);
    }

    const payload = req.payload;

    let mimickedUser: PayloadUser;
    try {
      mimickedUser = await payload.findByID({
        collection: 'users',
        id: userId,
      });
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
