const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
  res.send('Hello World! This is the Color API.');
});

app.listen(port, () => {
  console.log(`Color API listening at http://localhost:${port}`);
});
