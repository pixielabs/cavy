const nodeApiServer = require('node-api-server');

nodeApiServer((nodeApiServer, startServer) => {
  // ...setup models/datastore, assign globals, etc.

  // be sure to invoke the callback or the server won't start
  startServer();
});
