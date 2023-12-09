import {type Guild} from 'discord.js';
import {type AuthChecker, type ResolverData} from 'type-graphql';
import {type YtfApolloContext} from '../../types';

export const authChecker =
  (guild: Guild): AuthChecker<YtfApolloContext> =>
  (context, roles) =>
    checkRolePermissions(context, roles, guild);

const checkRolePermissions = (
  {context}: ResolverData<YtfApolloContext>,
  roles: string[],
  guild: Guild,
) => {
  if (!context.user) {
    return false;
  }

  if (roles.length === 0) {
    return true;
  }

  const guildMember = guild.members.resolve(context.user.id);

  if (!guildMember) {
    return false;
  }

  const memberRoles = guildMember.roles.cache.map(({name}) => name);
  return roles.every((role) => memberRoles.includes(role));
};
