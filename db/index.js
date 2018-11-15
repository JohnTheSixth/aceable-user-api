const { MongoClient } = require('mongodb');

const server = require('./server');
const { dbConfig, dbName } = require('./config');

const db = server.getInstanceData()
  .then(({ dbName, uri }) => {
    console.log(`DB Instance ${dbName} is running at ${uri}`)
    return MongoClient.connect(uri);
  })
  .catch(err => Promise.reject(err)); // bubble error up through promise chain

// Export the DB promise and configuration function
module.exports = {
  db,
  dbConfig,
  dbName,
}
