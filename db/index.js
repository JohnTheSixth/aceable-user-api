const { MongoClient } = require('mongodb');

const server = require('./server');
const { dbConfig, dbName } = require('./config');

const db = server.getInstanceData()
  .then(({ uri }) => MongoClient.connect(uri))
  .catch(err => Promise.reject(err)); // bubble error up through promise chain

// Export the DB promise and configuration function
module.exports = {
  db,
  dbConfig,
  dbName,
}
