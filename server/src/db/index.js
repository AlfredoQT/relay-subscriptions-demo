// @flow

import { MongoClient } from 'mongodb';

export async function initDb(url: string, database: string) {
  const client = new MongoClient(url, { useNewUrlParser: true });

  await client.connect();

  return client.db(database);
}
