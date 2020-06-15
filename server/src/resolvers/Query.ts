import { GraphQLFieldResolver } from "graphql";
import { hasClient } from "./resolverTypes";

const user: GraphQLFieldResolver<void, hasClient> = (
  parent,
  args,
  context,
  info
) => {
  // console.log(context.client.);
  return {};
};

module.exports = {
  user,
};
