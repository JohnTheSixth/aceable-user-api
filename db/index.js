const MongoMemoryServer = require('./server');
const { MongoClient, ObjectId } = require('./client');
const { dbConfig, dbName } = require('./config');

const db = MongoMemoryServer.getInstanceData()
  .then(({ uri }) => MongoClient.connect(uri))
  .catch(err => { throw err }); // bubble error up through promise chain

// Export the DB promise and configuration function
module.exports = {
  db,
  dbConfig,
  dbName,
  ObjectId,
}
