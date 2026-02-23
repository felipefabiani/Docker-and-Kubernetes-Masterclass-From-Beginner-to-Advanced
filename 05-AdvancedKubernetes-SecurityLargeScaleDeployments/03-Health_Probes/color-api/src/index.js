const { fail } = require('assert');
const express = require('express');
const os = require('os');
const app = express();
const port = 80;

const color = 'blue';
const hostname = os.hostname();
const version = '1.0.1';

const delay_startup = process.env.DELAY_STARTUP === 'true';
const fail_liveness = process.env.FAIL_LIVENESS === 'true';
const fail_readiness = process.env.FAIL_READINESS === 'true' ? Math.random() < 0.5 : false;

console.log(`Delay startup: ${delay_startup}`);
console.log(`Fail liveness: ${fail_liveness}`);
console.log(`Fail readiness: ${fail_readiness}`);


console.log(`Color API version ${version} running on host: ${hostname}`);

app.get('/', (req, res) => {
  res.send(`<h1 style="color:${color};">Hello World! This is the Color API.</h1>
    <h2>Hostname: ${hostname}</h2>
    <h3>Color: ${color}</h3>
  `);
});

app.get('/api', (req, res) => {
  const { format } = req.query;

  if (format === 'json') {
    return res.json({ 
      color,
      hostname,
      version
    });
  }
  
  return res.send(`Color: ${color}, Hostname: ${hostname}, Version: ${version}`);
});

app.get('/up', (req, res) => {
  return res.send('Ok');
});

app.get('/ready', (req, res) => {
  if ( fail_readiness ) {
    console.log('Readiness probe failed');
    return res.status(503).send('Not Ready');
  }
  return res.send('Ok');
});
app.get('/health', (req, res) => {
  if ( fail_liveness ) {
    console.log('Liveness probe failed');
    return res.status(503).send('Unhealthy');
  }
  return res.send('Ok');
});

let delay_startup_ms = delay_startup? 60000 : 0;


setTimeout(() => {
  app.listen(port, () => {
    console.log(`Color API listening at http://localhost:${port}`);
  });
}, delay_startup_ms);
