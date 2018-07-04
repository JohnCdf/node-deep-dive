const crypto = require('crypto');

const threadpool_size = process.argv[2] != 'undefined' ? Number(process.argv[2]) : false;

if (!threadpool_size) return console.log("Please provide a thread pool size. Example: `node threads 3`")

process.env.UV_THREADPOOL_SIZE = threadpool_size; // How many threads can be alocated per thread pool to be sent to the OS scheduler

const start = Date.now()

console.log('Starting at : ', start)

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, hashed) => {
  console.log('1: ', Date.now() - start, 'ms')
});
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, hashed) => {
  console.log('2: ', Date.now() - start, 'ms')
});
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, hashed) => {
  console.log('3: ' , Date.now() - start, 'ms')
});
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, hashed) => {
  console.log('4: ', Date.now() - start, 'ms')
});
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, hashed) => {
  console.log('5: ', Date.now() - start, 'ms')
});


/*
_____________________________________
|                                   |
|     THREAD POOL||SIZE = 4(default)| Only threads here will be processed. Once this pool is done, it will take on the next one
|                                   |
-------------------------------------
     /|\      /|\       /|\    /|\
______|___ ____|____ ____|____ _|_______ _________ _________
|thread 1| |thread2| |thread3| |thread4| |thread4| |thread4|
| 1 + 1  | |print  | |fs.read| |hashPass |rm file| |2 + "2"|

__________________________________________________
|                                                |
|           THREAD POOL || SIZE = 5              | Here is a slightly bigger pool
|                                                |
--------------------------------------------------
     /|\      /|\       /|\    /|\        /|\
______|___ ____|____ ____|____ _|_______ __|______ _________
|thread 1| |thread2| |thread3| |thread4| |thread4| |thread4|
| 1 + 1  | |print  | |fs.read| |hashPass |rm file| |2 + "2"|

_______________________
|                     |
|THREAD POOL||SIZE = 2| And a smaller one
|                     |
-----------------------
     /|\      /|\
______|___ ____|____ _________ _________ _________ _________
|thread 1| |thread2| |thread3| |thread4| |thread4| |thread4|
| 1 + 1  | |print  | |fs.read| |hashPass |rm file| |2 + "2"|
*/