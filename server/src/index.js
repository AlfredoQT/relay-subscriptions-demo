import 'babel-polyfill';
import { GraphQLServer } from 'graphql-yoga';
import { initDb, getDb } from './db';
import resolvers from './resolvers';

initDb(
  'mongodb+srv://admin:admin@clustertest-wgpdz.mongodb.net/carseg?retryWrites=true',
  'carseg'
)
  .then(async () => {
    const graphServer = new GraphQLServer({
      context: { db: getDb() },
      typeDefs: './src/schema.graphql',
      resolvers
    });
    graphServer.start(() => console.log('Graph server started'));
  })
  .catch(err => {
    console.log(err);
  });
