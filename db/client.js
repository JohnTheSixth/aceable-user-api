/*
  Currently there's nothing to the client logic; however, putting the client in its own script
  allows us to extend the client logic in the future (or change the client completely).
*/

const { MongoClient, ObjectId } = require('mongodb');

module.exports = {
  MongoClient,
  ObjectId,
}
