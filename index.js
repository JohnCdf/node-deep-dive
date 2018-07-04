const Worker = require('webworker-threads').Worker;

process.env.UV_THREADPOOL_SIZE = 2; // see thread.js

const crypto = require('crypto');
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  const worker = new Worker(function(){
    this.onmessage = function() {
      let i = 0;
      while (i < 1e9) {
        i++
      }
      postMessage(i)
    }
  });

  worker.onmessage = function (i) {
    console.log(i)
  }
  worker.postMessage()
});
app.get('/fast', (req, res) => {
  res.send('Fiumm')
})
app.listen(3000);