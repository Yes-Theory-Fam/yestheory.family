import {type GeneratedTypes} from 'payload';
import {type Access} from 'payload/config';
import {NotFound} from 'payload/errors';
import {type CollectionConfig, type PayloadRequest} from 'payload/types';
import {type PayloadUser} from '../../collections/users';
import {toRequestUser} from '../../lib/auth-strategy';
import {type QueryFactory} from '../../utils/merge-queries';

type CollectionKey = keyof GeneratedTypes['collections'];
type AccessOperation = keyof CollectionConfig['access'];

export const mayOperateQuery: QueryFactory<
  boolean,
  {
    userId: string;
    collection: CollectionKey;
    operation: AccessOperation;
    itemId?: string;
  }
> = (GraphQL, payload) => ({
  type: GraphQL.GraphQLBoolean,
  args: {
    userId: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString)},
    collection: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString)},
    operation: {type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString)},
    itemId: {type: GraphQL.GraphQLString},
  },
  resolve: async (
    _: unknown,
    {userId, collection, operation, itemId},
    context,
  ) => {
    const resolvedCollection = payload.collections[collection];
    if (!resolvedCollection) {
      throw new Error(`Collection ${String(collection)} not found`);
    }

    const access = resolvedCollection.config.access;
    const specificAccess = access[operation] as Access | undefined;
    if (!specificAccess) {
      throw new Error(
        `Access operation ${operation} on collection ${String(
          collection,
        )} not defined`,
      );
    }

    let user: PayloadUser;
    try {
      user = await payload.findByID({collection: 'users', id: userId});
    } catch (e) {
      if (e instanceof NotFound) {
        throw new Error(`User ${userId} not found`);
      }

      throw e;
    }

    const requestUser = toRequestUser(user);
    const {req} = context;
    const fakedRequest = {...req, user: requestUser} as PayloadRequest;

    const hasAccess = specificAccess({
      req: fakedRequest,
      data: undefined,
      id: itemId,
    });

    if (typeof hasAccess === 'boolean') return hasAccess;

    throw new Error('TODO implement resolving where access responses');
  },
});
