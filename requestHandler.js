const fs = require('fs');
const path = require('path');
const METHODS = { GET: 'GET', PUT: 'PUT', POST: 'POST' };
const STATUSPHRASE = { OK: 'OK' };
const OK = 'OK';
module.exports = function requestHandler(request, response) {
  const method = request.method.toUpperCase();
  const uri = request.url;
  const filePath = path.join(__dirname, 'public', uri);
  switch (method) {
    case METHODS.GET:
      if (uri === '/foo.html') {
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          response.writeHead(200, STATUSPHRASE.OK, {
            'Content-Type': 'text/html'
          });
          return response.end(data);
        });
      } else {
        response.writeHead(200, STATUSPHRASE.OK, {
          'Content-Type': 'text/plain'
        });
        return response.end('smoke test');
      }

      break;
    default:
      return resopnse.end();
      break;
  }
};
