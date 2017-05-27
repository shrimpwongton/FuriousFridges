'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});
