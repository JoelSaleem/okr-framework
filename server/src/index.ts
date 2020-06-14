const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

// 1
const typeDefs = `
type Query {
  info: String!
}
`;

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
  },
  Mutation: {
    signup(root, args, context, info) {
      console.log(root, args, context, info);
    },
  },
};

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { prisma },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
