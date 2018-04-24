const fs = require('fs');
const path = require('path');

const { GET, PUT, POST } = require('./request_methods');
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('./status_phrases');

module.exports = function requestHandler(request, response) {
  const method = request.method.toUpperCase();
  const uri = request.url === '/' ? '/index.html' : request.url;
  const filePath = path.join(__dirname, 'public', uri);
  const errorPath = path.join(__dirname, 'public', '/404.html');

  let uriSplit = uri.split('?');

  const fileType = uriSplit[0].lastIndexOf('.')
    ? uri.slice(uri.lastIndexOf('.') + 1)
    : 'html';

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
              'Content-Type': `text/html`
            });
            return response.end(data);
          });
        } else {
          response.writeHead(200, OK, {
            'Content-Type': `text/${fileType}`
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
