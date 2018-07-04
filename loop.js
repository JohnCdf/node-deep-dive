// This is pseudo code that replicates the node.js event loop

const pendingTimers = [];
const pendingOSTasks = []; // See async.js
const pendingOperations = []; // See threads.js

myFile.runcontents(); // All the files are executed

const shouldContinue = () => {
  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length
}

const eventLoop = () => { // Runs in one tick
  if (!shouldContinue) return // stop the process, back to terminal

  // pending timers phase
  if (pendingTimes.havePendingCallbacks) {
    runPendingCallbacks()
  }
  // pending callbacks phase
  if (ioCallbacks) {
    runIOcbs() // 99% of our code
  }

  wait (until.has(immediateTimeout)); // idle phase

  run(immediateTimeouts) // poll phase

  // check phase

  // close phase

  eventLoop();
}