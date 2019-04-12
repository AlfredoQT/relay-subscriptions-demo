// @flow

const MongoClient = require('mongodb').MongoClient;
const Db = require('mongodb').Db;

class Database extends Db {}

class DatabaseConnector {
  static instance: DatabaseConnector = null;
  database: Database = null;

  static getInstance(): DatabaseConnector {
    if (DatabaseConnector.instance !== null) {
      return DatabaseConnector.instance;
    }
    DatabaseConnector.instance = new DatabaseConnector();
    return DatabaseConnector.instance;
  }

  getDatabase(): Database {
    return this.database;
  }

  async init(): Promise<void> {
    const client = new MongoClient(process.env.DATABASE_URL, {
      useNewUrlParser: true
    });

    await client.connect();

    DatabaseConnector.instance.database = client.db(process.env.DATABASE_NAME);
  }
}

module.exports = DatabaseConnector;
