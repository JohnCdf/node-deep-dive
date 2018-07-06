const Worker = require('webworker-threads').Worker;

process.env.UV_THREADPOOL_SIZE = 2; // see thread.js

const crypto = require('crypto');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hey')
});

app.get('/fast', (req, res) => {
  res.send('Fiumm')
});

app.listen(3000);