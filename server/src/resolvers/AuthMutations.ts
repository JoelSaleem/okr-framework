import { GraphQLFieldResolver } from "graphql";
import { hasClient } from "./resolverTypes";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId, APP_SECRET } = require("../utils");

const signup: GraphQLFieldResolver<void, hasClient> = async (
  parent,
  args,
  context,
  info
) => {
  // 1
  const hashedPassword = await bcrypt.hash(args.password, 10);
  // 2
  const { password, ...user } = await context.prisma.createUser({
    ...args,
    password: hashedPassword,
  });

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 4
  return {
    token,
    user,
  };
};

const login: GraphQLFieldResolver<void, hasClient> = async (
  parent,
  args,
  context,
  info
) => {
  // 1
  const { password, ...user } = await context.prisma.user({
    username: args.username,
  });
  if (!user) {
    throw new Error("No such user found");
  }

  // 2
  const valid = await bcrypt.compare(args.password, password);
  if (!valid) {
    throw new Error("Username or password incorrect");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3
  return {
    token,
    user,
  };
};

export const AuthMutations = {
  signup,
  login,
};
