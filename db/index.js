const MongoMemoryServer = require('./server');
const MongoClient = require('./client');
const dbConfig = require('./config');

const db = MongoMemoryServer.getInstanceData()
  .then(({ uri }) => MongoClient.connect(uri))
  .catch(err => { throw err }); // bubble error up through promise chain

// Export the DB promise and configuration function
module.exports = {
  db: db,
  dbConfig: dbConfig
}
