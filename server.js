const http = require('http');
const requestHandler = require('./requestHandler');

const port = process.env.PORT || 3000;

const server = http.createServer(requestHandler);
server.listen(port, () => {
  process.stdout.write(`Server listening on port: ${port}\n`);
});
