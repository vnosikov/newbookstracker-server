const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { addMocksToSchema } = require('@graphql-tools/mock');
const { makeExecutableSchema } = require('@graphql-tools/schema');


const typeDefs = require('./schema');
const mocks = require('./mocks');

const server = new ApolloServer({
  typeDefs,
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, /* resolvers */}),
    mocks,
  }),
});

startStandaloneServer(server,
  {
    listen: { port: 4000 },
  },
).then(() => {
  console.log(`
🚀  Server is running!
🔉  Listening on port 4000
📭  Query at http://localhost:4000
  `);
});
