// OSX OPERATIONS
// Neither libuv nor Node have the lowend capabilites of network
// requests, therefore, these tasks are delegated to the OS

const https = require('https');

const start = Date.now()

function doRequest () {
  https.request('https://google.com', res => {
    res.on('data', dta => {

    })
    res.on('end', () => {
      console.log(Date.now() - start)
    })
  }).end()
}

doRequest()
doRequest()
doRequest()