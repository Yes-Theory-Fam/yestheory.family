import { AuthChecker } from "type-graphql";
import { YtfApolloContext } from "../../types";
import { Discord } from "..";

export const authChecker: AuthChecker<YtfApolloContext> = (
  { context },
  roles
) => {
  if (!context.user) {
    return false;
  }

  if (roles.length === 0) {
    return true;
  }

  const guildMember = Discord.targetGuild?.member(context.user.id);
  if (!guildMember) {
    return false;
  }

  const memberRoles = guildMember.roles.cache.map(({ name }) => name);
  return roles.every((role) => memberRoles.includes(role));
};
