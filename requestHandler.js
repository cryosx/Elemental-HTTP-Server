const fs = require('fs');
const path = require('path');

const METHODS = { GET: 'GET', PUT: 'PUT', POST: 'POST' };
const STATUSPHRASE = { OK: 'OK', NOTFOUND: 'Not Found' };

module.exports = function requestHandler(request, response) {
  const method = request.method.toUpperCase();
  const uri = request.url;
  const filePath = path.join(__dirname, 'public', uri);
  const errorPath = path.join(__dirname, 'public', '/404.html');
  switch (method) {
    case METHODS.GET:
      fs.readFile(filePath, (err, data) => {
        if (err) {
          // throw err;
          fs.readFile(errorPath, (err, data) => {
            response.writeHead(404, STATUSPHRASE.NOTFOUND, {
              'Content-Type': 'text/html'
            });
            return response.end(data);
          });
        } else {
          response.writeHead(200, STATUSPHRASE.OK, {
            'Content-Type': 'text/html'
          });
          return response.end(data);
        }
      });
      break;

    default:
      return resopnse.end();
      break;
  }
};
