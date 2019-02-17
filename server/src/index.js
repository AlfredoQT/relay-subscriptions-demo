import 'babel-polyfill';
import { GraphQLServer } from 'graphql-yoga';
import { initDb } from './db';
import resolvers from './resolvers';
import dotenv from 'dotenv';

dotenv.config();

initDb(
  process.env === 'production'
    ? 'mongodb://localhost:27017'
    : 'mongodb+srv://admin:admin@clustertest-wgpdz.mongodb.net/inventory?retryWrites=true',
  'inventory'
)
  .then(db => {
    const graphServer = new GraphQLServer({
      context: { db },
      typeDefs: './src/schema.graphql',
      resolvers
    });
    graphServer.start(() => console.log('Graph server running on port 4000'));
  })
  .catch(err => {
    console.log(err);
  });
