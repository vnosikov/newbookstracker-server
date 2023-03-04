const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { addMocksToSchema } = require('@graphql-tools/mock');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const jwt = require('jsonwebtoken');
const util = require('util');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

require('dotenv').config(); 
require('./models/Author');
require('./models/Book');
require('./models/User');

const User = mongoose.model('User');


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


const context = async ({ req }) => {
  const token = req.headers.authorization || '';
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const user = await User.findById(userId);
    return { user }
  } catch (err) {
    return { user: null };
  }
}

const connectionString = `mongodb+srv://adminprod:${process.env.MONGODB_KEY}@prodcluster.pc2bg.mongodb.net/newdb?retryWrites=true&w=majority`;
mongoose.connect(connectionString).then(() => {
  startStandaloneServer(server,
    {
      context,
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
