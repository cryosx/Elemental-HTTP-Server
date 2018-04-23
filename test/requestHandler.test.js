const http = require('http');
const request = require('supertest');
const path = require('path');
const requestHandler = require('../requestHandler');
const server = http.createServer(requestHandler);

describe('Smoke test', function() {
  it(`should respond with 'smoke test'`, function(done) {
    request(server)
      .get('/')
      .expect('Content-Type', /plain/)
      .expect(200)
      .expect('smoke test', done);
  });
});

describe('Foo.html', function() {
  it('should return foo.html markup', function(done) {
    request(server)
      .get('/foo.html')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(
        `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Foo</title>
</head>

<body>
  <h1>Foo</h1>
</body>

</html>`,
        done
      );
  });
});
