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
