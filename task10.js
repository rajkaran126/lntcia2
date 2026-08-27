const fs = require("fs");

function saveTaskPromise(task) {
  const timestamp = new Date().toLocaleString();
  const entry = `[${timestamp}] Promise Task: ${task}\n`;
  return fs.promises.appendFile("tasks.txt", entry);
}

function runTask10() {
  return new Promise((resolve) => {
    saveTaskPromise("Master JavaScript Promises")
      .then(() => {
        console.log("[Task 10 Promise .then()] Task saved successfully using Promises.");
        resolve("Task 10 completed: Promise resolved successfully");
      })
      .catch((err) => {
        console.error("[Task 10 Promise .catch()]:", err.message);
        resolve("Task 10 completed with error: " + err.message);
      });
  });
}

if (require.main === module) {
  runTask10();
}

module.exports = {
  saveTaskPromise,
  runTask10
};

/*
===================================================================
 EXPECTED OUTPUT:
 -------------------------------------------------------------------
 [Task 10 Promise .then()] Task saved successfully using Promises.
===================================================================
*/
