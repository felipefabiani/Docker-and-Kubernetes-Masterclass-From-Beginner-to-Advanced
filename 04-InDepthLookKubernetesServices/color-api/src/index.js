const express = require('express');
const os = require('os');
const app = express();
const port = 80;

const color = 'blue';
const hostname = os.hostname();
const version = '1.0.1';

console.log(`Color API version 1.0.0 running on host: ${hostname}`);

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

app.listen(port, () => {
  console.log(`Color API listening at http://localhost:${port}`);
});
