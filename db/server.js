const mongoServer = require('mongodb-memory-server');

const MongoMemoryServer = mongoServer.MongoMemoryServer;
const memoryServerConfig = require('./config/config.json');

module.exports = new MongoMemoryServer(memoryServerConfig);
