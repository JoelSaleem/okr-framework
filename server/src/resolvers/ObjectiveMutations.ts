import { GraphQLFieldResolver } from "graphql";
import { hasClient } from "./resolverTypes";
import { Prisma } from "../generated/prisma-client";

const createObjective: GraphQLFieldResolver<void, hasClient> = async (
  parent,
  args,
  context,
  info
) => {

  return true;
};

export { createObjective };
