import 'babel-polyfill';
import { GraphQLServer } from 'graphql-yoga';
import { initDb } from './db';
import resolvers from './resolvers';

initDb(
  'mongodb+srv://admin:admin@clustertest-wgpdz.mongodb.net/inventory?retryWrites=true',
  'inventory'
)
  .then(db => {
    const graphServer = new GraphQLServer({
      context: { db },
      typeDefs: './src/schema.graphql',
      resolvers
    });
    graphServer.start(() => console.log('Graph server started'));
  })
  .catch(err => {
    console.log(err);
  });
