const { db, dbName } = require('../index');

const find = ({ collection, query }) => db.then(conn => {
  console.log('COLLECTION:', collection)
  console.log('QUERY:', query)
  // Use findOne on this query because we will only have one document associated with email
  return conn.db(dbName).collection(collection).findOne(query);
});

module.exports = find;
