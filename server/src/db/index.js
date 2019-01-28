// @flow

import { MongoClient } from 'mongodb';

let db;

export async function initDb(url: string, database: string) {
  const client = new MongoClient(url, { useNewUrlParser: true });

  await client.connect();

  db = client.db(database);
}

export function getDb() {
  if (db === undefined) {
    throw new Error('There was not a database connection');
  }
  return db;
}
