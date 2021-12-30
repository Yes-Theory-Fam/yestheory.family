import { DirectiveLocation, GraphQLDirective, GraphQLString } from "graphql";

export const ExportDirective = new GraphQLDirective({
  name: "export",
  args: {
    exportName: {
      type: GraphQLString,
    },
  },
  locations: [DirectiveLocation.FIELD],
});

export const WithDiscordDirective = new GraphQLDirective({
  name: "withDiscord",
  locations: [DirectiveLocation.QUERY, DirectiveLocation.MUTATION],
});
