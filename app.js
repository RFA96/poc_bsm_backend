'use strict';

let http = require('http');
let server = require('./lib/server');

const PORT = process.env.port || 2505;

server.set('port', PORT);
let app = http.createServer(server);

app.listen(PORT, '0.0.0.0', () => {
  console.log('Running on http://0.0.0.0:2505/');
});
