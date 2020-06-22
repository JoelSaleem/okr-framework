import { Console } from "console";

const { GraphQLServer } = require("graphql-yoga");
const jwt = require('jsonwebtoken')
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const {APP_SECRET} = require('./utils')

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
  },
  context: ({request}: any) => {
    const authorization = request?.headers?.authorization ?? ''
    const token = authorization.split(' ')[1]
    const {userId} = jwt.verify(token, APP_SECRET)

    return {
      ...request,
      user: userId,
      prisma,
    };
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
