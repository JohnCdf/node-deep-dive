const cluster = require('cluster');

process.env.UV_THREADPOOL_SIZE = 2; // see thread.js

const crypto = require('crypto');
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', 10000, 512, 'sha512', (err, hashed) => {
    res.send('hey there!')
  });
});
app.get('/fast', (req, res) => {
  res.send('Fiumm')
})
app.listen(3000);