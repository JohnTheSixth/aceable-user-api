const { db, dbName } = require('../index');

const insert = ({ collection, document }) => db
  .then(conn => conn.db(dbName).collection(collection).insertOne(document))
  .catch(err => Promise.reject(err)); // bubble up through Promise chain to client

module.exports = insert;
