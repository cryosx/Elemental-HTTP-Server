const fs = require('fs');
const path = require('path');

const { GET, HEAD, PUT, POST } = require('./request_methods');
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('./status_phrases');

module.exports = function requestHandler(request, response) {
  const method = request.method.toUpperCase();
  const uriString = request.url === '/' ? '/index.html' : request.url;

  let uriSplit = uriString.split('?');
  const uri = uriSplit[0];
  const queryString = uriSplit[1] ? uriSplit[1] : '';
  const fileType = uri.lastIndexOf('.')
    ? uri.slice(uri.lastIndexOf('.') + 1)
    : 'plain';

  const filePath = path.join(__dirname, 'public', uri);
  const errorPath = path.join(__dirname, 'public', '/404.html');

  switch (method) {
    case GET:
      fs.readFile(filePath, (err, data) => {
        if (err) {
          fs.readFile(errorPath, (err, data) => {
            if (err) {
              response.writeHead(500, INTERNAL_SERVER_ERROR);
              return response.end();
            }
            response.writeHead(404, NOT_FOUND, {
              'Content-Type': `text/html`,
              'Content-Length': Buffer.byteLength(data)
            });
            return response.end(data);
          });
        } else {
          response.writeHead(200, OK, {
            'Content-Type': `text/${fileType}`,
            'Content-Length': Buffer.byteLength(data)
          });
          return response.end(data);
        }
      });
      break;
    case POST:
      break;
    default:
      return response.end();
      break;
  }
};
