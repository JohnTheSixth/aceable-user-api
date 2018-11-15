/*
  This file is solely for the purpose of spinning up a Mongo memory server instance. The
  mongo-memory-server package uses the latest Mongo binaries, and in some cases these can
  take time to download. This script exists so the user can download the binaries before
  spinning up the API application.

  Running `npm run db-start` from the command line will call this script.
*/

const server = require('../db/server');

console.log('Starting DB server, please wait...')

server.getInstanceData()
  .then(({ dbName, uri }) => {
    console.log(`DB Instance ${dbName} is running at ${uri}`);
    console.log('Press Ctrl + C to exit.');
  })
  .catch(err => console.log(err));
