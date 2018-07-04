const cluster = require('cluster');

process.env.UV_THREADPOOL_SIZE = 2;

if (cluster.isMaster) { // While clustering can help deliver faster results to requests by making separate workers per server, it will also cost your machine CPU performance
  cluster.fork();
  cluster.fork();
} else { // This is the child -> If they are busy, we will go to the next one
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
}