const { db, dbName } = require('../index');

const findOne = ({ collection, query }) => db
  // Use findOne on this query because we will only have one document associated with an email
  .then(conn => conn.db(dbName).collection(collection).findOne(query))
  .catch(err => Promise.reject(err)); // bubble up through Promise chain to client

module.exports = findOne;
