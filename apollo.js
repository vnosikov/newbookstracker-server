const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { addMocksToSchema } = require('@graphql-tools/mock');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const mongoose = require('mongoose');
require('./models/Author');
require('./models/Book');
require('dotenv').config(); 


const typeDefs = require('./schema');
const resolvers = require('./resolvers');
// const mocks = require('./mocks');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // schema: addMocksToSchema({
  //   schema: makeExecutableSchema({ typeDefs, /* resolvers */}),
  //   mocks,
  // }),
});

const connectionString = `mongodb+srv://adminprod:${process.env.MONGODB_KEY}@prodcluster.pc2bg.mongodb.net/newdb?retryWrites=true&w=majority`;
mongoose.connect(connectionString).then(() => {
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
});
