'use strict';

const express = require('express');
const PORT = 1234;
const app = express();

app.get('/', function (req, res) {
  res.send('Hello, Im the tech radar app\n');
});

app.listen(PORT);

console.log('Running on http://localhost:' + PORT);