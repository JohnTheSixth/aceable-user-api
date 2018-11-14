const { db, dbName } = require('../index');

const insert = ({ collection, document }) => db.then(conn => {
  console.log('INSERT RECORD');
  return conn.db(dbName).collection(collection).insertOne(document);
});

module.exports = insert;
