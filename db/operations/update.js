const { db, dbName } = require('../index');

const update = ({ collection, query, updates }) => db.then(conn => {
  return conn.db(dbName).collection(collection).update(query, updates);
});

module.exports = update;
