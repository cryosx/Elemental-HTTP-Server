const http = require('http');
const request = require('supertest');
const path = require('path');
const requestHandler = require('../requestHandler');
const server = http.createServer(requestHandler);

describe('index.html', function() {
  it('should return index.html markup', function(done) {
    request(server)
      .get('/index.html')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(
        `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>The Elements</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>

<body>
  <h1>The Elements</h1>
  <h2>These are all the known elements.</h2>
  <h3>These are 2</h3>
  <ol>
    <li>
      <a href="/hydrogen.html">Hydrogen</a>
    </li>
    <li>
      <a href="/helium.html">Helium</a>
    </li>
  </ol>
</body>

</html>`,
        done
      );
  });
});
describe('hydrogen.html', function() {
  it('should return hydrogen.html markup', function(done) {
    request(server)
      .get('/hydrogen.html')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(
        `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>The Elements - Hydrogen</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>

<body>
  <h1>Hydrogen</h1>
  <h2>H</h2>
  <h3>Atomic number 1</h3>
  <p>Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen
    is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the
    universe, constituting roughly 75% of all baryonic mass. Non-remnant stars are mainly composed of hydrogen in its plasma
    state. The most common isotope of hydrogen, termed protium (name rarely used, symbol 1H), has a single proton and zero
    neutrons.</p>
  <p>
    <a href="/">back</a>
  </p>
</body>

</html>`,
        done
      );
  });
});

describe('helium.html', function() {
  it('should return helium.html markup', function(done) {
    request(server)
      .get('/helium.html')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(
        `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>The Elements - Helium</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>

<body>
  <h1>Helium</h1>
  <h2>H</h2>
  <h3>Atomic number 2</h3>
  <p>Helium is a chemical element with symbol He and atomic number 2. It is a colorless, odorless, tasteless, non-toxic, inert,
    monatomic gas that heads the noble gas group in the periodic table. Its boiling and melting points are the lowest among
    all the elements and it exists only as a gas except in extremely cold conditions.</p>
  <p>
    <a href="/">back</a>
  </p>
</body>

</html>`,
        done
      );
  });
});

describe('styles.css', function() {
  it('should return styles.css markup', function(done) {
    request(server)
      .get('/css/styles.css')
      .expect('Content-Type', /css/)
      .expect(200)
      .expect(/video/, done);
  });
});
