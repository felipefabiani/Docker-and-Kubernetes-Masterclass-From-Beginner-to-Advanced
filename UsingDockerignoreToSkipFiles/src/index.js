const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const app_name = process.env.APP_NAME || 'Hello World Express App';
app.get('/', (req, res) => {
  res.send(`Hello from ${app_name}!`);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});