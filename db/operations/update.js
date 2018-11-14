const { db, dbName } = require('../index');

const update = ({ collection, query, updates }) => db
  .then(conn => conn.db(dbName).collection(collection).update(query, updates))
  .catch(err => Promise.reject(err)); // bubble up through Promise chain to client

module.exports = update;
