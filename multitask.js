// OSX OPERATIONS
// Neither libuv nor Node have the lowend capabilites of network
// requests, therefore, these tasks are delegated to the OS

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now()

function doRequest () {
  https.request('https://google.com', res => {
    res.on('data', dta => {

    })
    res.on('end', () => {
      console.log('https in: ', Date.now() - start)
    })
  }).end()
}

function doHash () {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, hashed) => {
    console.log('Hash: ', Date.now() - start, 'ms')
  });
}

//OSX task
doRequest();

// thread pool
fs.readFile('multitaks.js', 'utf-8', (err, res) => {
  console.log('FS: ', Date.now() - start)
});

// Thread pool
doHash();doHash();
doHash();doHash();